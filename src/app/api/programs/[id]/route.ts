import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { requireRole } from "@/lib/auth";
import { z } from "zod";

const ProgramSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  startDate: z.string(),
  endDate: z.string(),
});

export async function GET(_: any, { params }: any) {
  const program = await (await db())
    .collection("programs")
    .findOne({ _id: new ObjectId(params.id) });

  if (!program)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(program);
}

export async function PUT(req: Request, { params }: any) {
  const user = requireRole(["ADMIN", "MENTOR"]);
  const body = await req.json();
  const data = ProgramSchema.parse(body);

  await (await db()).collection("programs").updateOne(
    { _id: new ObjectId(params.id) },
    {
      $set: {
        ...data,
      },
    }
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(_: any, { params }: any) {
  const user = requireRole(["ADMIN", "MENTOR"]);

  await (await db())
    .collection("programs")
    .deleteOne({ _id: new ObjectId(params.id) });

  return NextResponse.json({ ok: true });
}
