import { HttpClient } from "@alanojs/net";
import router from "../router";

class Request extends HttpClient {
  getOptions() {
    return {
      gateWay: 'http://localhost:3001',
      timeout: 5000,
      withCredentials: false,
      router
    }
  }
}

export default new Request();
