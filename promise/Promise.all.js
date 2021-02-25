// promise all
Promise.prototype.all = (arr) => {
	return new Promise((resolve, reject) => {
		let index = 0
		for (let i = 0, len = arr.length; i < len; i++) {
			Promise.resolve(arr[i]).then(res => {
				index++
				if (index === len) {
					resolve(res)
				}
			}, err => {
				reject(new Error(err))
			})
		}
	})
}
