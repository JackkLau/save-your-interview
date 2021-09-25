/**
 * 判断入参是不是对象类型的数据
 * */
export function isObject(object) {
  return object && typeof object === 'object';
}

/**
 * 判断是否是基本数据类型
 * @param value
 */
export function isPrimitive(value) {
  return (typeof value === 'number' ||
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    typeof value === 'symbol')
}
