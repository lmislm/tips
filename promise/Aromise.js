function Aromise(executor) {
  let self = this
  self.data = undefined
  self.status = 'pending'
  self.onResolvedCallback = []
  self.onRejectedCallback = []
  // executor ready
  function resolve(value) {
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (let i = 0; i < onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }
  function reject(reason) {
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        for (let i = 0; i < onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }
  // exectutor
  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}
Aromise.prototype.then = function (onResolved, onRejected) {
  let self = this
  // 2.2.1
  onResolved = typeof onResolved === 'function' ? onResolved : function (r) { return r }
  onRejected = typeof onRejected === 'function' ? onRejected : function (e) { throw e }
  // 2.2.2
  if (self.status === 'resolved') {
    // 2.2.7
    return promise2 = new Aromise(function (resolve, reject) {
      // 2.2.4
      // onFulfilled or onRejected must not be called until the execution context stack contains only platform code. [3.1].
      // 为什么异步
      // Here “platform code” means engine, environment, and promise implementation code.
      // In practice, this requirement ensures that onFulfilled and onRejected execute asynchronously, after the event loop turn in which then is called,and with a fresh stack.
      // This can be implemented with either a “macro-task” mechanism such as setTimeout or setImmediate,
      // or with a “micro-task” mechanism such as MutationObserver or process.nextTick.
      // Since the promise implementation is considered platform code,
      // it may itself contain a task-scheduling queue or “trampoline” in which the handlers are called.
      setTimeout(function () {
        try {
          // 2.2.7.1
          const x = onResolved(self.data)
          // 2.2.7.3
          // If onFulfilled is not a function and promise1 is fulfilled,
          // promise2 must be fulfilled with the same value as promise1.
          if (x instanceof Aromise) {
            x.then(resolve, reject)
          }
          // 2.2.7.1
          // If either onFulfilled or onRejected returns a value x,
          // run the Promise Resolution Procedure [[Resolve]](promise2, x).
          resolveAromise(promise2, x, resolve, reject)
        } catch (error) {
          // 2.2.7.2
          reject(e)
        }
      })
    })
  }
  // 2.2.3
  if (self.status === 'rejected') {
    return promise2 = new Aromise(function (resolve, reject) {
      // resolve,reject异步
      setTimeout(function () {
        const x = onRejected(self.data)
        // 2.2.7.4
        // If onRejected is not a function and promise1 is rejected,
        // promise2 must be rejected with the same reason as promise1.
        if (x instanceof Aromise) {
          x.then(resolve, reject)
        }
        // 2.2.7.1
        // If either onFulfilled or onRejected returns a value x,
        // run the Promise Resolution Procedure [[Resolve]](promise2, x).
        resolveAromise(promise2, x, resolve, reject)
      })
    })
  }
  if (self.status === 'pending') {
    return promise2 = new Aromise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        let x = onResolved(value)
        if (x instanceof Aromise) {
          x.then(resolve, reject)
        }
        resolveAromise(promise2, x, resolve, reject)
      })
      self.onRejectedCallback.push(function (reason) {
        let x = onRejected(reason)
        if (x instanceof Aromise) {
          x.then(resolve, reject)
        }
        resolveAromise(promise2, x, resolve, reject)
      })
    })
  }
}
Aromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}
// 2.3
function resolveAromise(promise2, x, resolve, reject) {
  // 2.3.1
  // If promise and x refer to the same object,
  // reject promise with a TypeError as the reason.
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected'))
  }
  if (x instanceof Aromise) {
    // 2.3.2.1
    // If x is pending, promise must remain pending until x is fulfilled or rejected.
    if (x.status === 'pending') {
      x.then(function (value) {
        resolveAromise(promise2, value, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
  }
  // 2.3.3
  if ((typeof x === 'object' || typeof x === 'function') && typeof x !== null) {
    try {
      // 3.5
      // This procedure of first storing a reference to x.then, 
      // then testing that reference, and then calling that reference,
      // avoids multiple accesses to the x.then property.
      // Such precautions are important for ensuring consistency in the face of an accessor property,
      // whose value could change between retrievals.
      then = x.then
      // 2.3.3.3.4.1
      // If resolvePromise or rejectPromise have been called, ignore it.
      let thenCalledOrThrow = false
      if (typeof then === 'function') {
        // 2.3.3.3
        then.call(x,
          function res(y) {
            // 2.3.3.3.4.1
            // If resolvePromise or rejectPromise have been called, ignore it.
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            // 2.3.3.3.1
            // If/when resolvePromise is called with a value y,
            // run [[Resolve]](promise, y)
            return resolveAromise(promise2, y, resolve, reject)
          },
          function rej(r) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return reject(r)
          }
        )
      }
    } catch (r) {
      // 2.3.3.4
      // If then is not a function, fulfill promise with x
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      reject(r)
    }
  } else {
    resolve(x)
  }
}

Aromise.deferred = Bromise.defer = function () {
  var dfd = {}
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
