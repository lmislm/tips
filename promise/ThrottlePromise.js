/**
 * 
 * @param {() => Promise<any>} funcs 
 * @param {number} max 
 * @returns {Promise}
 */
function throttlePromise (funcs, max) {
	const results = []
	async function doWork (iterator) {
		for (let [index, item] of iterator) {
			const result = await item();
			results[index] = result
		}
	}
	const iterator = Array.from(funcs).entries()
	const workers = Array(max).fill(iterator).map(doWork)
	return Promise.all(workers).then(() => results)
}


console.log(Array.from({a:'1'}).entries())