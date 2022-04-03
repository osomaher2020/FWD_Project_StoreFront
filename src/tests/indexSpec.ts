import app from "../index";
import supertest from "supertest";

describe("Main Entrypoint", () => {
    it("Responds Success", () => {
        return supertest(app)
            .get("/")
            .expect(200, "Success");
    });
});