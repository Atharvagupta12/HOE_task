"use client";

import { useState } from "react";
import { updateCheckin, deleteCheckin } from "./actions";

export default function CheckinList({ checkins, user }: any) {
  const [editing, setEditing] = useState<string | null>(null);

  if (checkins.length === 0) {
    return (
      <div className="cc-card p-5 text-sm text-slate-500">
        No check-ins yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {checkins.map((c: any) => {
        const isOwner = c.userId === user?.id;
        const canEdit = isOwner;

        return (
          <div key={c._id} className="cc-card p-4 space-y-3">
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-400">
                {new Date(c.createdAt).toLocaleDateString()}
              </p>

              <span className="cc-badge">
                Mood {c.mood}
              </span>
            </div>

            {/* EDIT MODE */}
            {editing === c._id && (
              <form action={updateCheckin} className="space-y-3">
                <input type="hidden" name="checkinId" value={c._id} />
                <input type="hidden" name="programId" value={c.programId} />

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
                  defaultValue={c.progress}
                  className="cc-input"
                />

                <textarea
                  name="blockers"
                  defaultValue={c.blockers}
                  className="cc-input"
                />

                <textarea
                  name="plan"
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

            
            {editing !== c._id && (
              <>
                <p><strong>Progress:</strong> {c.progress}</p>
                <p><strong>Blockers:</strong> {c.blockers}</p>
                <p><strong>Plan:</strong> {c.plan}</p>

                {canEdit && (
                  <div className="flex gap-3 pt-2">
                    <button
                      className="cc-btn-secondary"
                      onClick={() => setEditing(c._id)}
                    >
                      Edit
                    </button>

                    <form action={deleteCheckin}>
                      <input type="hidden" name="checkinId" value={c._id} />
                      <input type="hidden" name="programId" value={c.programId} />
                      <button className="cc-btn-danger">
                        Delete
                      </button>
                    </form>
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
