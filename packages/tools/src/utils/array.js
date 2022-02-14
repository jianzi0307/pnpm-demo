/**
 * 数组分页
 * @param {Array} arr 数组
 * @param {Number} size 每页条数
 */
function arrayChunk(arr, size = 10) {
  const length = arr.length;
  const newArr = [];
  const i = Math.ceil((length / size) * 1.0);
  let j = 0;
  while (j < i) {
    const spare = length - j * size >= size ? size : length - j * size;
    const temp = arr.slice(j * size, j * size + spare);
    newArr.push(temp);
    j++;
  }
  return newArr;
}

/**
 * 获取某范围数字数组
 * @param {number} start 开始数
 * @param {number} end 结束数
 * @return {array}
 */
function arrayRange(start, end) {
  return Array(end - start + 1)
    .fill(0)
    .map((v, i) => i + start);
}

/**
 * 快速创建定长等值数组
 * @param {number} size
 * @param {number} num
 * @returns
 */
function arrayFill(size, num = 0) {
  return new Array(size).fill(num);
}

/**
 * 数组元素求和
 * @param {array} arr
 */
function arraySum(arr) {
  return arr.reduce(function (prev, curr, idx, arr) {
    return prev + curr;
  });
}

/**
 * 比较两个数组是否相等
 * @param {array} arr1 数组1
 * @param {array} arr2 数组2
 * @return {boolean}
 */
function arrayEquals(arr1, arr2) {
  const len1 = arr1.length;
  if (len1 !== arr2.length) {
    return false;
  }
  for (let i = 0; i < len1; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

export { arrayChunk, arrayRange, arrayFill, arraySum, arrayEquals };
