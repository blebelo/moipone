# Moipone Frontend Engineering Skill

## Purpose

Use this guide when adding, changing, reviewing, or debugging frontend code in this repository. It records the codebase's verified architecture and preferred patterns for routes, components, domain state, API access, forms, styling, accessibility, and validation. Follow current nearby code where it is sound; treat the cautions below as places to verify and improve, not conventions to copy blindly.

## Stack And Source Map

- Next.js 16 App Router, React 19, TypeScript with strict checking, and Tailwind CSS 4.
- Source is under `src/`; the `@/*` TypeScript alias resolves to `src/*`.
- `src/app/` contains route entries and the root layout; `src/components/` contains feature UI; `src/providers/` owns app-wide domain state and actions; `src/lib/common/` contains shared constants, enumerations, and helpers; `src/lib/utils/` contains low-level API and token utilities.
- Feature components typically use a directory with an `index.tsx`, for example `components/CheckInForm/index.tsx`.
- Existing routes are `/`, `/login`, and the framework not-found route. Inspect the live route tree before assuming a route exists, especially an admin/dashboard destination.
- Root `SKILLS.md` is this repository reference. It is not an active Next.js instruction file; `AGENTS.md` contains the binding repo instruction to consult installed Next.js documentation before using version-sensitive APIs.

## Working Workflow

1. Inspect the owning route/component, its props and consumers, provider contract, related action/reducer, and current styles before editing.
2. Follow the data flow end-to-end: UI event → provider action → Axios request → action creator → reducer/context state → rendered state. If the component receives a callback, inspect its caller before moving request behavior.
3. Check the installed Next.js docs in `node_modules/next/dist/docs/` for the exact API in this installed version. Do not rely on assumed Next.js conventions from another version.
4. State one local hypothesis and a focused check. Make the smallest edit that addresses the owning layer; do not patch a visible symptom when the state or API contract is the cause.
5. Keep work with the current design system and type contracts. Avoid broad refactors while fixing a narrow flow.
6. Validate touched files first with editor diagnostics and file-scoped ESLint. Run `npm run lint` and `npm run build` for cross-file or user-visible changes when practical.
7. Do not claim a route, redirect, API response, or interaction works unless that target/contract exists and has been checked.

## App Router And Rendering Boundaries

- `src/app/layout.tsx` is the root Server Component. It owns document metadata, font variables, global CSS, and provider composition.
- Pages are Server Components by default. Put `'use client'` at the top of a file only when the component itself needs React state/effects, event handlers, context hooks, or browser APIs.
- Keep client boundaries narrow. A Server Component page can render a client form/control; avoid making an entire layout client-side just to host one interactive component.
- The current root provider nesting is `AuthProvider` → `AttendanceRegisterProvider` → `VisitorProvider` → `VisitProvider`. Hooks must run under their provider. Respect the current nesting unless a concrete dependency requires a change.
- Put static route metadata in a Server Component `page.tsx` or `layout.tsx`; metadata exports are not supported from Client Components. When a page needs client hooks, use a server page wrapper and a client child if metadata is required.
- Use `next/link` for ordinary navigation. Use `useRouter` from `next/navigation` only for event-driven imperative navigation; it requires a Client Component. Check that the destination route exists.
- `src/app/icon.png` uses Next's file-based app-icon convention. Use installed Next docs for icon/metadata conventions rather than hardcoding an asset URL that may not resolve.
- The logo asset is `public/moipone-logo.png`; render it using `next/image` with meaningful alt text and stable intrinsic dimensions.

## Components And TypeScript

- Keep components focused around a feature or cohesive UI responsibility. Existing feature components are default exports in `index.tsx`; follow that shape when extending a feature.
- Type component props at the boundary. Existing code uses interfaces with an `I` prefix for domain/context types; the project also uses `React.FC` and inferred function components. Match the local file rather than refactoring naming style during feature work.
- Use `import type` for types when it avoids a runtime import. Use the project alias (`@/components/...`, `@/providers/...`, `@/lib/...`) for `src` imports.
- Avoid duplicate sources of truth. Keep state in one owner and derive filtered, formatted, and paginated values during render rather than mirroring derived values into state with effects.
- Keep event functions close to the component that owns the interaction. Move reusable domain behavior into the relevant provider/helper only when it has a clear owner or multiple meaningful consumers.
- Use stable React keys based on entity identity, not array position, for lists.

## State Management And Design Patterns

### State Ownership

- Use component `useState` for transient UI state: open/closed dialogs, text input drafts, selected page, visibility toggles, pending row IDs, and local error presentation.
- Use domain providers for shared/server-backed state consumed across features: attendance registers, visitors, visits, and auth.
- Keep server state in its owning provider. Do not make a second local copy of a provider collection just to filter or paginate it. Derive views from the provider state.
- Use an effect to synchronize with an external system or lifecycle (for example, load today's register on mount, restore a session from storage, or call `dialog.showModal()`). Do not use effects to synchronously reset state that can instead be derived from current props/query values.
- A mutation should update provider state when its result is known, then refresh from the server if reconciliation is still required. Keep the mutation and refresh order explicit; do not wait for a refresh to make an obvious completed item disappear from the UI.

### Provider Module Shape

Each domain provider is generally split into four files:

- `context.ts` or `context.tsx`: domain entity types, state/action context interfaces, and separately typed React contexts.
- `actions.ts`: action enum and typed action creators that construct request-state or entity payloads.
- `reducer.ts`: reducer mapping actions to state transitions, usually using the shared shallow `mergePayloadHandler`.
- `index.tsx`: provider, reducer initialization, API action implementations, memoized action object, and guarded `useDomainState` / `useDomainActions` hooks.

Use this as a pattern, not as a requirement to create boilerplate for every small UI state. Keep action and context payload types consistent across all four modules.

### Request Lifecycle

- Shared request flags are `isPending`, `isSuccess`, and `isError`; initial state is based on `INITIAL_STATE` in `src/lib/common/constants.tsx`.
- Action creators typically spread `RequestState.Pending`, `Success`, or `Error`, then include the named entity/list payload on success.
- Providers dispatch pending before the request, success after parsing the expected response field, and error on failure. Re-throw a user-facing `Error` so the caller can show a form/dialog error.
- Components should render loading, success, empty, and failure states distinctly. Avoid interpreting an empty array as a loading or error state.
- Be aware that these flags are shared per provider, not per request. If concurrent operations can overlap, inspect whether a single `isPending` flag is sufficient before relying on it to disable unrelated UI.
- `mergePayloadHandler` is a shallow merge. For nested entities or collections, explicitly construct the new nested value in a reducer; do not expect the handler to deep-merge.
- Keep entity identity when a mutation response omits it. Example: checkout passes the requested visit ID into the success payload so the reducer can remove the visit reliably.

### Context Hooks

- State and actions use different contexts (`DomainStateContext` and `DomainActionContext`) so consumers can subscribe to only what they need.
- Export hooks that read each context and throw a clear error if the provider is missing. Do not silently return `undefined` or use a fake default object for required app state.
- Provider actions are generally wrapped in `useCallback`; the exposed action object is memoized with `useMemo`. Keep dependency arrays correct. Do not add memoization to ordinary values/components without a demonstrated need.

## API, Domain Data, And Errors

- Make API calls through `axiosInstance` from `src/lib/utils/axiosInstance.ts`; do not create ad hoc Axios clients in components.
- `axiosInstance(true)` is used for app-service endpoints and keeps `NEXT_PUBLIC_API_LINK` as configured. `axiosInstance(false)` removes a trailing `/services/app` for auth endpoints. Confirm the expected base URL before changing this distinction.
- The Axios factory requires an HTTPS `NEXT_PUBLIC_API_LINK` and adds a bearer token from `localStorage` or `sessionStorage` in its request interceptor. Never log, render, or expose tokens.
- Keep endpoint calls and backend response unwrapping inside providers. Current responses commonly use `response.data.result`, with paged collections under `.result.items`; verify the real contract for each endpoint.
- Use `getErrorMessage(error, fallback)` from `src/lib/common/helper-methods.ts` for Axios-backed failures. It extracts backend `message`/`details` and supplies a stable fallback. Avoid rendering raw transport objects.
- Authentication uses `IUser` from `AuthProvider/context.ts`; its fields are `userNameOrEmailAddress`, `password`, and optional `rememberClient`. The provider owns token decode, storage, session restoration, authentication, and logout. Do not duplicate these in a page.
- `rememberClient: false` is the login form's current default; the checkbox opts in. The auth provider uses session storage when false and local storage when true. Preserve user choice end-to-end.
- Domain enumerations and default form values are in `src/lib/common/data.ts` and `src/lib/common/constants.tsx`; reuse them instead of scattering duplicate numeric enum values or nested DTO defaults.

## Forms And Async Interactions

- Use a real `<form onSubmit>` for submissions and the React `SubmitEvent<HTMLFormElement>` type used by the current project. Call `preventDefault()` for client-handled submission.
- Keep controlled form data typed with the request/domain DTO. Use functional updates for nested form changes so sibling values are preserved.
- Separate editable form data from validation errors and form-level request errors. Build a normalized API DTO deliberately; do not blindly submit UI-only fields or stale data.
- Validate against current form values before setting errors. Avoid using `setState()` and then immediately reading that state; React state updates are asynchronous. Return validity from the validation function or derive a local error object.
- Clear a field's validation message when that field is edited. Clear a server/form error when the user starts correcting relevant values.
- Disable affected controls during an in-flight submission to avoid duplicate requests. Provide visible progress and preserve useful button text while loading.
- For optional or conditional fields, validate and include them only when their condition applies. Check-in, for example, conditionally includes `otherReason` for the `Other` visit reason and normalizes strings before sending.
- For lookup/autocomplete requests, guard against stale async responses before applying a result. Check-in uses a request counter and compares the result to the currently requested email; use an equivalent race guard when request order matters.
- Keep error handling at the interaction boundary that can show it. Use provider errors for API details and form-local errors for validation; do not swallow errors that the caller needs to display.

## Dialogs And Accessibility

- Label inputs explicitly and associate labels with matching IDs. Set suitable `autoComplete`, input types, and `aria-invalid`; connect inline error text with `aria-describedby` where applicable.
- Use `role="alert"` for important asynchronous errors and semantic status/output markup for loading where appropriate. Decorative icons should have `aria-hidden="true"`; icon-only buttons need an accessible name.
- Give toggle controls such as password visibility `type="button"` so they never submit a form.
- For native modal dialogs, use a ref and `showModal()` in an effect, close/cleanup deliberately, and handle the `cancel` event. Prevent Escape dismissal only when the in-flight operation makes closing unsafe; otherwise route Escape through the same close/reset handler as the visible close button.
- Current dialog implementations differ: checkout uses native `showModal()`; check-in currently renders `<dialog open>` as an overlay. Do not copy the non-modal implementation as proof of correct modal behavior. When touching check-in, account for its separate success overlay and reset flow.
- Ensure focus is visible, disabled states are distinguishable, and error states do not rely on color alone.

## Styling And Assets

- Tailwind CSS 4 is configured through `postcss.config.mjs`; `src/app/globals.css` imports Tailwind, `tw-animate-css`, and `material-symbols`.
- Use the semantic classes actually registered in `@theme inline`: `bg-background`, `text-foreground`, `bg-surface`, `bg-card`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `border-border`, `border-input`, `ring`, `destructive`, `success`, and related defined tokens.
- Global colors are authored as OKLCH CSS variables. Add a new semantic color by defining its value in the root (and dark theme if one is implemented) and mapping it in `@theme inline`; do not hardcode arbitrary colors for routine states.
- Fonts are Manrope for display and Public Sans for body/sans, configured through `next/font` in `src/app/layout.tsx`. Preserve them unless a task asks for a deliberate redesign.
- The design uses a base radius of `0.5rem`, restrained rounded controls/cards, responsive Tailwind breakpoints, and compact operational layouts. Keep spacing and sizing responsive and prevent long labels from clipping.
- `label-caps` is a custom utility. Check `globals.css` before using a utility that looks project-specific; utilities like `font-body`, `font-label`, `text-on-surface`, `bg-surface-container-lowest`, and `text-error` are used by legacy check-in UI but are not all registered in the global theme. Do not assume they work in new code.
- Current newer login/home styles use semantic tokens; check-in/success retain older visual utilities and targeted `#check-in-form` CSS overrides. When updating either area, inspect rendered/computed styles rather than assuming class names resolve.
- Use Lucide icons for the newer home/login controls, Material Symbols in existing check-in surfaces, and Ant Design icons only where the surrounding feature already uses them. Prefer the feature's established icon family.
- Use `next/image` for local image assets when appropriate, with meaningful alt text, intrinsic width/height, and stable CSS dimensions. Decorative images use empty alt text only when they convey no content.

## Current Frontend Map

- `/`: public visitor check-in landing page; loads today's register and orchestrates the check-in/check-out forms.
- `/login`: staff sign-in form, `IUser` controlled state, opt-in remember-me, password visibility, and provider-driven authentication.
- `not-found.tsx`: shared not-found UI linking home.
- `CheckInForm`: nested visitor/visit DTO editing, visitor lookup, validation, check-in submission, and success flow.
- `CheckOutForm`: combines visit and visitor provider data, filters by name/email/phone, paginates, checks out one visit, and removes it from state before refresh.
- `AuthProvider`: restores and authenticates sessions, decodes token claims, manages persistent/session storage, and logs out.
- `AttendanceRegisterProvider`, `VisitorProvider`, and `VisitProvider`: domain API state/action boundaries.

This map is a snapshot. Verify current `src/app` routes and provider composition before relying on it.

## Known Inconsistencies And Do-Not-Copy Blindly

- `README.md` remains create-next-app boilerplate and describes Geist, while the app uses Manrope and Public Sans.
- Check-in and success components use a number of legacy token names not defined by `globals.css`; validate computed appearance before extending those classes.
- Check-in validation/accessibility is mixed: some errors have matching `aria-describedby`, while others only set `aria-invalid`. New or touched controls should consistently associate field errors.
- Request state interfaces generally omit an `error` string even though `RequestState` has an error-like value in some states. Most providers throw errors to callers. Read the actual context type before accessing an error property.
- Some provider action files declare `'use client'` even though they only define action creators; do not treat that as a requirement for new modules.
- Visit action definitions/reducer may include unused delete events without an exposed provider delete operation. Do not add or rely on delete behavior unless the API contract and provider action exist.
- The root CSS declares a dark variant but currently only defines the light `:root` values. Do not promise complete dark mode without implementing and checking `.dark` tokens.
- Login's success navigation must be based on an actual implemented destination. At the time of this survey, `/admin` was not in `src/app`; do not reintroduce redirects to nonexistent routes without adding/confirming that route.
- Error handling differs in a few places. Prefer the shared `getErrorMessage` helper for new Axios failures, while preserving an established local contract where callers depend on it.

## Validation Commands

- `npm run lint`: runs ESLint for the frontend.
- `npm run build`: runs the production Next.js compile, TypeScript validation, and prerendering.
- No frontend test script is currently defined in `package.json`. If behavior tests are added, use the repository's chosen test tooling rather than inventing a command.
- Editor diagnostics are useful but do not replace lint/build for changes that cross provider, component, or route boundaries.

## Next.js References

Installed docs are under `node_modules/next/dist/docs/`; consult the relevant guide for the current Next.js version before implementing unfamiliar APIs. Useful references include:

- `01-app/03-api-reference/01-directives/use-client.md` for client boundaries.
- `01-app/03-api-reference/04-functions/use-router.md` for App Router navigation.
- `01-app/03-api-reference/04-functions/generate-metadata.md` for metadata exports and server-only requirements.
- `01-app/03-api-reference/03-file-conventions/01-metadata/app-icons.md` for `icon.png` and favicon conventions.