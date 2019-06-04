import axios from 'axios';
import getters from '../store/getters';
import { getToken, getId } from './auth';

// create an axios instance
const service = axios.create({
  baseURL: '', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (getters.userToken && getters.userId) {
      const id = getId();
      const token = getToken();

      config.headers.Authorization = `management ${id} ${token}`;
    }

    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  response => response.data,
  (error) => {
    console.log(`error ${error}`); // for debug
    return Promise.reject(error);
  },
);

export default service;
