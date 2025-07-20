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
    selectMonth(state, action: PayloadAction<number>) {
      state.month = action.payload;
    },
    selectYear(state, action: PayloadAction<number>) {
      state.year = action.payload;
    },
    selectDays(state, action: PayloadAction<number>) {
      state.days = action.payload;
    },
    clearDate(state) {
      state.month = null;
      state.year = null;
      state.days = null;
    },
  },
});

export const { selectMonth, selectYear, selectDays, clearDate } =
  dateSlice.actions;
export default dateSlice.reducer;
