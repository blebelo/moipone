---
name: frontend
description: 'Moipone Next.js frontend development patterns, architecture, and conventions. Use when building or modifying the frontend application, working with providers, forms, API integration, styling, or routing.'
argument-hint: 'Optional: specific area like "providers", "forms", "styling", "routing"'
---

# Moipone Frontend Skills Guide

## Purpose
This document describes the architecture, coding patterns, domain structure, API contract, and implementation conventions for the `next-ts` frontend application. It is intended to help a future agent understand how to write, extend, and maintain the code.

## Project Overview
- Framework: **Next.js 16 App Router**
- Language: **TypeScript**
- UI: **React 19** + **Ant Design 6** + **antd-style**
- HTTP client: **Axios**
- State management: **React Context + useReducer + redux-actions**
- Observability: **Sentry** client/server/edge
- Deployment target: **Next.js app** with route groups for public, admin, and student flows

## Key Directories
- `app/` - Next.js route tree and layouts
- `src/components/` - UI components, reusable view pieces
- `src/providers/` - domain state providers and hooks
- `src/lib/common/` - shared constants, helper methods, mock data, server actions
- `src/lib/utils/` - helper utilities like Axios instance creation
- `src/themes/` - theme definitions

## App Routing and Layouts
- `app/layout.tsx` is the top-level root layout and includes analytics providers.
- `app/(public)/layout.tsx` composes domain providers in a nested hierarchy:
  - `AddressProvider`
  - `StudentProvider`
  - `CourseProvider`
  - `ApplicationProvider`
  - `ContactProvider`
- Public pages live under `app/(public)`.
- Admin and student pages are separated using route groups for isolation.

## Domain Provider Architecture
### Pattern
Each domain provider follows the same structure:
1. `context.ts` defines entity interfaces, state context interfaces, action context interfaces, and React contexts.
2. `actions.ts` defines Redux-style action creators using `redux-actions`.
3. `reducer.ts` defines state transitions using `handleActions` from `redux-actions`.
4. `index.tsx` implements the provider component with `useReducer`, API calls, dispatching actions, and hook exports.

### Provider responsibilities
- Manage request state (`isPending`, `isSuccess`, `isError`, `error`) centrally.
- Expose two contexts:
  - `<Domain>StateContext` for read state
  - `<Domain>ActionContext` for async operations
- Provide typed hooks:
  - `use<Domain>State()`
  - `use<Domain>Actions()`
- Wrap children inside `ActionContext.Provider` and `StateContext.Provider`.

### Example providers
- `student-provider`
- `course-provider`
- `application-provider`
- `contact-provider`
- `address-provider`
- `auth-provider` (similar pattern with auth flow)

## Provider Usage
- Use provider hooks inside page components and components that require domain access.
- Typical pattern in pages:
  - `const studentActions = useStudentActions();`
  - `const studentState = useStudentState();`
  - call `studentActions.*` inside event handlers or `useEffect`
  - render state-driven UI and loaders based on `studentState.isPending`

## API Contract
Frontend communicates with an ABP backend through `NEXT_PUBLIC_API_LINK`.
The backend contract is REST/Query-style and includes these app-service endpoints:

### Student
- `Student/Create`
- `Student/GetAll`
- `Student/Get?Id=...`
- `Student/Update`
- `Student/Delete?Id=...`
- `Student/GetByEmail?email=...`
- `Student/GetByIdNumber?idNumber=...`
- `Student/RegisterStudentDocuments?studentId=...`

### Course
- `ShortCourse/Create`
- `ShortCourse/GetAll`
- `ShortCourse/Get?Id=...`
- `ShortCourse/Update`
- `ShortCourse/Delete?Id=...`
- `ShortCourse/GetByCode?code=...`
- `ShortCourse/OpenApplications`
- `ShortCourse/CloseApplications?id=...`
- `ShortCourse/GetOpenCourses`

### Application
- `CourseApplication/Create`
- `CourseApplication/GetAll`
- `CourseApplication/Get?Id=...`
- `CourseApplication/Update`
- `CourseApplication/Delete?Id=...`
- `CourseApplication/GetByCourseId?CourseId=...`
- `CourseApplication/Approve?Id=...`
- `CourseApplication/Reject?Id=...`

### Contact
- `Contact/Create`
- `Contact/GetAll`
- `Contact/Get?Id=...`
- `Contact/Update`
- `Contact/Delete?Id=...`

### Address
- `Address/Create`
- `Address/GetAll`
- `Address/Get?Id=...`
- `Address/Update`
- `Address/Delete?Id=...`

## Request and Response Pattern
- API calls use `axiosInstance()` from `src/lib/utils/axiosInstance.ts`.
- Responses are expected to resolve under `response.data.result`.
- Most provider actions dispatch a pending action, perform the request, then dispatch success or error.
- Some functions return values for flow control, such as `getStudentByIdNumber` returning `IStudent | null`.

## Shared Type and State Conventions
- Shared request state uses `INITIAL_STATE` from `src/lib/common/constants.tsx`.
- Domain state contexts include:
  - `isPending`
  - `isSuccess`
  - `isError`
  - `error?`
  - entity or collection payloads
- Entities often include optional fields like `id`, `creationTime`, and nested relations.
- Example `ICourse` uses:
  - `title`, `description`, `capacity`, `code`, `startDate`, `duration`, `features`
  - `enrolledStudents` and `applications`

## UI & Styling Conventions
- Pages and components are mostly client components (`'use client'`) when they use hooks or browser state.
- Styling uses CSS modules or `antd-style` style objects.
- Common UI components include `Header`, `Footer`, `Loader`, `ApplicationForm`, and provider-based form flows.
- `app/(public)/apply/page.tsx` shows the apply flow:
  - loads courses via `courseActions.getAllCourses()`
  - renders `ApplicationForm` with provider hooks for student, course, and application state
  - conditionally shows `<Loader />` when any domain is pending

### Form Pages
- Form pages use `antd` form components with `Form.useForm<T>()` and typed form data.
- Validation lives in `Form.Item` rules, including custom validators for complex checks.
- Nested entity values are bound using array field names like `name={["student", "emailAddress"]}`.
- Controls often use `Form.Item` with `Input`, `Select`, `DatePicker`, `Radio`, `Steps`, and `Button`.
- `initialValues`, `onValuesChange`, `form.validateFields()`, `form.setFieldsValue()`, and `getFieldValue` are used to keep form state and local component state synchronized.
- Date fields use `getValueProps` and `getValueFromEvent` to transform Ant Design date values into string formats.
- Form logic is centralized in component handlers like `handleNext`, `handlePrev`, and `lookupStudent`, while UI rendering remains declarative.
- Notifications use `message.success(...)` and `message.error(...)` for user feedback.
- Step-based flows are implemented with `Steps` plus conditional rendering for each step section.

### Styling Patterns
- Reusable component styles are defined with `createStyles` from `antd-style` in a separate `style.ts` file.
- Components consume styles via `const { styles } = useApplicationFormStyles();` and apply them with `className={styles.someClass}`.
- Styling objects include selectors for Ant Design internals, such as overriding `.ant-form-item-required` or `.ant-steps-item-icon`.
- Layout uses CSS grid for responsive form groups, with inline style objects for quick layout patterns and style hook classes for consistent UX.
- Buttons and cards are styled with custom tokens, border radius, shadows, and hover states.
- Colors and typography frequently use CSS variables like `var(--color-teal)` and `var(--font-primary)`.

## Observability and Instrumentation
- Sentry is configured in:
  - `next.config.ts` via `withSentryConfig(...)`
  - `instrumentation-client.ts` for browser SDK init
  - `instrumentation.ts` for runtime detection and exports
- Sentry options include:
  - `tracesSampleRate: 1`
  - `enableLogs: true`
  - `replaysSessionSampleRate: 0.1`
  - `replaysOnErrorSampleRate: 1.0`
  - `sendDefaultPii: true`
- `next.config.ts` also enables Sentry source map upload and tunnel route `/monitoring`.

## Implementation Guidelines for New Features
When adding a feature:
1. Add a new route under the appropriate `app/` route group.
2. Add UI and form components under `src/components`.
3. If domain state is needed, add a provider under `src/providers/<domain>-provider`:
   - define interfaces in `context.ts`
   - define actions in `actions.ts`
   - implement reducer in `reducer.ts`
   - add provider logic in `index.tsx`
   - expose `use<Domain>State()` and `use<Domain>Actions()` hooks
4. Use `axiosInstance()` for backend communication and follow response conventions.
5. Dispatch pending/success/error actions consistently.
6. Keep UI state derived from provider state, not local copies, whenever possible.
7. Wire the provider into `app/(public)/layout.tsx` or the relevant layout root.

## Quality Notes
- The repo uses TypeScript and ESLint.
- There are no dedicated tests in source control, so rely on type safety and compile-time checks.
- Keep components simple and reuse provider hooks.
- Preserve the App Router grouping model when adding new pages.

## Agent Guidance
To write code effectively for this repository:
- Follow existing provider and hook patterns strictly.