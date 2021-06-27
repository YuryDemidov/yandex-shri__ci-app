import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../server/config';

export const addBuilds = createAsyncThunk('build/list', async () => {
  const [builds, settings] = await Promise.all([
    axios.get(`${SERVER_URL}/api/builds`),
    axios.get(`${SERVER_URL}/api/settings`),
  ]);

  return {
    builds: builds.data,
    settings: settings.data,
  };
});

export const buildsSlice = createSlice({
  name: 'builds',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(addBuilds.fulfilled, (state, action) => {
      return [...state, ...action.payload.builds.data];
    });
  },
});

export const getStateBuilds = (state) => state.builds;

export const { reducer: buildsReducer } = buildsSlice;
