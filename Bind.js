Function.prototype.bind = function (o, args) {
	var self = this, boundArgs = arguments;
	return function () {
		var args = [], i;
		for(i = 1, len = boundArgs.length; i < len; i++) args.push(boundArgs[i])
		for(i = 0, len = arguments.length; i < len; i++) args.push(arguments[i])
		return self.apply(o, args)
	}
}