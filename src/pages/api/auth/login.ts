import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { setTokenCookie, signToken } from "@/lib/auth";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: "Login i hasło są wymagane" });
  }

  const user = await prisma.user.findUnique({ where: { login } });
  if (!user)
    return res.status(401).json({ message: "Nieprawidłowy login lub hasło" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(401).json({ message: "Nieprawidłowy login lub hasło" });

  const token = signToken({ userId: user.id });
  setTokenCookie(res, token);

  return res
    .status(200)
    .json({ message: "Zalogowano pomyślnie", userId: user.id });
}
