import BaseAdapter from "./base";

class CookieAdapter extends BaseAdapter {
  getItem(key) {
    if (document.cookie) {
      let arr = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
      let reg = arr;
      arr = document.cookie.match(reg);
      if (arr) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    }
    return null;
  }

  setItem(key, value, expires = 2592000000) {
    const exp = new Date();
    exp.setTime(exp.getTime() + expires);
    const v = escape(value);
    document.cookie = `${key}=${v};expires=${exp.toGMTString()};path=/`;
  }

  removeItem(key) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let value = document.cookie.get(key);
    if (value != null) {
      document.cookie = `key=${value};expires=${exp.toGMTString()};path=/`;
    }
  }

  clear() {
    document.cookie
      .split(";")
      .map((cookie) => cookie.split("=")[0].trim())
      .forEach((cookie) => this.removeItem(cookie));
  }

  getSupported() {
    // 所有浏览器均支持cookies
    return this;
  }
}

export default CookieAdapter;
