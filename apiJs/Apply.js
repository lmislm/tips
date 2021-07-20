function _apply(ctx){
	ctx = ctx || window
	ctx.fn = this
	if (arguments[1]) {
		ctx.fn(...arguments[1])
	}	else {
		ctx.fn()
	}
	delete ctx.fn
	return ctx
}