import {LinkedList} from "./LinkedList.js";
import {defaultEquals, DoublyNode} from "../common/utils.js";

export class DoublyLinkedList extends LinkedList{
  constructor(equalFn = defaultEquals) {
    super(equalFn);
    this.tail = null;
  }

  /**
   * 插入元素，具体分三种情况
   *    1 在头部插入节点
   *      a 链表中没有节点
   *      b 链表中有节点
   *    2 在尾部插入节点，因为第一步已经判断了index为0的情况，所以这一步链表中必定有节点
   *    3 在中间插入节点
   */
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let current = this.head;
      if (index === 0) {
        if (!current) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = current;
          current.prev = node
          this.head = node;
        }
      } else if (index === this.count) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        node.next = current;
        previous.next = node;
        current.prev = node;
        node.prev = previous;
      }

      this.count++;
      return true;
    }

    return false;
  }

  /**
   * 从任一位置移除一个节点，具体分为一下三种情况：
   *  检验位置有效性，index必须大于等于0，并且小于链表长度，因为链表位置索引从0开始
   *   1 从头部移除节点
   *     a 链表中只有一个节点
   *     b 链表中有大于1个节点
   *   2 从尾部移除节点
   *   3 从中间移除节点
   *
   */
  removeAt(index) {
    if (index >=0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = this.head.next;
        if (this.count === 1) {
          this.tail = null;
        } else {
          this.head.prev = null;
        }
      } else if (index === this.count - 1) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = null;
      } else {
        current = this.getElementAt(index);
        const previous = current.prev;
        // 将前一个元素和后一个元素链接，跳过当前元素
        previous.next = current.next;
        current.next.prev = previous;
      }

      this.count--;
      return current.element;
    }
    return undefined;
  }

  /**
   * 获取指定位置的节点
   *   如果索引在前半段，即链表长度的二分之一前，则从头开始遍历
   *   反之，则从尾部开始遍历
   *   以便优化发挥双向链表的优势，加快查找性能
   */
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      if (index <= this.size() / 2) {
        for (let i = 0; i < this.size() / 2 && node; i++) {
          node = node.next;
        }
      } else {
        for (let i = this.size(); i > 0 && node; i--) {
          node = node.prev;
        }
      }
      return node;
    }

    return undefined;
  }

  /**
   * 向链表尾部追加新节点
   */
  push(element) {
    const node = new DoublyNode(element);
    // 如果链表中没有节点
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      // 如果链表中有节点
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.count++;
  }

  /**
   * 获取链表中指定元素就近所在的位置索引值，为找到指定元素返回-1
   */
  indexOf(element) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (this.equalFn(current.element, element)) {
        return index;
      }

      index++
      current = current.next;
    }

    return -1;
  }

  /**
   * 获取尾部节点
   */
  getTail() {
    return this.tail;
  }

  /**
   * 清空链表
   */
  clear() {
    super.clear();
    this.tail = null;
  }
}
