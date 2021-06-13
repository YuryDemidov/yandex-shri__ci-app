const axios = require('axios');
const { DB_URL } = require('../config');

exports.createDbRequest = (route, axiosRequestConfig) => {
  return axios({
    url: `${DB_URL}${route}`,
    headers: {
      Authorization: `Bearer ${process.env.BEARER_AUTH_TOKEN}`,
    },
    ...axiosRequestConfig,
  });
};
