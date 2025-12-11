import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./src/lib/jwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("cc_token")?.value;

  const protectedRoutes = [
    "/dashboard",
    "/programs",
    "/checkins",
  ];

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!isProtected) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const valid = verifyJWT(token);
  if (!valid) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/programs/:path*", "/checkins/:path*"],
};
