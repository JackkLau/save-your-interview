function factorialRecursive(number) {
  if (number === 1 || number === 0) return 1;
  return number * factorialRecursive(number -1);
}

console.log('5 累乘结果是: >>', factorialRecursive(5));

