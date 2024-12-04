import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("session_token")?.value;

  const isAdminPath = url.pathname.startsWith("/admin");
  const isUserPath = url.pathname.startsWith("/user");

  if (!token) {
    // Redirect to appropriate login page
    url.pathname = isAdminPath ? "/admin/login" : "/user/login";
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users away from login pages
  if ((isAdminPath && url.pathname === "/admin/login") || (isUserPath && url.pathname === "/user/login")) {
    url.pathname = isAdminPath ? "/admin/dashboard" : "/user/dashboard";
    return NextResponse.redirect(url);
  }

  // Proceed with the request
  return NextResponse.next();
}

// Matcher configuration
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};