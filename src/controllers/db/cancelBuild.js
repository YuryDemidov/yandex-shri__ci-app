const { createDbRequest } = require('../../utils/createDbRequest');

module.exports = (data) =>
  createDbRequest('/build/cancel', {
    method: 'post',
    data,
  });
