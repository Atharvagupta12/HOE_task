"use server";

import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { requireAuth } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CheckinSchema = z.object({
  programId: z.string(),
  mood: z.coerce.number().min(1).max(5),
  progress: z.string().min(5),
  blockers: z.string().min(5),
  plan: z.string().min(5),
});

const UpdateSchema = z.object({
  checkinId: z.string(),
  mood: z.coerce.number().min(1).max(5),
  progress: z.string().min(5),
  blockers: z.string().min(5),
  plan: z.string().min(5),
  programId: z.string(),
});

export async function updateCheckin(formData: FormData) {
  const user = requireAuth();

  const data = UpdateSchema.parse({
    checkinId: formData.get("checkinId"),
    programId: formData.get("programId"),
    mood: formData.get("mood"),
    progress: formData.get("progress"),
    blockers: formData.get("blockers"),
    plan: formData.get("plan"),
  });

  await (await db()).collection("checkins").updateOne(
    {
      _id: new ObjectId(data.checkinId),
      userId: (await user).id,
    },
    {
      $set: {
        mood: data.mood,
        progress: data.progress,
        blockers: data.blockers,
        plan: data.plan,
      },
    }
  );

  revalidatePath(`/programs/${data.programId}`);
}

export async function deleteCheckin(formData: FormData) {
  const user = requireAuth();

  const checkinId = formData.get("checkinId") as string;
  const programId = formData.get("programId") as string;

  if (!checkinId || !programId) {
    throw new Error("Missing data");
  }

  await (await db()).collection("checkins").deleteOne({
    _id: new ObjectId(checkinId),
    userId: (await user).id,
  });

  revalidatePath(`/programs/${programId}`);
}

export async function createCheckin(formData: FormData) {
  //  Auth (server-only)
  const user = requireRole(["LEARNER"]);

  //  Validation
  const data = CheckinSchema.parse({
    programId: formData.get("programId"),
    mood: formData.get("mood"),
    progress: formData.get("progress"),
    blockers: formData.get("blockers"),
    plan: formData.get("plan"),
  });

  //  DB write
  await (await db()).collection("checkins").insertOne({
    ...data,
    userId: (await user).id,
    createdAt: new Date(),
  });

  //  UI refresh
  revalidatePath(`/programs/${data.programId}`);
}
