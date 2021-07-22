import createDbRequest from '../../utils/createDbRequest';
import { BuildFinishData } from '../../../client/api/types';

export default (data: BuildFinishData) =>
  createDbRequest('/build/finish', {
    method: 'post',
    data,
  });
