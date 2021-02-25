function asyncify (fn) {
  let origFn = fn;
  intv = setTimeout(() => {
    intv = null
    if (fn) fn()
  })
  fn = null
  return () => {
    if (intv) {
      fn = origFn.bind.apply(
        origFn,
        [this].concat([].slice.call(arguments))
      )
    } else {
      origFn.apply(this, arguments)
    }
  }
}


function delay(time) {
  return new Promise(resolve, reject) {
    setTimeout(resolve, time)
  }
}


const p = new Promise:catch()
