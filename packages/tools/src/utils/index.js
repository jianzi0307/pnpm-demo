/**
 * promise异步处理简化，不用再使用trycatch处理异常情况
 *
 * 使用方法：
 * const func = async(params) => {
 *   const [err, res] = await handlePromise(fetch(params))
 *   if (err) return
 *   ....
 * }
 * @param {*} promise
 * @returns
 */
const handlePromise = (promise) =>
  promise.then((res) => [null, res]).catch((err) => [err, null]);

/**
 * 判断空值
 * @param {*} target
 * @return {boolean}
 */
function isEmpty(target) {
  if (typeof target === "string") {
    /*eslint-disable*/
    target = target.replace(/\"|&nbsp;|\\/g, "").replace(/(^\s*)|(\s*$)/g, "");
    if (
      target === "" ||
      target === null ||
      target === "null" ||
      target === "undefined"
    ) {
      return true;
    } else {
      return false;
    }
  } else if (typeof target === "undefined") {
    // 未定义
    return true;
  } else if (typeof target === "number") {
    return false;
  } else if (typeof target === "boolean") {
    return false;
  } else if (typeof target === "object" && !Array.isArray(target)) {
    if (JSON.stringify(target) === "{}") {
      return true;
    } else if (target === null) {
      // null
      return true;
    } else {
      return false;
    }
  } else if (target instanceof Array && target.length === 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * 是否定义
 * @param {*} value
 * @return {boolean}
 */
function isDef(value) {
  return value !== undefined && value !== null && value !== "";
}

/**
 * 是否对象
 * @param {*} x
 * @return {boolean}
 */
function isObj(x) {
  const type = typeof x;
  return x !== null && (type === "object" || type === "function");
}

/**
 * 深拷贝
 * @param Object obj 对象
 */
const isComplexDataType = (obj) =>
  (typeof obj === "object" || typeof obj === "function") && obj !== null;
const deepClone = function (obj, hash = new WeakMap()) {
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  const type = [Date, RegExp, Set, Map, WeakMap, WeakSet];
  if (type.includes(obj.constructor)) {
    return new obj.constructor(obj);
  }
  const allDesc = Object.getOwnPropertyDescriptors(obj);
  const cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  hash.set(obj, cloneObj);
  for (const key of Reflect.ownKeys(obj)) {
    cloneObj[key] =
      isComplexDataType(obj[key]) && typeof obj[key] !== "function"
        ? deepClone(obj[key], hash)
        : obj[key];
  }
  return cloneObj;
};

export * from "./string";
export * from "./array";
export * from "./math";
export * from "./object";
export * from "./uri";

export { handlePromise, isEmpty, isDef, isObj, deepClone };
