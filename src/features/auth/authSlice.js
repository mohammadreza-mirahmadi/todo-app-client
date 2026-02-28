import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginThunk,
  registerThunk,
  getProfileThunk,
  logoutThunk,
  updateProfileThunk,
} from "./authThunks";
import {
  getToken,
  setToken,
  removeToken,
} from "../../shared/utils/tokenStorage";

const initialState = {
  user: null,
  token: getToken(),
  status: "idle",
  hydrationStatus: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Hydration:
      .addCase(getProfileThunk.pending, (state) => {
        state.hydrationStatus = "loading";
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.hydrationStatus = "succeeded";
      })
      .addCase(getProfileThunk.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.hydrationStatus = "failed";
        removeToken();
      })

      // fulfilled cases
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = "succeeded";
        state.error = null;
        setToken(action.payload.token);
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
        state.hydrationStatus = "idle";
        removeToken();
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      // matchers for pending
      .addMatcher(
        isAnyOf(
          loginThunk.pending,
          registerThunk.pending,
          logoutThunk.pending,
          updateProfileThunk.pending,
        ),
        (state) => {
          state.status = "loading";
          state.error = null;
        },
      )
      // matchers for rejected
      .addMatcher(
        isAnyOf(
          loginThunk.rejected,
          registerThunk.rejected,
          logoutThunk.rejected,
          updateProfileThunk.rejected,
        ),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload || "Something went wrong";
        },
      );
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
