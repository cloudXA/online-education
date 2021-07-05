import axios from 'axios';
import store from '@/store';
import token from './auth';

// 创建axios实例
const service = axios.create({

  // baseURL: "/",
  baseURL: "http://8.129.106.56/",
  // baseURL: "http://localhost:5000/",
  timeout: 5000
});


// 请求拦截 
service.interceptors.request.use(
  config => {
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