import Cookies from "js-cookie";
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  const token = request.cookies.get("accessToken")?.value;

  const PUBLIC_ROUTES = ["/login", "/signup"];
  const PROTECTED_ROUTES = [/^\/admin/, /^\/moviedetail/, /^\/roleBase/];
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAdminRoute = PROTECTED_ROUTES.some((r) => r.test(pathname));

  if (token && isAdminRoute) {
    const res = NextResponse.next();
    res.cookies.set("last_admin_route", pathname + url.search, {
      path: "/",
      httpOnly: true,
    });
    return res;
  }

  if (token && isPublicRoute) {
    const lastRoute = request.cookies.get("last_admin_route")?.value;

    if (lastRoute) {
      const backUrl = new URL(lastRoute, request.url);
      backUrl.searchParams.set("reason", "logout-required");
      return NextResponse.redirect(backUrl);
    }
  }

  if (!token && isAdminRoute) {
    const lastRoute = pathname + url.search;

    const response = NextResponse.redirect(
      new URL("/login?reason=login-required", request.url),
    );

    response.cookies.set("last_user_route", lastRoute, {
      path: "/",
      httpOnly: false,
    });

    return response;
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/admin/:path*",
    "/moviedetail/:path*",
    "/roleBase/:path*",
    "/login",
    "/signup",
  ],
};
