"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.target);

    const data = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
      role: form.get("role"),
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error || "Failed");
      return;
    }

    window.location.href = "/login";
  }

  return (
    <div className="cc-container max-w-md pt-10">
      <h1 className="text-2xl font-semibold mb-4">Create your account</h1>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="cc-label">Name</label>
          <input name="name" className="cc-input" required />
        </div>

        <div>
          <label className="cc-label">Email</label>
          <input name="email" type="email" className="cc-input" required />
        </div>

        <div>
          <label className="cc-label">Password</label>
          <input name="password" type="password" className="cc-input" required />
        </div>

        <div>
          <label className="cc-label">Role</label>
          <select name="role" className="cc-input">
            <option value="LEARNER">Learner</option>
            <option value="MENTOR">Mentor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <button className="cc-btn-primary w-full">Register</button>
      </form>
    </div>
  );
}
