import createDbRequest from '../../utils/createDbRequest';

export default (buildId: string) =>
  createDbRequest(`/build/log?buildId=${buildId}`, {
    method: 'get',
  });
