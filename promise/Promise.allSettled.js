/**
 * Promise.allSettled
 */
_allSetteld(promises) {
	return new Promise(resolve => {
		const data = []
		const len = promises.length;
		for (let i = 0; i < len; i++) {
			const promise = promises[i]
			promise.then(res => {
				data[i] = { status: 'fulfilled', value: res }
			}, error => {
				data[i] = { status: 'rejected', reason: error }
			}).finally(() => {
				if(!--count) {
					resolve(data)
				}
			})
		}
	})
}

const p1 = Promise.resolve(1)
const p2 = new Promise((resolve, reject) => setTimeout(reject, 1000, 'p2'))
const promises = [p1, p2]
promises.allSettled(promises)
.then(results => results.forEach(res => console.log(res.status)))


MyPromise.allSettled = function (promises) {
	return new MyPromise((resolve, reject) => {
		promises = Array.isArray(promises) ? promises : []
		let len = promises.length
		const argslen = len
		// 如果传入的是一个空数组，那么就直接返回一个resolved的空数组promise对象
		if (len === 0) return resolve([])
		// 将传入的参数转化为数组，赋给args变量
		let args = Array.prototype.slice.call(promises)
		// 计算当前是否所有的 promise 执行完成，执行完毕则resolve
		const compute = () => {
			if(--len === 0) { 
				resolve(args)
			}
		}
		function resolvePromise(index, value) {
			// 判断传入的是否是 promise 类型
			if(value instanceof MyPromise) {
				const then = value.then
				then.call(value, function(val) {
					args[index] = { status: 'fulfilled', value: val}
					compute()
				}, function(e) {
					args[index] = { status: 'rejected', reason: e }
					compute()
				})
			} else {
				args[index] = { status: 'fulfilled', value: value}
				compute()
			}
		}

		for(let i = 0; i < argslen; i++){
			resolvePromise(i, args[i])
		}
	})
}
