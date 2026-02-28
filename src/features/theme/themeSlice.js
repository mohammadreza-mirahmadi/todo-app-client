import { createSlice } from "@reduxjs/toolkit";

const initState = localStorage.getItem("theme") === "dark" ? "dark" : "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: initState,
  },
  reducers: {
    toggleThemeAction(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
    },
    setTheme(state, action) {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { toggleThemeAction, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
