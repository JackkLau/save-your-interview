/**
 * 采用JSON序列化的方式进行深拷贝
 * 优点：
 *    1. 实现简单
 *
 * 缺点：
 *    1. 无法拷贝js中内置对象，函数等
 *    2. 拷贝循环引用的对象会报错
 *    3. 对象层级较深有栈溢出问题
 *    4. 无法拷贝copyObj对象原型链上的属性和方法
 **/
export default function deepClone(source) {
  const jsonString = JSON.stringify(source);
  return JSON.parse(jsonString);
}
