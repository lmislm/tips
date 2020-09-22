try {
  module.exports = Bromise
} catch (e) {}

function Bromise(executor) {
  var self = this

  self.status = 'pending'
  self.data = undefined
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  // resolve
  function resolve(value) {
    if (value instanceof Bromise) {
      return value.then(resolve, reject)
    }
    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value // 2.1.2.2
        for (let i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }
  // reject
  function reject(reason) {
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason // 2.1.3.2
        for (let i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }
  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

Bromise.prototype.then = function (onResolved, onRejected) {
  var self = this
  var promise2
  // 2.2.1
  onResolved = typeof onResolved === 'function' ? onResolved : function (value) { return value }
  onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { return reason }

  if (self.status === 'resolved') {
    return promise2 = new Bromise(function (resolve, reject) {
      // it must be called after promise is fulfilled, with promise’s value as its first argument.
      // it must not be called before promise is fulfilled.
      // it must not be called more than once.
      setTimeout(function () {
        try {
          var x = onResolved(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  if (self.status === 'rejected') {
    return promise2 = new Bromise(function (resolve, reject) {
      setTimeout(() => {
        try {
          var x = onRejected(self.data)
          if (x instanceof Bromise) {
            x.then(resolve, reject)
          }
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  if (self.status === 'pending') {
    return promise2 = new Bromise(function (resolve, reject) {
      // 2.2.6
      self.onResolvedCallback.push(function (value) {
        try {
          var x = onRejected(value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
      self.onRejectedCallback.push(function (reason) {
        try {
          var x = onRejected(reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

Bromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

function resolvePromise(promise2, x, resolve, reject) {
  var then
  var thenCalledOrThrow = false
  // promise1.then(onResolved, onRejected)
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected'))
  }
  if (x instanceof Bromise) {
    if (x.status === 'pending') {
      x.then(function (value) {
        resolvePromise(promise2, value, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
    return
  }
  if ((x != null) && ((typeof x === 'object') || typeof x === 'function')) {
    try {
      then = x.then // 2.3.3.1
      if (typeof then === 'function') {
        // If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, where:
        then.call(x, function rs(y) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return resolvePromise(promise2, y, resolve, reject)
        }, function rj(r) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return reject(r)
        })
      } else { // 2.3.3.4
        resolve(x)
      }
    } catch (error) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      return reject(error) // 2.3.3.2
    }
  } else {
    resolve(x)
  }
}

Bromise.deferred = Bromise.defer = function () {
  var dfd = {}
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}