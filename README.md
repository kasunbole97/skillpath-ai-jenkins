# SkillPath AI

SkillPath AI is a mini career-roadmap web application created for the SIT753 Jenkins DevOps Pipeline HD task.

## Features
- Home page explaining the product idea
- Career role selection
- Skill assessment form
- AI-style skill gap roadmap result
- REST API endpoints
- Health endpoint for deployment checks
- Prometheus metrics endpoint for monitoring
- Jest/Supertest automated tests
- ESLint code quality checks
- Dockerfile and Jenkinsfile for CI/CD

## Local setup

```bash
npm install
npm start
```

Open:

- App: http://localhost:3000
- Health: http://localhost:3000/health
- Metrics: http://localhost:3000/metrics

## Tests

```bash
npm test
```

## Code quality

```bash
npm run lint
```

## Security scan

```bash
npm audit --audit-level=high
```

## Docker

```bash
docker build -t skillpath-ai:latest .
docker run -d --name skillpath-ai-local -p 3000:3000 skillpath-ai:latest
```

## Jenkins HD pipeline stages

1. Build
2. Test
3. Code Quality
4. Security
5. Deploy
6. Release
7. Monitoring
