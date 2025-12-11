import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { z } from "zod";

const ProgramSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  startDate: z.string(),
  endDate: z.string(),
});

export async function GET() {
  const programs = await (await db())
    .collection("programs")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(programs);
}

export async function POST(req: Request) {
  try {
    const user = await requireRole(["ADMIN", "MENTOR"]);
    const body = await req.json();

    const data = ProgramSchema.parse(body);

    await (await db()).collection("programs").insertOne({
      ...data,
      ownerId: user.id,
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: any) {
    console.error("PROGRAM CREATE ERROR", err);

    let status = 500;
    let message = "Something went wrong while creating the program.";

    if (err?.message === "UNAUTHORIZED") {
      status = 401;
      message = "You must be signed in as a mentor/admin.";
    } else if (err?.message === "FORBIDDEN") {
      status = 403;
      message = "You don't have permission to create programs.";
    } else if (err?.name === "ZodError") {
      status = 400;
      message = "Invalid program data. Please check the form fields.";
    }

    return NextResponse.json({ error: message }, { status });
  }
}