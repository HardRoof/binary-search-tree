import Node from "./node.js";

class Tree {
  constructor(array) {
    this.sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(this.sortedArray);
  }

  // Builds a balanced tree out of an array
  buildTree(sortedArray) {
    if (sortedArray.length === 0) return null;
    let middleIndex = Math.floor(sortedArray.length / 2);
    const newNode = new Node(sortedArray[middleIndex]);

    const firstHalf = sortedArray.slice(0, middleIndex);
    const secondHalf = sortedArray.slice(middleIndex + 1);
    newNode.left = this.buildTree(firstHalf);
    newNode.right = this.buildTree(secondHalf);

    return newNode;
  }

  // Insert values into tree
  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
    } else {
      this.root.insertNode(value);
    }
  }

  // Delete values in the tree
  delete(value) {
    if (this.root) {
      this.root = this.root.deleteNode(value);
    }
  }

  // Accepts a value and returns the node with the given value
  find(value) {
    if (this.root) {
      return this.root.findNode(value);
    }
  }

  // Traverses the tree in breadth-first level order returning an array of BST values
  levelOrder() {
    if (this.root) {
      return this.root.levelOrderNode(this.root.displayNodeData);
    }
  }

  // Traverses the tree in Depth-first(Pre-order) level order returning an array of BST values
  preOrder() {
    if (this.root) {
      return this.root.preOrderNode(this.root);
    }
  }

  // Traverses the tree in Depth-first(In-order) level order returning an array of BST values
  inOrder() {
    if (this.root) {
      return this.root.inOrderNode(this.root);
    }
  }

  // Traverses the tree in Depth-first(Post-order) level order returning an array of BST values
  postOrder() {
    if (this.root) {
      return this.root.postOrderNode(this.root);
    }
  }

  // Returns node height
  findHeight(node) {
    if (!this.root) return "This tree is empty";
    if (!node) return 0;
    if (!(node instanceof Node)) return "Data not found in this tree";
    const leavesArr = node.findLeavesNode(node);
    const nodeDepth = this.findDepth(node.data);
    return this.root.findHeightNode(leavesArr, nodeDepth);
  }

  // Returns node depth based on node data
  findDepth(nodeData) {
    if (!this.root) {
      return -1;
    } else return this.root.findDepthNode(nodeData);
  }

  // Checks if the tree is balanced
  isBalanced() {
    if (this.root) {
      return this.root.isBalancedNode(this, this.root);
    }
  }

  // Rebalances an unbalanced tree
  rebalance() {
    if (!this.root) {
      console.log("This tree is empty");
      return this;
    } else if (!this.isBalanced()) {
      const treeNodes = this.preOrder();
      let balancedTree = new Tree(treeNodes);
      console.log(balancedTree);
      return balancedTree;
    } else {
      console.log("This tree is already balanced");
      return this;
    }
  }

  // Console.log the tree in a structured format
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.right) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "|   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "|   "}`, true);
    }
  }
}

export default Tree;
