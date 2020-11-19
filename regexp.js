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