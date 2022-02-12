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
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
function randomNumber(
  min = Number.MIN_VALUE,
  max = Number.MAX_VALUE
) {
  return min + Math.round(Math.random() * (max - min));
}

/**
 * 区间映射
 * 将[Omin，Omax]上每个数映射到区间[Nmin,Nmax]上。
 * 映射算法思想：计算出N区间长度除以O区间长度，得出O区间上单位长度对应于N区间上的大小，
 * 再将O区间上每个数减去O区间最小值后乘以单位区间对应的长度，最后加上N区间的最小值，
 * 实现投射到N区间上
 * @param {number} num 原区间from中的数
 * @param {object} to 目标区间{min:Nmin,max:Nmax}
 * @param {object} from 原区间{min:Omin,max:Omax} 
 * @return {number}
 */
function rangeMap(num, to, from) {
  from = from || { 'min': 1, 'max': 60 };
  num = num < from['min'] ? from['min'] : num;
  num = num > from['max'] ? from['max'] : num;
  return ((to['max'] - to['min']) / (from['max'] - from['min'])) *
    (num - from['min']) +
    to['min'];
}

/**
 * 区间映射（echarts中提取的线性映射）
 * 将domain区间中的一个值映射到range区间
 * 
 * @param  {number} val domain区间中的一个值
 * @param  {Array.<number>} domain 原区间
 * @param  {Array.<number>} range 目标区间
 * @param  {boolean} clamp 是否限制范围
 * @return {(number}
 */
function linearMap(val, domain, range, clamp) {
  var subDomain = domain[1] - domain[0];
  var subRange = range[1] - range[0];

  // hack
  if (subDomain === 0 && domain[0] === 0) {
    return range[0];
  }

  if (subDomain === 0) {
    return subRange === 0
      ? range[0]
      : (range[0] + range[1]) / 2;
  }

  // Avoid accuracy problem in edge, such as
  // 146.39 - 62.83 === 83.55999999999999.
  // See echarts/test/ut/spec/util/number.js#linearMap#accuracyError
  // It is a little verbose for efficiency considering this method
  // is a hotspot.
  if (clamp) {
    if (subDomain > 0) {
      if (val <= domain[0]) {
        return range[0];
      }
      else if (val >= domain[1]) {
        return range[1];
      }
    }
    else {
      if (val >= domain[0]) {
        return range[0];
      }
      else if (val <= domain[1]) {
        return range[1];
      }
    }
  }
  else {
    if (val === domain[0]) {
      return range[0];
    }
    if (val === domain[1]) {
      return range[1];
    }
  }
  return (val - domain[0]) / subDomain * subRange + range[0];
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
  rangeMap,
  linearMap
};
