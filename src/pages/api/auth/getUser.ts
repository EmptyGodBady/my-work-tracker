import { verifyToken } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Brak tokena" });

  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ message: "Nieprawidłowy token" });

  const user = await prisma.user.findUnique({
    where: { id: ((await payload) as any).userId },
    select: {
      id: true,
      login: true,
      firstName: true,
      lastName: true,
    },
  });

  if (!user)
    return res.status(404).json({ message: "Użytkownik nie znaleziony" });

  return res.status(200).json(user);
}
