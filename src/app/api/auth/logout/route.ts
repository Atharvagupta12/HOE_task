import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "https://hoe-task.vercel.app/"));

  res.cookies.set("cc_token", "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}