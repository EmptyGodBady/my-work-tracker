import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/user/selectors";
import { selectDate, selectMonthRecord } from "@/store/date/selectors";
import { DateState, setHoursSummary } from "@/store/date/dateSlice";
import fetchExistingData from "@/store/date/thunks/fetchExistingData";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/router";

export default function TimeTable() {
  const [inputData, setInputData] = useState<DateState["monthRecord"]>(null);

  const user = useSelector(selectUser);
  const date = useSelector(selectDate);
  const monthRecord = useAppSelector(selectMonthRecord);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleChange = (
    index: number,
    key: "hours" | "comment",
    value: string
  ) => {
    if (!inputData) return;

    const newData = [...inputData];

    if (key === "hours") {
      newData[index].hours = value;
    } else if (key === "comment") {
      newData[index].comment = value;
    }

    setInputData(newData);
  };

  const handleSubmit = async () => {
    const transformedData = inputData?.map((entry) => ({
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
  const hoursSummary = useMemo(() => {
    const total = inputData?.reduce((sum, entry) => {
      const hours = parseFloat(entry.hours);
      return sum + (isNaN(hours) ? 0 : hours);
    }, 0);

    return total;
  }, [inputData]);
  useEffect(() => {
    setInputData(monthRecord);
  }, [monthRecord]);

  useEffect(() => {
    dispatch(fetchExistingData());
  }, [date.days]);

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
          {inputData?.map((entry, i) => (
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
          <Button
            onClick={() => {
              dispatch(setHoursSummary(hoursSummary ?? null));
              router.push("/download");
            }}
            className="mt-6 w-1/3 py-2  sm:py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg/30 hover:scale-105 hover:from-green-500 hover:to-green-700 transition transform backdrop-blur-md border border-white/30 text-sm sm:text-lg"
          >
            Pobierz
          </Button>
        </div>
      </div>

    </div>
  );
}
