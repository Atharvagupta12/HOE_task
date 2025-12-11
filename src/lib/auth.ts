import { cookies } from "next/headers";
import { verifyJWT } from "./jwt";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MENTOR" | "LEARNER";
};

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("cc_token")?.value;
    if (!token) return null;

    return verifyJWT<AuthUser>(token);
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getAuthUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function requireRole(roles: Array<AuthUser["role"]>) {
  const user = await getAuthUser();
  if (!user) throw new Error("UNAUTHORIZED");

  if (!roles.includes(user.role)) throw new Error("FORBIDDEN");

  return user;
}
