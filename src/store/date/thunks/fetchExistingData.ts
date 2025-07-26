import { Action, ThunkAction } from "@reduxjs/toolkit";
import { selectDate } from "../selectors";
import { RootState } from "@/store";
import { selectUser } from "@/store/user/selectors";
import { useEffect, useState } from "react";
import { setMonthRecord } from "../dateSlice";
import { buildInitialData } from "@/utils/formatters";
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AsyncAppThunk<ReturnType = void> = AppThunk<Promise<ReturnType>>;

export interface DayEntry {
  day: number;
  hours: string;
  comment: string;
}

export default function fetchExistingData(): AsyncAppThunk {
  return async (dispatch, getState) => {
    const state = getState();
    const date = selectDate(state);
    const user = selectUser(state);
    const isUserAndInputDateSelected = date.month && date.year;

    try {
      if (!isUserAndInputDateSelected || !date.days) return;

      const res = await fetch(
        `/api/work-hours/set-work-hours?userId=${user.userId}&month=${date.month}&year=${date.year}`
      );
      if (!res.ok) throw new Error("Błąd przy pobieraniu danych");
      const existing = await res.json();

      dispatch(setMonthRecord(buildInitialData(date.days, existing)));
    } catch (error) {
      console.error(error);
    }
  };
}
