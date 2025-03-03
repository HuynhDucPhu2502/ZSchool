import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserLoginRequest } from "../models";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: UserLoginRequest, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("http://localhost:8080/zschool/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      dispatch(fetchUserProfile());
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8080/zschool/api/user/me",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(
      fetchUserProfile.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      }
    );
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
