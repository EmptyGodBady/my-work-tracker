import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { DateState } from "./dateSlice";

export const selectRoot = (state: RootState) => state;

export const selectDate = createDraftSafeSelector(
  selectRoot,
  (state) => state.date
);
export const selectHours = createDraftSafeSelector(
  selectRoot,
  (state) => state.date.hours
);
export const selectMonthRecord = createDraftSafeSelector(
  selectRoot,
  (state): DateState["monthRecord"] => state.date.monthRecord
);
export const selectHoursSummary = createDraftSafeSelector(
  selectRoot,
  (state) => state.date.hoursSummary
);
