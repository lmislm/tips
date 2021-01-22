/**
 * 110. 平衡二叉树
 * https://leetcode-cn.com/problems/balanced-binary-tree/
 * 高度差不超过 1
 * 2021-01-22
 * 建议先做 104题，求深度
 * @param {*} root 
 */
const isBalanced = (root) => {
  if (root === null) return true
  // 求树的高度, 104题
  const treeHeight = (root) => {
    if (root === null) return root
    const leftHeight = treeHeight(root.left)
    const rightHeight = treeHeight(root.right)
    return Math.max(leftHeight, rightHeight) + 1
  }
  // 求左子树和右子树高度
  const lh = treeHeight(root.left)
  const rh = treeHeight(root.right)
  if (Math.abs(lh - rh) > 1) {  
    return false
  } 
  // 判断是否每个左右子树的高度差是1，递归求解
  if (!isBalanced(root.left) || !isBalanced(root.right)) {
    return false
  }
  return root
}
