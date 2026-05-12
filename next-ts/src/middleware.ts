import { NextRequest, NextResponse } from "next/server";

type SubdomainRoute = {
  hostPrefix: string;
  rootPath: string;
  scopedPaths: string[];
  rewriteMode: "prefix" | "root-only";
};

const SUBDOMAIN_ROUTES: SubdomainRoute[] = [
  {
    hostPrefix: "admin.",
    rootPath: "/admin",
    scopedPaths: ["/admin"],
    rewriteMode: "prefix",
  },
  {
    hostPrefix: "student.",
    rootPath: "/student",
    scopedPaths: ["/student", "/withdraw"],
    rewriteMode: "root-only",
  },
];

const STATIC_PATH_PREFIXES = ["/_next", "/images", "/favicon.ico"];

const isStaticPath = (pathname: string) =>
  STATIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

const isWithinScopedPath = (pathname: string, scopedPath: string) =>
  pathname === scopedPath || pathname.startsWith(`${scopedPath}/`);

const isWithinAnyScopedPath = (pathname: string, scopedPaths: string[]) =>
  scopedPaths.some((scopedPath) => isWithinScopedPath(pathname, scopedPath));

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase();
  const url = request.nextUrl.clone();

  const hostRoute = SUBDOMAIN_ROUTES.find(({ hostPrefix }) =>
    host.startsWith(hostPrefix),
  );
  const scopedPathRoute = SUBDOMAIN_ROUTES.find(({ scopedPaths }) =>
    isWithinAnyScopedPath(url.pathname, scopedPaths),
  );

  if (
    scopedPathRoute &&
    hostRoute?.hostPrefix !== scopedPathRoute.hostPrefix
  ) {
    url.pathname = "/404";
    return NextResponse.rewrite(url);
  }

  if (hostRoute) {
    if (
      !isWithinAnyScopedPath(url.pathname, hostRoute.scopedPaths) &&
      !isStaticPath(url.pathname)
    ) {
      url.pathname =
        hostRoute.rewriteMode === "prefix"
          ? `${hostRoute.rootPath}${url.pathname}`
          : hostRoute.rootPath;
    }

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
