import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import MobileNav from "@/components/mobile-nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cohort Compass | House of EdTech Assignment",
  description: "Cohort-based learning tracker for programs & check-ins.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-cc-bg text-slate-100 font-sans">
        <div className="flex min-h-screen flex-col">
          {/* Server-enabled Header */}
          <SiteHeader />
          <main className="flex-1 pb-8">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

async function SiteHeader() {
  const user = await getAuthUser();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-gradient-to-b from-black/70 via-black/40 to-transparent backdrop-blur-md">
      <div className="cc-container flex h-14 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-400/40">
            <span className="text-xs font-bold tracking-tighter text-emerald-400">
              HOE
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">
              House of EdTech
            </span>
            <span className="text-[11px] text-slate-400">
              For cohort-based learning teams
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
          <Link href="/dashboard" className="hover:text-slate-50">
            Dashboard
          </Link>
          <Link href="/programs" className="hover:text-slate-50">
            Programs
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-2 sm:flex">
          {!user ? (
            <>
              <Link href="/login" className="cc-btn-ghost">
                Sign in
              </Link>
              <Link href="/register" className="cc-btn-primary">
                Get started
              </Link>
            </>
          ) : (
            <form action="/api/auth/logout" method="POST">
              <button className="cc-btn-ghost text-red-400">Sign out</button>
            </form>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <MobileNav user={user} />
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/70 bg-black/60">
      <div className="cc-container flex flex-col gap-3 py-4 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-slate-300">
            House of EdTech | Fullstack Assignment
          </p>
          <p className="text-[11px] text-slate-500">
            Built as a full-stack Next.js + MongoDB application to showcase
            secure CRUD, auth, and real-world product thinking.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] uppercase tracking-wide text-slate-500">
            Crafted by
          </span>
          <a
            href="https://www.linkedin.com/in/atharva-gupta-762972256/"
            target="_blank"
            className="text-slate-200 hover:text-emerald-400"
          >
            Atharva Gupta
          </a>
          <span className="h-3 w-px bg-slate-700" />
          <a
            href="https://github.com/Atharvagupta12"
            target="_blank"
            className="hover:text-slate-200"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/atharva-gupta-762972256/"
            target="_blank"
            className="hover:text-slate-200"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
