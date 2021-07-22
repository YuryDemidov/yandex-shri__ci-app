import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchBuilds } from './buildsSlice';
import { fetchBuildData } from './buildDataSlice';
import { AsyncThunkConfig, RootState } from '.';
import { DbConfigModel, SettingsChangeData } from '../api/types';

export type SettingsState = DbConfigModel | SettingsChangeData | null;

export const fetchSettings = createAsyncThunk<{ data: SettingsState }, void, AsyncThunkConfig>(
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

export const updateSettings = createAsyncThunk<SettingsChangeData, SettingsChangeData, AsyncThunkConfig>(
  'settings/update',
  async (settingsData, { extra: { api } }) => {
    try {
      const response = await api.changeSettings(settingsData);
      return JSON.parse(response.config.data);
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  }
);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: null as null | SettingsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (state: SettingsState, action) => {
      return action.payload.data;
    });
    builder.addCase(updateSettings.fulfilled, (state: SettingsState, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(updateSettings.rejected, (state: SettingsState) => {
      return state;
    });
    builder.addCase(fetchBuilds.fulfilled, (state: SettingsState, action) => {
      return action.payload.settings;
    });
    builder.addCase(fetchBuildData.fulfilled, (state: SettingsState, action) => {
      return action.payload.settings.data;
    });
  },
});

export const getStateSettings = (state: RootState) => state.settings;

export const { reducer: settingsReducer } = settingsSlice;
