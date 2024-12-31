import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // console.log('middleware');
  const url = request.nextUrl.clone();
  const token = request.cookies.get("session_token")?.value;

  const isAdminPath = url.pathname.startsWith("/admin");
  const isUserPath = url.pathname.startsWith("/user");

  // Avoid redirect loop for login pages
  const isAdminLoginPage = url.pathname === "/admin/login";
  const isUserLoginPage = url.pathname === "/user/login";

  if (!token) {
    if (isAdminPath && !isAdminLoginPage) {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    if (isUserPath && !isUserLoginPage) {
      url.pathname = "/user/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next(); // Allow login pages to load without token
  }

  // Redirect logged-in users away from login pages
  // if ((isAdminPath && isAdminLoginPage) || (isUserPath && isUserLoginPage)) {
  //   url.pathname = isAdminPath ? "/admin/dashboard" : "/user/dashboard";
  //   return NextResponse.redirect(url);
  // }

  if (isAdminPath && isAdminLoginPage) {
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Matcher configuration
export const config = {
  matcher: ['/:path*'],
};
