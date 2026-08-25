# Cloud & DevOps Project

## Project Overview

A small containerised Node.js/Express application deployed to the cloud using Docker and Render. Built as part of my Cloud & DevOps learning journey.

**Live app:** https://cloud-devops-app.onrender.com
**Health check:** https://cloud-devops-app.onrender.com/health

## Architecture

```
GitHub
   ↓
GitHub Actions
   ↓
Tests + Lint + Docker Build
   ↓
Render
   ↓
HTTPS Application
   ↓
UptimeRobot
```

## Technologies

- Node.js
- Express
- Docker
- GitHub
- GitHub Actions
- Render
- UptimeRobot

## Local Setup

```bash
npm install
npm test
npm start
```

The app runs on `http://localhost:3000` by default.

## Docker

```bash
docker build -t cloud-devops-app .
docker run -p 3000:3000 cloud-devops-app
```

## Health Check

```
GET /health
```

Returns:

```json
{ "status": "healthy" }
```

Used by Render's built-in health monitoring and by UptimeRobot for uptime checks.

## CI/CD

Every push to `main` triggers a GitHub Actions workflow that:

1. Installs dependencies
2. Runs lint
3. Runs tests
4. Builds the Docker image
5. Deploys to Render (via deploy hook)

Deployment only happens if all previous steps succeed — a failing test or lint error stops the pipeline before anything is deployed.

## Monitoring

UptimeRobot monitors `/health` every 5 minutes and reports uptime status.

## Rollback Procedure

If a deployment introduces a problem:

1. Open the [Render dashboard](https://dashboard.render.com).
2. Select the `cloud-devops-app` service.
3. Go to the **Deploys** tab.
4. Find the last known-good deployment in the list.
5. Click it, then choose **Rollback to this deploy** (or **Redeploy**).
6. Once the rollback finishes, verify the app is healthy again:
   ```bash
   curl https://cloud-devops-app.onrender.com/health
   ```
   It should return `{"status":"healthy"}`.

## Environment Variables

This app currently doesn't require any secrets to run. If environment variables are added later (e.g. API keys, database URLs), they are read via `process.env` and never hard-coded, and are configured in Render under **Service → Environment**. `.env` is excluded from version control via `.gitignore`.

## CI/CD

This project uses GitHub Actions to run linting, tests, Docker builds, and automatic deployment to Render.

## Lessons Learned

- **Docker:** Learned how to write a multi-stage Dockerfile to keep the production image lean, and how `EXPOSE`/`PORT` env vars need to line up with what the cloud host expects.
- **CI/CD:** Learned how a pipeline can gate deployment behind passing tests, so broken code never reaches production automatically.
