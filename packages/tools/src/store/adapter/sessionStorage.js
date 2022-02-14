import BaseAdapter from "./base";
import { default as CookieAdapter } from "./cookie";

class SessionStorageAdapter extends BaseAdapter {
  getItem(key) {
    return sessionStorage.getItem(key);
  }

  setItem(key, value) {
    sessionStorage.setItem(key, value);
  }

  removeItem(key) {
    sessionStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }

  getSupported() {
    // 若浏览器不支持sessionStorage，降级使用cookies
    if (!sessionStorage) {
      return new CookieAdapter();
    }

    try {
      sessionStorage.setItem(
        "alano-session-storage-service",
        "supported"
      );
      sessionStorage.removeItem("alano-session-storage-service");

      return this;
    } catch (err) {
      return new CookieAdapter();
    }
  }
}

export default SessionStorageAdapter;
