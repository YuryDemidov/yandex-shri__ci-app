const axios = require('axios');

module.exports = () => {
  // Example
  axios
    .get('https://shri.yandex/hw/api/conf', {
      headers: {
        Authorization: 'Bearer {AUTH KEY FROM .ENV}',
      },
    })
    .then((response) => console.log(response.data));
};
