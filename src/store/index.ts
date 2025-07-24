import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import userReducer from "@/store/userSlice";
import dateReducer from "@/store/dateSlice";

const rootReducer = combineReducers({
  user: userReducer,
  date: dateReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "date"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
