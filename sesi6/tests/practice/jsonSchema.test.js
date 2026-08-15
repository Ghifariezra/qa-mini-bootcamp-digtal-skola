import { expect } from "chai";
import Ajv from "ajv";

describe("Validasi JSON Schema", () => {
    it("should validate response against schema", () => {
        const responseData = {
            status: 200,
            token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzY1NTYwMzcwLCJleHAiOjE3NjU1NjM5NzB9.lqYMwa_6VzUNRsI93sbd58zQowPqPKhVjiheh6pTLT4",
            message: "Login successful",
        };

        const schema = {
            $schema: "http://json-schema.org/draft-07/schema#",
            title: "Generated schema for Root",
            type: "object",
            properties: {
                status: { type: "number" },
                token: { type: "string" },
                message: { type: "string" },
            },
            required: ["status", "token", "message"],
        };

        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(schema);

        const isValid = validate(responseData);

        const errorMessage = validate.errors
            ? JSON.stringify(validate.errors, null, 2)
            : null;

        expect(isValid, errorMessage).to.be.true;
    });
});