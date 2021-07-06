import { configureStore } from '@reduxjs/toolkit';

import Api from '../api';
import { INTEGRATION_TEST_PARAM } from '../../server/config';
import { buildsReducer } from './buildsSlice';
import { buildDataReducer } from './buildDataSlice';
import { settingsReducer } from './settingsSlice';

export const createStore = (options) => {
  const integrationTest = options.queryParams && options.queryParams[INTEGRATION_TEST_PARAM];

  return configureStore({
    reducer: {
      buildData: buildDataReducer,
      builds: buildsReducer,
      settings: settingsReducer,
    },
    preloadedState: options.preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: { api: new Api(integrationTest) } },
      }),
  });
};
