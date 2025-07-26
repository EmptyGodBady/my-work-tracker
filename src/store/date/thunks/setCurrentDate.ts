import { Dispatch } from "@reduxjs/toolkit";
import { setDays, setMonth, setYear } from "../dateSlice";

interface Date {
  month: number;
  year: number;
  days: number;
}

export default function setCurrentDate({ month, year, days }: Date) {
  return (dispatch: Dispatch) => {
    try {
      dispatch(setMonth(month));
      dispatch(setYear(year));
      dispatch(setDays(days));
    } catch (error) {
      console.error(error);
    }
  };
}
