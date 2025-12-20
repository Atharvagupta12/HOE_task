import { createProgram } from "../actions";

export default function NewProgramPage() {
  return (
    <div className="cc-container py-10 max-w-lg">
      <h1 className="text-xl font-semibold">Create Program</h1>
      <p className="text-slate-400 text-sm mb-6">
        Add a new program inside House of EdTech.
      </p>

      <form action={createProgram} className="space-y-4">
        <div>
          <label className="cc-label">Title</label>
          <input name="title" className="cc-input" required />
        </div>

        <div>
          <label className="cc-label">Description</label>
          <textarea
            name="description"
            rows={3}
            className="cc-input"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="cc-label">Start Date</label>
            <input name="startDate" type="date" className="cc-input" required />
          </div>
          <div>
            <label className="cc-label">End Date</label>
            <input name="endDate" type="date" className="cc-input" required />
          </div>
        </div>

        <button className="cc-btn-primary w-full">
          Create Program
        </button>
      </form>
    </div>
  );
}
