import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getAuthUser } from "@/lib/auth";
import CheckinForm from "./checkin-form";
import CheckinList from "./checkin-list";
import StatsBlock from "./stats-block";


export const dynamic = "force-dynamic";

export default async function ProgramDetailPage({ params }: any) {
  const program = await (await db())
    .collection("programs")
    .findOne({ _id: new ObjectId(params.id) });

  if (!program)
    return (
      <div className="cc-container py-10">
        <p className="text-slate-400">Program not found.</p>
      </div>
    );

  const checkins = await (await db())
    .collection("checkins")
    .find({ programId: params.id })
    .sort({ createdAt: -1 })
    .toArray();

  const user = await getAuthUser();
  const isLearner = user?.role === "LEARNER";

  return (
    <div className="cc-container py-8 space-y-6">
      {/* Program Header */}
      <div className="cc-card p-5">
        <h1 className="text-xl font-semibold">{program.title}</h1>
        <p className="text-slate-400 text-sm mt-1">{program.description}</p>

        <div className="mt-4 text-xs text-slate-500">
          <p>
            Start: {new Date(program.startDate).toLocaleDateString()}
          </p>
          <p>
            End: {new Date(program.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Analytics */}
      <StatsBlock checkins={checkins} />

      {/* Learner Check-in Form */}
      {isLearner && (
        <CheckinForm programId={params.id} />
      )}

      {/* Check-in List */}
      <CheckinList checkins={checkins} user={user} />
    </div>
  );
}
