import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  if (!host.startsWith("admin.") && url.pathname.startsWith("/admin")) {
    url.pathname = "/404";
    return NextResponse.rewrite(url);
  }

  if (host.startsWith("admin.")) {
    const token = request.cookies.get("token")?.value || 
                  request.headers.get("authorization");

    if (
      !url.pathname.startsWith("/admin") &&
      !url.pathname.startsWith("/images")
    ) {
      url.pathname = `/admin${url.pathname}`;
    }

    if (!token && !url.pathname.startsWith("/admin/login")) {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};