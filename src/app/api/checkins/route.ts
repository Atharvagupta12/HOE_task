import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const CheckinSchema = z.object({
  programId: z.string(),
  mood: z.number().min(1).max(5),
  progress: z.string().min(3),
  blockers: z.string().min(3),
  plan: z.string().min(3),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const programId = searchParams.get("programId");

  if (!programId)
    return NextResponse.json({ error: "programId required" }, { status: 400 });

  const checkins = await (await db())
    .collection("checkins")
    .find({ programId })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(checkins);
}

export async function POST(req: Request) {
  const user = await requireAuth(); // learners & mentors both allowed
  const body = await req.json();

  const data = CheckinSchema.parse(body);

  await (await db()).collection("checkins").insertOne({
    ...data,
    userId: user.id,
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
