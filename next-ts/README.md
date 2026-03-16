# Moipone Public Site Frontend (`next-ts`)

Next.js App Router frontend for Moipone Academy's public website and student application experience.

## Tech Stack

- Next.js `16.x` (App Router)
- React `19`
- TypeScript `5`
- Ant Design `6` + `antd-style`
- Axios for API calls
- Context + `useReducer` + `redux-actions` for domain state containers
- AWS S3 presigned POST uploads via Next.js server actions
- Sentry (`@sentry/nextjs`) for client/server/edge observability

## Project Structure

```text
next-ts/
|- app/
|  |- layout.tsx
|  `- (public)/
|     |- page.tsx            # Home page
|     |- apply/page.tsx      # Application flow
|     |- globals.css
|     `- layout.tsx          # Provider composition root
|- src/
|  |- components/            # UI components
|  |- providers/             # Domain state providers
|  |- lib/
|  |  |- common/             # constants, helpers, server actions
|  |  `- utils/axiosInstance.ts
|  `- themes/
`- next.config.ts            # Sentry integration wrapper
```

## Prerequisites

- Node.js `20+`
- npm
- Running backend API (see `../aspnet-core/README.md`)
- AWS S3 bucket + credentials for document upload flow

## Environment Configuration

Use `.env.local` for local development.

Required variables:

| Key | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_LINK` | Yes | Backend app-service base URL, e.g. `https://localhost:44311/api/services/app`. |
| `AWS_REGION` | Yes (for uploads) | AWS region for S3 client. |
| `AWS_ACCESS_KEY_ID` | Yes (for uploads) | IAM access key used by server action. |
| `AWS_SECRET_ACCESS_KEY` | Yes (for uploads) | IAM secret used by server action. |
| `AWS_S3_BUCKET_NAME` | Yes (for uploads) | Target S3 bucket. |
| `NEXT_PUBLIC_SENTRY_DSN` | Recommended | Sentry DSN for browser/server/edge events. |
| `SENTRY_AUTH_TOKEN` | Optional (build/CI sourcemaps) | Token used during sourcemap upload. |

Example `.env.local`:

```env
NEXT_PUBLIC_API_LINK=https://localhost:44311/api/services/app

AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=replace_me
AWS_SECRET_ACCESS_KEY=replace_me
AWS_S3_BUCKET_NAME=replace_me

NEXT_PUBLIC_SENTRY_DSN=replace_me
SENTRY_AUTH_TOKEN=replace_me
```

## Install and Run

```powershell
cd next-ts
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build, Start, and Lint

```powershell
cd next-ts
npm run lint
npm run build
npm run start
```

## Backend Integration Contract

Frontend calls ABP app services through `NEXT_PUBLIC_API_LINK`.

Current provider-to-endpoint mappings:

### Student Provider
- `Student/Create`
- `Student/GetAll`
- `Student/Get?Id=...`
- `Student/Update`
- `Student/Delete?Id=...`
- `Student/GetByEmail?email=...`
- `Student/GetByIdNumber?idNumber=...`
- `Student/RegisterStudentDocuments?studentId=...`

### Course Provider
- `ShortCourse/Create`
- `ShortCourse/GetAll`
- `ShortCourse/Get?Id=...`
- `ShortCourse/Update`
- `ShortCourse/Delete?Id=...`
- `ShortCourse/GetByCode?code=...`
- `ShortCourse/OpenApplications`
- `ShortCourse/CloseApplications?id=...`
- `ShortCourse/GetOpenCourses`

### Application Provider
- `CourseApplication/Create`
- `CourseApplication/GetAll`
- `CourseApplication/Get?Id=...`
- `CourseApplication/Update`
- `CourseApplication/Delete?Id=...`
- `CourseApplication/GetByCourseId?CourseId=...`
- `CourseApplication/Approve?Id=...`
- `CourseApplication/Reject?Id=...`

### Contact Provider
- `Contact/Create`
- `Contact/GetAll`
- `Contact/Get?Id=...`
- `Contact/Update`
- `Contact/Delete?Id=...`

### Address Provider
- `Address/Create`
- `Address/GetAll`
- `Address/Get?Id=...`
- `Address/Update`
- `Address/Delete?Id=...`

## Application Flow (Apply Page)

Route: `/apply`

Multi-step flow:
1. Create or resolve student by SA ID number.
2. Select course and upload required documents.
3. Submit application for review.

Document upload sequence:
1. `FileUpload` triggers `handleUpload` helper.
2. `handleUpload` calls server action `getPresignedPost(studentId, filename)`.
3. Server action creates a presigned POST via AWS SDK.
4. Browser uploads directly to S3.
5. Frontend calls `Student/RegisterStudentDocuments` to persist document URLs in backend.

## State Management Pattern

Pattern used per bounded domain:
- Context state + context actions
- Action creators (`redux-actions`)
- Reducer via `handleActions`
- Provider as API + orchestration boundary

Implemented domains:
- `student-provider`
- `course-provider`
- `application-provider`
- `contact-provider`
- `address-provider`

Provider composition happens in `app/(public)/layout.tsx`.

## Styling and UI Pattern

- Shared design tokens in CSS variables (`app/(public)/globals.css`)
- Component-scoped style hooks using `antd-style`
- Ant Design form controls and feedback messaging

## Observability (Sentry)

Sentry is initialized in:
- `instrumentation-client.ts` (browser)
- `sentry.server.config.ts` (server runtime)
- `sentry.edge.config.ts` (edge runtime)
- `next.config.ts` via `withSentryConfig(...)`

The config enables:
- performance traces
- logs forwarding
- replay integration
- source map upload support in CI

## Design Patterns and Architectural Decisions

1. **App Router + Route Grouping**
- Decision: keep public pages under `app/(public)`.
- Why: clear route organization and layout scoping.
- Tradeoff: folder naming conventions can be non-obvious to new contributors.

2. **Provider-per-domain state**
- Decision: split state management into domain-specific providers.
- Why: reduces coupling and clarifies data ownership.
- Tradeoff: more boilerplate than centralized external state libraries.

3. **Thin API client factory**
- Decision: `axiosInstance()` reads base URL and session token at call time.
- Why: consistent headers and simple auth token propagation.
- Tradeoff: no global request/response interceptors yet.

4. **Server action for S3 signing**
- Decision: issue upload policies server-side.
- Why: avoid exposing signing logic to client and allow direct browser upload.
- Tradeoff: AWS credentials must remain tightly controlled in runtime env.

5. **Sentry across all runtimes**
- Decision: instrument client, server, and edge.
- Why: full-path diagnostics for production incidents.
- Tradeoff: higher telemetry volume and cost if sampling is left too high.

## Recommended Release Hardening (Before Public Beta)

1. Add frontend CI jobs (`npm run lint` + `npm run build`) to GitHub Actions.
2. Add automated tests (unit/integration/e2e) for critical application workflows.
3. Confirm all secrets are removed from tracked files and rotated.
4. Review upload IAM policy scope (bucket path prefix restrictions).

## Security Notes

- Never commit real `.env` credentials.
- Use `.env.local` for local development only.
- Keep production secrets in deployment platform secret manager.
- Rotate any accidentally exposed keys immediately.
