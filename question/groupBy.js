/**
 * groupBy
 * param [{id: 1}, {id:2, pId: 1}, {id: 3, pId: 2}, {id: 4}, {id:3, pId: 2}, {id: 5, pId: 4}]
 * return [{id: 1, child: [{id: 2, pId: 1, child: [{ id: 3, pId: 2}]}]}, {id: 4, child: [{id: 5, pId: 4}]}]
 * @param {*} arr 
 */
 function trans(arr) {
	const uniqueMap = arr.reduce((a, c) => ((a[c.id] = c), a), {})
	let res = []
	for (let item of Object.values(uniqueMap)) {
		if (!item.pId) {
			res.push(item)
		} else {
			const parent = uniqueMap[item.pId]
			parent['child'] = parent['child'] || []
			parent['child'].push(item)
		}
	}
	return res
}

console.log(
  trans([
    { id: 1 },
    { id: 2, pId: 1 },
    { id: 3, pId: 2 },
    { id: 4 },
    { id: 3, pId: 2 },
    { id: 5, pId: 4 }
  ])
);