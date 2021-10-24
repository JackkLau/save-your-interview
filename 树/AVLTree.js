import {BinarySearchTree} from "./BinarySearchTree";
import {defaultCompare} from "../common/utils";

class AVLTree extends BinarySearchTree{
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }
}
