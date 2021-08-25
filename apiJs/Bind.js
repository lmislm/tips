Function.prototype.bind2 = function (o, args) {
	var self = this, boundArgs = arguments;
	return function () {
		var args = [], i;
		for(i = 1, len = boundArgs.length; i < len; i++) args.push(boundArgs[i])
		for(i = 0, len = arguments.length; i < len; i++) args.push(arguments[i])
		return self.apply(o, args)
	}
}
// https://github.com/sisterAn/JavaScript-Algorithms/issues/81
Function.prototype.myBind = function (context) {
	// 调用 bind 的不是函数，需要抛出异常
	if (typeof this !== "function") {
		throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
	}
	
	// this 指向调用者
	var self = this;
	// 实现第2点，因为第1个参数是指定的this,所以只截取第1个之后的参数
	var args = Array.prototype.slice.call(arguments, 1);
	
	// 创建一个空对象
	var fNOP = function () {};
	
	// 实现第3点,返回一个函数
	var fBound = function () {
		// 实现第4点，获取 bind 返回函数的参数
		var bindArgs = Array.prototype.slice.call(arguments);
		// 然后同传入参数合并成一个参数数组，并作为 self.apply() 的第二个参数
		return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
		// 注释1
	}
	// 实现一个new
	// 注释2
	// 空对象的原型指向绑定函数的原型
	fNOP.prototype = this.prototype;
	// 空对象的实例赋值给 fBound.prototype
	fBound.prototype = new fNOP();
	return fBound;
}
// 测试用例
let value = 2;
let foo = {
    value: 1
};
function bar(name, age) {
	return {
		value: this.value,
		name: name,
		age: age
	}
};
// bind函数 simple
Function.prototype._bind1 = function (ctx) {
	const args = [...arguments].slice(1)
	return (...bindArgs) => {
		return this.apply(ctx, [...args, ...bindArgs])
	}
}	
// // 可以new bind
Function.prototype._bind = function(ctx) {
	const args = [...arguments].slice(1)
	let fNOP = function () {}
	// this指向实例
	ctx = this instanceof fNOP ? this : ctx
	let fBound = (...bindArgs) => {
		return this.apply(ctx, [...args, ...bindArgs])
	}

	fNOP.prototype = this.prototype
	fBound.prototype = new fNOP()
	return fBound
}
let bindFoo1 = bar._bind(foo, 'jack', 20)
const res = bindFoo1()
let bindFoo2 = bar._bind(foo, 'jack')
const res2 = bindFoo2(10)
console.log(res, res2, 'res')

// const res = new _bind()
// console.log(res, 'res')
