export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";

export default async function ProgramsPage() {
  const programs = await (await db())
    .collection("programs")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const user = await getAuthUser();
  const isMentor = user?.role === "MENTOR" || user?.role === "ADMIN";

  return (
    <div className="cc-container py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Programs</h1>
          <p className="text-slate-400 text-sm">
            Manage training programs under House of EdTech.
          </p>
        </div>

        {isMentor && (
          <Link href="/programs/new" className="cc-btn-primary">
            + Create Program
          </Link>
        )}
      </div>

      {programs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program: any) => (
            <Link
              key={program._id}
              href={`/programs/${program._id}`}
              className="cc-card p-4 hover:border-emerald-500/40 hover:bg-slate-900/60 transition"
            >
              <h3 className="text-sm font-semibold text-slate-200">
                {program.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {program.description}
              </p>

              <p className="mt-3 text-[11px] text-slate-500">
                {new Date(program.startDate).toLocaleDateString()} →{" "}
                {new Date(program.endDate).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-slate-500 text-sm max-w-sm text-center leading-relaxed">
        No programs created yet.  
        {""}
        <span className="text-slate-300">
          Once you create one, it will appear here.
        </span>
      </div>
    </div>
  );
}
