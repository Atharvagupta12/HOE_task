"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "LEARNER";

  if (!name || !email || !password) {
    redirect("/register?error=missing");
  }

  const users = (await db()).collection("users");

  const existing = await users.findOne({ email });
  if (existing) {
    redirect("/register?error=exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await users.insertOne({
    name,
    email,
    passwordHash,
    role,
    createdAt: new Date(),
  });

  redirect("/login?registered=1");
}
