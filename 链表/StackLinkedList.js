import {DoublyLinkedList} from "./DoublyLinkedList.js";

class StackLinkedList  {
  constructor() {
    this.items = new DoublyLinkedList()
  }

  /**
   * 向栈的尾部添加一个元素
   */
  push(element) {
    this.items.push(element);
  }

  /**
   * 弹出尾部元素
   */
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items.removeAt(this.size() - 1);
  }

  /**
   * 栈是否为空
   */
  isEmpty() {
    return this.items.isEmpty();
  }

  /**
   * 栈中元素的个数
   */
  size() {
    return this.items.size();
  }

  /**
   * 清空当前栈中所有数据
   */
  clear() {
    this.items.clear();
  }

  /**
   * 查看栈顶元素
   */
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items.getElementAt(this.size() - 1).element;
  }

  /**
   * 输出栈中元素
   */
  toString() {
    this.items.toString();
  }
}
