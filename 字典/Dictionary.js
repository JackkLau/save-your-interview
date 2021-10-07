/**
 * 为了在字典中保存value，我们将key转化为了字符串，而为了保存信息的需要，我们同样要保存原始的key。
 * 因此，我们不是只将value保存在字典中，而是要保存两个值：原始的key和value。
 * 为了字典能更简单地通过toString方法输出结果，我们同样要为ValuePair类创建toString方法。
 */
class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

/**
 * 字典
 */
export class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  /**
   * 向字典中添加新元素。如果key已经存在，那么已存在的value会被新的值覆盖。
   */
  set(key, value) {
    if (key != null && value != null) {
      const keyStr = this.toStrFn(key);
      this.table[keyStr] = new ValuePair(key, value);
      return true;
    }

    return false;
  }

  /**
   * 通过使用键值作为参数来从字典中移除键值对应的数据值。
   */
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }

    return false;
  }

  /**
   * 如果某个键值存在于该字典中，返回true，否则返回false。
   */
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }

  /**
   * 通过以键值作为参数查找特定的数值并返回。
   */
  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined: valuePair.value;
  }

  /**
   * 删除该字典中的所有值。
   */
  clear() {
    this.table = {};
  }

  /**
   * 返回字典所包含值的数量。与数组的length属性类似。
   */
  size() {
    return Object.values(this.table).length;
  }

  /**
   * 在size等于零的时候返回true，否则返回false。
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * 将字典所包含的所有键名以数组形式返回。
   */
  keys() {
    return this.keyValues().map(valuePair => valuePair.key);
  }

  /**
   * 将字典所包含的所有数值以数组形式返回。
   */
  values() {
    return this.keyValues().map(valuePair => valuePair.value);
  }

  /**
   * 将字典中所有[键，值]对返回。
   */
  keyValues() {
    return Object.values(this.table);
  }

  /**
   * 迭代字典中所有的键值对。
   * callbackFn有两个参数：key和value。该方法可以在回调函数返回false时被中止（和Array类中的every方法相似）。
   */
  forEach(callbackFn) {
    const valuePairs = this.keyValues();

    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }

  /**
   * 格式化输出字典内键值对的结果
   */
  toString() {
    if (this.isEmpty()) {
      return ''
    }

    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString}, ${valuePairs[i].toString()}`;
    }

    return objString;
  }
}


/**
 * 由于JavaScript不是强类型的语言，
 * 我们不能保证键一定是字符串。
 * 我们需要把所有作为键名传入的对象转化为字符串，
 * 使得从Dictionary类中搜索和获取值更简单
 */
function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }

  return item.toString();
}
