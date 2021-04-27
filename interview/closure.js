function foo(a,b) {
	console.log(b)
	return {
		// 第二个foo()函数
		foo: function (c) {
			// 第三个foo()函数
			return foo(c, a)
		}
	}
}

let x = foo(0); x.foo(1); x.foo(2); x.foo(3);
let y = foo(0).foo(1).foo(2).foo(3);
let z = foo(0).foo(1); z.foo(2); z.foo(3);
