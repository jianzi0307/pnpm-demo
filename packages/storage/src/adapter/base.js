import { abstract } from '@alanojs/tools';

/**
 * @abstract
 */
class BaseAdapter {
  /**
   * @abstract
   * @param {string} key
   * @return {?}
   */
  getItem(key) {
    return abstract();
  }

  /**
   * @abstract
   * @param {string} key Key
   * @param {?} value 值
   * @param {number} expires 过期时间（毫秒）默认30天
   */
  setItem(key, value, expires = 2592000000) {
    abstract();
  }

  /**
   * @abstract
   * @param {string} key
   */
  removeItem(key) {
    abstract();
  }

  /**
   * @abstract
   */
  clear() {
    abstract();
  }

  /**
   * @abstract
   * @return {*}
   */
  getSupported() {
    return abstract();
  }
}

export default BaseAdapter;
