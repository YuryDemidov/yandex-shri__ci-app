import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../server/config';

export const fetchBuildData = createAsyncThunk('build/log', async (buildId) => {
  const [buildDetails, buildLogs, settings] = await Promise.all([
    axios.get(`${SERVER_URL}/api/builds/${buildId}`),
    axios.get(`${SERVER_URL}/api/builds/${buildId}/logs`),
    axios.get(`${SERVER_URL}/api/settings`),
  ]);

  return {
    buildData: {
      details: buildDetails.data,
      logs: buildLogs.data,
    },
    settings: settings.data,
  };
});

export const buildDataSlice = createSlice({
  name: 'buildData',
  initialState: {
    details: {},
    logs: '',
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBuildData.fulfilled, (state, action) => {
      return {
        details: {
          ...state.details,
          ...action.payload.buildData.details.data,
        },
        logs: action.payload.buildData.logs.data,
      };
    });
  },
});

export const getStateBuildData = (state) => state.buildData;

export const { reducer: buildDataReducer } = buildDataSlice;
