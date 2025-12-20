"use server";

import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProgramSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  startDate: z.string(),
  endDate: z.string(),
});

export async function createProgram(formData: FormData) {
  // 1. Auth (server-only)
  const user = requireRole(["ADMIN", "MENTOR"]);

  // 2. Validation
  const data = ProgramSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  });

  // 3. DB write
  await (await db()).collection("programs").insertOne({
    ...data,
    ownerId: user.id,
    createdAt: new Date(),
  });

  // 4. UI sync + navigation
  revalidatePath("/programs");
  redirect("/programs");
}
