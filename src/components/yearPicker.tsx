import { useState } from "react";
import { Button } from "@/components/ui/button";

interface YearPickerProps {
  onSelect: (year: number) => void;
  startYear?: number;
  endYear?: number;
}

export default function YearPicker({
  onSelect,
  startYear = new Date().getFullYear() - 2,
  endYear = new Date().getFullYear() + 1,
}: YearPickerProps) {
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-4 gap-2  bg-white   ">
      {years.map((year) => (
        <Button
          key={year}
          variant={selectedYear === year ? "default" : "outline"}
          onClick={() => {
            setSelectedYear(year);
            onSelect(year);
          }}
        >
          {year}
        </Button>
      ))}
    </div>
  );
}
