import { NextRequest, NextResponse } from "next/server";

// Define route patterns
const publicPaths = ["/auth/login", "/auth/signup"];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const protectedPaths = ["/dashboard", "/profile", "/settings", "/auth/verify-email", "/auth/logout"];
const adminPaths = ["/admin"];

// Paths that should skip middleware processing
const skipPaths = ["/api", "/_next", "/static", "/favicon.ico"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for API routes and static assets
  if (skipPaths.some(skipPath => path.startsWith(skipPath))) {
    return NextResponse.next();
  }

  const isPublicPath = publicPaths.some(publicPath => path === publicPath);
  const isAdminPath = adminPaths.some(adminPath => path.startsWith(adminPath));

  const token = request.cookies.get("token")?.value || "";
  const isAdmin = request.cookies.get("admin")?.value === "admin";

  // Handle public routes
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  // Handle protected routes
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  // Handle admin routes
  if (isAdminPath) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
  }

  return NextResponse.next();
}