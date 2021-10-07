/**
 * 集合
 */
export class MSet {
  constructor() {
    this.items = {}; // JavaScript的对象不允许一个键指向两个不同的属性，也保证了集合里的元素都是唯一的
  }

  /**
   * 向集合中添加元素
   * 对于给定的element，可以检查它是否存在于集合中。
   * 如果不存在，就把element添加到集合中（行{1}），返回true，表示添加了该元素。
   * 如果集合中已经有了这个元素，就返回false，表示没有添加它。
   */
  add(element) {
    if (!this.has(element)) {
      this.items[element] =element;
      return true
    }
    return false;
  }

  /**
   * 删除集合中指定的元素
   * 验证给定的element是否存在于集合中。
   * 如果存在，就从集合中移除element，返回true，表示元素被移除；否则返回false。
   */
  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }

    return false;
  }

  /**
   * 判断集合中是否存在给定元素
   * 如果有返回true，反之返回false
   */
  has(element) {
    // 该方法返回一个表明对象是否具有特定属性的布尔值。in运算符则返回表示对象在原型链上是否有特定属性的布尔值。
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  /**
   * 移除集合中所有元素
   * 要重置items对象，需要做的只是把一个空对象重新赋值给它
   */
  clear() {
    this.items = {};
  }

  /**
   * 返回集合所包含元素的数量。
   */
  size() {
    return Object.keys(this.items).length;
  }

  /**
   * 低版本浏览器中获取集合中元素的个数
   * 比如IE9以下版本、Firefox 4以下版本、Chrome 5以下版本、Opera 12以下版本、Safari 5以下版本等
   */
  sizeLegacy () {
    let count = 0;
    for (let key in this.items) {
      if (this.has(key)) {
        count++;
      }
    }

    return count;
  }

  /**
   * 返回一个包含集合中所有值（元素）的数组
   */
  values() {
    return Object.values(this.items);
  }

  /**
   * 低版本浏览器中返回一个包含集合中所有值（元素）的数组
   * 比如IE9以下版本、Firefox 4以下版本、Chrome 5以下版本、Opera 12以下版本、Safari 5以下版本等
   */
  valuesLegacy() {
    const values = [];
    for (const key in this.items) {
      if (this.has(key)) {
        values.push(this.items[key])
      }
    }

    return values;
  }

  /**
   * 并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
   */
  union(otherSet) {
    const unionSet = new MSet();

    for (const key in this.items) {
      unionSet.add(this.items[key]);
    }

    for (const key in otherSet) {
      unionSet.add(otherSet[key]);
    }

    return unionSet;
  }

  /**
   * 交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
   */
  intersection(otherSet) {
    const interSet = new MSet();
    const values = this.values();

    let bigSet = values;
    let smallSet = otherSet;

    if (otherSet.length - values.length > 0) {
      bigSet = otherSet;
      smallSet = values;
    }

    for (let i = 0; i < smallSet.length; i++) {
      if (bigSet.has( values[i])) {
        interSet.add(values[i]);
      }
    }

    return interSet;
  }

  /**
   * 差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。
   */
  difference(otherSet) {
    const differenceSet = new Set();

    this.values().forEach(v => {
      if (!otherSet.has(v)) {
        differenceSet.add(v)
      }
    })

    return differenceSet;
  }

  /**
   *  子集：验证一个给定集合是否是另一集合的子集。
   */
  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    }

    let isSubset = true;
    this.values().every(v => {
      if (!otherSet.has(v)) {
        isSubset = false;
        return false;
      }

      return true;
    })

    return isSubset;
  }
}
