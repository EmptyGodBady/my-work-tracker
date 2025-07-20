import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/userSlice";
import dateReducer from "@/store/dateSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    date: dateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
