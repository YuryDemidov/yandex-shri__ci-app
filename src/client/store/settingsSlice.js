import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../server/config';
import { addBuilds } from './buildsSlice';
import { fetchBuildData } from './buildDataSlice';

export const fetchSettings = createAsyncThunk(
  'settings/get',
  async () => {
    const response = await axios.get(`${SERVER_URL}/api/settings`);
    return response.data;
  },
  {
    condition(_, { getState }) {
      return !getStateSettings(getState());
    },
  }
);

export const updateSettings = createAsyncThunk('settings/update', async (settingsData) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/settings`, settingsData);
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
    builder.addCase(addBuilds.fulfilled, (state, action) => {
      return action.payload.settings.data;
    });
    builder.addCase(fetchBuildData.fulfilled, (state, action) => {
      return action.payload.settings.data;
    });
  },
});

export const getStateSettings = (state) => state.settings;

export const { reducer: settingsReducer } = settingsSlice;
