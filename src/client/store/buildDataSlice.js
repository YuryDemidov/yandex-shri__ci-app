import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBuildData = createAsyncThunk('build/data', async (buildId, { extra: { api } }) => {
  const [buildDetails, buildLogs, settings] = await Promise.all([
    api.getBuild(buildId),
    api.getBuildLogs(buildId),
    api.getSettings(),
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
          ...action.payload.buildData.details.data,
        },
        logs: action.payload.buildData.logs,
      };
    });
    builder.addCase(fetchBuildData.pending, () => {
      return {
        details: {},
        logs: '',
      };
    });
  },
});

export const getStateBuildData = (state) => state.buildData;

export const { reducer: buildDataReducer } = buildDataSlice;
