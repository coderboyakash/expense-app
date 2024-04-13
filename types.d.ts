import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamsList = {
  Home: undefined;
  Login: undefined;
  Splash: undefined;
  Profile: undefined;
  Register: undefined;
  AddExpense: undefined;
  Transactions: undefined;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string
}

interface Income {
  type: INCOME_TYPES;
  amount: string;
  date: string;
}

interface Expense {
  userId: string;
  type: EXPENSE_TYPES;
  amount: string;
  date: string;
  description?: string
}

export type NavigationProps = Navigation<RootStackParamsList>;