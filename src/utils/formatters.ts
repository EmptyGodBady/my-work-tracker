import { DayEntry } from "@/store/date/dateSlice";

export const buildInitialData = (days: number, existing: DayEntry[] = []) => {
  const parsedDays = days || 0;
  return Array.from({ length: parsedDays }, (_, i) => {
    const day = i + 1;
    const existingEntry = existing.find((e: any) => e.day === day);
    return {
      day,
      hours: existingEntry?.hours?.toString() || "",
      comment: existingEntry?.comment || "",
    };
  });
};
