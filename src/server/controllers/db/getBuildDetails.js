import createDbRequest from '../../utils/createDbRequest';

export default (buildId) =>
  createDbRequest(`/build/details?buildId=${buildId}`, {
    method: 'get',
  });
