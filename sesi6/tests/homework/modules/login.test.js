import assert from "assert";
import { before, describe, it } from "mocha";
import { expect } from "chai";
import {
    loginSchema,
    invalidLoginSchema
} from "../../../src/schema/login.schema.js";
import { loginData } from "../../../src/data/login.data.js";

export default function runLoginTests() {
    describe("POST /api/login", function () {
        this.timeout(2000); // 2 seconds timeout

        before(async function () {
            const [validResponse, invalidResponse, missingFieldsResponse, sqlInjectionResponse, xssAttackResponse] = await Promise.all([
                this.api.login(loginData.validBody),
                this.api.login(loginData.invalidBody),
                this.api.login(loginData.missingFieldsBody),
                this.api.login(loginData.sqlInjectionBody),
                this.api.login(loginData.xssAttackBody)
            ]);

            this.response = validResponse;
            this.invalidResponse = invalidResponse;
            this.missingFieldsResponse = missingFieldsResponse;
            this.sqlInjectionResponse = sqlInjectionResponse;
            this.xssAttackResponse = xssAttackResponse;
        });

        describe("Verify user can successfully login with valid credentials", function () {
            it("should validate response against schema", async function () {
                const validate = this.ajv.compile(loginSchema);
                const isValid = validate(this.response.data);

                const errorMessage = validate.errors ? JSON.stringify(validate.errors, null, 2) : null;

                expect(isValid, errorMessage).to.be.true;
            });

            it("should return valid body response", async function () {
                assert.strictEqual(this.response.status, 200);

                assert.ok(this.response.data.token !== undefined && this.response.data.token !== null);
                assert.strictEqual(this.response.data.message, "Login successful");

                // Simpan Token
                this.token = this.response.data.token;
            });
        });

        describe("Verify API Response Headers Policy", function () {
            it("should return correct Content-Type as application/json", async function () {
                const contentType = this.response.headers.get("content-type");

                assert.ok(contentType !== undefined, "Content-Type header is missing");
                expect(contentType).to.include("application/json");
            });

            it("should not expose server technology (X-Powered-By is hidden)", async function () {
                const poweredBy = this.response.headers.get("x-powered-by");
                expect(poweredBy).to.be.oneOf([undefined, null]);
            });

            it("should not expose cloud hosting infrastructure (X-Render-Origin-Server is hidden)", async function () {
                const renderServer = this.response.headers.get("x-render-origin-server");
                expect(renderServer).to.be.oneOf([undefined, null]);
            });

            it("should restrict Access-Control-Allow-Origin from wildcard (*)", async function () {
                const allowOrigin = this.response.headers.get("access-control-allow-origin");
                expect(allowOrigin).to.not.equal("*", "Security Risk: Access-Control-Allow-Origin should not allow wildcard '*'");
            });

            it("should include X-Content-Type-Options header set to nosniff", async function () {
                const contentTypeOptions = this.response.headers.get("x-content-type-options");
                expect(contentTypeOptions).to.equal("nosniff", "Security Risk: Missing X-Content-Type-Options header");
            });
        });

        describe("Verify system rejects login with invalid credentials", function () {
            it("should validate invalid response against schema", async function () {
                const validate = this.ajv.compile(invalidLoginSchema);
                const isValid = validate(this.invalidResponse.data);

                const errorMessage = validate.errors ? JSON.stringify(validate.errors, null, 2) : null;

                expect(isValid, errorMessage).to.be.true;
            });

            it("should return error for invalid credentials", async function () {
                assert.strictEqual(this.invalidResponse.status, 401);
                assert.strictEqual(this.invalidResponse.data.message, "Invalid username or password!");
            });
        });

        describe("Verify system enforces rate limiting after multiple consecutive login attempts", function () {
            this.timeout(5000);

            before(async function () {
                const burstRequests = [];
                const limitToTrigger = this.MAX_ALLOWED_REQUESTS + 1;

                for (let i = 0; i < limitToTrigger; i++) {
                    burstRequests.push(this.api.login(loginData.invalidBody));
                }

                const responses = await Promise.all(burstRequests);
                this.rateLimitResponse = responses[responses.length - 1];
            });

            it("should return status code 429 Too Many Requests", async function () {
                assert.strictEqual(this.rateLimitResponse.status, 429);
            });

            it("should return rate limit error message", async function () {
                assert.strictEqual(this.rateLimitResponse.data.message, "Too many requests, please try again later.");
            });
        });

        describe("Verify system prevents SQL injection vulnerabilities on login endpoint", function () {
            it("should validate SQL injection response against invalid login schema", async function () {
                const validate = this.ajv.compile(invalidLoginSchema);
                const isValid = validate(this.sqlInjectionResponse.data);

                const errorMessage = validate.errors ? JSON.stringify(validate.errors, null, 2) : null;

                expect(isValid, errorMessage).to.be.true;
            });

            it("should return 401 error, not 500 or 200, confirming injection is safely blocked", async function () {
                assert.strictEqual(this.sqlInjectionResponse.status, 401, "Expected 401, but got a different status. System might be vulnerable!");
                assert.strictEqual(this.sqlInjectionResponse.data.message, "Invalid username or password!");
            });
        });

        describe("Verify system sanitizes input against Cross-Site Scripting (XSS) payloads", function () {
            it("should validate XSS response against invalid login schema", async function () {
                const validate = this.ajv.compile(invalidLoginSchema);
                const isValid = validate(this.xssAttackResponse.data);

                const errorMessage = validate.errors ? JSON.stringify(validate.errors, null, 2) : null;

                expect(isValid, errorMessage).to.be.true;
            });

            it("should reject XSS payload with 401 status and not reflect script in response", async function () {
                assert.strictEqual(this.xssAttackResponse.status, 401, "Expected 401, but system did not reject properly!");

                const responseBodyString = JSON.stringify(this.xssAttackResponse.data);

                expect(responseBodyString).to.not.include("<script>", "Security Risk: XSS payload reflected in response body!");
            });
        });

        describe("Verify system handles missing required fields during login", function () {
            it("should validate missing fields response against schema", async function () {
                const validate = this.ajv.compile(invalidLoginSchema);
                const isValid = validate(this.missingFieldsResponse.data);

                const errorMessage = validate.errors ? JSON.stringify(validate.errors, null, 2) : null;

                expect(isValid, errorMessage).to.be.true;
            });

            it("should return error for missing fields", async function () {
                assert.strictEqual(this.missingFieldsResponse.status, 400);
                assert.strictEqual(this.missingFieldsResponse.data.message, "Missing required fields");
            });
        });
    });
};