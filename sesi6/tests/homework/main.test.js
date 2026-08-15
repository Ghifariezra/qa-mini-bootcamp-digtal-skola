import Ajv from "ajv";
import assert from "assert";
import { before, describe, it } from "mocha";
import { expect } from "chai";
import { BelajarBarengAPI } from "../../src/belajar.bareng.js";
import runLoginTests from "./modules/login.test.js";
import runUserTests from "./modules/users.test.js";
import runAddUsersTests from "./modules/add.users.test.js";

describe("Global Setup & Wakeup", function () {
    this.timeout(30000); // 30 seconds wait for server wakeup

    before(async function () {
        this._BaseURL = "https://belajar-bareng.onrender.com"
        this.MAX_ALLOWED_REQUESTS = 5;
        this.api = new BelajarBarengAPI(this._BaseURL);
        this.ajv = new Ajv({ allErrors: true });
        this.token = null;

        try {
            await fetch(this._BaseURL);
        } catch (error) {
            throw new Error("Failed to wake up the server. Please check the server status.");
        }
    });

    runLoginTests.call(this);
    runUserTests.call(this);

    // for this test, i been notes about API CONTRACT anomaly and i forced a scenario to test payload validation
    runAddUsersTests.call(this);
});