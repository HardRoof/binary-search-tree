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
}
