import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, RootState } from '.';
import { BuildRequestData, DbBuildModel } from '../api/types';
import { SettingsState } from './settingsSlice';

type BuildsState = DbBuildModel[];

type CombinedIndexPageState = {
  builds: {
    data: BuildsState;
  };
  settings: SettingsState;
};

export const fetchBuilds = createAsyncThunk<CombinedIndexPageState, void, AsyncThunkConfig>(
  'build/list',
  async (_, { extra: { api } }) => {
    const { data: settings } = await api.getSettings();
    const builds = settings.data.repoName && settings.data.buildCommand ? await api.getBuilds() : null;

    return {
      builds: builds ? builds.data : { data: [] },
      settings: settings.data,
    };
  }
);

export const requestBuild = createAsyncThunk<void, BuildRequestData, AsyncThunkConfig>(
  'build/request',
  async ({ commitHash, history, onError, onSuccess }, { extra: { api } }) => {
    try {
      const response = await api.addBuild(commitHash);
      const newBuildId = response.data.data.id;

      onSuccess && onSuccess();

      if (newBuildId) {
        history.push(`/build/${newBuildId}`);
      }
    } catch (error) {
      onError(error.response?.data || error);
    }
  }
);

export const buildsSlice = createSlice({
  name: 'builds',
  initialState: [] as BuildsState | [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBuilds.fulfilled, (state: BuildsState, action) => {
      const builds = action.payload.builds.data;
      return JSON.stringify(state).indexOf(JSON.stringify(builds)) === -1 ? state.concat(builds) : builds;
    });
  },
});

export const getStateBuilds = (state: RootState) => state.builds;

export const { reducer: buildsReducer } = buildsSlice;
