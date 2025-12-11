import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECRET = process.env.JWT_SECRET!;

// Edge-safe base64url decoder
function base64UrlToUint8Array(base64Url: string) {
  base64Url = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64Url.length % 4;
  if (pad) base64Url += "=".repeat(4 - pad);
  const binary = Array.from(atob(base64Url), (c) => c.charCodeAt(0));
  return new Uint8Array(binary);
}

async function verifyJWT(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [header, payload, signature] = parts;
    const data = `${header}.${payload}`;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const signatureBytes = base64UrlToUint8Array(signature);

    const ok = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      new TextEncoder().encode(data)
    );

    return ok;
  } catch (e) {
    console.error("JWT verify failed:", e);
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("cc_token")?.value;

  const protectedRoutes = ["/dashboard", "/programs", "/checkins"];
  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!isProtected) return NextResponse.next();
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  const valid = await verifyJWT(token);
  if (!valid) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/programs/:path*", "/checkins/:path*"],
};
