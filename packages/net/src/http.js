import axios from "axios";
import { StorageService, StorageAdapterType } from "@alanojs/storage";

const qs = require('qs')

class HttpClient {
  constructor(options = { gateWay: "localhost" }) {
    const opts = this.getOptions() || options;
    const {
      gateWay = "http://localhost",
      withCredentials = false,
      timeout = 0,
      storageType = StorageAdapterType.LocalStorage,
      router = null,
      toast = null,
    } = opts;
    this._router = router;
    this._toast = toast;
    this._storage = StorageService().getAdapter(storageType);
    this._axios = axios.create({
      baseUrl: gateWay,
      withCredentials,
      timeout,
    });
    this._axios.interceptors.request.use(this.requestInterceptor, (error) => {
      return Promise.reject(error);
    });
    this._axios.interceptors.response.use(this.responseInterceptor, (error) => {
      return Promise.reject(error);
    });
  }

  /**
   * 配置信息，子类覆写
   * @return
   */
  getOptions() {
    return null;
  }

  /**
   * 请求拦截器
   * @param {object} config
   * @return
   */
  requestInterceptor(config) {
    if (config.url === "/login") {
      return config;
    } else if (this._storage.getItem("token")) {
      config.headers["Authorization"] =
        "Bearer " + this._storage.getItem("token");
    }
    return config;
  }

  /**
   * 响应拦截器
   * @param {object} response
   * @return
   */
  responseInterceptor(response) {
    const res = response.data;
    if (res.code !== 200) {
      if (res.code === 401) {
        if (this._toast) {
          this._toast.error("Token失效，请重新登录");
        }
        if (!this._router) {
          location.href = "/";
        } else {
          this._router.replace("/");
        }
        return res;
      }
      return Promise.reject(res.msg);
    }
    return res;
  }

  /**
   * post 请求
   * content-type: application/x-www-form-urlencoded
   *
   * @param {string} url 请求地址，不含域名
   * @param {object} params 请求参数
   * @param {object} config axios配置项
   * @param {boolean} serialize 是否使用qs.stringify序列化
   */
  post(url, params, config = null, serialize = true) {
    return this._axios.post(
      url,
      serialize ? qs.stringify(params) : params,
      config
    );
  }

  /**
   * post 请求
   * content-type: application/json
   *
   * @param {string} url 请求地址，不含域名
   * @param {object} params 请求参数
   * @param {object} options axios配置项
   */
  postJson(url, params, options = null) {
    return this._axios.post(url, params, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      ...options,
    });
  }

  /**
   * post 文件上传
   * content-type: multipart/form-data
   *
   * @param {string} url 请求地址，不含域名
   * @param {object} params 请求参数
   * @param {object} options axios配置项
   */
  postFile(url, params, options = null) {
    const formData = new FormData();
    if (params) {
      for (const key in params) {
        formData.append(key, params[key]);
      }
    }
    return this._axios.post(url, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
      timeout: 3600000,
      ...options,
    });
  }

  /**
   * put 请求
   * @param {string} url 请求地址，不含域名
   * @param {object} params 请求参数
   * @param {boolean} serialize 是否使用qs.stringify序列化
   */
  put(url, params, config = null, serialize = true) {
    return this._axios.put(
      url,
      serialize ? qs.stringify(params) : params,
      config
    );
  }

  /**
   * put 请求
   * content-type: application/json
   *
   * @param {string} url 请求地址，不含域名
   * @param {object} params 请求参数
   * @param {object} options axios配置项
   */
  putJson(url, params, options = null) {
    return this._axios.put(url, params, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      ...options,
    });
  }

  /**
   * delete 请求
   * @param {string} url 请求地址，不含域名
   * @param {object} config 配置
   */
  del(url, config = null) {
    return this._axios.delete(url, config);
  }

  static createInstance(options) {
    return axios.createInstance(options);
  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$http = new HttpClient(options);
  }
}

export { HttpClient };