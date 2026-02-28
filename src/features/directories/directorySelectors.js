import { createSelector } from "@reduxjs/toolkit";
import { directoriesAdapter } from "./directorySlice";

export const selectDirectoriesState = (state) => state.directories;

const adapterSelectors = directoriesAdapter.getSelectors(
  selectDirectoriesState,
);

export const selectAllDirectories = adapterSelectors.selectAll;
export const selectDirectoryById = adapterSelectors.selectById;
export const selectDirectoryIds = adapterSelectors.selectIds;
export const selectDirectoryEntities = adapterSelectors.selectEntities;
export const selectTotalDirectories = adapterSelectors.selectTotal;

export const selectDefaultDirectory = createSelector(
  [selectAllDirectories],
  (directories) => directories.find((d) => d.isDefaultDirectory) || null,
);

export const selectDirectoryOptions = createSelector(
  [selectAllDirectories],
  (directories) =>
    directories.map((directory) => ({
      value: directory._id,
      label: directory.name,
    })),
);

export const selectDirectoriesStatus = (state) => state.directories.status;

export const selectDirectoriesError = (state) => state.directories.error;
