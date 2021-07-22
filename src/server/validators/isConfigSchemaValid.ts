import { SettingsChangeData } from '../../client/api/types';

export default (config: SettingsChangeData): boolean => {
  return !!(
    config &&
    config.repoName &&
    typeof config.repoName === 'string' &&
    config.buildCommand &&
    typeof config.buildCommand === 'string'
  );
};
