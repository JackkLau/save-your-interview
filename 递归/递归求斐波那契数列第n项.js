/**
 * 用递归求Fibonacci数列的第n项
 */
function fibRecursive(number) {
  if (number <1) return 0;
  if (number <=2) return 1;

  return fibRecursive(number -1) + fibRecursive(number - 2);
}
console.time('start');
for (let i = 0; i < 30; i++) {
  console.log('斐波那契数列的第'+ i +'项是: >>', fibRecursive(i))
}
console.timeEnd('start')
// start: 14.636ms
