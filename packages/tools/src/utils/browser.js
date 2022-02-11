// 获取浏览器内核，通过内核判断
const detectIE = () => {
  // 获取浏览器信息
  const ua = window.navigator.userAgent;

  // MSIE内核
  const msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  // Trident(又称为MSHTML) 代表：Internet Explorer
  const trident = ua.indexOf("Trident/");
  if (trident > 0) {
    const rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  // Edge浏览器
  const edge = ua.indexOf("Edge/");
  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }

  return false;
};

// 是否浏览器
const isBrowser = () =>
  typeof window !== "undefined" && typeof window.document !== "undefined";

// 是否IE浏览器
const isIE = () => isBrowser && detectIE();

export { detectIE, isBrowser, isIE };
