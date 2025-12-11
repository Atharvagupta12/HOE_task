export default function StatsBlock({ checkins }: { checkins: any[] }) {
  if (checkins.length === 0)
    return (
      <div className="cc-card p-5 text-sm text-slate-500">
        No analytics available yet.
      </div>
    );

  const avgMood =
    checkins.reduce((sum, c) => sum + (c.mood || 0), 0) / checkins.length;

  return (
    <div className="cc-card p-5">
      <h2 className="text-sm font-semibold mb-2">Cohort Analytics</h2>

      <div className="grid grid-cols-3 gap-4 text-center text-xs">
        <div>
          <p className="text-slate-400">Total Check-ins</p>
          <p className="text-lg font-semibold text-slate-100">
            {checkins.length}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Avg Mood</p>
          <p className="text-lg font-semibold text-emerald-400">
            {avgMood.toFixed(1)}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Last Update</p>
          <p className="text-lg font-semibold text-slate-100">
            {new Date(checkins[0].createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
