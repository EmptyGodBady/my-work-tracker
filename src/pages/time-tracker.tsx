import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface DayEntry {
  day: number;
  hours: string;
  comment: string;
}

export default function TimeTable() {
  const [data, setData] = useState<DayEntry[]>([]);
  const [hoursSummary, setHoursSummary] = useState(0);

  const user = useSelector((state: RootState) => state.user);
  const date = useSelector((state: RootState) => state.date);

  const buildInitialData = (existing: DayEntry[] = []) => {
    const parsedDays = date.days || 0;
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

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        if (!user.userId || !date.month || !date.year) return;

        const res = await fetch(
          `/api/work-hours/set-work-hours?userId=${user.userId}&month=${date.month}&year=${date.year}`
        );
        if (!res.ok) throw new Error("Błąd przy pobieraniu danych");
        const existing = await res.json();

        setData(buildInitialData(existing));
      } catch (error) {
        console.error("Fetch error:", error);
        setData(buildInitialData([]));
      }
    };

    if (date.days && user.userId) {
      fetchExistingData();
    }
  }, [date.days, date.month, date.year, user.userId]);

  useEffect(() => {
    if (date.days) {
      setData(buildInitialData());
    }
  }, [date.days]);

  const handleChange = (
    index: number,
    key: "hours" | "comment",
    value: string
  ) => {
    const newData = [...data];

    if (key === "hours") {
      newData[index].hours = value;
    } else if (key === "comment") {
      newData[index].comment = value;
    }

    setData(newData);
  };

  const handleSubmit = async () => {
    const transformedData = data.map((entry) => ({
      ...entry,
      hours: parseFloat(entry.hours) || 0,
    }));

    const res = await fetch("/api/work-hours/set-work-hours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entries: transformedData,
        month: date.month,
        year: date.year,
        userId: user.userId,
      }),
    });

    if (res.ok) {
      alert("Godziny zapisane!");
    } else {
      alert("Błąd przy zapisie.");
    }
  };
  useEffect(() => {
    const total = data.reduce((sum, entry) => {
      const hours = parseFloat(entry.hours);
      return sum + (isNaN(hours) ? 0 : hours);
    }, 0);

    setHoursSummary(total);
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-300">
      <Navbar isAuth={true} userName={user.userFirstName || undefined} />
      <div className="backdrop-blur-md bg-white/60 rounded-2xl shadow-2xl p-4 sm:p-8 mt-8 w-full max-w-full sm:max-w-2xl border border-white/30">
        <div className="flex w-full border-b bg-gradient-to-r from-green-400/80 via-green-300/80 to-green-200/80 font-semibold rounded-t-xl shadow-sm text-xs sm:text-base">
          <div className="flex-1 p-2 sm:p-3 text-center text-green-900 drop-shadow">
            Dzień
          </div>
          <div className="flex-1 p-2 sm:p-3 text-center text-green-900 drop-shadow">
            Godziny
          </div>
          <div className="flex-2 p-2 sm:p-3 text-center text-green-900 drop-shadow">
            Komentarz
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          {data.map((entry, i) => (
            <div
              key={entry.day}
              className="flex w-full min-w-[340px] items-center border-b last:border-b-0 bg-white/40 hover:bg-green-100/60 transition rounded-xl my-1 shadow-sm"
              style={{ backdropFilter: "blur(2px)" }}
            >
              <div className="flex-1 text-center p-2 text-green-800 font-medium text-xs sm:text-base">
                {entry.day}
              </div>
              <div className="flex-1 p-2">
                <Input
                  type="number"
                  value={entry.hours}
                  onChange={(e) => handleChange(i, "hours", e.target.value)}
                  className="p-2 border border-green-200 rounded-lg w-full bg-white/70 focus:ring-2 focus:ring-green-300 focus:border-green-400 transition shadow-inner text-xs sm:text-base"
                  step="0.5"
                  min="0"
                  max="24"
                />
              </div>
              <div className="flex-2 p-2">
                <Input
                  type="text"
                  value={entry.comment}
                  onChange={(e) => handleChange(i, "comment", e.target.value)}
                  className="p-2 border border-green-200 rounded-lg m-0 w-full bg-white/70 focus:ring-2 focus:ring-green-300 focus:border-green-400 transition shadow-inner text-xs sm:text-base"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full max-w-full sm:max-w-2xl justify-between">
          <Button
            onClick={handleSubmit}
            className=" mt-6 w-1/3 py-2 sm:py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg/30 hover:scale-105 hover:from-green-500 hover:to-green-700 transition transform backdrop-blur-md border border-white/30 text-sm sm:text-lg"
          >
            Zapisz
          </Button>
          <div className="mt-6 w-1/4 py-2 sm:py-3 h-9 rounded-xl shadow-lg/30 justify-center items-center flex border md:text-lg text-sm">
            <p>{hoursSummary} godzin</p>
          </div>
          <Button className="mt-6 w-1/3 py-2  sm:py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg/30 hover:scale-105 hover:from-green-500 hover:to-green-700 transition transform backdrop-blur-md border border-white/30 text-sm sm:text-lg">
            Wyszlij
          </Button>
        </div>
      </div>
    </div>
  );
}
