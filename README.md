# Moipone Public Site Platform

Open-source monorepo for Moipone Academy's public website and admissions platform.

This repository contains:
- `aspnet-core`: ABP/ASP.NET Core backend API, business logic, and database layer.
- `next-ts`: Next.js TypeScript frontend for the public site, course applications, and contact workflow.

## Beta MVP Scope

Current beta scope includes:
- Public marketing website (home/about/programmes/contact).
- Student application flow (student profile, document upload, application submission).
- Course and application management API surface.
- Contact inquiry capture.
- CI/CD pipeline for backend build, tests, migrations, and deployment.

## Repository Structure

```text
moipone/
|- .github/
|  |- workflows/
|  |  |- ci-cd.yml
|  |  `- code-rabbit-auto-approve.yml
|- aspnet-core/
|  |- src/
|  |- test/
|  |- Dockerfile
|  `- Moipone.PublicSite.sln
`- next-ts/
   |- app/
   |- src/
   |- public/
   `- package.json
```

## Documentation Map

- Backend guide: [`aspnet-core/README.md`](./aspnet-core/README.md)
- Frontend guide: [`next-ts/README.md`](./next-ts/README.md)

## Quick Start (Local)

Prerequisites:
- .NET SDK `10.0.101` (matches CI setup).
- Node.js `20+` and npm.
- PostgreSQL database reachable from local machine.
- AWS S3 bucket credentials for document uploads.

1. Configure backend and frontend environment variables (see sub-project READMEs).
2. Run backend:

```powershell
cd aspnet-core
dotnet restore Moipone.PublicSite.sln
dotnet run --project src/Moipone.PublicSite.Web.Host
```

3. Run frontend in another terminal:

```powershell
cd next-ts
npm install
npm run dev
```

4. Open:
- Frontend: `http://localhost:3000`
- Backend Swagger: `https://localhost:44311/swagger` (or `http://localhost:8080/swagger` in container)

## System Architecture

High-level flow:

```text
Next.js (App Router + Providers)
   |
   | HTTPS /api/services/app/*
   v
ABP Application Services (ASP.NET Core)
   |
   v
EF Core (Npgsql) -> PostgreSQL

Document Upload Path:
Frontend Server Action -> AWS S3 Presigned POST -> S3 Bucket
```

## Design Patterns and Architectural Decisions

1. **Layered backend with ABP modules**
- Decision: keep strict `Core -> Application -> EntityFrameworkCore -> Web.Core -> Web.Host` separation.
- Why: clear responsibility boundaries and faster onboarding.
- Tradeoff: ABP conventions can feel opinionated for teams expecting minimal framework abstraction.

2. **App-service-first API contract**
- Decision: expose ABP application services via dynamic endpoints (`/api/services/app/{Service}/{Method}`).
- Why: rapid CRUD and custom operation delivery.
- Tradeoff: endpoint style is RPC-like rather than pure REST resource routing.

3. **Provider-per-domain frontend state model**
- Decision: one context/action/reducer set per bounded domain (`student`, `course`, `application`, `contact`, `address`).
- Why: keeps state ownership explicit and local.
- Tradeoff: multiple providers increase composition depth in layout.

4. **Direct-to-S3 document upload**
- Decision: frontend obtains presigned POST data and uploads files directly to S3.
- Why: reduces API server load and keeps binary transfer out of backend.
- Tradeoff: requires secure AWS credential handling and strict key/path conventions.

5. **Backend-first CI/CD**
- Decision: pipeline currently gates on backend build/test/migrate/deploy stages.
- Why: backend is release-critical for current MVP data flows.
- Tradeoff: frontend build/lint is not yet enforced in GitHub Actions.

## CI/CD Summary

Workflow: [`.github/workflows/ci-cd.yml`](./.github/workflows/ci-cd.yml)

On `push` and `pull_request` to `main`:
- `build`: restore, build, publish .NET solution artifacts.
- `test`: run backend tests.

On `push` to `main` only:
- `db_update`: runs EF Core migrations against configured production DB.
- `deploy`: builds Docker image and triggers Render deploy hook.

## Security Notes for Open Source Release

Before public beta release:
- Rotate any exposed credentials immediately.
- Do not commit real `.env` values, API keys, JWT secrets, or DB passwords.
- Store production secrets in GitHub Actions secrets / deployment platform secret manager.
- Use least-privilege AWS IAM policies for upload credentials.

## Contributing

1. Fork and create a feature branch from `main`.
2. Follow the backend/frontend setup guides.
3. Validate locally before PR:

```powershell
# Backend
cd aspnet-core
dotnet test

# Frontend
cd ../next-ts
npm run lint
npm run build
```

4. Open a PR and wait for CI checks.

## License

Project source is intended for open-source release. Add an explicit `LICENSE` file at repo root if not already present.
