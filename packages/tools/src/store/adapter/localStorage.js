import BaseAdapter from "./base";

class LocalStorageAdapter extends BaseAdapter {
  getItem(key) {
    let item = localStorage.getItem(key);
    if (!item) return item;
    item = JSON.parse(item);
    if (Date.now() - item.createTime > item.expires) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  setItem(key, value, expires = 2592000000) {
    const item = {
      value,
      expires,
      // Date.now(): 1970 年 1 月 1 日 00:00:00 UTC 以来的毫秒数
      createTime: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  getSupported() {
    // 若浏览器不支持localStorage，降级使用cookies
    if (!localStorage) {
      return new CookieAdapter();
    }

    try {
      localStorage.setItem("alano-local-storage-service", "supported");
      localStorage.removeItem("alano-local-storage-service");

      return this;
    } catch (err) {
      return new CookieAdapter();
    }
  }
}

export default LocalStorageAdapter;
