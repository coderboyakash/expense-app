import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getSum } from "../helpers";
import { TRANSACTION_TYPE } from "../constants";

interface AuthStateType {
  transactions: any[]
  expenses: any[]
  incomes: any[]
}

const intialState: AuthStateType = { transactions: [], expenses: [], incomes: [] };

const TransactionSlice = createSlice({
  name: "transaction",
  initialState: intialState,
  reducers: {
    setTransactions: (state, { payload }) => {
      state.transactions = payload;
      state.incomes = state.transactions.filter(item => item.type === TRANSACTION_TYPE.INCOME)
      state.expenses = state.transactions.filter(item => item.type === TRANSACTION_TYPE.EXPENSE)
    },
    addTransaction: (state, { payload }) => {
      state.transactions = [payload, ...state.transactions];
      if (payload.type === TRANSACTION_TYPE.EXPENSE) {
        state.expenses = [payload, ...state.expenses]
      } else {
        state.incomes = [payload, ...state.incomes]
      }
    },
  },
});

export const { setTransactions, addTransaction } = TransactionSlice.actions;
export default TransactionSlice.reducer;
export const selectExpenses = (state: RootState) => {
  return state.transaction.expenses;
}
export const selectTotalExpense = (state: RootState) => {
  return state.transaction.expenses.reduce(getSum, 0);
}
export const selectTotalIncome = (state: RootState) => {
  return state.transaction.incomes.reduce(getSum, 0);
}
export const selectIncomes = (state: RootState) => {
  return state.transaction.incomes;
}
export const selectTransactions = (state: RootState) => state.transaction.transactions;
