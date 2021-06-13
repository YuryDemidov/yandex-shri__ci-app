const axios = require('axios');

module.exports = () => {
  // Example
  axios
    .get('https://shri.yandex/hw/api/conf', {
      headers: {
        Authorization: 'Bearer {AUTH TOKEN FROM .ENV}',
      },
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
};
