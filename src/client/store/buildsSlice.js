import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../server/config';

export const fetchBuilds = createAsyncThunk('build/list', async () => {
  const { data: settings } = await axios.get(`${SERVER_URL}/api/settings`);
  const builds =
    settings.data.repoName && settings.data.buildCommand ? await axios.get(`${SERVER_URL}/api/builds`) : null;

  return {
    builds: builds ? builds.data : { data: [] },
    settings: settings.data,
  };
});

export const requestBuild = createAsyncThunk('build/request', async (commitHash) => {
  const response = await axios.post(`${SERVER_URL}/api/builds/${commitHash}`);
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
