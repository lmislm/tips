/**
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
 * 122. 买卖股票的最佳时机 II
 * 2021-01-19
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let sum = 0
  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i] > prices[i + 1]) {
      sum = sum + 0
    } else {
      sum = sum + prices[i + 1] - prices[i]
    }
  }
  return sum
};
