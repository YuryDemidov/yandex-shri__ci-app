import createDbRequest from '../../utils/createDbRequest';

export default (data) =>
  createDbRequest('/build/request', {
    method: 'post',
    data,
  });
