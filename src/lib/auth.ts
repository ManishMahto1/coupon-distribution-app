import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Changed from bcrypt

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch  {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}