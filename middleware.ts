import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("cc_token")?.value;

  // Routes that require authentication
  const protectedRoutes = ["/dashboard", "/programs", "/checkins"];

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!isProtected) return NextResponse.next();

  // If no token → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Must verify JWT **inside middleware only**
    jwt.verify(token, SECRET);
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed in middleware:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/programs/:path*", "/checkins/:path*"],
};
