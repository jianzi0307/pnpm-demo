import { HttpClient } from "@alanojs/net";
import { handlePromise } from "@alanojs/tools";
import router from "../router";

class Request extends HttpClient {
  getOptions() {
    return {
      gateWay: "http://localhost:1337/api",
      timeout: 5000,
      withCredentials: false,
      router,
    };
  }

  responseInterceptor(response) {
    return response.data;
  }

  get(url, params, options) {
    return handlePromise(super.get(url, params, options));
  }

  post(url, params, config = null, serialize = true) {
    return handlePromise(super.post(url, params, config, serialize));
  }

  postJson(url, params, options = null) {
    return handlePromise(super.postJson(url, params, options));
  }

  postFile(url, params, options = null) {
    return handlePromise(super.postFile(url, params, options));
  }

  put(url, params, config = null, serialize = true) {
    return handlePromise(super.put(url, params, config, serialize));
  }

  putJson(url, params, options = null) {
    return handlePromise(super.putJson(url, params, options));
  }

  del(url, config = null) {
    return handlePromise(super.del(url, config));
  }
}

export default new Request();
