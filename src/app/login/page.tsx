import { loginAction } from "./action";

export default function LoginPage() {
  return (
    <div className="cc-container max-w-md py-10">
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>

      <form action={loginAction} className="space-y-4">
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

