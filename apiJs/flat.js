// 内层多层嵌套，平铺出来
const list = [
	{
		a: 'a',
		list: [
			{
				b: 'b',
				list: [
					{
						c: 'c',
						list: [{ d: 'd'}, { dd: 'dd'}]
					}
				]
			}
		]
	},{
		aa: 'aa'
	}
]


function flat (arr, depth, result) {
	result = result || [];
	if (arr == null) return result;
	console.log(arr, 'aaaaa')
	for (const value of arr ) {
		console.log(value, 'value')
		if (depth > 0 && Array.isArray(value)) {
			if (depth > 1) {
				flat(value, depth - 1, Array.isArray(value), result)
			} else {
				result.push(...value)
			}
		} else {
			result[result.length] = value;
		}
	}
	return result;
}

const res = flat(list, 1 / 0)
console.log(res, 'res')
console.log()