const { createDbRequest } = require('../../utils/createDbRequest');

module.exports = (data) =>
  createDbRequest('/build/finish', {
    method: 'post',
    data,
  });
