const { createDbRequest } = require('../../utils/createDbRequest');

module.exports = () =>
  createDbRequest('/conf', {
    method: 'get',
  });
