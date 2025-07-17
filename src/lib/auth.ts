import jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const SECRET = process.env.JWT_SECRET!;

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

export function setTokenCookie(res: NextApiResponse, token: string) {
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
    sameSite: "lax",
  });
  res.setHeader("Set-Cookie", cookie);
}

export function parseCookies(req: NextApiRequest) {
  return parse(req.headers.cookie || "");
}
