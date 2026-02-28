import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDirectory,
  deleteDirectory,
  deleteAllDirectories,
  getDirectories,
  updateDirectory,
} from "../../api/directoryApi";
import normalizeApiError from "../../shared/utils/normalizeApiError";

// fetch
export const fetchDirectoriesThunk = createAsyncThunk(
  "directories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDirectories();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const { directories } = getState();
      if (directories.status.fetch === "loading") return false;
    },
  },
);

// create
export const createDirectoryThunk = createAsyncThunk(
  "directories/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createDirectory(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);

// update
export const updateDirectoryThunk = createAsyncThunk(
  "directories/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateDirectory(id, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);

// delete
export const deleteDirectoryThunk = createAsyncThunk(
  "directories/delete",
  async (id, { getState, rejectWithValue }) => {
    const state = getState();
    const directory = state.directories.entities[id];

    if (!directory) {
      return rejectWithValue({ message: "Directory not found", status: 404 });
    }

    if (directory.isDefaultDirectory) {
      return rejectWithValue({
        message: "Main directory cannot be delete",
        state: 400,
      });
    }

    try {
      await deleteDirectory(id);
      return id;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);

export const deleteAllDirectoriesThunk = createAsyncThunk(
  "directories/deleteAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await deleteAllDirectories();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);
