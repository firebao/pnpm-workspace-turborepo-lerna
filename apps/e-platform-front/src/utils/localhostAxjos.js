//进行axios二次封装
import axios from "axios";
import { Message } from "element-ui";
//第一步：利用axios对象的create方法，去创建axios实例(主要配置：基础路径、超时时间)
let request = axios.create({
  //基础路径
  baseURL: "/",
  timeout: 10000, //超时时间
});



const err = (error) => {
  if (error.response) {
    // let data = error.response.data
    switch (error.response.status) {
      // case 200:
      case 403:
        break;
      case 500:
        break;
      case 404:
        break;
      case 504:
        break;
      case 503:
        break;
      case 401:
        break;
      default:
        break;
    }
  }
  return Promise.reject(error);
};
// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    if (config.headers) {
      if (JSON.parse(localStorage.getItem("userinfo"))) {
        config.headers.authenticationInformation = JSON.parse(
          localStorage.getItem("userinfo")
        ).authenticationInformation;
      }
      // config.headers.set('Authorization', 'Bearer ' + UserTool.getUser().accessToken)
      config.headers.set("Content-Type", `application/json;charset=UTF-8`);
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const { code, msg } = response.data;
  if (code === 401) {
    window.location.href = "/login";
  } else if (code === 500) {
    Notification.error(msg);
  } else if (["post", "put"].includes(response.config.method)) {
    // if (code === 0 && !notificationWhiteList.includes(response.config.url)) {  // 白名单？
    //     Notification.success(msg || '操作成功')
    //
    // } else {
    //     Notification.error(msg)
    // }
  }
  return response.data;
}, err);

export { request as axios };

export const getAction = (url, params) => {
  return request.get(url + ObjectTool.objectToURLChain(params, true));
};
export const postAction = (url, params) => {
  params.authenticationInformation = "身份信息码";
  params.dataSource = "mysql-operate";
  return request.post(url, params);
};

export const deleteAction = (url, params) => {
  return request.delete(url + ObjectTool.objectToURLChain(params, true));
};
export const putAction = (url, params) => {
  return request.put(url, params);
};
export const customAction = (url, params, method = "post") => {
  return method === "get"
    ? request.get(url + ObjectTool.objectToURLChain(params, true))
    : method === "put"
    ? request.put({
        url: url,
        data: params,
      })
    : request.post({
        url: url,
        data: params,
      });
};
//对外暴露
export default request;
