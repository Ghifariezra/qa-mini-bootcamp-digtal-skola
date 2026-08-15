import assert from "assert";
import { before, describe, it } from "mocha";
import { expect } from "chai";
import {
    addUserSchema
} from "../../../src/schema/user.schema.js";
import { usersData } from "../../../src/data/users.data.js";
import { loginData } from "../../../src/data/login.data.js";

/*
    QA NOTE regarding the "age" field data type anomaly & API Contract:
    I deliberately included a forced scenario to test payload validation because the API documentation is highly ambiguous and violates standard API Contract conventions.

    Discrepancy in the API Documentation:
    1. Primary JSON Request/Response Schema: Defines 'age' as a String ("34").
    2. cURL Command Example: Shows 'age' sent as a Number (30).

    API Contract Verdict:
    From a standard API Design perspective, numeric fields like 'age' should be typed as Number. However, this API's explicit contract forces it to be a String. 

    Testing Impact:
    Because of this conflict, sending a numeric payload ('invalidData') triggers a schema validation error (400 Bad Request) instead of passing to the business logic, which ultimately prevents the duplicate check from reaching a 409 Conflict response.
*/

export default function runAddUsersTests() {
    describe("POST /api/add-user", function () {
        this.timeout(2000); // 2 seconds timeout

        before(async function () {
            const loginResponse = await this.api.login(loginData.validBody);
            this.userToken = loginResponse.data.token;

            const [getUserResponse, getInvalidResponse, getLessThanResponse, getMoreThanResponse] = await Promise.all([
                this.api.addUser(usersData.addData.valid[0], this.userToken),
                this.api.addUser(usersData.addData.invalid[0], this.userToken),
                this.api.addUser(usersData.addData.withLengthMoreThen255[0], this.userToken),
                this.api.addUser(usersData.addData.withLengthMoreThen256[0], this.userToken),
            ]);

            this.response = getUserResponse;
            this.invalidResponse = getInvalidResponse;
            this.lessThanResponse = getLessThanResponse;
            this.moreThanResponse = getMoreThanResponse;

            console.log("Valid Response:", this.response.data); // -> Valid Response: { status: 400, message: 'Age must be numeric, not text!' }
        });

        describe("Verify system successfully creates a user and returns complete user data when valid payload is provided", function () {
            it("should validate response against schema", async function () {
                const validate = this.ajv.compile(addUserSchema);
                const isValid = validate(this.response.data);

                const errorMessage = validate.errors ? JSON.stringify(validate.errors, null, 2) : null;

                expect(isValid, errorMessage).to.be.true;
            });

            it("should return valid body response", async function () {
                assert.strictEqual(this.response.status, 201);
                assert.strictEqual(this.response.data.message, `User successfully added, Hi ${this.response.data.username}!`);

                const validData = usersData.addData.valid[0];
                assert.strictEqual(this.response.data.username, validData.username);
                assert.strictEqual(this.response.data.age, validData.age);
            });
        });

        describe("Verify system rejects user creation when 'age' field is sent as a number instead of a string", function () {
            it("should return valid body response", async function () {
                assert.strictEqual(this.invalidResponse.status, 400);
                assert.strictEqual(this.invalidResponse.data.message, "Invalid data type for 'age' field. Expected a string.");
            });
        });

        /*
            Backlogged Test Cases:
            1. Verify system rejects user creation when using an already existing username.
            2. Verify system accepts user creation when username is exactly the maximum allowed length (255 characters).
            3. Verify system rejects user creation when username exceeds the maximum allowed length (256 characters).
        */
        describe.skip("Backlogged Test Cases", function () {
            describe("Verify system rejects user creation when using an already existing username", function () {
                it("should return valid body response", async function () {
                    assert.strictEqual(this.invalidResponse.status, 409);
                    assert.strictEqual(this.invalidResponse.data.message, "Username already exists.");
                });
            });

            describe("Verify system accepts user creation when username is exactly the maximum allowed length (255 characters)", function () {
                it("should return valid body response", async function () {
                    assert.strictEqual(this.lessThanResponse.status, 201);
                });
            });

            describe("Verify system rejects user creation when username exceeds the maximum allowed length (256 characters)", function () {
                it("should return valid body response", async function () {
                    assert.strictEqual(this.moreThanResponse.status, 400);
                    assert.strictEqual(this.moreThanResponse.data.message, "Username must not exceed 255 characters.");
                });
            });
        });
    });
}