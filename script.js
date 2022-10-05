class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
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
}
