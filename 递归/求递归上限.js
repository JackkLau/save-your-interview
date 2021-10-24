function recursiveLimit() {
  let total = 0;

  function recursiveFn() {
    total++;
    recursiveFn();
  }

  try {
    recursiveFn();
  } catch (e) {
    console.log('e: >>', e)
    // node环境下递归次数是 15697， 报错信息：RangeError: Maximum call stack size exceeded
    // chrome 递归上限是: >> 13968， 报错信息：RangeError: Maximum call stack size exceeded
    // firefox 递归上限是: >> 30697， 报错信息： InternalError: too much recursion
    // edge 递归上限是: >> 13969, RangeError: Maximum call stack size exceeded
    console.log('递归上限是: >>', total);
  }
}

recursiveLimit();
