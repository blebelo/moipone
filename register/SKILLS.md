# TanStack Page to Next.js Login Page

## Purpose

Use these learnings when converting a TanStack Router login page into the standard login-page pattern represented by the supplied `Authentication` component. Preserve the existing authentication behavior and application design system while adapting routing and component boundaries to this repository's Next.js App Router.

## Repository Facts To Verify

- This project uses Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, and the `src/app` route tree.
- The installed Next.js documentation is under `node_modules/next/dist/docs/`. Read the relevant guide before using unfamiliar or version-sensitive Next APIs. The current guidance is in `01-app/03-api-reference/01-directives/use-client.md` and `01-app/03-api-reference/04-functions/use-router.md`.
- The project's semantic Tailwind colors include `background`, `foreground`, `surface`, `card`, `primary`, `muted`, `destructive`, `border`, `input`, and `ring`; see `src/app/globals.css`. Prefer these existing tokens over copying unregistered classes such as `bg-surface-container-lowest`, `text-error`, or project-specific margin/font tokens from another design system.
- The root layout mounts `AuthProvider` around the attendance, visitor, and visit providers. Any page calling `useAuthState` or `useAuthActions` must remain beneath that boundary.
- The staff login is available at `/login`; `/admin/login` is retained as a compatible path. The successful sign-in destination is `/admin`, which must exist before the complete admin flow can work.
- The auth contract in `src/providers/AuthProvider/context.ts` currently exports `IUser`, not `ILogin`. `IUser` has `userNameOrEmailAddress`, `password`, and optional `rememberClient` fields.
- `IAuthStateContext` currently has `isPending`, `isSuccess`, `isError`, and optional `currentUser`; it does not expose an `error` string. `authenticate()` rejects with an `Error` containing the provider's message, so display the caught error rather than accessing a nonexistent `authState.error` field.
- The supplied example references `userCredentials` and `ILogin`, but neither identifier is present in the current `src` tree. Check the live exports before importing them; otherwise define a correctly typed local initial value using `IUser`.
- Existing fonts are Manrope for display and Public Sans for body text, configured in `src/app/layout.tsx`. Keep the established font and design language unless the task explicitly asks to redesign it.

## Conversion Workflow

1. Identify the TanStack route, its parent layout/provider setup, auth mutation, destination after successful sign-in, and existing visual tokens. Translate the URL to the matching `src/app/.../page.tsx` path; do not assume a route exists just because the destination is referenced in code.
2. Keep the page or form as a Server Component by default. Add `'use client'` at the very top only when the component itself uses state, event handlers, context hooks, browser APIs, or client-side navigation. A Client Component can be imported by a Server Component, so avoid marking a whole layout client-side unnecessarily.
3. Adapt TanStack navigation to `next/navigation` only when imperative navigation is needed, such as after successful authentication. `useRouter` requires a Client Component. Prefer `<Link>` for ordinary user-clickable navigation.
4. Connect the form to the existing auth provider/action rather than duplicating network requests, token decoding, or persistence logic in the page. Check the provider is mounted and use the exact types and state shape it exports.
5. Keep form state controlled and typed. Build a request payload from validated values, trim the username/email, and preserve the password exactly as entered. Honor the `rememberClient` field if the UI exposes it; do not silently hardcode a value that conflicts with the intended behavior.
6. Validate required fields before submitting. Derive the submit decision from the next error values, not from asynchronous React state updates. Clear the relevant field error when the user edits that field, and clear the form-level server error when the user starts correcting input.
7. Prevent duplicate requests while authentication is pending. Disable inputs and submit/toggle controls, expose a visible loading state, and restore controls when the request finishes.
8. Catch authentication failures and show a useful form-level error. Avoid showing raw internal or sensitive server details unless the provider deliberately presents them as user-facing messages.
9. Keep password visibility as a separate `type="button"` control, with an accessible name that changes between “Show password” and “Hide password”. Use an installed icon package consistent with the surrounding UI and hide decorative icons from assistive technology.
10. Preserve semantic form behavior: use a real `<form onSubmit>`, submit button, associated labels, `autoComplete="username"` / `autoComplete="current-password"`, and `preventDefault()` when handling submission in React. Use the React event type supported by the installed React types.
11. Associate inline validation messages with their inputs using stable IDs, `aria-invalid`, and conditional `aria-describedby`. Announce a form-level authentication failure with `role="alert"`.
12. Match the surrounding application styling and responsive behavior. Reuse CSS variables/Tailwind semantic tokens from `globals.css`; do not copy incompatible utility names or introduce an unrelated visual system.

## Reference Interaction Pattern

- Initialize form state once from a typed credential object and keep a separate typed error map, password visibility boolean, and form-level authentication error.
- On submit: prevent the browser navigation, validate, return early on invalid input, clear the prior server error, submit a normalized payload, then navigate to the intended protected route only after the auth action resolves.
- On rejection: render the caught `Error.message`, falling back to a generic user-facing message for unknown thrown values.
- On field change: update only that field, clear the global auth error, and clear that field's validation message if present.
- During pending auth: disable form controls and show a spinner or equivalent progress indicator while retaining an accessible button name.

## Review Checklist

- The route path matches the intended URL and the destination route exists.
- Every auth hook is below the correct provider.
- Imports match real exports (`IUser` versus `ILogin`, credential constants, icon package, and hooks).
- No unsupported auth-state fields are read; provider errors are handled through the action's rejection contract.
- The form supports keyboard submission, visible labels, field-level errors, and accessible status/error announcements.
- Password visibility does not submit the form, and pending state prevents duplicate submission.
- The UI uses the project's defined color/font tokens and works at mobile and desktop widths.
- Run `npm run lint` and `npm run build` after implementation; this repository currently defines no dedicated test script in `package.json`.

## Next.js References

- `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md`: place `'use client'` before imports; use it only at the client boundary that needs interactivity.
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-router.md`: use `useRouter` from `next/navigation` in Client Components and prefer `<Link>` when navigation is simply a link.