import { getAuthUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getAuthUser();

   console.log("AUTH USER:", user);

  if (!user) {
    return (
      <div className="cc-container py-10">
        <p className="text-slate-400">Please sign in to continue.</p>
      </div>
    );
  }

  return (
    <div className="cc-container py-10">
      <h1 className="text-xl font-semibold">Welcome, {user.name}</h1>
      <p className="text-slate-400 mt-2 text-sm">Role: {user.role}</p>
    </div>
  );
}
