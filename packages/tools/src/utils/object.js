/**
 * 判断obj是否包含key属性
 * @param Object obj 对象
 * @param String key 属性
 */
function hasProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export { hasProperty };
