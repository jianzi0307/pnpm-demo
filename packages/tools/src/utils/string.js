/**
 * 去除前后空白字符
 *
 * @param {string} str 原串
 * @return {string}
 */
function trim(str) {
  return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "");
}

/**
 * 字符串截取 包含对中文处理
 *
 * @param {*} str 需截取字符串
 * @param {*} start 开始截取位置
 * @param {*} length 截取长度
 * @returns
 */
function substr(str, start, length) {
  // eslint-disable-line
  if (str.replace(/[\u4e00-\u9fa5]/g, "**").length <= length) {
    return str;
  }
  let len = 0;
  let tmpStr = "";
  for (let i = start; i < str.length; i++) {
    // 遍历字符串
    if (/[\u4e00-\u9fa5]/.test(str[i])) {
      // 中文 长度为两字节
      len += 2;
    } else {
      len += 1;
    }
    if (len > n) {
      break;
    } else {
      tmpStr += str[i];
    }
  }
  return tmpStr;
}

/**
 * 连字符转驼峰
 */
const camelizeRE = /-(\w)/g;
function camelize(str) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

/**
 * 获取UUID
 * @param {boolean} noDash 是否去除短横线
 * @return {string}
 */
function getUuid(noDash = true) {
  let uuid = uuidv4();
  if (noDash) {
    uuid = uuid.replace(new RegExp("-", "g"), "");
  }
  return uuid.toLocaleLowerCase();
}

export { trim, substr, camelize, getUuid };
