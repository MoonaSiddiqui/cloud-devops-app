# Cloud & DevOps Project

## Project Overview

A small containerised Node.js/Express application deployed to the cloud
using Docker and Render. This project demonstrates basic cloud
deployment, containerisation, CI/CD, monitoring, rollback, and
Infrastructure as Code.

**Live app:** https://cloud-devops-app.onrender.com\
**Health check:** https://cloud-devops-app.onrender.com/health

## Architecture

``` text
GitHub
   ↓
GitHub Actions
   ↓
Lint + Tests + Docker Build
   ↓
Render
   ↓
HTTPS Application
   ↓
UptimeRobot
```

## Technologies

-   Node.js
-   Express
-   Docker
-   GitHub
-   GitHub Actions
-   Render
-   UptimeRobot

## Local Setup

Install the dependencies:

``` bash
npm install
```

Run the tests:

``` bash
npm test
```

Run the application:

``` bash
npm start
```

The application runs on:

``` text
http://localhost:3000
```

## Docker

Build the Docker image:

``` bash
docker build -t cloud-devops-app .
```

Run the container:

``` bash
docker run -p 3000:3000 cloud-devops-app
```

The application can then be accessed at:

``` text
http://localhost:3000
```

## Health Check

The application provides a health endpoint:

``` text
GET /health
```

The endpoint returns:

``` json
{
  "status": "healthy"
}
```

This endpoint is used by Render for health monitoring and by UptimeRobot
for uptime monitoring.

## CI/CD

GitHub Actions is used to automate testing and deployment.

Every push to the `main` branch triggers the CI/CD workflow, which:

1.  Checks out the repository.
2.  Sets up Node.js.
3.  Installs dependencies using `npm ci`.
4.  Runs ESLint.
5.  Runs the automated tests.
6.  Builds the Docker image.
7.  Deploys the application to Render using a Render deploy hook.

Deployment only occurs after the linting, tests, and Docker build have
completed successfully. If a test or lint check fails, the deployment
step is not executed.

## CI Failure Testing

The CI pipeline was tested by introducing a failing test. The GitHub
Actions workflow correctly detected the failure and stopped the pipeline
before deployment.

After the test was fixed, the workflow was run again and completed
successfully.

This demonstrates that the CI/CD pipeline prevents known failing code
from being automatically deployed.

## Monitoring

UptimeRobot monitors the application's health endpoint:

``` text
https://cloud-devops-app.onrender.com/health
```

The monitor periodically checks the endpoint and reports whether the
application is available.

The expected result is:

``` json
{
  "status": "healthy"
}
```

## Rollback Procedure

If a deployment introduces a problem:

1.  Open the Render dashboard.

2.  Select the `cloud-devops-app` web service.

3.  Open the **Deploys** tab.

4.  Find the previous known-good deployment.

5.  Select that deployment and use the available **Rollback** or
    **Redeploy** option.

6.  Wait for the deployment to finish and become live.

7.  Open the application:

    ``` text
    https://cloud-devops-app.onrender.com/
    ```

8.  Check the health endpoint:

    ``` text
    https://cloud-devops-app.onrender.com/health
    ```

9.  Confirm that the health endpoint returns HTTP 200 and:

    ``` json
    {
      "status": "healthy"
    }
    ```

10. Check UptimeRobot and confirm that the service is reported as
    **Up**.

## Infrastructure as Code

The repository contains a `render.yaml` file with the Render
infrastructure configuration.

This configuration is committed to GitHub so that the deployment
infrastructure is version-controlled alongside the application code.

The `render.yaml` defines the web service, Docker runtime, plan, and
health-check path.

## Environment Variables

The application currently does not require any secrets to run.

If environment variables are added in the future, they should be
accessed through `process.env` and configured securely in Render rather
than hard-coded in the source code.

Secret values should not be committed to GitHub.

## Project Structure

``` text
cloud-devops-app/
├── .github/
│   └── workflows/
│       └── ...
├── src/
├── test/
├── Dockerfile
├── .dockerignore
├── eslint.config.js
├── package.json
├── package-lock.json
├── render.yaml
└── README.md
```

## Lessons Learned

-   **Docker:** Learned how to containerise a Node.js/Express
    application and build a production-ready Docker image.
-   **CI/CD:** Learned how GitHub Actions can automate linting, testing,
    Docker builds, and deployment.
-   **Deployment:** Learned how to deploy a Dockerised application to
    Render.
-   **Monitoring:** Learned how to use a health endpoint with
    UptimeRobot to monitor application availability.
-   **Rollback:** Learned how to return a deployment to a previous
    known-good version when a deployment causes problems.
-   **Infrastructure as Code:** Learned how to keep Render deployment
    configuration in a version-controlled `render.yaml` file.
