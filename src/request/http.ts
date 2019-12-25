import axios from "axios"; // 引入axios

import { Toast } from "vant";
// import Vue from 'vue'
import router from '../router';
// import qs from "qs";

axios.defaults.timeout = 10000; //响应时间
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8"; //配置请求头
axios.defaults.baseURL = ""; //配置接口地址

axios.interceptors.request.use(
  config => {
    // console.log('config..........'+config.url+'--------------'+config.method)
    //过滤交换TOKEN的TOKEN设置
    // if(config.method=="get"&&config.url=="login"){
    //   return config;
    // }
    //设置Token
    var token = localStorage.getItem("token");
    // console.log('config..........'+ConstKey.ACCESS_TOKEN+".......token:"+token);
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      // let token1  = 'Bearer%'+ token;
      // let aftertoken = token1.replace('%',' ')
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(

  response => {
    
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      console.log('tag', response)
      return Promise.reject(response);
      
    }
  },

  error => {
    console.log('tag', error)
    if (error.response.status) {
      
      switch (error.response.status) {
        // 401 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 401:
          Toast({
            message: "登录过期，请重新登录",
            duration: 1000,
            forbidClick: true
          });
          // 清除token
          localStorage.removeItem("token");
          // store.commit('loginSuccess', null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath,
                
              }
            });
          }, 1000);
          break;
        case 403:
          Toast({
            message: "登录过期，请重新登录",
            duration: 1000,
            forbidClick: true
          });
          // 清除token
          localStorage.removeItem("token");
          console.log(router)
          // store.commit('loginSuccess', null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath,
                
              }
            });
          }, 1000);
          break;

        // 404请求不存在
        case 404:
          Toast({
            message: "网络请求不存在",
            duration: 1500,
            forbidClick: true
          });
          break;
        // 其他错误，直接抛出错误提示
        case 500:
          Toast({
            message: "服务器开小差了 稍后再试",
            duration: 1500,
            forbidClick: true
          });
          break;
        default:
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          });
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url:string, params = {}):Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url:string, data = {}||[]) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url:string, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url:string, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
