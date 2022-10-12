import Tree from "./binary-tree.js";

const randomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

let myTree = new Tree(randomArray(25));
myTree.prettyPrint();
console.log("Balanced:", myTree.isBalanced());
console.log("Level order =>", myTree.levelOrder());
console.log("Preorder =>", myTree.preOrder());
console.log("Inorder =>", myTree.inOrder());
console.log("Post order =>", myTree.postOrder());

for (let i = 0; i < 5; i++) {
  myTree.insert(Math.floor(Math.random() * 20));
}
myTree.prettyPrint();
console.log("Balanced:", myTree.isBalanced());
myTree = myTree.rebalance();

myTree.prettyPrint();
console.log("Balanced:", myTree.isBalanced());
console.log("Level order =>", myTree.levelOrder());
console.log("Preorder =>", myTree.preOrder());
console.log("Inorder =>", myTree.inOrder());
console.log("Post order =>", myTree.postOrder());
