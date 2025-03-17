import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models";

import { fetchUserProfile, logout } from "../services/authService";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUserProfile.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      }
    );
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
