# Moipone Admin Bug Report
 
Repo: `github.com/blebelo/moipone` · Frontend: `next-ts/` · Date: 2026-06-04
 
---
 
## Critical
 
### BUG-01 — Token read from wrong storage; all authenticated API calls have no auth header
 
**File:** `src/lib/utils/axiosInstance.ts`
 
The token is written to `localStorage` in the auth provider but `axiosInstance` reads from `sessionStorage`. `sessionStorage` never receives the `"token"` key, so `token` is always `null` and every API call goes out with no `Authorization` header.
 
```ts
// auth-provider/index.tsx
localStorage.setItem("token", token);        // ← stored here
 
// axiosInstance.ts
sessionStorage.getItem("token")              // ← reads the wrong store, always null
```
 
**Fix:**
```diff
- ? sessionStorage.getItem("token")
+ ? localStorage.getItem("token")
```
 
---
 
### BUG-02 — Dashboard pages don't exist; login redirect always hits a 404
 
**File:** `app/(dashboard)/admin/page.tsx` + missing dashboard routes
 
`authenticate()` is called with no `redirectPath`, so the auth provider defaults to `router.push('/admin/dashboard')`. The page at that path (`app/admin/dashboard/page.tsx` or equivalent) does not exist in the repository. After a successful login the user lands on a blank 404 page every time.
 
Pages missing that `constants.tsx` and the auth provider already reference:
 
| Route | File needed |
|---|---|
| `/admin/dashboard` | `app/admin/(workspace)/dashboard/page.tsx` |
| `/admin/courses` | `app/admin/(workspace)/courses/page.tsx` |
| `/admin/students` | `app/admin/(workspace)/students/page.tsx` |
| `/admin/applications` | `app/admin/(workspace)/applications/page.tsx` |
| `/admin/settings` | `app/admin/(workspace)/settings/page.tsx` |
 
---
 
## High
 
### BUG-03 — No auth guard on workspace routes; dashboard is publicly accessible once built
 
**File:** `app/(dashboard)/admin/layout.tsx`
 
There is no `AuthGuard` component, no middleware route check, and no HOC protecting authenticated routes. Once the dashboard pages exist (BUG-02), any unauthenticated user who navigates directly to `/admin/dashboard` will see them without logging in. `AuthProvider` is present but nothing consumes `currentUser` to enforce a redirect.
 
**Fix:** Create `src/components/AuthGuard/index.tsx`:
 
```tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from '@/src/providers/auth-provider';
 
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { currentUser, isPending } = useAuthState();
  const router = useRouter();
 
  useEffect(() => {
    if (!isPending && !currentUser) router.replace('/admin');
  }, [currentUser, isPending, router]);
 
  if (!currentUser) return null;
  return <>{children}</>;
}
```
 
Wrap workspace layout with it (see BUG-05 for the layout refactor).
 
---
 
### BUG-04 — No redirect-if-authenticated on login page; logged-in users see the login form
 
**File:** `app/(dashboard)/admin/page.tsx`
 
When a user is already authenticated and visits `/admin`, the login form renders normally. There is no check for an existing session that would send them to `/admin/dashboard` instead. Combined with BUG-02, this also means a user who refreshes after a successful login lands back on the login page.
 
**Fix:** Add a client-side redirect in the login page or its layout:
 
```tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from '@/src/providers/auth-provider';
 
export function useRedirectIfAuthenticated() {
  const { currentUser } = useAuthState();
  const router = useRouter();
  useEffect(() => {
    if (currentUser) router.replace('/admin/dashboard');
  }, [currentUser, router]);
}
```
 
---
 
## Medium
 
### BUG-05 — `(dashboard)` route group wraps one folder and provides no benefit
 
**Files:** `app/(dashboard)/` directory
 
The `(dashboard)` route group contains only `admin/` and has no `layout.tsx` at the group level. Route groups exist to share layouts across sibling URL segments or to organise code; here it does neither. The name is also misleading — it sounds like it scopes the dashboard pages, but the actual dashboard doesn't exist yet. This creates the confusing path `app/(dashboard)/admin/` where both the group and its child need to be navigated to find any file.
 
**Fix:** Remove `(dashboard)/` and move `admin/` directly under `app/`. Split into `(auth)/` and `(workspace)/` route groups inside `admin/` to give login and dashboard separate layouts:
 
```
app/
  admin/
    (auth)/        ← login page only — bare layout
      layout.tsx
      page.tsx     ← /admin
      style.ts
    (workspace)/   ← authenticated pages — shell + auth guard
      layout.tsx
      dashboard/page.tsx
      courses/page.tsx
      ...
  (public)/
  (student)/
```
 
---
 
### BUG-06 — Login page loads all five data providers unnecessarily
 
**File:** `app/(dashboard)/admin/layout.tsx`
 
`AdminRootLayout` wraps every page — including the login form — with `AuthProvider`, `StudentProvider`, `CourseProvider`, `ApplicationProvider`, and `ContactProvider`. The login page needs only `AuthProvider`. The four data providers each initialise their own state and may trigger API calls or setup work on a page that has no use for them.
 
**Fix:** After the BUG-05 restructure, `(auth)/layout.tsx` should contain only `AuthProvider`. Data providers belong exclusively in `(workspace)/layout.tsx`.
 
---
 
### BUG-07 — Middleware rewrites cross-host violations to `/404`, a path with no page
 
**File:** `src/middleware.ts` line ~37
 
```ts
url.pathname = "/404";
return NextResponse.rewrite(url);
```
 
When a scoped path is accessed from the wrong host (e.g. hitting a `/student` URL from `admin.moiponeacademy.org`), the middleware rewrites to `/404`. But `app/404/page.tsx` does not exist. Next.js's custom 404 lives at `app/not-found.tsx` and is triggered by `notFound()` or an unmatched route — not by a URL path. The rewrite silently falls through to Next.js's built-in 404, bypassing the custom `NotFoundPage` component entirely.
 
**Fix:** Replace the pathname rewrite with Next.js's built-in mechanism:
 
```ts
import { notFound } from 'next/navigation';
 
// instead of:
url.pathname = "/404";
return NextResponse.rewrite(url);
 
// use:
return NextResponse.rewrite(new URL('/not-found', request.url));
```
 
Or add an actual `app/404/page.tsx` that renders the same `NotFoundPage` component.
 
---
 
### BUG-08 — Auth cookie is set on login but never read anywhere
 
**File:** `src/providers/auth-provider/index.tsx`
 
```ts
document.cookie = `token=${token}; path=/; secure; samesite=strict`;
```
 
This cookie is set on every successful login, but nothing in the codebase reads it. `axiosInstance` reads from `sessionStorage` (currently broken) or `localStorage` (after the BUG-01 fix). The middleware does not check for it. No server component or route handler references it. The line is dead code today, and the `secure` flag means it won't even be set in a non-HTTPS local development environment.
 
**Fix:** Either remove the line entirely, or replace it with a server-side `httpOnly` cookie set via an API route if cookie-based auth is a future goal.
 
---
 
### BUG-09 — `logout()` uses an implicit root redirect that depends on middleware behaviour
 
**File:** `src/providers/auth-provider/index.tsx`
 
```ts
router.push('/');
```
 
On `admin.moiponeacademy.org`, pushing `/` works only because the middleware rewrites it to `/admin/`, which then resolves to the login page. This is an implicit dependency on middleware internals. If the middleware rewrite rules change, logout silently stops redirecting to the login page with no error — it would land on the public site's root instead.
 
**Fix:**
```diff
- router.push('/')
+ router.push('/admin')
```
 
---
 
## Low
 
### BUG-10 — `sessionStorage` cleared on tab close causes stale UI state on re-open
 
**File:** `src/providers/auth-provider/index.tsx`
 
`role`, `Id`, and `userName` are written to `sessionStorage`, which is cleared when the tab closes. On re-open, the `localStorage` token is still valid and the `useEffect` recovery path decodes the JWT to rebuild `currentUser`. However, any code that reads `sessionStorage.getItem("role")` or `sessionStorage.getItem("Id")` directly (outside the React state) will return `null` after a tab re-open even though the user is authenticated. This creates a window between mount and the `useEffect` running where these values are inconsistently unavailable.
 
**Fix:** Derive role/Id/userName exclusively from the decoded JWT inside the auth provider state rather than ever reading `sessionStorage` keys outside of it.
 
---
 
### BUG-11 — No axios interceptor for 401; expired tokens never trigger logout
 
**File:** `src/lib/utils/axiosInstance.ts`
 
There is no response interceptor on the axios instance. When the JWT expires, API calls return `401 Unauthorized` silently. The UI stays in an "authenticated" state (token still in `localStorage`, `currentUser` still in context) while every data request fails. The user is never logged out and sees no meaningful error.
 
**Fix:** Add a response interceptor:
 
```ts
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      sessionStorage.clear();
      window.location.replace('/admin');
    }
    return Promise.reject(err);
  }
);
```
 
---
 
### BUG-12 — `axiosInstance` captures token at call time, not at request time
 
**File:** `src/lib/utils/axiosInstance.ts`
 
`axiosInstance()` reads the token once when the function is called and bakes it into the `axios.create()` defaults. If a provider calls `axiosInstance()` during initialisation (before the auth `useEffect` runs and sets the token), all requests from that instance will have no auth header even after the user is authenticated in state.
 
**Fix:** Read the token inside a request interceptor instead, so it is resolved freshly on every request:
 
```ts
const instance = axios.create({ baseURL });
 
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```
 
---
 
*12 bugs total — 2 critical, 2 high, 5 medium, 3 low.*