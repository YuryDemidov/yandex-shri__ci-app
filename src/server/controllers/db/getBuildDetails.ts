import createDbRequest from '../../utils/createDbRequest';

export default (buildId: string) =>
  createDbRequest(`/build/details?buildId=${buildId}`, {
    method: 'get',
  });
