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

/**
 * 安全获取对象属性
 * 若获取到的值为undefined，则返回默认值
 *
 * @example
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 * safeGet(object, 'a[0].b.c')
 * =>3
 * safeGet(object, ['a', '0', 'b', 'c'])
 * => 3
 * safeGet(object, 'a.b.c', 'default')
 * => default
 *
 * @param {Object} object 对象
 * @param {string} path 属性路径
 * @param {*} defaultValue 默认值
 * @returns {*}
 */
function safeGet(object, path, defaultValue = '') {
  let result
  if (object != null) {
    if (!Array.isArray(path)) {
      const type = typeof path
      if (type === 'number' || type === 'boolean' || path == null
        || /^\w*$/.test(path)
        || !(/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/.test(path))
        || (object != null && path in Object(object))) {
        path = [path]
      } else {
        const result = []
        if (path.charCodeAt(0) === '.'.charCodeAt(0)) {
          result.push('')
        }
        const rePropName = RegExp(
          // Match anything that isn't a dot or bracket.
          '[^.[\\]]+|\\[(?:([^"\'][^[]*)|(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
          , 'g')
        path.replace(rePropName, (match, expression, quote, subString) => {
          let key = match
          if (quote) {
            key = subString.replace(/\(\)?/g, '$1')
          } else if (expression) {
            key = expression.trim()
          }
          result.push(key)
        })
        path = result
      }
    }
    let index = 0
    const length = path.length
    const toKey = (value) => {
      if (typeof value === 'string') {
        return value
      }
      const result = `${value}`
      return (result === '0' && (1 / value) === -(1 / 0)) ? '-0' : result
    }
    while (object != null && index < length) {
      object = object[toKey(path[index++])]
    }
    result = (index && index === length) ? object : undefined
  }
  return result === undefined ? defaultValue : result
}


export { hasProperty, objAttrSum, objAttrMax, safeGet };
