import createDbRequest from '../../utils/createDbRequest';
import { BuildParamsRequestData } from '../../../client/api/types';

export default (data: BuildParamsRequestData) =>
  createDbRequest('/build/request', {
    method: 'post',
    data,
  });
