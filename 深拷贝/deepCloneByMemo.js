import {isObject, isPrimitive} from "./utils.js";

/**
 * 带缓存的深拷贝
 * 优点：
 * 1. 可以拷贝存在循环引用的对象
 *
 * */
export default function deepClone(source) {
  let memo = {};

  function baseClone(value) {
    let res;

    if (isPrimitive(value)) {
      return value;
    } else if (Array.isArray(value)) {
      res = [...value];
    } else if (isObject(value)) {
      res = {...value};
    }

    Reflect.ownKeys(res).forEach(k => {
      if (isObject(res[k])) {
        // memo记录已经拷贝过的对象，如果memo中有，直接采用memo中的值
        if (memo[k]) {
          res[k] = memo[k];
        } else {
          memo[k] = res[k];
          res[k] = baseClone(res[k]);
        }
      }
    })
    return res;
  }

  return baseClone(source);
}


