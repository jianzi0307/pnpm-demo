import axios from "axios";
import { StorageService, StorageAdapterType } from "@alanojs/storage";

import qs from "qs";

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
      requestInterceptor = null,
      responseInterceptor = null,
    } = opts;
    this._router = router;
    this._toast = toast;
    this._storage = StorageService.getAdapter(storageType);
    this._axios = axios.create({
      baseURL: gateWay,
      withCredentials,
      timeout,
    });
    this._axios.interceptors.request.use(
      requestInterceptor || this.requestInterceptor.bind(this),
      (error) => {
        return Promise.reject(error);
      }
    );
    this._axios.interceptors.response.use(
      responseInterceptor || this.responseInterceptor.bind(this),
      (error) => {
        return Promise.reject(error);
      }
    );
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
    return res?.data ?? res;
  }

  request(options) {
    return this._axios.request(options);
  }

  /**
   * get 请求
   * @param {string} url 请求地址，不含域名。
   * @param {object} params 请求参数
   */
  get(url, params, options) {
    return this.request({
      url,
      params,
      method: "get",
      ...options,
    });
    // return this._axios.get(
    //   url,
    //   {
    //     params,
    //   },
    //   {
    //     ...options,
    //   }
    // );
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
    return this.request({
      url,
      method: "post",
      data: serialize ? qs.stringify(params) : params,
      ...config,
    });
    // return this._axios.post(
    //   url,
    //   serialize ? qs.stringify(params) : params,
    //   config
    // );
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
    return this.request({
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      url,
      method: "post",
      data: params,
      ...options,
    });
    // return this._axios.post(url, params, {
    //   headers: {
    //     "content-type": "application/json;charset=UTF-8",
    //   },
    //   ...options,
    // });
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
    return this.request({
      url,
      method: "post",
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
      timeout: 3600000,
      ...options,
    });
    // return this._axios.post(url, formData, {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    //   timeout: 3600000,
    //   ...options,
    // });
  }

  /**
   * put 请求
   * @param {string} url 请求地址，不含域名
   * @param {object} params 请求参数
   * @param {boolean} serialize 是否使用qs.stringify序列化
   */
  put(url, params, config = null, serialize = true) {
    return this.request({
      url,
      method: "put",
      data: serialize ? qs.stringify(params) : params,
      ...config,
    });
    // return this._axios.put(
    //   url,
    //   serialize ? qs.stringify(params) : params,
    //   config
    // );
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
    return this.request({
      url,
      method: "put",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      data: params,
      ...options,
    });
    // return this._axios.put(url, params, {
    //   headers: {
    //     "content-type": "application/json;charset=UTF-8",
    //   },
    //   ...options,
    // });
  }

  /**
   * delete 请求
   * @param {string} url 请求地址，不含域名
   * @param {object} config 配置
   */
  del(url, config = null) {
    return this.request({
      url,
      method: "delete",
      ...config,
    });
    // return this._axios.delete(url, config);
  }

  static createInstance(options) {
    return axios.createInstance(options);
  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$http = new HttpClient(options);
  },
};

export { HttpClient };
