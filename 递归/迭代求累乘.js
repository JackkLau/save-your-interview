function factorialIterative(number) {
  if (number < 0) return undefined;
  let total = 1;

  for (let i = number; i >0 ; i--) {
    total *= i;
  }

  return total;
}

console.log('5 累乘结果是: >>', factorialIterative(5));
