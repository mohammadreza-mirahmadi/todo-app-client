import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
} from "../../api/authApi";
import normalizeApiError from "../../shared/utils/normalizeApiError";

export const loginThunk = createAsyncThunk(
  "users/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      const { token, user } = response.data.data;
      return { token, user };
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (auth.status === "loading") return false; // Prevent multiple login attempts while one is in progress(اگر دوبار دیسپچ زدن، از بروز خطا جلوگیری میکنه تا دوتا درخواست تکراری ارسال نشه)
    },
  },
);

export const registerThunk = createAsyncThunk(
  "users/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);

export const getProfileThunk = createAsyncThunk(
  "users/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);

export const logoutThunk = createAsyncThunk("users/logout", async () => {
  return true;
});

export const updateProfileThunk = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateProfile(userData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);
