import request from "supertest";
import { generateRoadmap } from "../src/services/roadmapService.js";
import app from "../src/server.js";

describe("Roadmap generation", () => {
  test("generateRoadmap identifies missing skills for Cloud Engineer", () => {
    const result = generateRoadmap("Cloud Engineer", {
      AWS: 4,
      Azure: 4,
      Linux: 2,
      Networking: 1,
      Docker: 3
    });

    expect(result.targetRole).toBe("Cloud Engineer");
    expect(result.readinessScore).toBeGreaterThanOrEqual(0);
    expect(result.missingSkills.length).toBeGreaterThan(0);
    expect(result.priorityActions.length).toBeLessThanOrEqual(4);
  });

  test("POST /api/roadmap returns a personalised roadmap", async () => {
    const response = await request(app)
      .post("/api/roadmap")
      .send({
        targetRole: "DevOps Engineer",
        skills: {
          Git: 4,
          Docker: 3,
          Kubernetes: 1,
          Jenkins: 2,
          Terraform: 1,
          Linux: 3,
          Cloud: 2,
          Security: 1,
          Monitoring: 1
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.targetRole).toBe("DevOps Engineer");
    expect(response.body.priorityActions.length).toBeGreaterThan(0);
  });

  test("POST /api/roadmap validates required input", async () => {
    const response = await request(app).post("/api/roadmap").send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("targetRole and skills are required");
  });
});
