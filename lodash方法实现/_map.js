const {describe, it} = require('mocha');
const assert = require('assert');

/**
 * 对集合进行映射操作
 */
function _map(array, iteratee) {
  // 手动创建数组索引，用于处理类数组
  let index = -1;
  // 如果传入的值是空，则直接返回空数组
  // 如果传入的是类数组，则返回映射后的数组
  const length = array == null ? 0 : array.length;
  // 创建稀疏数组，用于存储返回值
  const result = new Array(length);
  // 遍历数组，并用迭代回调函数对数组进行处理，结果按照原数组或者类数组顺序存入返回值中
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}

describe('map', () => {
  const arr = [1, 2, 4];
  const square = (n) => n * n;
  it('返回对测试数组的映射操作', function () {
    assert.deepEqual(_map(arr, square), [1, 4, 16]);
  });
})
