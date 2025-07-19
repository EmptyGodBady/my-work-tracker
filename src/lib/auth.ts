import jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";

const SECRET = process.env.JWT_SECRET!;

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export function setTokenCookie(res: NextApiResponse, token: string) {
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
    sameSite: "lax",
  });
  res.setHeader("Set-Cookie", cookie);
}

export function parseCookies(req: NextApiRequest) {
  return parse(req.headers.cookie || "");
}
