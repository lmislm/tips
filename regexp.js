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
const a = '_fasdfa'
console.log(a.replace(/[^W]+/g,""));

// 校验金额
const reg = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/
// /^-?(([1-9]\d*)|\d)(\.\d{1,2})?$/ // 金额可以为负数
const amount = "1111 "
const res = reg.test(String(amount).trim())
console.log(res, 'reg')