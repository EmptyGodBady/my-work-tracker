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
import { RootState } from "@/store";
import { selectDays, selectMonth, selectYear } from "@/store/dateSlice";
import { Clock, Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();

  const { userLogin } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  function handleDatePicker() {
    if (month && year) {
      dispatch(selectMonth(month));
      dispatch(selectYear(year));
      dispatch(selectDays(new Date(year, month, 0).getDate()));
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Navbar isAuth={true} userLogin={userLogin || ""} />
      <div className="flex flex-col  justify-center h-full gap-2 max-w-[80%] md:w-full w-[350px] pt-32">
        <div className=" flex  ">
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
                  onSelect={(year) => {
                    setYear(year);
                  }}
                />
                <MonthPicker
                  onSelect={(monthIndex) => {
                    setMonth(monthIndex + 1);
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
          {numbers.map((num) => (
            <div
              key={num}
              className="bg-[#157F1F] p-6 rounded w-32 h-18 text-center"
            >
              MAJ
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
