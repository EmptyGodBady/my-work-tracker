import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DateState {
  month: number | null;
  year: number | null;
  days: number | null;
  hours: number | null;
  hoursSummary: number | null;
  monthRecord: DayEntry[] | null;
}

export interface DayEntry {
  day: number;
  hours: string;
  comment: string;
}

const initialState: DateState = {
  month: null,
  year: null,
  days: null,
  hours: null,
  hoursSummary: null,
  monthRecord: null,
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setMonth(state, action: PayloadAction<DateState["month"]>) {
      state.month = action.payload;
    },
    setHours(state, action: PayloadAction<DateState["hours"]>) {
      state.hours = action.payload;
    },
    setYear(state, action: PayloadAction<DateState["year"]>) {
      state.year = action.payload;
    },
    setDays(state, action: PayloadAction<DateState["days"]>) {
      state.days = action.payload;
    },
    setMonthRecord(state, action: PayloadAction<DateState["monthRecord"]>) {
      state.monthRecord = action.payload;
    },
    setHoursSummary(state, action: PayloadAction<DateState["hoursSummary"]>) {
      state.hoursSummary = action.payload;
    },
    clearDate(state) {
      state.month = null;
      state.year = null;
      state.days = null;
      state.hours = null;
      state.monthRecord = null;
      state.hoursSummary = null;
    },
  },
});

export const {
  setMonth,
  setYear,
  setDays,
  clearDate,
  setHours,
  setMonthRecord,
  setHoursSummary,
} = dateSlice.actions;
export default dateSlice.reducer;
