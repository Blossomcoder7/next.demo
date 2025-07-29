import User from "@/_types/user";
import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";

const initialState: {
  user: User | undefined;
  session_token?: string | undefined;
} = {
  user: undefined,
  session_token: undefined,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Logs in the user by setting `user` to the given user object.
     * @function
     */
    login: (state, action) => {
      state.user = action.payload.user;
      state.session_token = action.payload.session_token;
    },
    /**
     * Logs out the user by setting `user` to undefined.
     * @function
     */
    logout: (state) => {
      state.user = undefined;
      signOut();
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
