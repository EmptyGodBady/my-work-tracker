import { useState } from "react";
import { Button } from "@/components/ui/button";

const months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

export default function MonthPicker({
  onSelect,
}: {
  onSelect: (monthIndex: number) => void;
}) {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-3 gap-2  bg-white rounded ">
      {months.map((month, index) => (
        <Button
          key={month}
          variant={selectedMonth === index ? "default" : "outline"}
          onClick={() => {
            setSelectedMonth(index);
            onSelect(index);
          }}
        >
          {month}
        </Button>
      ))}
    </div>
  );
}
