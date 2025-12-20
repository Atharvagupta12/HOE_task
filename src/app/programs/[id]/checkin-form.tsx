"use client";

import { createCheckin } from "./actions";

export default function CheckinForm({ programId }: { programId: string }) {
  return (
    <div className="cc-card p-5 space-y-4">
      <h2 className="text-sm font-semibold">Submit weekly check-in</h2>

      <form action={createCheckin} className="space-y-4">
        <input type="hidden" name="programId" value={programId} />

        <div>
          <label className="cc-label">Mood (1–5)</label>
          <input
            name="mood"
            type="number"
            min="1"
            max="5"
            className="cc-input"
            required
          />
        </div>

        <div>
          <label className="cc-label">Progress</label>
          <textarea name="progress" rows={2} className="cc-input" required />
        </div>

        <div>
          <label className="cc-label">Blockers</label>
          <textarea name="blockers" rows={2} className="cc-input" required />
        </div>

        <div>
          <label className="cc-label">Plan for next week</label>
          <textarea name="plan" rows={2} className="cc-input" required />
        </div>

        <button className="cc-btn-primary w-full">
          Submit Check-in
        </button>
      </form>
    </div>
  );
}
