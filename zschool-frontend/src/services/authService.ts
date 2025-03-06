import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserLoginRequest, UserRegistrationRequest } from "../models";

export const registerUser = async (user: UserRegistrationRequest) => {
  try {
    await axios.post("http://localhost:8080/zschool/api/auth/register", user, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessageCombined = Object.values(error.response?.data).join(
        "\n"
      );
      throw { message: errorMessageCombined };
    }
    throw { message: "Lỗi không xác định" };
  }
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: UserLoginRequest, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/zschool/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status == 200) dispatch(fetchUserProfile());
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data || error.message);
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/zschool/api/auth/me",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data || error.message);
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

export const logout = async () => {
  try {
    await axios.post("http://localhost:8080/zschool/api/auth/logout", null, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response?.data || error.message;
    throw { message: "Lỗi không xác định" };
  }
};

export const testFetch = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/zschool/api/auth/helloworld",
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response?.data || error.message;
    throw { message: "Lỗi không xác định" };
  }
};

export const testRefresh = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/zschool/api/auth/refresh",
      null,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response?.data || error.message;
    throw { message: "Lỗi không xác định" };
  }
};
