export class FetchDataAPI {
    _BaseURL;

    constructor(baseURL) {
        this._BaseURL = baseURL;
    }

    async get(endpoint, token) {
        try {
            const response = await fetch(`${this._BaseURL}${endpoint}`, {
                headers: await this._headers(token),
            });

            const data = await response.json();
            return {
                status: response.status,
                headers: response.headers,
                data: data
            };
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }

    async post(endpoint, body, token) {
        try {
            const response = await fetch(`${this._BaseURL}${endpoint}`, {
                headers: await this._headers(token),
                method: "POST",
                body: JSON.stringify(body),
            });

            const data = await response.json();

            return {
                status: response.status,
                headers: response.headers,
                data: data
            };
        } catch (error) {
            console.error("Error posting data:", error);
            throw error;
        }
    }

    async _headers(token){
        return {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        };
    }
}