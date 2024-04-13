export enum TRANSACTION_TYPE {
  EXPENSE = 'Expense',
  INCOME = 'Income',
}


export enum INCOME_TYPE {
  SALARY = 'salary',
  PAID_BACK = 'paid back',
  DEBT = 'debt',
  BALANCE = 'balance',
  TRANSFER = 'transfer',
  OTHER = 'Other'
}

export enum EXPENSE_TYPE {
  EMI = 'emi',
  BILL = 'bill',
  SENT = 'sent',
  FOOD = 'food',
  GROCERY = 'grocery',
  TRAVEL = 'travel',
  LOAN = 'loan',
  OTHER = 'other',
}

export const EXPENSE_TYPES = [
  { key: EXPENSE_TYPE.FOOD, value: "Food" },
  { key: EXPENSE_TYPE.EMI, value: "Emi" },
  { key: EXPENSE_TYPE.BILL, value: "Bill Payment" },
  { key: EXPENSE_TYPE.GROCERY, value: "Grocery" },
  { key: EXPENSE_TYPE.TRAVEL, value: "Travel" },
  { key: EXPENSE_TYPE.SENT, value: "Sent" },
  { key: EXPENSE_TYPE.LOAN, value: "Loan" },
  { key: EXPENSE_TYPE.OTHER, value: "Others" },
]

export const INCOME_TYPES = [
  { key: INCOME_TYPE.SALARY, value: "Salary" },
  { key: INCOME_TYPE.TRANSFER, value: "Transfer" },
  { key: INCOME_TYPE.PAID_BACK, value: "Paid Back" },
  { key: INCOME_TYPE.DEBT, value: "Debt" },
  { key: INCOME_TYPE.BALANCE, value: "Balance" },
  { key: INCOME_TYPE.OTHER, value: "Other" },
]

