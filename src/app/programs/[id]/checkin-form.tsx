"use client";

import { useState } from "react";

export default function CheckinForm({ programId }: { programId: string }) {
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.target);

    const data = {
      programId,
      mood: Number(form.get("mood")),
      progress: form.get("progress"),
      blockers: form.get("blockers"),
      plan: form.get("plan"),
    };

    const res = await fetch("/api/checkins", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error || "Failed");
      return;
    }

    window.location.reload();
  }

  return (
    <div className="cc-card p-5 space-y-4">
      <h2 className="text-sm font-semibold">Submit weekly check-in</h2>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="cc-label">Mood (1–5)</label>
          <input name="mood" type="number" min="1" max="5" className="cc-input" required />
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

        <button className="cc-btn-primary w-full">Submit Check-in</button>
      </form>
    </div>
  );
}
