import axios from "axios";
import router from "@/router/index.js";
import Vue from "vue";

const useHostName = process.env.VUE_APP_USE_HOSTNAME?.toLowerCase() === "true";
const baseUrl = useHostName
  ? `${location.protocol}//${location.host}/prod-api`
  : process.env.VUE_APP_HOST_URL;
const service = axios.create({
  baseURL: baseUrl,
  withCredentials: false, // 表示跨域请求时是否需要使用凭证
  timeout: 0, // request timeout 超时时间限制 0 无限制
});

// request interceptor 请求拦截器
service.interceptors.request.use(
  (config) => {
    // apiTrace('%c %s 参数:',config)
    if (config.url === "/login") {
      //Login 接口不带token
      return config;
    } else if (sessionStorage.getItem("token")) {
      // config.headers['Authorization'] =  sessionStorage.getItem('token')// 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers["Authorization"] =
        "Bearer " + sessionStorage.getItem("token"); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);
// response interceptor 回应添加拦截器
service.interceptors.response.use(
  (response) => {
    // apiTrace('%c %s 数据:',response, '#00BFFF')
    const res = response.data;
    if (res.code !== 200) {
      if (res.code === 401) {
        Vue.prototype.$message({
          message: "Token失效，请重新登录",
          type: "error",
        });
        router.replace("/"); //跳转登录页面
        return res;
      }
      return Promise.reject(res.msg);
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
