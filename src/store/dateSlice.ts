import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateState {
  month: number | null;
  year: number | null;
  days: number | null;
}

const initialState: DateState = {
  month: null,
  year: null,
  days: null,
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setMonth(state, action: PayloadAction<number>) {
      state.month = action.payload;
    },
    setYear(state, action: PayloadAction<number>) {
      state.year = action.payload;
    },
    setDays(state, action: PayloadAction<number>) {
      state.days = action.payload;
    },
    clearDate(state) {
      state.month = null;
      state.year = null;
      state.days = null;
    },
  },
});

export const { setMonth, setYear, setDays, clearDate } = dateSlice.actions;
export default dateSlice.reducer;
