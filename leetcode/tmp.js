

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 双指针？队列
const maxSlidingWindow = (nums, k) => {
  const res = [];
  const q = [];

  for (let i = 0; i < nums.length; i++) {
    while (q.length - 1 >= 0 && nums[i] > q[q.length - 1]) q.pop();
    q.push(nums[i]);

    // When i + 1 - k >= 0, the window is fully overlapping nums
    const j = i + 1 - k;
    if (j >= 0) {
      res.push(q[0]);
      if (nums[j] === q[0]) q.shift(); // If the biggest element in q is about to exit window, remove it from q
    }
  }
  return res;
};
// const nums = [1,3,-1,-3,5,3,6,7]
const nums = [1,3,1,2,0,5]

const k = 3
const res = (maxSlidingWindow(nums, k))

console.log(res, 'res')
