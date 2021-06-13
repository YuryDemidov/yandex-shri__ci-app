const { createDbRequest } = require('../../utils/createDbRequest');

module.exports = (data) =>
  createDbRequest('/build/start', {
    method: 'post',
    data,
  });
