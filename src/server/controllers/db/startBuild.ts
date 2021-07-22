import createDbRequest from '../../utils/createDbRequest';
import { BuildStartData } from '../../../client/api/types';

export default (data: BuildStartData) =>
  createDbRequest('/build/start', {
    method: 'post',
    data,
  });
