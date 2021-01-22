/**
 * 461. 汉明距离  2021/01/14
 * https://leetcode-cn.com/problems/hamming-distance/
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
  return ((x^y).toString(2).match(/[1]/g) || []).length;
};