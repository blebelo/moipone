# Moipone Public Site Backend (`aspnet-core`)

ABP-based ASP.NET Core backend for Moipone Academy's public platform.

## Tech Stack

- .NET `10.0` (`net10.0` target)
- ASP.NET Boilerplate / ABP `10.3.0`
- Entity Framework Core `10.x`
- PostgreSQL via `Npgsql.EntityFrameworkCore.PostgreSQL`
- Swagger (`Swashbuckle.AspNetCore`)
- JWT Bearer authentication
- xUnit + Shouldly test stack

## Solution Layout

```text
aspnet-core/
|- src/
|  |- Moipone.PublicSite.Core                # Domain entities, authorization, settings, localization
|  |- Moipone.PublicSite.Application         # App services + DTOs (API contract)
|  |- Moipone.PublicSite.EntityFrameworkCore # DbContext, migrations, seeding
|  |- Moipone.PublicSite.Web.Core            # API integration layer, auth setup, dynamic controllers
|  |- Moipone.PublicSite.Web.Host            # Executable web host (Kestrel, Swagger, CORS)
|  `- Moipone.PublicSite.Migrator            # Console migrator for host/tenant DB upgrades
`- test/
   |- Moipone.PublicSite.Tests
   `- Moipone.PublicSite.Web.Tests (legacy/not in solution build path)
```

## Prerequisites

- .NET SDK `10.0.101`
- PostgreSQL instance
- Optional: Docker Desktop (for containerized host)
- Optional: `dotnet-ef` CLI for migrations

## Configuration

The host reads:
- `appsettings.json`
- `appsettings.{Environment}.json` (if present)
- environment variables
- user secrets in Development (for `Web.Host`)

### Required Environment Variables

| Key | Required | Purpose |
|---|---|---|
| `ConnectionStrings__Default` | Yes | Primary PostgreSQL connection string. |
| `App__CorsOrigins` | Yes (for browser clients) | Comma-separated origins, e.g. `http://localhost:3000`. |
| `App__S3Prefix` | Required for document-registration flow | Prefix used when building student document URLs. |

### Common Optional Overrides

| Key | Purpose |
|---|---|
| `Authentication__JwtBearer__IsEnabled` | Enable/disable JWT auth middleware. |
| `Authentication__JwtBearer__SecurityKey` | JWT signing key (replace default in production). |
| `Authentication__JwtBearer__Issuer` | JWT issuer claim value. |
| `Authentication__JwtBearer__Audience` | JWT audience claim value. |
| `Sentry__Dsn` | Sentry DSN for backend error/trace reporting. |
| `Sentry__TracesSampleRate` | Optional trace sample rate override (for example `0.1`). |
| `ASPNETCORE_ENVIRONMENT` | Runtime environment (`Development`, `Production`, etc.). |

### Local User Secrets Example (Recommended)

```powershell
cd aspnet-core
dotnet user-secrets --project src/Moipone.PublicSite.Web.Host/Moipone.PublicSite.Web.Host.csproj set "ConnectionStrings:Default" "Host=localhost;Port=5432;Database=moipone;Username=postgres;Password=postgres"
dotnet user-secrets --project src/Moipone.PublicSite.Web.Host/Moipone.PublicSite.Web.Host.csproj set "App:CorsOrigins" "http://localhost:3000"
dotnet user-secrets --project src/Moipone.PublicSite.Web.Host/Moipone.PublicSite.Web.Host.csproj set "App:S3Prefix" "student-documents"
```

## Build, Run, and Test

From `aspnet-core/`:

```powershell
dotnet restore Moipone.PublicSite.sln
dotnet build Moipone.PublicSite.sln -c Release
dotnet test Moipone.PublicSite.sln
```

Run API host:

```powershell
dotnet run --project src/Moipone.PublicSite.Web.Host
```

Default local URLs:
- HTTPS profile: `https://localhost:44311`
- Kestrel HTTP endpoint (container-oriented): `http://0.0.0.0:8080`
- Swagger UI: `/swagger`

## Database Migrations

Install EF CLI (once):

```powershell
dotnet tool install --global dotnet-ef --version 10.0.1
```

Apply migrations:

```powershell
cd aspnet-core/src/Moipone.PublicSite.EntityFrameworkCore
dotnet ef database update --startup-project ../Moipone.PublicSite.Web.Host
```

Alternative migrator flow:

```powershell
cd aspnet-core
dotnet run --project src/Moipone.PublicSite.Migrator -- -q
```

## Docker

Build image:

```powershell
cd aspnet-core
docker build -f Dockerfile -t moiponeps:latest .
```

Run container:

```powershell
docker run --rm -p 8080:8080 `
  -e ConnectionStrings__Default="Host=<host>;Port=5432;Database=<db>;Username=<user>;Password=<password>;SSL Mode=Require;Trust Server Certificate=true" `
  -e App__CorsOrigins="http://localhost:3000" `
  -e App__S3Prefix="student-documents" `
  moiponeps:latest
```

## API Conventions

### Dynamic ABP Service Endpoints

App services are exposed as:
- `GET/POST/PUT/DELETE /api/services/app/{ServiceName}/{MethodName}`

Examples used by the frontend:
- `POST /api/services/app/Student/Create`
- `GET /api/services/app/Student/GetByIdNumber?idNumber=...`
- `POST /api/services/app/Student/RegisterStudentDocuments?studentId=...`
- `GET /api/services/app/ShortCourse/GetAll`
- `POST /api/services/app/CourseApplication/Create`
- `PUT /api/services/app/CourseApplication/Approve?Id=...`
- `POST /api/services/app/Contact/Create`

### Token Endpoint

- `POST /api/TokenAuth/Authenticate` for JWT issuance.

### Response Envelope

ABP wraps responses in a standard structure (for example `result`, `success`, and `error` metadata).

## Domain Model

Core domain entities:
- `Student` (unique email + ID number, personal profile, document links, address navigation)
- `Address`
- `ShortCourse` (capacity, active state, schedule, features, enrolled students)
- `CourseApplication` (student-course application with decision status + reason/date)
- `Contact` (website inquiry)
- `Employee` (HR-oriented entity set)

Key constraints:
- Unique student email and ID number.
- Unique short course code.
- Unique (`StudentId`, `ShortCourseId`) pair on applications to prevent duplicates.

## Design Patterns

1. **Layered Modular Architecture (ABP Modules)**
- `PublicSiteCoreModule`, `PublicSiteApplicationModule`, `PublicSiteEntityFrameworkModule`, `PublicSiteWebCoreModule`, `PublicSiteWebHostModule`.

2. **Repository + Unit of Work**
- `IRepository<TEntity, TKey>` injected into app services.
- EF Core operations execute within ABP UoW boundaries.

3. **Application Service Pattern**
- `AsyncCrudAppService` used for CRUD scaffolding and extension with domain-specific methods.

4. **DTO Mapping**
- AutoMapper-backed DTOs (`[AutoMap]`) decouple domain models from transport contracts.

5. **Cross-Cutting via Framework Configuration**
- CORS, JWT, Swagger, localization, and multi-tenancy configured centrally in module/startup classes.

6. **Guard Clauses + User-Friendly Exceptions**
- Input validation and business rule checks return explicit client-consumable errors.

## Architectural Decisions (Backend)

1. **Use ABP dynamic controllers instead of hand-written REST controllers**
- Rationale: delivery speed for CRUD-heavy services.
- Tradeoff: less explicit endpoint typing at controller layer.

2. **Enable multi-tenancy (`PublicSiteConsts.MultiTenancyEnabled = true`)**
- Rationale: future tenant isolation capability without architecture rewrite.
- Tradeoff: additional complexity in migrator and auth paths.

3. **Use PostgreSQL with EF Core provider**
- Rationale: cloud-friendly managed Postgres compatibility and relational consistency.
- Tradeoff: provider-specific behavior to consider for future DB portability.

4. **Store document locations, not document binaries**
- Rationale: keep API stateless for large file transport and reduce storage pressure.
- Tradeoff: external object store availability becomes part of critical path.

## CI/CD Behavior

Defined in [`.github/workflows/ci-cd.yml`](../.github/workflows/ci-cd.yml):
- Build and test on PRs and pushes to `main`.
- On `main`: run DB migration job, then deploy Dockerized backend via Render deploy hook.

CI runtime references:
- .NET SDK `10.0.101`
- `dotnet-ef` `10.0.1`

## Operational Notes

- Production must override default JWT security values.
- Ensure `App__CorsOrigins` is explicitly controlled in production.
- Keep DB credentials and AWS values in secure secret stores.
- Rotate any leaked credentials before open-source publication.
