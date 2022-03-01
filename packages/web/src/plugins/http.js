import { HttpClient } from "@alanojs/net";
import { handlePromise } from "@alanojs/tools";
import router from "../router";

class Request extends HttpClient {
  getOptions() {
    return {
      // http网关
      gateWay: "http://127.0.0.1:3000",
      timeout: 5000,
      withCredentials: false,
      router,
    };
  }

  request(options) {
    return handlePromise(this._axios.request(options));
  }

  // responseInterceptor(response) {
  //   return response.data;
  // }
}

const request = new Request();

export { request }

export default {
  install: (Vue, options) => {
    Vue.prototype.$http = request;
  }
}
