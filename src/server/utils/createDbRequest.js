import axios from 'axios';
import { DB_URL } from '../config';

export default (route, axiosRequestConfig) => {
  return axios({
    url: `${DB_URL}${route}`,
    headers: {
      Authorization: `Bearer ${process.env.BEARER_AUTH_TOKEN}`,
    },
    ...axiosRequestConfig,
  });
};
