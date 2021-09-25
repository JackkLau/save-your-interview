import {isObject} from "./utils.js";
/**
 * 普通递归实现深拷贝
 * 优点：
 * 1. 实现简单
 * 2. 能够赋值函数，undefined数据类型
 *
 * 缺点：
 * 1. 递归层次较深时会出现栈溢出
 * 2. 深拷贝循环嵌套的对象时会报错
 * 3. 无法拷贝js内置对象
 *
 * 
 * */
export default function deepClone(source) {
  if (!isObject(source)) {
    return source;
  }

  const result = Array.isArray(source) ? [] : {};

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      result[key] = isObject(source[key])? deepClone(source[key]): source[key];
    }
  }

  return result;
}
