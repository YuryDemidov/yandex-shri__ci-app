import createDbRequest from '../../utils/createDbRequest';

export default (data) =>
  createDbRequest('/build/finish', {
    method: 'post',
    data,
  });
