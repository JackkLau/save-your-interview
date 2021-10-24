import {LinkedList} from "./LinkedList.js";
import {defaultEquals, Node} from "../common/utils.js";
/**
 * 单向循环链表
 */
export class CircularLinkedList extends LinkedList {
  constructor(equalFn = defaultEquals) {
    super(equalFn);
  }

  /**
   * 在链表尾部追加新节点，包括两种情况
   *   1 链表中没有节点
   *   2 链表中有节点
   */
  push(element) {
    const node = new Node(element);
    let current = this.head;

    if (!this.head) {
      this.head = node;
    } else {
      // 获取倒数最后一个节点
      current = this.getElementAt(this.size() - 1);
      // 将最后一个节点的指针指向新节点
      current.next = node;
    }
    // 将新节点的指针指向头节点
    node.next = this.head;
    this.count++;
  }

  /**
   * 在指定位置前插入新节点，具体分为以下两种情况
   *   1 在头部节点前插入
   *     a 链表中无节点
   *     b 链表中有节点
   *   2 在其他任意位置插入
   */
  insert(element, index) {
    if (index >=0 && index <= this.count) {
      const node = new Node(element);
      let current = this.head;
      if (index === 0) {
        if (!this.head) {
          this.head = node;
          node.next = this.head;
        } else {
          // 将新建节点放在头部节点之前
          node.next = current;
          // 找到尾部节点
          current = this.getElementAt(this.size() - 1);
          // 更新头部节点为新建节点
          this.head = node;
          // 将尾部节点指向头部节点完成环形
          current.next = this.head;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }

      this.count++;
      return true;
    }

    return false;
  }

  /**
   * 移除指定位置的节点，包括两种情况
   *   1 移除头部节点
   *     a 链表中只有一个节点
   *     b 链表中有大于一个节点
   *   2 移除除头部以外其他位置的节点
   *
   */
  removeAt(index) {
    if (index >=0 && index < this.size()) {
      let current = this.head;

      if (index === 0) {
        if (this.size() === 1) {
          this.head = null;
        } else {
          const removed = this.head;
          current = this.getElementAt(this.size() - 1);
          this.head = this.head.next;
          current.next = this.head;
          current = removed;
        }
      } else {
        let previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }

      this.count--;
      return current.element;
    }

    return undefined;
  }
}
