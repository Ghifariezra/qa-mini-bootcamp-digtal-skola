import { FetchDataAPI } from "./fetch.js";

export class BelajarBarengAPI extends FetchDataAPI {
    constructor(baseUrl) {
        super(baseUrl);
    }

    async getUser(token) {
        return await this.get("/api/users", token);
    }

    async addUser(body, token) {
        return await this.post("/api/add-user", body, token);
    }

    async login(body) {
        return await this.post("/api/login", body);
    }
}