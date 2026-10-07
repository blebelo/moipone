'use client';
import { Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { type SubmitEvent, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { IUser } from "@/providers/AuthProvider/context";
import { useAuthActions, useAuthState } from "@/providers/AuthProvider";

const LoginPage = () => {
  const router = useRouter();
  const authState = useAuthState();
  const { authenticate } = useAuthActions();
  const [formData, setFormData] = useState<IUser>({
    userNameOrEmailAddress: "",
    password: "",
    rememberClient: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authState.currentUser) {
      router.replace("/dashboard");
    }
  }, [authState.currentUser, router]);

  const authenticateUser = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authState.isPending) return;

    setError(null);
    if (!formData.userNameOrEmailAddress.trim() || !formData.password) {
      setError("Enter your email/username and password.");
      return;
    }
    try {
      await authenticate({
        ...formData,
        userNameOrEmailAddress: formData.userNameOrEmailAddress.trim(),
      });
      router.replace("/dashboard");
    } catch (cause) {
      setError(
        cause instanceof Error && cause.message
          ? cause.message
          : "Sign in failed. Please check your details and try again.",
      );
    } 
  }

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center text-center">
            <Image
              src="/moipone-logo.png"
              alt="Moipone Academy, Learn and Teach"
              width={598}
              height={302}
              priority
              className="h-20 w-auto object-contain"
            />

            <h1 className="mt-6 font-display text-2xl font-extrabold tracking-tight">
              Staff sign in
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage Registers & Generate Reports
            </p>
          </div>

          <form
            onSubmit={authenticateUser}
            noValidate
            className="space-y-4 rounded-lg border bg-card p-5 shadow-sm sm:p-6"
          >
            {error && (
              <div
                role="alert"
                className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              >
                <p className="font-semibold">Sign in failed</p>
                <p className="mt-1">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="identifier"
                className="text-sm font-medium leading-none"
              >
                Email or username
              </label>
              <input
                id="identifier"
                name="identifier"
                autoComplete="username"
                value={formData.userNameOrEmailAddress}
                onChange={(event) => {
                  setFormData((current) => ({
                    ...current,
                    userNameOrEmailAddress: event.target.value,
                  }));
                  setError(null);
                }}
                disabled={authState.isPending}
                aria-invalid={Boolean(error)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.password}
                  onChange={(event) => {
                    setFormData((current) => ({
                      ...current,
                      password: event.target.value,
                    }));
                    setError(null);
                  }}
                  disabled={authState.isPending}
                  aria-invalid={Boolean(error)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={authState.isPending}
                  className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" className="size-4" />
                  ) : (
                    <Eye aria-hidden="true" className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex min-h-14 items-center gap-3 text-left text-sm font-medium leading-none text-foreground">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberClient ?? false}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    rememberClient: event.target.checked,
                  }))
                }
                disabled={authState.isPending}
                className="size-4 accent-primary disabled:cursor-not-allowed"
              />
              <span>Remember me</span>
            </label>

            <button
              type="submit"
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              disabled={authState.isPending}
            >
              {authState.isPending ? (
                <>
                  <Loader2
                    aria-hidden="true"
                    className="size-4 animate-spin"
                  />
                  Signing in...
                </>
              ) : (
                <>
                  <LockKeyhole aria-hidden="true" className="size-4" />
                  Sign in
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Admin access only. Visitors do not need an account —{" "}
            <Link
              href="/"
              className="underline underline-offset-2 hover:text-foreground"
            >
              go to check-in
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;