/**
 * 13. 罗马数字转整数
 * 
 * https://leetcode-cn.com/problems/roman-to-integer/
 * 2021-02-03
 * 
 * @param {string} s
 * @return {number}
 */
const romanTonum = (s) => {
	// 左边小于右边，两个合成一个，然后右边减去左边。
	// 左边不小于右边，单个计算
	// 求总和
	const mapObj = { "I": '1', 'V': '5', 'X': "10", "L": "50", "C": "100", 'D': "500", "M": "1000" }
	const strArr = s.split("")
	let sum = 0
	for (let i = 0, len = strArr.length; i < len;) {
		const curVal = parseInt(mapObj[strArr[i]])
		const nextVal = strArr[i+1] && parseInt(mapObj[strArr[i+1]]) || 0
		if (curVal < nextVal) {
			sum += (nextVal - curVal)
			i += 2
		} else {
			i++
			sum += curVal
		}
	}
	return sum
}

const res = romanTonum("LVIII")
console.log(res, 'res')

