/**
 * 数组分页
 * @param {Array} arr 数组
 * @param {Number} size 每页条数
 */
function chunkArrayInGroups(arr, size) {
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
function rangeNumbers(start, end) {
  return Array(end - start + 1)
    .fill(0)
    .map((v, i) => i + start);
}

export { chunkArrayInGroups, rangeNumbers };
