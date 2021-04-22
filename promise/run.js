function run (gen) {
	var args = [].slice.call(arguments, 1), it;
	it = gen.apply(this, args)
	return new Promise()
		.then(function handleNext(value) {
			var next = it.next(value)
			return (function handleResult(next) {
				if (next.done) {
					return next.value
				} else {
					return Promise.resolve(next.value)
						.then(handleNext, function handleErr(err) {
							return Promise.resolve(it.throw(err))
								.then(handleResult)
						})
				}
			})(next)
		})
}

// function *main() {}
// run (main)


// 标准的迭代器接口
var something = (function () {
	var nextVal
	return {
		[Symbol.iterator]: function () { return this },
		next: function () {
			if (nextVal === undefined) {
				nextVal = 1
			} else {
				nextVal = (3 * nextVal) + 5
			}
			return { done: false, value: nextVal }
		}
	}
})()

