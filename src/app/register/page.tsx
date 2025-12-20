import { registerAction } from "./actions";

export default function RegisterPage() {
  return (
    <div className="cc-container max-w-md pt-10">
      <h1 className="text-2xl font-semibold mb-4">Create your account</h1>

      <form action={registerAction} className="space-y-4">
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
