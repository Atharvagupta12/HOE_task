import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signJWT } from "@/lib/jwt";

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "MENTOR", "LEARNER"]).default("MENTOR"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = RegisterSchema.parse(body);

    const users = (await db()).collection("users");

    // Already exists?
    const existing = await users.findOne({ email: data.email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashed = await bcrypt.hash(data.password, 10);

    // Insert user
    const result = await users.insertOne({
      name: data.name,
      email: data.email,
      passwordHash: hashed,
      role: data.role,
      createdAt: new Date(),
    });

    // Generate JWT for auto-login
    const token = signJWT({
      id: result.insertedId.toString(),
      name: data.name,
      email: data.email,
      role: data.role,
    });

    // Redirect to home page 
    const res = NextResponse.redirect(new URL("/", req.url));

    // Set cookie
    res.cookies.set("cc_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
