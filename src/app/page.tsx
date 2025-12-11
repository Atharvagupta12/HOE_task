import Link from "next/link";

const MOCK_PROGRAMS = [
  {
    id: "p1",
    title: "Fullstack Web Cohort · Winter 2025",
    learners: 28,
    avgMood: 4.3,
    week: 3,
  },
  {
    id: "p2",
    title: "Data Analysis Bootcamp · Evening Batch",
    learners: 19,
    avgMood: 3.8,
    week: 5,
  },
];

export default function HomePage() {
  return (
    <div className="pt-10">
      <section className="cc-container grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
        {/* Left column: hero text */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cc-border bg-slate-950/60 px-3 py-1 text-[11px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(34,197,94,0.35)]" />
            Built with Next.js 16 · MongoDB · Tailwind CSS
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            A command center for{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
              cohort-based learning
            </span>
            .
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Cohort Compass helps mentors and admins track learner progress,
            weekly check-ins, and cohort health in one place.
            <br />
            This project is built for the House of EdTech fullstack assignment to
            demonstrate secure CRUD, auth, and thoughtful product design.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/register" className="cc-btn-primary">
              Start as new mentor
            </Link>
            <Link href="/login" className="cc-btn-ghost">
              I already have an account
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Role-based access for admins, mentors, and learners
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Secure JWT auth with HTTP-only cookies
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              Optional AI insights on cohort health
            </div>
          </div>
        </div>

        {/* Right column: mock dashboard preview */}
        <div className="cc-card p-4 md:p-5">
          <div className="flex items-center justify-between pb-3">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Live snapshot
              </p>
              <p className="text-sm text-slate-200">
                Programs & cohort health overview
              </p>
            </div>
            <span className="cc-badge">Mentor view</span>
          </div>

          <div className="grid gap-3 pb-3 sm:grid-cols-3">
            <StatChip label="Active programs" value="2" trend="+1 this month" />
            <StatChip label="Total learners" value="47" trend="82% check-in rate" />
            <StatChip label="Avg cohort mood" value="4.1 / 5" trend="Stable" />
          </div>

          <div className="mt-2 space-y-3">
            {MOCK_PROGRAMS.map((program) => (
              <article
                key={program.id}
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-3 text-xs transition hover:border-emerald-500/60 hover:bg-slate-900/80"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-[13px] font-medium text-slate-100">
                      {program.title}
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Week {program.week} · {program.learners} learners · Avg mood{" "}
                      <span className="text-emerald-400">
                        {program.avgMood.toFixed(1)}
                      </span>
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    Healthy
                  </span>
                </div>
                <div className="mt-2 flex gap-2 text-[11px] text-slate-400">
                  <span>Top blocker: {" "}
                    <span className="text-slate-300">setup & consistency</span>
                  </span>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-4 text-[11px] text-slate-500">
            Once you sign in, this preview becomes your real dashboard, driven
            by live data from MongoDB.
          </p>
        </div>
      </section>

      {/* Secondary section */}
      <section className="cc-container mt-12 grid gap-6 md:grid-cols-3">
        <ValueCard
          title="Thoughtful data model"
          body="Programs, users, and weekly check-ins form a simple but expressive model that matches real cohort workflows instead of generic todos."
        />
        <ValueCard
          title="Secure by design"
          body="JWT-based auth, server-side validation, sanitized inputs, and protected routes help simulate production-grade constraints."
        />
        <ValueCard
          title="Built for growth"
          body="SSR, API routes, and MongoDB make it easy to scale from a simple assignment to a full EdTech internal tool."
        />
      </section>
    </div>
  );
}

function StatChip(props: { label: string; value: string; trend?: string }) {
  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2">
      <p className="text-[11px] text-slate-400">{props.label}</p>
      <p className="text-base font-semibold text-slate-100">{props.value}</p>
      {props.trend && (
        <p className="mt-1 text-[11px] text-slate-500">{props.trend}</p>
      )}
    </div>
  );
}

function ValueCard(props: { title: string; body: string }) {
  return (
    <div className="cc-card p-4">
      <p className="text-sm font-semibold text-slate-100">{props.title}</p>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">
        {props.body}
      </p>
    </div>
  );
}
