/**
 * 448. 找到所有数组中消失的数字 2021/01/11
 * https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
  for (let i = 0, len = nums.length; i < len; i++) {
    const abs = (num) => {
      return Math.abs(num)
    }
    nums[abs(nums[i]) - 1] = -abs(nums[abs(nums[i]) - 1])
  }
  let res = []
  for (let i = 0, len = nums.length; i < len; i++) {
    if (nums[i] > 0) {
      res.push(i + 1)
    }
  }
  return res  
};