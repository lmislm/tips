/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 617. 合并二叉树 2021/01/19
 * https://leetcode-cn.com/problems/merge-two-binary-trees/
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
	if(t1 && t2){
			t1.val += t2.val;
			t1.left = mergeTrees(t1.left,t2.left);
			t1.right = mergeTrees(t1.right,t2.right);
	} 
	return t1 || t2;
};