import createDbRequest from '../../utils/createDbRequest';

export default (data) =>
  createDbRequest('/build/start', {
    method: 'post',
    data,
  });
