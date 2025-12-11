import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/jwt";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password } = LoginSchema.parse(body);

  const users = (await db()).collection("users");
  const user = await users.findOne({ email });

  if (!user)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signJWT({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("cc_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
