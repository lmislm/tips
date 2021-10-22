const obj = { a: "test" }
JSON.parse(JSON.stringify(obj))
// ES6
Object.assign({}, obj)
{...obj}
// deepClone deepCopy
function deepClone (val) {
	const isPlainObject = (val) => {
		return Object.prototype.toString.call(val) === '[object object]'
	}
	if (isPlainObject(val)) {
		const res = {}
		for (const key in val) {
			res[key] = deepClone(val[key])
		}
		return res
	} else if (Array.isArray(val)) {
		return val.slice()
	} else {
		return val
	}
}
// deepClone 消除循环引用