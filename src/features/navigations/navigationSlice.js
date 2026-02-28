import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    lastRoute: "/",
  },
  reducers: {
    setLastRoute(state, action) {
      state.lastRoute = action.payload;
    },
  },
});

export const { setLastRoute } = navigationSlice.actions;
export default navigationSlice.reducer;
