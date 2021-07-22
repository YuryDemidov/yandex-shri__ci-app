import axios, { AxiosRequestConfig } from 'axios';
import { DB_URL } from '../config';

export default (route: string, axiosRequestConfig: AxiosRequestConfig) => {
  return axios({
    url: `${DB_URL}${route}`,
    headers: {
      Authorization: `Bearer ${process.env.BEARER_AUTH_TOKEN}`,
    },
    ...axiosRequestConfig,
  });
};
