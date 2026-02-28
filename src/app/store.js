import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import directoryReducer from "../features/directories/directorySlice";
import navigationReducer from "../features/navigations/navigationSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    directories: directoryReducer,
    navigation: navigationReducer,
    theme: themeReducer,
  },
});
