import React from 'react';
import { RouteProps } from 'react-router';
import { AsyncThunkAction } from '@reduxjs/toolkit';

import { SettingsPage } from '../components/SettingsPage/SettingsPage';
import { BuildLogsPage } from '../components/BuildLogsPage/BuildLogsPage';
import { BuildsListPage } from '../components/BuildsListPage/BuildsListPage';
import { fetchBuilds } from '../store/buildsSlice';
import { fetchBuildData } from '../store/buildDataSlice';
import { fetchSettings } from '../store/settingsSlice';
import { AsyncThunkConfig } from '../store';

type PageDataLoader = (params?: any) => AsyncThunkAction<any, any, AsyncThunkConfig>;

export interface PageProps {
  loadData: PageDataLoader;
}

interface ConfigRouteProps extends RouteProps {
  path: string;
  component: React.FC<PageProps>;
  loadData: PageDataLoader;
}

export const clientRoutesConfig: ConfigRouteProps[] = [
  {
    path: '/settings',
    component: SettingsPage,
    loadData: () => fetchSettings(),
  },
  {
    path: '/build/:id',
    component: BuildLogsPage,
    loadData: ({ id }) => fetchBuildData(id.replace(/\?.*/, '')),
  },
  {
    path: '/',
    component: BuildsListPage,
    exact: true,
    loadData: () => fetchBuilds(),
  },
];
