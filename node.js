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
    if (callback) return callback(result);
    return result;
  }

  displayNodeData(array) {
    let nodeData = array.map((node) => node.data);
    return nodeData;
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

  inOrderNode(node, result = []) {
    if (!node) return;
    else if (node) {
      this.inOrderNode(node.left, result);
      result.push(node.data);
      this.inOrderNode(node.right, result);
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

  isBalancedNode(tree, root) {
    if (root == null) return true;
    let leftNode = tree.findHeight(root.left);
    let rightNode = tree.findHeight(root.right);
    if (
      Math.abs(leftNode - rightNode) <= 1 &&
      this.isBalancedNode(root.left) == true &&
      this.isBalancedNode(root.right) == true
    )
      return true;
    return false;
  }
}

export default Node;
