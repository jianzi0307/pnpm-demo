/**
 * cookie工具
 */
class CookieUtil {
  /**
   * 获取cookie
   * @param key
   * @returns {*}
   */
  static get(key) {
    let arr = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    let reg = arr;
    arr = document.cookie.match(reg);
    if (arr) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  }

  /**
   * 设置cookie
   * @param key key
   * @param value 值
   * @param expires 缓存过期时间(毫秒)
   */
  static set(key, value, expires = 30 * 24 * 60 * 60 * 1000) {
    let exp = new Date();
    exp.setTime(exp.getTime() + expires);
    document.cookie =
      key + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
  }

  /**
   * 删除cookie
   * @param key
   */
  static del(key) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.cookie.get(key);
    if (cval != null) {
      document.cookie =
        key + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
    }
  }
}
export default CookieUtil;
