import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/verify-email",

  // Development routes
  "/chat",
  "/research",
  "/code",
  "/documents",
  "/projects",
  "/calendar",
  "/tasks",
  "/settings",
  "/ai-studio",
  "/notifications",
  "/team",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore Next.js internal files and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("astra-token")?.value;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // Protect routes that are not public
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};