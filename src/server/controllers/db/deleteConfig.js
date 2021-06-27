import createDbRequest from '../../utils/createDbRequest';

export default () =>
  createDbRequest('/conf', {
    method: 'delete',
  });
