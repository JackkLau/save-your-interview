import {COMPARE, defaultCompare, TreeNode} from "../common/utils.js";

/**
 * 二叉搜索树
 */
export class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn; // 比较函数，用于比较节点的值
    this.root = null;  // 根节点
  }

  /**
   * 向树中插入一个新的键。
   */
  insert(key) {
    const node = new TreeNode(key);
    if (this.root == null) {
      this.root = node;
    } else {
      this.insertNode(this.root, key);
    }
  }

  /**
   * 向树中任意位置插入节点
   */
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === COMPARE.LESS_THAN) {
      if (!node.left) {
        node.left = new TreeNode(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (!node.right) {
        node.right = new TreeNode(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  /**
   * 在树中查找一个键。如果节点存在，则返回true；如果不存在，则返回false。
   */
  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
    if (node == null) {
      return false;
    }

    if (this.compareFn(key, node.key) === COMPARE.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === COMPARE.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }

  }

  /**
   * 通过中序遍历方式遍历所有节点。
   * 中序遍历是一种以上行顺序访问BST所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点。
   * 中序遍历的一种应用就是对树进行排序操作。
   */
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }

  /**
   * 中序递归遍历所有树节点
   */
  inOrderTraverseNode(node, callback) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  /**
   * 通过先序遍历方式遍历所有节点。
   * 先序遍历是以优先于后代节点的顺序访问每个节点的。
   * 先序遍历的一种应用是打印一个结构化的文档。
   */
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }

  /**
   * 前序递归遍历所有树节点
   */
  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  };

  /**
   * 通过后序遍历方式遍历所有节点。
   * 后序遍历则是先访问节点的后代节点，再访问节点本身。
   * 后序遍历的一种应用是计算一个目录及其子目录中所有文件所占空间的大小。
   */
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }

  /**
   * 后序递归遍历所有树节点
   */
  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  };

  /**
   * 返回树中最小的值/键。
   */
  min() {
    return this.minNode(this.root);
  }

  /**
   * 从树中任意一个节点开始寻找最小的键。
   */
  minNode(node){
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }

    return current;
  }

  /**
   * 返回树中最大的值/键。
   */
  max() {
    return this.maxNode(this.root);
  }

  /**
   * 从树中任意一个节点开始寻找最大的键。
   */
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }

    return current;
  }


  /**
   * 从树中移除某个键。
   */
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  /**
   * 从树中任意节点开始移除指定键的节点
   */
  removeNode(node, key) {
    if (node == null) {
      return node;
    }

    if (this.compareFn(key, node.key) === COMPARE.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === COMPARE.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // 当前节点没有左右子节点时，给这个节点赋予null值来移除它
      if (node.left == null && node.right == null) {
        node = null;
        // 返回null来将对应的父节点指针赋予null值
        return node;
      }

      // 当前节点只存在一个子节点时
      // 如果这个节点没有左侧子节点，也就是说它有一个右侧子节点。
      // 当前节点存在右子节点时，直接让当前节点指向右节点
      if (node.left == null) {
        node = node.right;
        return node;
      } else if (node.right == null) {
        // 当前节点存在左子节点时，直接让当前节点指向左节点
        node = node.left;
        return node;
      }

      // 当前节点存在两个子节点
      // 当找到了要移除的节点后，需要找到它右边子树中最小的节点--它的继承者
      const aux = this.minNode(node.right);
      // 用它右侧子树中最小节点的键去更新这个节点的值
      node.key = aux.key;
      node.right = this.removeNode(node.right, aux.key);
      // 向它的父节点返回更新后节点的引用
      return node;


    }
  }
}

const bst = new BinarySearchTree();
bst.insert(3);
bst.insert(1);
bst.insert(2);
bst.insert(4);
bst.insert(5);
bst.insert(7);

console.log('bst: >>', bst)
bst.inOrderTraverse( k =>console.log('中序遍历: >>', k))
// 中序遍历: >> 1
// 中序遍历: >> 2
// 中序遍历: >> 3
// 中序遍历: >> 4
// 中序遍历: >> 5
// 中序遍历: >> 7

bst.preOrderTraverse( k =>console.log('前序遍历: >>', k))
// 前序遍历: >> 3
// 前序遍历: >> 1
// 前序遍历: >> 2
// 前序遍历: >> 4
// 前序遍历: >> 5
// 前序遍历: >> 7

bst.postOrderTraverse( k =>console.log('后序遍历: >>', k))
// 后序遍历: >> 2
// 后序遍历: >> 1
// 后序遍历: >> 7
// 后序遍历: >> 5
// 后序遍历: >> 4
// 后序遍历: >> 3

const min = bst.min();
console.log('min: >>', min);
// min: >> 1

const max = bst.max();
console.log('max: >>', max);

console.log('search 5: >>', bst.search(5))
console.log('search 5: >>', bst.search(2))
console.log('search 5: >>', bst.search(9))
