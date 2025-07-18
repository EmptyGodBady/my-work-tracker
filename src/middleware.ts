import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

const protectedRoutes = ["/dashboard", "/time-tracker"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let isValid;
  try {
    isValid = await verifyToken(token);
  } catch (error) {
    return error;
  }

  if (!isValid) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
