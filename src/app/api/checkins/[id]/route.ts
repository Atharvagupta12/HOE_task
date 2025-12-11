import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const UpdateSchema = z.object({
  mood: z.number().min(1).max(5),
  progress: z.string(),
  blockers: z.string(),
  plan: z.string(),
});

export async function PUT(req: Request, { params }: any) {
  const user = await requireAuth();
  const body = UpdateSchema.parse(await req.json());

  const id = new ObjectId(params.id);

  const existing = await (await db()).collection("checkins").findOne({ _id: id });

  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Users can edit only their own check-ins
  if (existing.userId !== user.id && user.role === "LEARNER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await (await db()).collection("checkins").updateOne(
    { _id: id },
    {
      $set: {
        ...body,
      },
    }
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(_: any, { params }: any) {
  const user = await requireAuth();
  const id = new ObjectId(params.id);

  const existing = await (await db()).collection("checkins").findOne({ _id: id });

  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (existing.userId !== user.id && user.role === "LEARNER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await (await db()).collection("checkins").deleteOne({ _id: id });

  return NextResponse.json({ ok: true });
}
