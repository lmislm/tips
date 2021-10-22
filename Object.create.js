/**
 * Pragma no-cache 缓存行为
 * Expires 过期时间
 * Cache-Control
 *  no-cache no-store max-age
 *  public private
 * 
 * If-Modified-Since If-None-Match 对应 last-modified etag 表示该资源在时间后有被修改
 * etag的生成 
 *  在nginx里面，是由Last-Modified和content-length的十六进制组合而成
 * 更强的实时性a
 */

/**
 * object.create
 * new function()
 */

 function _create (o) {
	let f = function () {}
	f.prototype = o
	return new f()
}

function _new () {
	let args = [].slice.call(arguments)
	let constructor = args.shift()
	let ctx = Object.create(constructor.prototype)
	let res = constructor.apply(ctx, args)
	return typeof res === 'object' ? res : ctx
}

function __new () {
	var ctr = [].shift.call(arguments)
	var obj = {}
	obj.__proto__ = ctr.prototype
	var ret = ctr.apply(obj, arguments)	
	return typeof ret === 'object' ? ret : obj
}
