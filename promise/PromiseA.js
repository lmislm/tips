class PromiseA {
	constructor(fn) {
			this.status = 'pending';
			this.value = null;
			this.error = null;

			this.resolveArr = [];
			this.rejectArr = [];

			let resolve = (value) => {
					// 防止多次resolve
					if (this.status !== 'pending') return;
					setTimeout(()=>{
							this.value = value;
							this.status = 'fullfiled';
							// 派发过往订阅
							while(this.resolveArr.length) {
									let tmp = this.resolveArr.shift();
									tmp(value);
							}
					}, 0);
			}
			let reject = (err) => {
					// 防止多次reject
					if (this.status !== 'pending') return;
					setTimeout(()=>{
							this.status = 'rejected';
							this.error = err;
							// 派发过往订阅
							while(this.rejectArr.length) {
									let tmp = this.rejectArr.shift();
									tmp(err);
							}
					}, 0);
			}
			fn(resolve, reject);
	}
	then(fun1, fun2) {
			// 根据规范，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
			(typeof fun1 !== 'function') && (fun1 = value => value)
			// 
			(typeof fun2 !== 'function') && (fun2 = error => {
					throw(error);
			})

			return new PromiseA((resolve, reject)=>{
					let resolveItem = (param) => {
							try {
									let tmp = fun1(param);
									tmp instanceof PromiseA ? tmp.then(resolve, reject) : resolve(tmp);
							} catch (e) {
									reject(e);
							}
					}
					let rejectItem = (err) => {
							try {
									let tmp = fun2(err);
									tmp instanceof PromiseA ? tmp.then(resolve, reject) : resolve(tmp);
							} catch (e) {
									reject(e);
							}
					}

					if (this.status == 'pending') {
							this.resolveArr.push(resolveItem);
							this.rejectArr.push(rejectItem);
					} else if (this.status == 'fullfiled') {
							resolveItem(this.value);
					} else if (this.status == 'rejected') {
							rejectItem(this.error);
					}
			});
	}
	catch(rejectFn) {
			return this.then(null, rejectFn);
	}
	finally(fn) {
			// 保证了fn执行在前.. 但是有点绕
			return this.then((param)=>{
					// 万一 fn reject了
					return PromiseA.resolve(fn()).then(()=>param, ()=>param);
			}, (err) =>{
					// 万一 fn reject了
					return PromiseA.resolve(fn()).then(()=>{
							throw err;
					}, ()=>{
							throw err;
					});
			})
	}
	static resolve(param) {
			if (param instanceof PromiseA) return param;
			return new PromiseA((resolve)=>{
					resolve(param);
			})
	}
	static reject(param) {
			if (param instanceof PromiseA) return param;
			return new PromiseA((resolve, reject)=>{
					reject(param);
			})
	}

	static all(arr) {
			return new PromiseA((resolve, reject)=>{
					let i = 0;
					let ret = [];
					while(arr.length) {
							let tmp = arr.shift();
							tmp.then((param)=>{
									ret[i] = param;
									i++
									if (i == arr.length) {
											resolve(ret);
									}
							},(err) => {
									reject(err);
							})
					}
			});
	}
	static race(arr) {
			// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
			return new PromiseA((resolve, reject) => {
					arr.forEach((item)=>{
							// 状态变化是单向的
							item.then(resolve, reject);
					})
			})
	}
	// 允许reject X次 失败后Y秒继续触发
	static retry(fn, x, y) {
			return PromiseA((resolve, reject)=>{
					let failTimes = 0;
					// 也可以把历代err保存起来
					// let errArr = [];

					function cb () {
							fn().then(resolve).catch((err)=>{
									if (failTimes == x) {
											reject(err);
											return;
									}

									setTimeout(()=> {
											cb();
									}, y);

									failTimes++;
							});
					}
					cb();
			}) 
	}

	static promisefy (cb) {
			return (...arg)=>{
					return new Promise((reoslve, reject)=>{
							cb(...arg, reoslve);
					})
			}
	}
}