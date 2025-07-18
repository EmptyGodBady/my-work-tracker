import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { setTokenCookie, signToken } from "@/lib/auth";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ message: "Wszystkie pola są wymagane" });
    }

    const user = await prisma.user.findUnique({ where: { login } });
    if (!user) {
      return res.status(401).json({ message: "Nieprawidłowy login lub hasło" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Nieprawidłowy login lub hasło" });
    }

    const token = signToken({ userId: user.id });
    setTokenCookie(res, token);

    return res
      .status(200)
      .json({ message: "Użytkownik został zalogowany", userId: user.id });
  } catch (error) {
    console.error("Błąd logowania:", error);
    return res.status(500).json({ message: "Błąd serwera" });
  }
}
