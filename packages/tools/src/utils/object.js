/**
 * 判断obj是否包含key属性
 * @param Object obj 对象
 * @param String key 属性
 */
function hasProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * 对象属性求和
 * @param {array} objArr 对象数组 例如：[{name:'apple',price:100}, {name:'bnana',price:50}]
 * @param {string} attr 要求和的属性
 */
function objAttrSum(objArr, attr) {
  return objArr.reduce(function (total, currentValue, currentIndex, arr) {
    return total + currentValue[attr];
  }, 0);
};

/**
 * 对象属性最大值
 * @param {array} objArr 对象数组 例如：[{name:'apple',price:100}, {name:'bnana',price:50}]
 * @param {string} attr 要求最大值的属性
 */
function objAttrMax(objArr, attr) {
  let max = 0;
  objArr.forEach(item => {
    max = item[attr] > max ? item[attr] : max;
  });
  return max;
};

export { hasProperty, objAttrSum, objAttrMax };
