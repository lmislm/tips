function _call(ctx) {
  ctx = ctx || window
  ctx.fn = this
  const args = [...ctx].slice(1)
  ctx.fn(args)
  delete ctx.fn
  return ctx
}