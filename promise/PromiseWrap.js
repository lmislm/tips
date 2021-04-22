// 来自 你不知道的JS ，中卷，Promise
// -- promisory
Promise.wrap = function (fn) {
	return function () {
		var args = [].slice.call(arguments)
		return new Promise(function (resolve)) {
			fn.apply(
				null,
				args.concat(function (err, v) {
					if (err) {
						reject(err)
					} else {
						resolve(v)
					}
				})
			)
		}
	}
}
var request = Promise.wrap(ajax)
request('http://some.url.l')
// .then()
