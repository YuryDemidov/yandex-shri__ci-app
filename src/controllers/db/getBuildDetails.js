const { createDbRequest } = require('../../utils/createDbRequest');

module.exports = (buildId) =>
  createDbRequest(`/build/details?${buildId}`, {
    method: 'get',
  });
