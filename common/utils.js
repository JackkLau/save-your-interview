/**
 * 单向链表上的节点
 */
export class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

/**
 * 双向链表上的节点
 */
export class DoublyNode extends Node {
  constructor(element) {
    super(element);
    this.prev = null;
  }
}

/**
 * 树上的节点
 */
export class TreeNode {
  constructor(key) {
    this.key = key;  // 节点上存储的内容
    this.left = null;  // 节点的左侧引用
    this.right = null; // 节点的右侧引用
  }
}

/**
 * 默认比较元素值是否相等
 */
export function defaultEquals(a, b) {
  return a === b;
}

export const COMPARE = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
}

/**
 * 默认比较函数，用于判断节点值排序
 */
export function defaultCompare(a, b) {
  if (a === b) return 0;
  return a < b ? COMPARE.LESS_THAN: COMPARE.BIGGER_THAN;
}
