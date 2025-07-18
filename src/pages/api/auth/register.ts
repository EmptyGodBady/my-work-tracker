import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { setTokenCookie, signToken } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { firstName, lastName, login, password } = req.body;

    if (!firstName || !lastName || !login || !password) {
      return res.status(400).json({ message: "Wszystkie pola są wymagane" });
    }

    const existingUser = await prisma.user.findUnique({ where: { login } });
    if (existingUser) {
      return res.status(409).json({ message: "Użytkownik już istnieje" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        login,
        password: hashedPassword,
      },
    });

    const token = signToken({ userId: user.id });
    setTokenCookie(res, token);

    return res
      .status(201)
      .json({ message: "Użytkownik został utworzony", userId: user.id });
  } catch (error) {
    console.error("Błąd rejestracji:", error);
    return res.status(500).json({ message: "Błąd serwera" });
  }
}
