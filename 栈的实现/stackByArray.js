class StackByArray {
  constructor() {
    this.items = [];
    this.itemsMin = []
  }

  push(element) {
    this.items.push(element);

    if (this.itemsMin.length === 0) {
      this.itemsMin.push(element);
    } else if (element < this.getMin()) {
      this.itemsMin.push(element);
    } else {
      this.itemsMin.push(this.getMin());
    }
  }

  getMin() {
    if (this.itemsMin.length === 0) {
      throw new Error('最小栈空了');
    }

    return this.itemsMin[this.itemsMin.length - 1];
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('普通栈空了')
    }
    this.itemsMin.pop();
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }


}
