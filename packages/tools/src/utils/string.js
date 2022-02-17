import { v4 as uuidv4 } from 'uuid';

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
 * @param {string} str
 * @return {string}
 */
function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}
/**
 * 驼峰转连字符
 * @param {string} str
 * @return {string}
 */
function hyphenize(str) {
  const toStr =
    str &&
    str.replace(/([a-z])([A-Z])/g, function (_, g1, g2) {
      return g1 + "-" + g2;
    });
  return toStr && toStr.toLowerCase();
}

/**
 * 生成UUID
 * @param {boolean} noDash 是否去除短横线
 * @return {string}
 */
function genUuid(noDash = true) {
  let uuid = uuidv4();
  if (noDash) {
    uuid = uuid.replace(new RegExp("-", "g"), "");
  }
  return uuid.toLocaleLowerCase();
}

/**
 * 货币表示法 10000.00 -> 10,000.00
 * @param {number} money 
 * @return {string}
 */
function formatMoney(money) {
  if (money && money != null) {
    money = String(money);
    var left = money.split(".")[0],
      right = money.split(".")[1];
    right = right
      ? right.length >= 2
        ? "." + right.substr(0, 2)
        : "." + right + "0"
      : ".00";
    var temp = left
      .split("")
      .reverse()
      .join("")
      .match(/(\d{1,3})/g);
    return (
      (Number(money) < 0 ? "-" : "") +
      temp.join(",").split("").reverse().join("") +
      right
    );
  } else if (money === 0) {
    return "0.00";
  } else {
    return "";
  }
}

export { trim, substr, camelize, hyphenize, genUuid, formatMoney };
