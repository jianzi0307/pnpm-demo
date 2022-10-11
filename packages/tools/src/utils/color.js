/**
 * 255颜色值转16进制颜色值
 * @param {number} n 255颜色值
 * @returns hex 16进制颜色值
 */
function toHex(n) {
  return `${n > 15 ? '' : 0}${n.toString(16)}`;
}

/**
 * rgba颜色对象转化为16进制颜色字符串
 * @param {object} colorObj 颜色对象
 * @returns 16进制颜色字符串
 */
function toHexString(colorObj) {
  const { r, g, b, a = 1 } = colorObj;
  const hexR = toHex(r);
  const hexG = toHex(g);
  const hexB = toHex(b);
  const alpha = a === 1 ? '' : toHex(Math.floor(a * 255))

  return `#${hexR}${hexG}${hexB}${alpha}`
}

/**
 * rgba颜色对象转化为rgb颜色字符串
 * @param {object} colorObj 颜色对象
 * @returns rgb颜色字符串
 */
function toRgbString(colorObj) {
  const { r, g, b } = colorObj;
  return `rgb(${r},${g},${b})`;
}

/**
 * rgba颜色对象转化为rgba颜色字符串
 * @param {object} colorObj 颜色对象
 * @returns rgba颜色字符串
 */
function toRgbaString(colorObj) {
  const { r, g, b, a } = colorObj;
  return `rgba(${r},${g},${b},${a})`;
}

/**
 * hex颜色字符串转颜色对象
 * hex颜色字符串：
 * 三种类型：#aabbcc常规表示、#ccc缩写形式、#aabbcc7f带透明度
 * @param {*} color 
 * @returns {object} 颜色对象
 */
function parseHexColor(color) {
  const hexVal = color.slice(1);
  let hex = '';
  let alpha = 1;
  // 缩写形式
  if (hexVal.length === 3) {
    hex = `${hexVal[0]}${hexVal[0]}${hexVal[1]}${hexVal[1]}${hexVal[2]}${hexVal[2]}`;
  }
  // 带透明度的颜色值
  if (hexVal.length === 8) {
    const a = hexVal.slice(6);
    alpha = parseInt(a, 16) / 255;
    hex = hexVal.slice(0, 6);
  }
  // 常规形式
  if (hexVal.length === 6) {
    hex = hexVal;
  }
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
    a: alpha,
  }
}

/**
 * rgba颜色字符串解析为颜色对象
 * @param {string} color 颜色字符串
 * @returns {object} 颜色对象
 */
function parseRgbaColor(color) {
  const arr = color.match(/(\d(\.\d+)?)+/g) || [];
  const res = arr.map((s) => parseInt(s, 10));
  return {
    r: res[0],
    g: res[1],
    b: res[2],
    a: parseFloat(arr[3]),
  }
}

/**
 * 颜色字符串转化为颜色对象
 * @param {string} color 颜色字符串 例如：#aabbcc,#aaa,#aabbcc7f,rgb(21,23,23),rgba(21,22,23,0.5),transparent
 * @returns {object} 颜色对象
 */
function parseColorString(color) {
  if (color.startsWith('#')) {
    return parseHexColor(color);
  } else if (color.startsWith('rgb')) {
    return parseRgbaColor(color);
  } else if (color === 'transparent') {
    return parseHexColor('#00000000');
  }
  throw new Error(`color string error: ${color}`);
}

/**
 * 颜色字符串解析为各种颜色表达方式
 * @param {string} color 颜色字符串
 * @returns {object}
 */
function getColorInfo(color) {
  const colorObj = parseColorString(color);
  const hex = toHexString(colorObj);
  const rgba = toRgbaString(colorObj);
  const rgb = toRgbString(colorObj);
  return {
    hex,
    rgba,
    rgb,
    rgbaObj: colorObj,
  };
}

/**
 * 16进制颜色字符串转化为rgba颜色字符串
 * @param {string} hex 16进制颜色字符串
 * @returns {string} rgba颜色字符串
 */
function hexToRgba(hex) {
  const colorObj = parseColorString(hex);
  return toRgbaString(colorObj);
}

/**
 * rgba颜色字符串转化为16进制颜色字符串
 * @param {string} rgba rgba颜色字符串
 * @returns {string} 16进制颜色字符串
 */
function rgbaToHex(rgba) {
  const colorObj = parseColorString(rgba);
  return toHexString(colorObj);
}

export {
  parseColorString,
  getColorInfo,
  hexToRgba,
  rgbaToHex
}
