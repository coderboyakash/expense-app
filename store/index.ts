import { configureStore } from "@reduxjs/toolkit";
// reducers import
import AppReducer from "./AppSlice";
import AuthReducer from "./AuthSlice";
import TransactionReducers from "./TransactionSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    application: AppReducer,
    transaction: TransactionReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
