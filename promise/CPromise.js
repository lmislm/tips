class PromiseB {
	constructor(executor) {
		// 实例属性和方法负责收集resolve和reject
		this.status = 'pending'
		this.value = undefined
		this.resolveStacks = []
		this.rejectStacks = []
		// resolve 状态机
		let resolve = (value) => {
			setTimeout(() => {
				this.status = 'fullfiled'
				this.value = value
				// 出队列
				while(this.resolveStacks.length > 0) {
					this.resolveStacks.shift()(value)
				}
			})
		}
		// reject 状态机
		let reject = (value) => {
			this.status = 'rejected'
			this.value = value
			while(this.rejectStacks.length > 0) {
				this.rejectStacks.shift()(value)
			}
		}
		try {
			// 执行函数
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}
	then(onResolved, onRejected) {
		let promise2 = undefined
		// 链式调用的忽略处理，出错就往下继续执行
		onResolved = typeof onResolved === 'function' ? onResolved : val => val
		onRejected = typeof onRejected === 'function' ? onRejected : err => throw(err)
		// 履行
		if (this.status === 'fullfiled') {
			// promise 的 return 执行构造函数
			return promise2 = new PromiseB((resolve, reject) => {
				setTimeout(() => {
					try {
						const x = onResolved(this.value)
						if (x instanceof PromiseB) {
							x.then(resolve, reject)
						}
						resolvePromise(promise2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				})
			})
		}
		// 拒绝
		if (this.status === 'rejected') {
			return promise2 = new PromiseB((resolve, reject) => {
				setTimeout(() => {
					const x = onRejected(this.value)
					if (x instanceof PromiseB) {
						x.then(resolve, reject)
					}
					resolvePromise(this.value)
				})
			})
		}
		// 阻塞
		if(this.status === 'pending') {
			return promise2 = new PromiseB((resolve, reject) => {
				setTimeout(() => {
					this.resolveStacks.push((value) => {
						const x = onResolved(value)
						if (x instanceof PromiseB) {
							
						}
					})
				})
			})
		}
	}
}
