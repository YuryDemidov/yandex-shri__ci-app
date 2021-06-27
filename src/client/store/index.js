import { configureStore } from '@reduxjs/toolkit';

import { buildsReducer } from './buildsSlice';
import { buildDataReducer } from './buildDataSlice';
import { settingsReducer } from './settingsSlice';

export const createStore = (options) =>
  configureStore({
    reducer: {
      buildData: buildDataReducer,
      builds: buildsReducer,
      settings: settingsReducer,
    },
    preloadedState: options.preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {},
      }),
  });
