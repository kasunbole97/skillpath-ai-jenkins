import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import client from "prom-client";
import { getRoles, generateRoadmap } from "./services/roadmapService.js";

const app = express();

client.collectDefaultMetrics();

const roadmapCounter = new client.Counter({
  name: "skillpath_roadmaps_generated_total",
  help: "Total number of SkillPath AI roadmaps generated"
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(express.static("public"));

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "UP",
    service: "SkillPath AI",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.get("/api/roles", (_req, res) => {
  res.json({ roles: getRoles() });
});

app.post("/api/roadmap", (req, res) => {
  const { targetRole, skills } = req.body;

  if (!targetRole || !skills || typeof skills !== "object") {
    return res.status(400).json({
      error: "targetRole and skills are required"
    });
  }

  const roadmap = generateRoadmap(targetRole, skills);
  roadmapCounter.inc();

  return res.status(200).json(roadmap);
});

export default app;
