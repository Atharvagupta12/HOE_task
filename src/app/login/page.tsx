"use client";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = {
      email: form.get("email"),
      password: form.get("password"),
    };

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error || "Login failed");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <div className="cc-container max-w-md py-10">
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>

      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="cc-label">Email</label>
          <input name="email" type="email" className="cc-input" required />
        </div>

        <div>
          <label className="cc-label">Password</label>
          <input name="password" type="password" className="cc-input" required />
        </div>

        <button className="cc-btn-primary w-full">Sign in</button>
      </form>
    </div>
  );
}
