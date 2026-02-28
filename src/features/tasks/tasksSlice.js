import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchTasksThunk,
  createTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
  deleteAllTasksThunk,
  toggleCompletedThunk,
  toggleImportantThunk,
} from "./tasksThunks";
import { deleteDirectoryThunk } from "../directories/directoryThunks";

export const tasksAdaprer = createEntityAdapter({
  selectId: (task) => task._id,
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
});

const initialState = tasksAdaprer.getInitialState({
  status: {
    fetch: "idle",
    create: "idle",
    update: "idle",
    delete: "idle",
  },
  error: null,
  sortBy: null,
  searchQuery: "",
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetTasksState: (state) => {
      state.status = {
        fetch: "idle",
        create: "idle",
        update: "idle",
        delete: "idle",
      };
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchTasksThunk.pending, (state) => {
        state.status.fetch = "loading";
        state.error = null;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        tasksAdaprer.setAll(state, action.payload);
        state.status.fetch = "succeeded";
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.status.fetch = "failed";
        state.error = action.payload;
      })

      // create
      .addCase(createTaskThunk.pending, (state) => {
        state.status.create = "loading";
        state.error = null;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        tasksAdaprer.addOne(state, action.payload);
        state.status.create = "succeeded";
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.status.create = "failed";
        state.error = action.payload;
      })

      // update
      .addCase(updateTaskThunk.pending, (state) => {
        state.status.update = "loading";
        state.error = null;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        tasksAdaprer.upsertOne(state, action.payload);
        state.status.update = "succeeded";
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.status.update = "failed";
        state.error = action.payload;
      })

      .addCase(toggleCompletedThunk.pending, (state) => {
        state.status.update = "loading";
        state.error = null;
      })
      .addCase(toggleCompletedThunk.fulfilled, (state, action) => {
        tasksAdaprer.upsertOne(state, action.payload);
        state.status.update = "succeeded";
      })
      .addCase(toggleCompletedThunk.rejected, (state, action) => {
        state.status.update = "failed";
        state.error = action.payload;
      })

      .addCase(toggleImportantThunk.pending, (state) => {
        state.status.update = "loading";
        state.error = null;
      })
      .addCase(toggleImportantThunk.fulfilled, (state, action) => {
        tasksAdaprer.upsertOne(state, action.payload);
        state.status.update = "succeeded";
      })
      .addCase(toggleImportantThunk.rejected, (state, action) => {
        state.status.update = "failed";
        state.error = action.payload;
      })

      // delete
      .addCase(deleteTaskThunk.pending, (state) => {
        state.status.delete = "loading";
        state.error = null;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        tasksAdaprer.removeOne(state, action.payload);
        state.status.delete = "succeeded";
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.status.delete = "failed";
        state.error = action.payload;
      })

      .addCase(deleteAllTasksThunk.pending, (state) => {
        state.status.delete = "loading";
        state.error = null;
      })
      .addCase(deleteAllTasksThunk.fulfilled, (state) => {
        tasksAdaprer.removeAll(state);
        state.status.delete = "succeeded";
      })
      .addCase(deleteAllTasksThunk.rejected, (state, action) => {
        state.status.delete = "failed";
        state.error = action.payload;
      })
      .addCase(deleteDirectoryThunk.fulfilled, (state, action) => {
        const dirId = String(action.payload);
        const tasksToRemove = Object.values(state.entities)
          .filter((task) => String(task.dirId) === dirId)
          .map((task) => task._id);
        tasksAdaprer.removeMany(state, tasksToRemove);
      })

      // global reject mathcer
      .addMatcher(
        isAnyOf(
          fetchTasksThunk.rejected,
          createTaskThunk.rejected,
          updateTaskThunk.rejected,
          deleteTaskThunk.rejected,
          deleteAllTasksThunk.rejected,
          toggleCompletedThunk.rejected,
          toggleImportantThunk.rejected,
        ),
        (state, action) => {
          state.error = action.payload;
        },
      );
  },
});

export const { resetTasksState, setSortBy, setSearchQuery } =
  tasksSlice.actions;
export default tasksSlice.reducer;
