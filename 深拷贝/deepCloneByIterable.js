import {isObject} from "./utils.js";

/**
 * 迭代实现深拷贝
 * 优点：
 * 1. 可以实现深层拷贝，不会栈溢出
 * 2. 可拷贝函数等基本类型数据
 *
 * 缺点：
 * 1. 实现较为复杂
 * 2. 不能拷贝循环引用的对象，会出现死循环
 *
 * */
export default function deepClone(source) {
  const root = {};

  const stack = [{
    parent: root,
    key: undefined,
    data: source
  }];

  while (stack.length > 0) {
    const node = stack.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = Array.isArray(data)? []: {};
    }

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (isObject(data[k])) {
          stack.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}
