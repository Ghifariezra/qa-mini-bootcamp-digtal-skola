import { describe, it } from "mocha";
import assert from "assert";
import { expect } from "chai";

let token;

describe("Login Feature", function () {
    it("Valid Login", async function () {
        const response = await fetch(
            "https://belajar-bareng.onrender.com/api/login",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    username: "admin",
                    password: "admin",
                }),
            }
        );

        //  assert.strictEqual(response.status, 200);
        expect(response.status).to.equal(200);

        // Mencetak Response Body
        const data = await response.json();
        // console.log(data);
        expect(data.message).to.eql("Login successful");

        // Simpan Token
        token = data.token;
        //console.log(token);
    });

    it("Get User", async function () {
        const response = await fetch(
            "https://belajar-bareng.onrender.com/api/users",
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            }
        );

         assert.strictEqual(response.status, 200);
        // expect(response.status).to.equal(200);

        // Mencetak Response Body
        const data = await response.json();
        // console.log(data);
    });
});