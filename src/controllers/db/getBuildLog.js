const { createDbRequest } = require('../../utils/createDbRequest');

module.exports = (buildId) =>
  createDbRequest(`/build/log?${buildId}`, {
    method: 'get',
  });
