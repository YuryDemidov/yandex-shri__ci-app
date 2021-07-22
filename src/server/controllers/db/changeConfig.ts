import createDbRequest from '../../utils/createDbRequest';
import { SettingsChangeData } from '../../../client/api/types';

export default (data: SettingsChangeData) =>
  createDbRequest('/conf', {
    method: 'post',
    data,
  });
