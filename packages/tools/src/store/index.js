export { default as CookieAdapter } from "./adapter/cookie";
export { default as LocalStorageAdapter } from "./adapter/localStorage";
export { default as SessionStorageAdapter } from './adapter/sessionStorage';

export const StoreAdapterType = {
  Cookie: 'cookie',
  LocalStorage: 'localStorage',
  SessionStorage: 'sessionStorage'
}
class Store {
  /**
   * 获取存储适配器
   * @param {string} adapterType 
   * @return {?}
   */
  getAdapter(adapterType) {
    let adapter
    switch (adapterType) {
      case StoreAdapterType.Cookie:
        adapter = new CookieAdapter();
        break;
      case StoreAdapterType.LocalStorage:
        adapter = new LocalStorageAdapter();
        break;
      case StoreAdapterType.SessionStorage:
        adapter = new SessionStorageAdapter();
        break;
    }
    return adapter.getSupported();
  }
}

export default Store

