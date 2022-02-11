/**
 * 将一个数值限制在某范围内
 * @param {number} value 输入的数值
 * @param {number} min 返回的最小值
 * @param {number} max 返回的最大值
 * @return {number} 输入数值（如果在范围内）或范围内最接近的数值
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * 返回给定数字的双曲余弦
 *
 * @param {number} x
 * @return {number} x 的双曲余弦
 */
const cosh = (function () {
  let cosh;
  if ("cosh" in Math) {
    cosh = Math.cosh;
  } else {
    cosh = function (x) {
      const y = /** @type {Math} */ (Math).exp(x);
      return (y + 1 / y) / 2;
    };
  }
  return cosh;
})();

/**
 * 返回给定数字的以2为底的对数
 *
 * @param {number} x
 * @return {number} x的以2为底的对数
 */
const log2 = (function () {
  // 包装在IIFE中，以节省每次调用时检查本机实现的开销
  let log2;
  if ("log2" in Math) {
    log2 = Math.log2;
  } else {
    log2 = function (x) {
      return Math.log(x) * Math.LOG2E;
    };
  }
  return log2;
})();

/**
 * 将弧度转换为度数
 *
 * @param {number} angleInRadians 以弧度为单位的角度
 * @return {number} 以度为单位的角度
 */
function toDegrees(angleInRadians) {
  return (angleInRadians * 180) / Math.PI;
}

/**
 * 将度数转换为弧度
 *
 * @param {number} angleInDegrees 以度为单位的角度
 * @return {number} 以弧度为单位的角度
 */
function toRadians(angleInDegrees) {
  return (angleInDegrees * Math.PI) / 180;
}

/**
 * 根据b的符号返回a/b的模
 *
 * @param {number} a 被除数
 * @param {number} b 除数
 * @return {number} 模
 */
function modulo(a, b) {
  const r = a % b;
  return r * b < 0 ? r + b : r;
}

/**
 * 计算a和b之间x的线性插值
 *
 * @param {number} a
 * @param {number} b
 * @param {number} x 要插值的值
 * @return {number} 插值
 */
function lerp(a, b, x) {
  return a + x * (b - a);
}

/**
 * 返回具有有限小数位数的数字
 *
 * @param {number} n
 * @param {number} decimals 小数位数
 * @return {number}
 */
function toFixed(n, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}

/**
 * 保留小数位数，再四舍五入取整
 *
 * @param {number} n
 * @param {number} decimals
 * @return {number}
 */
function round(n, decimals) {
  return Math.round(toFixed(n, decimals));
}

/**
 * 保留小数位数，再四舍五入向下取整
 *
 * @param {number} n
 * @param {number} decimals
 * @return {number}
 */
function floor(n, decimals) {
  return Math.floor(toFixed(n, decimals));
}

/**
 * 保留小数位数，再四舍五入向上取整
 * @param {number} n
 * @param {number} decimals
 * @return {number}
 */
function ceil(n, decimals) {
  return Math.ceil(toFixed(n, decimals));
}

/**
 * 获取min～max之间的随机数
 * @param number min
 * @param number max
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {
  cosh,
  log2,
  toDegrees,
  toRadians,
  modulo,
  lerp,
  clamp,
  toFixed,
  round,
  floor,
  ceil,
  randomNumber,
};
