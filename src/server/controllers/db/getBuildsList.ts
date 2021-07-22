import createDbRequest from '../../utils/createDbRequest';

export default () =>
  createDbRequest('/build/list', {
    method: 'get',
  });
