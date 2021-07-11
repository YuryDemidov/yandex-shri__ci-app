import createDbRequest from '../../utils/createDbRequest';

export default (buildId) =>
  createDbRequest(`/build/log?buildId=${buildId}`, {
    method: 'get',
  });
