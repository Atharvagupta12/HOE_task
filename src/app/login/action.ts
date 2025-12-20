"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect("/login?error=missing");
  }

  const users = (await db()).collection("users");
  const user = await users.findOne({ email });

  if (!user) {
    redirect("/login?error=invalid");
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    redirect("/login?error=invalid");
  }

  const token = signJWT({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  });

  //  fixed now
(await cookies()).set("cc_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/dashboard");
}
