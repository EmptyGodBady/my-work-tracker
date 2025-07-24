import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId, month, year } = req.query;

    if (!userId || !month || !year) {
      return res.status(400).json({ message: "Missing query parameters" });
    }

    const workHours = await prisma.workHour.findMany({
      where: {
        userId: parseInt(userId as string),
        month: parseInt(month as string),
        year: parseInt(year as string),
      },
    });

    return res.status(200).json(workHours);
  }

  if (req.method === "POST") {
    const { entries, month, year, userId } = req.body;

    const numericUserId = parseInt(userId);
    const numericMonth = parseInt(month);
    const numericYear = parseInt(year);

    if (!entries || !Array.isArray(entries)) {
      return res.status(400).json({ message: "Missing or invalid entries" });
    }
    try {
      for (const entry of entries) {
        await prisma.workHour.upsert({
          where: {
            userId_day_month_year: {
              userId: numericUserId,
              day: entry.day,
              month: numericMonth,
              year: numericYear,
            },
          },
          create: {
            userId: numericUserId,
            day: entry.day,
            month: numericMonth,
            year: numericYear,
            hours: entry.hours,
            comment: entry.comment,
          },
          update: {
            hours: entry.hours,
            comment: entry.comment,
          },
        });
      }

      return res.status(200).json({ message: "Saved successfully" });
    } catch (error) {
      console.error("Error saving work hours:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
