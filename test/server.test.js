const request = require("supertest");
const app = require("../src/server");

describe("API tests", () => {
    test("GET / should return 200", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(500);
        expect(response.body.status).toBe("running");
    });

    test("GET /health should return healthy", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("healthy");
    });
});
