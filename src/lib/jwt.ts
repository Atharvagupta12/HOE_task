import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export interface TokenPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MENTOR" | "LEARNER";
}

export function signJWT(
  payload: TokenPayload,
  expiresIn: string = "7d"
): string {
  const options: SignOptions = {
   expiresIn: expiresIn as any,
  };

  return jwt.sign(payload, SECRET, options);
}

export function verifyJWT<T extends object>(token: string): T {
  return jwt.verify(token, SECRET) as T;
}
