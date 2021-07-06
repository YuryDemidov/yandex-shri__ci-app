import { SettingsPage } from '../components/SettingsPage/SettingsPage';
import { BuildLogsPage } from '../components/BuildLogsPage/BuildLogsPage';
import { BuildsListPage } from '../components/BuildsListPage/BuildsListPage';
import { fetchBuilds } from '../store/buildsSlice';
import { fetchBuildData } from '../store/buildDataSlice';
import { fetchSettings } from '../store/settingsSlice';

export const clientRoutesConfig = [
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
    loadData: () => fetchBuilds(),
  },
];
