"use client";

import { useState } from "react";

export default function CheckinList({ checkins, user }: any) {
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function deleteCheckin(id: string) {
    if (!confirm("Delete this check-in?")) return;

    setLoading(true);
    const res = await fetch(`/api/checkins/${id}`, { method: "DELETE" });
    setLoading(false);

    if (!res.ok) return alert("Failed");
    window.location.reload();
  }

  async function updateCheckin(e: any, id: string) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const data = {
      mood: Number(form.get("mood")),
      progress: form.get("progress"),
      blockers: form.get("blockers"),
      plan: form.get("plan"),
    };

    const res = await fetch(`/api/checkins/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (!res.ok) return setError("Update failed");

    setEditing(null);
    window.location.reload();
  }

  if (checkins.length === 0)
    return (
      <div className="cc-card p-5 text-sm text-slate-500">
        No check-ins yet.
      </div>
    );

  return (
    <div className="space-y-4">
      {checkins.map((c: any) => {
        const isOwner = c.userId === user?.id;
        const canEdit = isOwner || user?.role !== "LEARNER";

        return (
          <div key={c._id} className="cc-card p-4 space-y-3">
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-400">
                {new Date(c.createdAt).toLocaleDateString()}
              </p>

              <span
                className={`cc-badge ${
                  c.mood >= 4
                    ? "bg-emerald-500/20 text-emerald-300"
                    : c.mood === 3
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-red-500/20 text-red-300"
                }`}
              >
                Mood {c.mood}
              </span>
            </div>

            {/* EDIT FORM */}
            {editing === c._id && (
              <form
                onSubmit={(e) => updateCheckin(e, c._id)}
                className="space-y-3"
              >
                {error && <p className="text-red-400 text-sm">{error}</p>}

                <input
                  name="mood"
                  type="number"
                  min="1"
                  max="5"
                  defaultValue={c.mood}
                  className="cc-input w-20"
                />

                <textarea
                  name="progress"
                  rows={2}
                  defaultValue={c.progress}
                  className="cc-input"
                />

                <textarea
                  name="blockers"
                  rows={2}
                  defaultValue={c.blockers}
                  className="cc-input"
                />

                <textarea
                  name="plan"
                  rows={2}
                  defaultValue={c.plan}
                  className="cc-input"
                />

                <div className="flex gap-2">
                  <button className="cc-btn-primary">Save</button>
                  <button
                    type="button"
                    className="cc-btn-secondary"
                    onClick={() => setEditing(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* VIEW MODE */}
            {editing !== c._id && (
              <>
                <p className="text-sm">
                  <strong className="text-slate-300">Progress:</strong>{" "}
                  {c.progress}
                </p>

                <p className="text-sm">
                  <strong className="text-slate-300">Blockers:</strong>{" "}
                  {c.blockers}
                </p>

                <p className="text-sm">
                  <strong className="text-slate-300">Plan:</strong> {c.plan}
                </p>

                {/* ACTION BUTTONS */}
                {canEdit && (
                  <div className="flex gap-3 pt-2">
                    <button
                      className="cc-btn-secondary"
                      onClick={() => setEditing(c._id)}
                    >
                      Edit
                    </button>

                    <button
                      className="cc-btn-danger"
                      onClick={() => deleteCheckin(c._id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
