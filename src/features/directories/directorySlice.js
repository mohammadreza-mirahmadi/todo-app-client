import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createDirectoryThunk,
  deleteDirectoryThunk,
  deleteAllDirectoriesThunk,
  fetchDirectoriesThunk,
  updateDirectoryThunk,
} from "./directoryThunks";

export const directoriesAdapter = createEntityAdapter({
  selectId: (directory) => directory._id,
  sortComparer: (a, b) => {
    if (a.isDefaultDirectory) return -1;
    if (b.isDefaultDirectory) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  },
});

const initialState = directoriesAdapter.getInitialState({
  status: {
    fetch: "idle",
    create: "idle",
    update: "idle",
    delete: "idle",
  },
  error: null,
});

const directorySlice = createSlice({
  name: "directories",
  initialState,
  reducers: {
    resetDirectoriesState: (state) => {
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
      .addCase(fetchDirectoriesThunk.pending, (state) => {
        state.status.fetch = "loading";
        state.error = null;
      })
      .addCase(fetchDirectoriesThunk.fulfilled, (state, action) => {
        directoriesAdapter.setAll(state, action.payload);
        state.status.fetch = "succeeded";
      })
      .addCase(fetchDirectoriesThunk.rejected, (state, action) => {
        state.status.fetch = "failed";
        state.error = action.payload;
      })

      // create
      .addCase(createDirectoryThunk.pending, (state) => {
        state.status.create = "loading";
        state.error = null;
      })
      .addCase(createDirectoryThunk.fulfilled, (state, action) => {
        directoriesAdapter.addOne(state, action.payload);
        state.status.create = "succeeded";
      })
      .addCase(createDirectoryThunk.rejected, (state, action) => {
        state.status.create = "failed";
        state.error = action.payload;
      })

      // update
      .addCase(updateDirectoryThunk.pending, (state) => {
        state.status.update = "loading";
        state.error = null;
      })
      .addCase(updateDirectoryThunk.fulfilled, (state, action) => {
        directoriesAdapter.upsertOne(state, action.payload);
        state.status.update = "succeeded";
      })
      .addCase(updateDirectoryThunk.rejected, (state, action) => {
        state.status.update = "failed";
        state.error = action.payload;
      })

      // delete
      .addCase(deleteDirectoryThunk.pending, (state) => {
        state.status.delete = "loading";
        state.error = null;
      })
      .addCase(deleteDirectoryThunk.fulfilled, (state, action) => {
        directoriesAdapter.removeOne(state, action.payload);
        state.status.delete = "succeeded";
      })
      .addCase(deleteDirectoryThunk.rejected, (state, action) => {
        state.status.delete = "failed";
        state.error = action.payload;
      })

      .addCase(deleteAllDirectoriesThunk.pending, (state) => {
        state.status.delete = "loading";
        state.error = null;
      })
      .addCase(deleteAllDirectoriesThunk.fulfilled, (state) => {
        directoriesAdapter.removeAll(state);
        state.status.delete = "succeeded";
      })
      .addCase(deleteAllDirectoriesThunk.rejected, (state, action) => {
        state.status.delete = "failed";
        state.error = action.payload;
      })

      // global reject
      .addMatcher(
        isAnyOf(
          fetchDirectoriesThunk.rejected,
          createDirectoryThunk.rejected,
          updateDirectoryThunk.rejected,
          deleteDirectoryThunk.rejected,
        ),
        (state, action) => {
          state.error = action.payload;
        },
      );
  },
});

export const { resetDirectoriesState } = directorySlice.actions;
export default directorySlice.reducer;
