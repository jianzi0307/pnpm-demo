import { default as CookieAdapter } from "./adapter/cookie";
import { default as LocalStorageAdapter } from "./adapter/localStorage";
import { default as SessionStorageAdapter } from "./adapter/sessionStorage";

const AdapterType = {
  Cookie: "cookie",
  LocalStorage: "localStorage",
  SessionStorage: "sessionStorage",
};
class Storage {
  /**
   * 获取存储适配器
   * @param {string} adapterType
   * @return {?}
   */
  getAdapter(adapterType) {
    let adapter;
    switch (adapterType) {
      case AdapterType.Cookie:
        adapter = new CookieAdapter();
        break;
      case AdapterType.LocalStorage:
        adapter = new LocalStorageAdapter();
        break;
      case AdapterType.SessionStorage:
        adapter = new SessionStorageAdapter();
        break;
    }
    return adapter.getSupported();
  }
}

export { Storage as StorageService, AdapterType as StorageAdapterType };
