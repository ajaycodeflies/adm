import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const userToken = request.cookies.get("user_session_token")?.value;
  const adminToken = request.cookies.get("admin_session_token")?.value;

  const isAdminPath = url.pathname.startsWith("/admin");
  const isUserPath = url.pathname.startsWith("/user");

  const isAdminLoginPage = url.pathname === "/admin/login";
  const isUserLoginPage = url.pathname === "/user/login";

  // No tokens — redirect to respective login pages
  if (!userToken && isUserPath && !isUserLoginPage) {
    url.pathname = "/user/login";
    return NextResponse.redirect(url);
  }

  if (!adminToken && isAdminPath && !isAdminLoginPage) {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Logged-in user visiting /user/login -> redirect to user dashboard
  if (userToken && isUserLoginPage) {
    url.pathname = "/user/dashboard";
    return NextResponse.redirect(url);
  }

  // Logged-in admin visiting /admin/login -> redirect to admin dashboard
  if (adminToken && isAdminLoginPage) {
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
