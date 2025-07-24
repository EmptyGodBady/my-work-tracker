import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Brak userId" });
  }

  try {
    const months = await prisma.workHour.findMany({
      where: {
        userId: Number(userId),
      },
      distinct: ["month", "year"],
      select: {
        month: true,
        year: true,
      },
      orderBy: [{ year: "desc" }, { month: "desc" }],
    });

    return res.status(200).json(months);
  } catch (error) {
    console.error("Błąd przy pobieraniu miesięcy:", error);
    return res.status(500).json({ message: "Błąd serwera" });
  }
}
