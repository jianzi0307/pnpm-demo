class StorageUtil {
  /*
   * 存储localStorage
   * */
  static setStore = (name, content) => {
    if (!name || !content || !window.localStorage) {
      return;
    }
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  };

  /*
   * 获取localStorage
   * */
  static getStore = (name) => {
    if (!name || !window.localStorage) {
      return;
    }
    let value = window.localStorage.getItem(name);
    if (value !== null) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        // value = value
      }
    }
    return value;
  };

  /*
   * 删除localStorage
   * */
  static removeStore = (name) => {
    if (!name || !window.localStorage) {
      return;
    }
    window.localStorage.removeItem(name);
  };

  /*
   * 清空localStorage
   * */
  static clearStore = () => {
    if (!window.localStorage) {
      return;
    }
    window.localStorage.clear();
  };

  /*
   * 存储sessionStorage
   * */
  static setSession = (name, content) => {
    if (!name || !content || !window.sessionStorage) {
      return;
    }
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
  };

  /*
   * 获取sessionStorage
   * */
  static getSession = (name) => {
    if (!name || !window.sessionStorage) {
      return;
    }
    let value = window.sessionStorage.getItem(name);
    if (value !== null) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        // value = value
      }
    }
    return value;
  };

  /*
   * 删除sessionStorage
   * */
  static removeSession = (name) => {
    if (!name || !window.sessionStorage) {
      return;
    }
    window.sessionStorage.removeItem(name);
  };

  /*
   * 清空sessionStorage
   * */
  static clearSession = () => {
    if (!window.sessionStorage) {
      return;
    }
    window.sessionStorage.clear();
  };
}

export default StorageUtil;
