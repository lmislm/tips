/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 100. 相同的树
 * https://leetcode-cn.com/problems/same-tree/
 * 2021-01-24
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
	if (p === null && q === null) return true
	// 判空
	if (p === null || q === null) return false
	// 比较相等
	if (p !== null && q !== null && p.val !== q.val) return false
	// 递归
	return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};