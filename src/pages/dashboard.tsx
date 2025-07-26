import MonthList from "@/components/monthList";
import MonthPicker from "@/components/monthPicker";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import YearPicker from "@/components/yearPicker";
import { AppDispatch, RootState } from "@/store";
import { clearDate } from "@/store/date/dateSlice";
import fetchAndFillAllUserData from "@/store/user/thunks/fetchAndFillUserData";
import setCurrentDate from "@/store/date/thunks/setCurrentDate";
import { Clock, Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROOT_ROUTES } from "@/config/routes";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [CurrentMonth, setCurrentMonth] = useState<number>();
  const [CurrentYear, setCurrentYear] = useState<number>();

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const userFirstName = useSelector(
    (state: RootState) => state.user.userFirstName
  );

  useEffect(() => {
    dispatch(fetchAndFillAllUserData());
    dispatch(clearDate());
  }, []);

  function handleDatePicker() {
    if (CurrentMonth && CurrentYear) {
      const days = new Date(CurrentYear, CurrentMonth, 0).getDate();

      dispatch(
        setCurrentDate({
          month: CurrentMonth,
          year: CurrentYear,
          days: days,
        })
      );

      router.push(ROOT_ROUTES["time-tracker"]);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Navbar isAuth={true} userName={userFirstName ?? ""} />
      <div className="flex flex-col justify-center h-full gap-2 max-w-[80%] md:w-full w-[350px] pt-32">
        <div className="flex">
          <Clock className="w-6 h-6 mr-2" /> Moje Godziny
        </div>
        <Separator />
        <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
          <div className="bg-white justify-center items-center flex rounded w-32 h-18 text-center text-5xl ">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-full  justify-center font-normal"
                >
                  <Plus size={40} />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-4 grid gap-4 "
                align="start"
              >
                <YearPicker
                  onSelect={(CurrentYear) => {
                    setCurrentYear(CurrentYear);
                  }}
                />
                <MonthPicker
                  onSelect={(monthIndex) => {
                    setCurrentMonth(monthIndex + 1);
                  }}
                />
                <Button
                  variant="outline"
                  className="p-2"
                  onClick={handleDatePicker}
                >
                  Nowy miesiąc
                </Button>
              </PopoverContent>
            </Popover>
          </div>
          <MonthList />
        </div>
      </div>
    </div>
  );
}
