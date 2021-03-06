import { configureStore, combineReducers, EnhancedStore } from '@reduxjs/toolkit';

import Api from '../api';
import { INTEGRATION_TEST_PARAM } from '../../server/config';
import { buildsReducer } from './buildsSlice';
import { buildDataReducer } from './buildDataSlice';
import { modalReducer } from './modalSlice';
import { settingsReducer } from './settingsSlice';

const rootReducer = combineReducers({
  buildData: buildDataReducer,
  builds: buildsReducer,
  settings: settingsReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

type CreateStoreQueryParams = {
  [key: string]: any;
};

interface CreateStoreOptions {
  preloadedState?: RootState;
  queryParams?: CreateStoreQueryParams;
}

export interface AsyncThunkConfig {
  state: RootState;
  extra: {
    api: Api;
  };
}

export const createStore = (options: CreateStoreOptions): EnhancedStore<RootState> => {
  const integrationTest = options.queryParams && options.queryParams[INTEGRATION_TEST_PARAM];

  return configureStore({
    reducer: rootReducer,
    preloadedState: options.preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: { api: new Api(integrationTest) } },
      }),
  });
};
