/**
 * 构造请求参数
 * @param {string} uri
 * @param {object} params
 */
function appendParams(uri, params) {
  const keyParams = [];
  // Skip any null or undefined parameter values
  Object.keys(params).forEach(function (k) {
    if (params[k] !== null && params[k] !== undefined) {
      keyParams.push(k + "=" + encodeURIComponent(params[k]));
    }
  });
  const qs = keyParams.join("&");
  // remove any trailing ? or &
  uri = uri.replace(/[?&]$/, "");
  // append ? or & depending on whether uri has existing parameters
  uri = uri.indexOf("?") === -1 ? uri + "?" : uri + "&";
  return uri + qs;
}

/**
 * 获取当前query参数值
 * @param {string} name
 * @returns
 */
function getQueryString(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return unescape(r[2]);
  }
  return null;
}

/**
 * 获取URL参数值
 * @param {string} url
 * @param {string} variable
 */
function getUrlParams(url, variable) {
  const path = new URL(url);
  const query = path.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}

export { appendParams, getQueryString, getUrlParams };
