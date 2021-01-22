/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 226. 翻转二叉树 2021/01/05
 * https://leetcode-cn.com/problems/invert-binary-tree/
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
	if (!root) {
		return null
	}
	let tmpNode = root.right
	root.right = root.left
	root.left = tmpNode
	// 每层相关节点
	invertTree(root.left)
	invertTree(root.right)
	return root
};