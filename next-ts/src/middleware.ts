import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  const isAdminHost = host.startsWith("admin.");
  const isAdminPath = url.pathname.startsWith("/admin");

  if (!isAdminHost && isAdminPath) {
    url.pathname = "/404";
    return NextResponse.rewrite(url);
  }

  if (isAdminHost) {
    if (
      !isAdminPath &&
      !url.pathname.startsWith("/_next") &&
      !url.pathname.startsWith("/images") &&
      !url.pathname.startsWith("/favicon.ico")
    ) {
      url.pathname = `/admin${url.pathname}`;
    }

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};