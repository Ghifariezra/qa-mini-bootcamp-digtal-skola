import assert from "assert";
import { before, describe, it } from "mocha";
import { expect } from "chai";
import {
    getUserSchema,
    invalidTokenSchema,
    addUserSchema
} from "../../../src/schema/user.schema.js";
import { usersData } from "../../../src/data/users.data.js";
import { loginData } from "../../../src/data/login.data.js";

export default function runUserTests() {
    describe("GET /api/users", function () {
        this.timeout(2000); // 2 seconds timeout

        before(async function () {
            const loginResponse = await this.api.login(loginData.validBody);
            this.userToken = loginResponse.data.token;

            const [getUserResponse, getUndefinedTokenUserResponse, getInvalidTokenUserResponse, getExpiredTokenUserResponse] = await Promise.all([
                this.api.getUser(this.userToken),
                this.api.getUser(),
                this.api.getUser("invalidToken123"),
                this.api.getUser(loginData.expiredToken)
            ]);

            this.response = getUserResponse;
            this.undefined = getUndefinedTokenUserResponse;
            this.invalid = getInvalidTokenUserResponse;
            this.expired = getExpiredTokenUserResponse;
        });

        describe("Verify user can retrieve user list/information with a valid token", function () {
            it("should validate response against schema", async function () {
                const validate = this.ajv.compile(getUserSchema);
                const isValid = validate(this.response.data);

                const errorMessage = validate.errors ? JSON.stringify(validate.errors, null, 2) : null;

                expect(isValid, errorMessage).to.be.true;
            });

            it("should return valid body response", async function () {
                assert.strictEqual(this.response.status, 200);

                usersData.validData.forEach((user) => {
                    const foundUser = this.response.data.users.find(u => u.userId === user.userId);

                    assert.ok(foundUser, `User with userId ${user.userId} not found in response`);
                    expect(foundUser).to.deep.equal(user);
                });
            });
        });

        describe("Verify system rejects user list retrieval when authorization token is missing", function () {
            it("should validate response against schema", async function () {
                const validate = this.ajv.compile(invalidTokenSchema);
                const isValid = validate(this.undefined.data);

                const errorMessage = validate.errors ? JSON.stringify(validate.errors, null, 2) : null;

                expect(isValid, errorMessage).to.be.true;
            });

            it("should return valid body response", async function () {
                assert.strictEqual(this.undefined.status, 401);
                assert.strictEqual(this.undefined.data.message, "Token required!");
            });
        });

        describe("Verify system rejects user list retrieval when authorization token is invalid", function () {
            it("should validate response against schema", async function () {
                const validate = this.ajv.compile(invalidTokenSchema);
                const isValid = validate(this.invalid.data);

                const errorMessage = validate.errors ? JSON.stringify(validate.errors, null, 2) : null;

                expect(isValid, errorMessage).to.be.true;
            });

            it("should return valid body response", async function () {
                assert.strictEqual(this.invalid.status, 403);
                assert.strictEqual(this.invalid.data.message, "Invalid or expired token, please login!");
            });
        });

        describe("Verify system rejects user list retrieval when authorization token is expired", function () {
            it("should validate response against schema", async function () {
                const validate = this.ajv.compile(invalidTokenSchema);
                const isValid = validate(this.expired.data);

                const errorMessage = validate.errors ? JSON.stringify(validate.errors, null, 2) : null;

                expect(isValid, errorMessage).to.be.true;
            });

            it("should return valid body response", async function () {
                assert.strictEqual(this.expired.status, 403);
                assert.strictEqual(this.expired.data.message, "Invalid or expired token, please login!");
            });
        });
    });
}