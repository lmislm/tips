/*
 * @Author: your name
 * @Date: 2020-11-16 11:36:29
 * @LastEditTime: 2021-01-11 17:26:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \tips\leetcode.js
 */
const arr = [10,21,0,-7,35,7,9,23,18]

for (let i, len = arr.length; i < len; i++) {
	let index, min;
	 if (arr[i] > 0 && min > arr[i]) {
		 	min = arr[i]
			index = i
	 }
	 return i
}

/*
请判断一个链表是否为回文链表。

示例 1:

输入: 1->2
输出: false
示例 2:

输入: 1->2->2->1
输出: true
进阶：
你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

*/

function isPalindrome(head) {
  // 找中点
  let fast = head;
  let slow = head;
  while (fast && fast.next != null && fast.next.next != null) {
    fast = fast.next.next; // step + 2
    slow = slow.next; // step + 1
  }
  // slow 是中点
  const reverseNodes = (head) => {
    if (head == null || head.next == null) {
      return head;
    }
    let newHead = reverseNodes(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
  };
  // 反转对比
  slow = reverseNodes(slow);
  while (slow && head) {
    if (slow.val !== head.val) {
      return false;
    }
    head = head.next;
    slow = slow.next;
  }
  return true;
}

/**
 * hammingDistance
 */
const x = 1
const y = 4

// const toBinary = (num) => {
//   // const numBinary = num % 2
//   // const numBinary 
//   let b
//   let arr = []
//   while (num) {
//     num = num / 2
//     arr.push(num % 2)
//   }
//   return arr
// }
// const n = toBinary(4)
// console.log(n);

const ham = (x, y) => {
  let cnt = 0, num = x ^ y;
  console.log(num, 'num')
  while(num > 0) {
    if (num%2 == 1) ++cnt;
    num /= 2;
  }
  return cnt
}

const res = ham(1, 4)
console.log(res, '--res===');
// 4 % 2 = 2 - 0
// 2 % 2 = 1 - 0
// 1 % 2 = 0 - 1

// 1 % 2 = 1 - 0

const ham = (x, y) => {
  let cnt = 0, num = x ^ y;
  while(num) {
    if (num%2 == 1) ++cnt;
    num /= 2;
  }
  return cnt
}




/**
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
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


console.log(maxProfit([7,1,5,3,6,4]), '==')
// console.log(maxProfit([1,2,3,4,5]), '==')



/**
 * https://leetcode-cn.com/problems/merge-two-binary-trees/
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
  if (head == null || head.next == null) {
    return head;
  }
  t1.val = t1.val + t2.val
  newNode.left = t1.left + t2.left
  newNode.right = t1.right + t2.right
  t1.left = mergeTrees(newNode.left, t1.left)
  t1.right = mergeTrees(newNode.right, t2.right)
  return t1
};