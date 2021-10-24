/**
 * 递归求解斐波那契数列第n项
 * 记忆化是一种保存前一个结果的值的优化技术，类似于缓存。
 * 用空间换时间的方法进行优化
 */
function fibonacciMemoization(number) {
  const memo = [0, 1];
  const fibonacci = (n) => {
    if (memo[n] != null) return memo[n];
    memo[n] = fibonacci(n -1) + fibonacci(n -2);
    console.log('memo: >>', memo);
    return memo[n];
  }

  return fibonacci(number)
}

console.time('start');
for (let i = 0; i < 30; i++) {
  console.log('斐波那契数列的第'+ i +'项是: >>', fibonacciMemoization(i))
}
console.timeEnd('start')
// start: 4.983ms
