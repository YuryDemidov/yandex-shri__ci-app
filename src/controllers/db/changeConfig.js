const { createDbRequest } = require('../../utils/createDbRequest');

module.exports = (data) =>
  createDbRequest('/conf', {
    method: 'post',
    data,
  });
