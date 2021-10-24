/**
 * 用迭代方法求斐波那契数列的第n项
 */
function fibonacciIterative(number) {
  if (number < 1) return 0;
  if (number <= 2) return 1;

  let fibMinus2 = 0; // 第一项
  let fibMinus1 = 1; // 第二项
  let fibN = number;
  for (let i = 2; i <= number; i++) {
    fibN = fibMinus1 + fibMinus2; // f(n -1) + f(n -2)
    fibMinus2 = fibMinus1; // 更新倒数第一项
    fibMinus1 = fibN; // 更新倒数第二项
  }

  return fibN;
}

console.time('start');
for (let i = 0; i < 30; i++) {
  console.log('斐波那契数列的第'+ i +'项是: >>', fibonacciIterative(i))
}
console.timeEnd('start')
// start: 4.796ms
