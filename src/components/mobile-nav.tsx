"use client";

import { useState } from "react";
import Link from "next/link";

type MobileNavProps = {
  user: {
    id: string;
    role: "ADMIN" | "MENTOR" | "LEARNER";
    name: string;
    email: string;
  } | null;
};

export default function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-slate-300 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-14 left-0 w-full bg-black/90 backdrop-blur-md border-t border-slate-800/60 p-6 space-y-4 z-50 md:hidden">
          <Link
            href="/dashboard"
            className="block text-slate-200 text-sm"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            href="/programs"
            className="block text-slate-200 text-sm"
            onClick={() => setOpen(false)}
          >
            Programs
          </Link>

          {!user ? (
            <>
              <Link
                href="/login"
                className="block text-slate-200 text-sm"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="block text-slate-200 text-sm"
                onClick={() => setOpen(false)}
              >
                Get started
              </Link>
            </>
          ) : (
            <form
              action="/api/auth/logout"
              method="POST"
              onSubmit={() => setOpen(false)}
            >
              <button type="submit" className="text-red-400 text-sm">
                Sign out
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
