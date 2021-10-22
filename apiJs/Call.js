function _call(ctx) {
  ctx = ctx || window
  ctx.fn = this
  const args = [...ctx].slice(1)
  ctx.fn(args)
  delete ctx.fn
  return ctx
}

const _call = function (ctx)  {
  ctx = ctx || window
  ctx['fn'] = this
  const args = [...arguments].slice(1)
  const res = ctx['fn'](...args)
  delete ctx['fn']
  return res
}
Function.prototype._call = _call
var foo = {
  value: 1
};

function bar() {
    console.log(this.value);
}

bar._call(foo); // 1
