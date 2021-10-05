import {defaultEquals, Node} from "./utils.js";


export class LinkedList {
  constructor(equalFn = defaultEquals) {
    this.equalFn = equalFn;
    this.head = null;
    this.count = 0;
  }

  /**
   * 向链表尾部添加一个新元素。
   * */
  push(element) {
    const node = new Node(element);
    let current;
    // 如果链表中没有任何节点，即head指向hull,直接让head指向需要插入的node节点
    if (this.head === null) {
      this.head = node;
    } else {
      // 如果当前链表不为空
      current = this.head;
      // 则找到最后一个节点，
      while (current.next) {
        current = current.next;
      }
      // 最后一个节点的next指向需要插入的节点
      current.next = node;
    }
    // 链表中节点数量加1
    this.count++;
  }

  /**
   * 向链表的特定位置插入一个新元素。
   */
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current
      // 在第一个位置插入节点
      if (index === 0) {
        current = this.head;
        node.next = current;
        this.head = node;
      } else {
        // 在中间及末尾位置插入节点
        let previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      // 更新链表长度
      this.count++;
      return true;
    }

    return false;
  }

  /**
   * 返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回undefined
   */
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node; i++) {
        node = node.next;
      }
      return node
    }

    return undefined;
  }

  /**
   * 从链表中移除一个元素。
   */
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  /**
   * 返回元素在链表中的索引。如果链表中没有该元素则返回-1。
   */
  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count && current; i++) {
      if (this.equalFn(element, current.element)) {
        return i
      }
      current = current.next;
    }

    return -1;
  }

  /**
   * 从链表的特定位置移除一个元素。
   */
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      // 如果移除第一个节点
      if (index === 0) {
        this.head = current.next;
      } else {
        let previous = this.getElementAt(index - 1);
        current = previous.next;

        // // 如果移除的是中间的节点
        // let previous;
        // // 找到当前节点的前一个节点
        // for (let i = 0; i < index; i++) {
        //   previous = current;
        //   current = current.next;
        // }
        // 将previous的next与current的next链接起来，从而跳过需要移除的节点
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }

    return undefined;
  }

  /**
   * 如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false。
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * 返回链表包含的元素个数，与数组的length属性类似。
   */
  size() {
    return this.count;
  }

  /**
   * 获取链表的头节点
   */
  getHead() {
    return this.head;
  }

  /**
   * 返回表示整个链表的字符串。由于列表项使用了Node类，
   * 就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值。
   */
  toString() {
    if(!this.head) {
      return ''
    }

    let objString = `${this.head.element}`;
    let current = this.head.next;

    for (let i = 1; i < this.size() && current; i++) {
      objString = `${objString}, ${current.element}`;
      current = current.next;
    }

    return objString;
  }

  /**
   * 清空链表
   */
  clear() {
    this.count = 0;
    this.head = null;
  }
}
