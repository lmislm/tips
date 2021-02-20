/*
 * @Author: your name
 * @Date: 2020-11-06 17:57:26
 * @LastEditTime: 2021-01-11 09:54:31
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \tips\regexp.js
 */
// function inheritPrototype (subType, superType) {
// 	var prototype = Object(superType.prototype)
// 	prototype.constructor = subType
// 	subType.prototype = prototype
// }

// function Object(o) {
// 	function F() {}
// 	F.prototype = o
// 	return new F()
// }

// const a = "2020-12-24 10:00:00"
const a = "2020.12.24 10:00:00"

function f(d) {
	d = String(d)
	const isValid = /\-/g.test(d)
	if (isValid) {
		return d
	}
	d = d.replace(/\./g, "-")
	return d
}

console.log(f(a))

// 只保留数字和字母
const a = '_test'
console.log(a.replace(/[^W]+/g,""));

// 校验金额
const reg = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/
// /^-?(([1-9]\d*)|\d)(\.\d{1,2})?$/ // 金额可以为负数
const amount = "1111 "
const res = reg.test(String(amount).trim())
console.log(res, 'reg')

// 校验正整数
/^\+?[1-9][0-9]*$/

/** https://segmentfault.com/a/1190000019266662 */
// 不以什么开头
/^(?!str)/
^ 判断是否是开头
?! 这里是否定向前查询
// 不以什么结尾
/.*(?<!end)$/
// 收集几个 ? 元字符用法
// (?:str)   非捕获组

// (?=str) 肯定式向前查找

// (?!str) 否定式向前查找

// (?<=str) 肯定式向后查找

// (?<!str) 否定式向后查找