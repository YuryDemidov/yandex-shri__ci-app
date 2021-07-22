import createDbRequest from '../../utils/createDbRequest';
import { BuildCancelData } from '../../../client/api/types';

export default (data: BuildCancelData) =>
  createDbRequest('/build/cancel', {
    method: 'post',
    data,
  });
