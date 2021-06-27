import createDbRequest from '../../utils/createDbRequest';

export default (data) =>
  createDbRequest('/conf', {
    method: 'post',
    data,
  });
