import createDbRequest from '../../utils/createDbRequest';

export default (data) =>
  createDbRequest('/build/cancel', {
    method: 'post',
    data,
  });
