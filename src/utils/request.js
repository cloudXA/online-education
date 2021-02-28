import axios from 'axios';
import store from '@/store';
import token from './auth';

// 创建axios实例
const service = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000
});


// 请求拦截 
service.interceptors.request.use(
  config => {
    debugger;

    // do something before request is sent 

    // if(store.getters.token) {
      config.headers['X-Token'] = token.getToken();
    // }

    return config
  },
  error => {
    // do something with request error 
    console.log(error)
    return Promise.reject(error)
  }
);

export default service;