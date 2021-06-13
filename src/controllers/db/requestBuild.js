const { createDbRequest } = require('../../utils/createDbRequest');

module.exports = (data) =>
  createDbRequest('/build/request', {
    method: 'post',
    data,
  });
