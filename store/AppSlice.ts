import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthStateType {
  private: boolean;
  loading: boolean;
  month?: string;
  transactions: any[]
}

const intialState: AuthStateType = { private: false, loading: false, transactions: [] };

const AppSlice = createSlice({
  name: "application",
  initialState: intialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    togglePrivate: (state) => {
      state.private = !state.private;
    },
    setTransactions: (state, { payload }) => {
      state.transactions = payload;
    }
  },
});

export const { setLoading, setTransactions, togglePrivate } = AppSlice.actions;

export default AppSlice.reducer;

export const selectLoading = (state: RootState) => state.application.loading;
export const selectPrivate = (state: RootState) => state.application.private;
export const selectTransactions = (state: RootState) => state.application.transactions;
