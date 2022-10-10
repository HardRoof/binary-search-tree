class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  insertNode(data) {
    if (this.data == data) return;
    else if (this.data > data) {
      if (this.left) this.left.insertNode(data);
      else this.left = new Node(data);
    } else {
      if (this.right) this.right.insertNode(data);
      else this.right = new Node(data);
    }
  }

  deleteNode(data) {
    if (data < this.data && this.left) this.left = this.left.deleteNode(data);
    else if (data > this.data && this.right) this.right = this.right.deleteNode(data);
    // When the two conditions fail, then data = this.data
    else {
      if (this.right && this.left) {
        let minValue = this.right.findMinValue();
        this.data = minValue;
        this.right = this.right.deleteNode(minValue);
      } else if (this.left) return this.left;
      else if (this.right) return this.right;
      else return null;
    }
    return this;
  }

  findMinValue() {
    let current = this; // Root of right subtree
    while (current.left) current = current.left;
    return current.data;
  }

  findNode(data) {
    let node;
    if (data === this.data) return (node = this);
    else if (data < this.data && this.left) {
      node = this.left.findNode(data);
      return node;
    } else if (data > this.data && this.right) {
      node = this.right.findNode(data);
      return node;
    }
    return "Data not found in this tree";
  }

  levelOrderNode(callback) {
    let current = this;
    const queue = [current];
    const result = [];
    while (queue.length > 0) {
      result.push(current);
      queue.splice(0, 1);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      current = queue[0];
    }
    return callback(result);
  }

  displayNodeData(array) {
    let nodeData = array.map((node) => node.data);
    return nodeData;
  }

  inOrderNode(node, result = []) {
    if (!node) return;
    else if (node) {
      this.inOrderNode(node.left, result);
      result.push(node.data);
      this.inOrderNode(node.right, result);
    }
    return result;
  }

  preOrderNode(node, result = []) {
    if (!node) return;
    else if (node) {
      result.push(node.data);
      this.preOrderNode(node.left, result);
      this.preOrderNode(node.right, result);
    }
    return result;
  }

  postOrderNode(node, result = []) {
    if (!node) return;
    else if (node) {
      this.postOrderNode(node.left, result);
      this.postOrderNode(node.right, result);
      result.push(node.data);
    }
    return result;
  }

  findLeavesNode(node, leaves = []) {
    if (!node) return;
    else if (node) {
      this.findLeavesNode(node.left, leaves);
      this.findLeavesNode(node.right, leaves);
      if (!node.right && !node.left) {
        leaves.push(node);
      }
    }
    return leaves;
  }

  findHeightNode(leavesArr, nodeDepth) {
    leavesArr = leavesArr.map((node) => this.findDepthNode(node.data));
    const deepest = Math.max(...leavesArr);
    return deepest - nodeDepth;
  }

  findDepthNode(data, height = -1) {
    height++;
    if (data === this.data) return height;
    else if (data < this.data && this.left) return this.left.findDepthNode(data, height);
    else if (data > this.data && this.right) return this.right.findDepthNode(data, height);
    return "Data not found in this tree";
  }
}

class Tree {
  constructor(array) {
    this.sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(this.sortedArray);
  }

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

  // Traverses the tree in Depth-first(In-order) level order returning an array of BST values
  inOrder() {
    if (this.root) {
      return this.root.inOrderNode(this.root);
    }
  }

  // Traverses the tree in Depth-first(Pre-order) level order returning an array of BST values
  preOrder() {
    if (this.root) {
      return this.root.preOrderNode(this.root);
    }
  }

  // Traverses the tree in Depth-first(Post-order) level order returning an array of BST values
  postOrder() {
    if (this.root) {
      return this.root.postOrderNode(this.root);
    }
  }

  // Returns node height
  findHeight(data) {
    if (!this.root) return "This tree is empty";
    else {
      const node = this.root.findNode(data);
      const leavesArr = node.findLeavesNode(node);
      const nodeDepth = this.findDepth(data);
      return this.root.findHeightNode(leavesArr, nodeDepth);
    }
  }

  // Returns node depth
  findDepth(node) {
    if (!this.root) {
      return -1;
    } else return this.root.findDepthNode(node);
  }
}
