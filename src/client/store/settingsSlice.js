import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchBuilds } from './buildsSlice';
import { fetchBuildData } from './buildDataSlice';

export const fetchSettings = createAsyncThunk(
  'settings/get',
  async (_, { extra: { api } }) => {
    const response = await api.getSettings();
    return response.data;
  },
  {
    condition(_, { getState }) {
      return !getStateSettings(getState());
    },
  }
);

export const updateSettings = createAsyncThunk('settings/update', async (settingsData, { extra: { api } }) => {
  try {
    const response = await api.changeSettings(settingsData);
    return JSON.parse(response.config.data);
  } catch (e) {
    throw new Error(e.response.data.message);
  }
});

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: null,
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      return action.payload.data;
    });
    builder.addCase(updateSettings.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(updateSettings.rejected, (state) => {
      return state;
    });
    builder.addCase(fetchBuilds.fulfilled, (state, action) => {
      return action.payload.settings;
    });
    builder.addCase(fetchBuildData.fulfilled, (state, action) => {
      return action.payload.settings.data;
    });
  },
});

export const getStateSettings = (state) => state.settings;

export const { reducer: settingsReducer } = settingsSlice;
