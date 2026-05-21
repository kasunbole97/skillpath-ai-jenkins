import request from "supertest";
import app from "../src/server.js";

describe("Health and role API", () => {
  test("GET /health returns service status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("UP");
    expect(response.body.service).toBe("SkillPath AI");
  });

  test("GET /api/roles returns supported career roles", async () => {
    const response = await request(app).get("/api/roles");

    expect(response.status).toBe(200);
    expect(response.body.roles).toContain("Cloud Engineer");
    expect(response.body.roles).toContain("DevOps Engineer");
  });
});
