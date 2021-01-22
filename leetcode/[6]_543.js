/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 543. 二叉树的直径 2021/01/17
 * https://leetcode-cn.com/problems/diameter-of-binary-tree/
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
	// 深度查询？广度查询？
	let diameterLen = 0
	const dfs = (root) => {
			if (!root) return null
			let left = root.left ? dfs(root.left) + 1 : 0
			let right = root.right ? dfs(root.right) + 1 : 0
			
			diameterLen = Math.max(left + right, diameterLen)
			return Math.max(left, right)
	}
	dfs(root)
	return diameterLen
};