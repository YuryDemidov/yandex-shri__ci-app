import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBuilds = createAsyncThunk('build/list', async (_, { extra: { api } }) => {
  const { data: settings } = await api.getSettings();
  const builds = settings.data.repoName && settings.data.buildCommand ? await api.getBuilds() : null;

  return {
    builds: builds ? builds.data : { data: [] },
    settings: settings.data,
  };
});

export const requestBuild = createAsyncThunk('build/request', async (commitHash, { extra: { api } }) => {
  const response = await api.addBuild(commitHash);
  return response.data;
});

export const buildsSlice = createSlice({
  name: 'builds',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchBuilds.fulfilled, (state, action) => {
      const builds = action.payload.builds.data;
      return JSON.stringify(state).indexOf(JSON.stringify(builds)) === -1 ? state.concat(builds) : builds;
    });
  },
});

export const getStateBuilds = (state) => state.builds;

export const { reducer: buildsReducer } = buildsSlice;
