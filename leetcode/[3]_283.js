/**
 * 283. 移动零 2021/01/09
 * https://leetcode-cn.com/problems/move-zeroes/
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
	if (!nums) return
	let slow = ''
	let fast = ''
	for (let fast = 0; fast < nums.length; fast++) {
			if (nums[fast] != 0) {
					nums[slow++] = nums[fast]
			}
	}
	// 后面补零
	for (let i = slow; i < nums.length; i++) {
			nums[i] = 0;
	}
};