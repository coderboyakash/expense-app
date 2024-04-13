import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../types";

interface AuthStateType {
  user: User | null;
}

const intialState: AuthStateType = { user: null };

const AuthSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    setAuth: (state, { payload }) => {
      const { id, name, email, avatar } = payload;
      const user: User = {
        id: id,
        name: name,
        email: email,
        avatar: avatar
      }
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { logout, setAuth } = AuthSlice.actions;

export default AuthSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
