import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDays, setMonth, setYear } from "@/store/dateSlice";
import { Button } from "@/components/ui/button";

interface MonthItem {
  month: number;
  year: number;
}

export default function MonthList() {
  const [months, setMonths] = useState<MonthItem[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchMonths = async () => {
      if (!user.userId) return;

      const res = await fetch(
        `/api/work-hours/get-months?userId=${user.userId}`
      );
      const data = await res.json();
      setMonths(data);
    };

    fetchMonths();
  }, [user.userId]);

  const handleClick = (month: number, year: number) => {
    dispatch(setMonth(month));
    dispatch(setYear(year));
    dispatch(setDays(new Date(year, month, 0).getDate()));
    router.push("/time-tracker");
  };

  return (
    <div className="flex justify-center gap-4">
      {months.map(({ month, year }) => (
        <Button
          key={`${month}-${year}`}
          onClick={() => handleClick(month, year)}
          className=" bg-green-500 hover:bg-green-600 text-white w-32 h-18 text-center text-xl  rounded-md shadow"
        >
          {`${month.toString().padStart(2, "0")}/${year}`}
        </Button>
      ))}
    </div>
  );
}
