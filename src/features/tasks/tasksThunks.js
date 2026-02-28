import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTask,
  deleteTask,
  deleteAllTasks,
  fetchTasks,
  updateTask,
} from "../../api/taskApi";
import normalizeApiError from "../../shared/utils/normalizeApiError";

export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTasks();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const { tasks } = getState();
      if (tasks.status.fetch === "loading") return false;
    },
  },
);

export const createTaskThunk = createAsyncThunk(
  "tasks/create",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await createTask(taskData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);

export const updateTaskThunk = createAsyncThunk(
  "tasks/update",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const response = await updateTask(id, taskData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTask(id);
      return id;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);

export const deleteAllTasksThunk = createAsyncThunk(
  "tasks/deleteAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await deleteAllTasks();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);

export const toggleCompletedThunk = createAsyncThunk(
  "tasks/toggleCompleted",
  async ({ id, isCompleted }, { rejectWithValue }) => {
    try {
      const response = await updateTask(id, { completed: !isCompleted });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);

export const toggleImportantThunk = createAsyncThunk(
  "tasks/toggleImportant",
  async ({ id, isImportant }, { rejectWithValue }) => {
    try {
      const response = await updateTask(id, { important: !isImportant });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);
