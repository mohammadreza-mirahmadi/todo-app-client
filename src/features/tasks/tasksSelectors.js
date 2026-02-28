import { createSelector } from "@reduxjs/toolkit";
import { tasksAdaprer } from "./tasksSlice";

export const selectTasksState = (state) => state.tasks;

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTasksIds,
  selectEntities: selectTaskEntities,
  selectTotal: selectTotalTasks,
} = tasksAdaprer.getSelectors(selectTasksState);

// Completed Tasks
export const selectCompletedTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((task) => task.completed),
);

// Uncompleted Tasks
export const selectUncompletedTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter((task) => !task.completed),
);

// Important Tasks
export const selectImportantTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((task) => task.important),
);

// By Directory
export const selectTasksByDirectory = (directoryId) =>
  createSelector([selectAllTasks], (tasks) =>
    tasks.filter((task) => String(task.dirId) === String(directoryId)),
  );

// Status Selectors
export const selectTasksStatus = (state) => state.tasks.status;
export const selectTasksError = (state) => state.tasks.error;
export const selectTasksSortBy = (state) => state.tasks.sortBy;
export const selectTasksSearchQuery = (state) => state.tasks.searchQuery;
