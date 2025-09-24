//进行axios二次封装
import axios from "axios";
import _ from "lodash";
import { Message, MessageBox } from "element-ui";
import { removeDuplicateById } from "@/tools/CommonTool";
//第一步：利用axios对象的create方法，去创建axios实例(主要配置：基础路径、超时时间)
let request = axios.create({
  //基础路径
  baseURL: "/",
  timeout: 10000, //超时时间
});

//第二步 ：request实例添加请求拦截器
request.interceptors.request.use((config) => {
  // console.log("请求拦截", config);
  //返回一个配置对象
  if (JSON.parse(localStorage.getItem("userinfo"))) {
    config.headers.authenticationInformation = JSON.parse(
      localStorage.getItem("userinfo")
    ).authenticationInformation;
  }
  //config配置对象，有一个 headers属性的请求头，经常给服务端携带公共参数、
  config.data.actionName = "user_" + config.data.actionName;

  return config;
});
let isshowerr = false;
//第三步 request实例添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // console.log('响应拦截', response)
    //成功的回调
    //简化数据
    if (
      response.data.status == "401" &&
      !location.href.includes("monitorQueue")
    ) {
      if (!isshowerr) {
        isshowerr = true;
        setTimeout(() => {
          MessageBox(response.data.message, "提示", {
            confirmButtonText: "确定",
            type: "warning",
          })
            .then(() => {
              localStorage.clear();
              window.location.reload(true);
            })
            .catch(() => {});
          isshowerr = false;
        }, 5000);
      }
    } else {
      return response.data;
    }
  },
  (error) => {
    //失败的回调：一般处理http网络错误
    //定义一个变量：存储网络错误信息
    let message = "";
    let status = error.response.status;
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器出现了错误";
        break;
      default:
        message = "网络出现问题";
        break;
    }
    //提示的错误信息
    Message({
      type: "error",
      message,
    });
    //这里需要返回一个失败的promise对象来终结
    return Promise.reject(error);
  }
);

//对外暴露
export default request;
