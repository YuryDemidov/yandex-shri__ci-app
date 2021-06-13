const { createDbRequest } = require('../../utils/createDbRequest');

module.exports = () =>
  createDbRequest('/build/list', {
    method: 'get',
  });
