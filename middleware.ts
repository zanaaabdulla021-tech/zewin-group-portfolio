import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Skip the login page itself
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check session cookie
  const session = req.cookies.get("admin_session")?.value;
  if (session === process.env.ADMIN_SECRET || session === "kurdcod_admin_2025") {
    return NextResponse.next();
  }

  // Redirect to login
  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
