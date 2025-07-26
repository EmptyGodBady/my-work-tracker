import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const selectRoot = (state: RootState) => state;

export const selectUser = createDraftSafeSelector(
  selectRoot,
  (state) => state.user
);
