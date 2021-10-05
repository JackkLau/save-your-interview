
// 为了写出一个在获取元素时更高效的数据结构，我们将使用一个对象来存储我们的元素
class Queue {
  constructor() {
    this.count = 0;
    this.items = {};
    this.lowestCount = 0;  //由于我们将要从队列前端移除元素，同样需要一个变量来帮助我们追踪第一个元素
  }

  enqueue(element) {
    this.items[this.count++] = element;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined
    }

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined
    }

    return this.items[this.lowestCount];
  }

  isEmpty() {
    return this.count - this.lowestCount === 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  clear() {
    this.lowestCount = 0;
    this.count = 0;
    this.items = {};
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    // 此处与stack不一样之处在于，队列的第一个位置可能不是0
    let objString = `${this.items[this.lowestCount]}`;

    for (let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }

    return objString;
  }

}
