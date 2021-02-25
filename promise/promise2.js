
// // function test () {
// //   return new Promise(resolve, reject => {
// //     resolve()
// //   })
// //   .then(res => {
// //   }, err => {})
// //   .catch(err => {
// //   })
// // }
// class PromiseA () {
//   callbacks = []
//   constructor (resolve, reject) {
//     this.status = 'pending'
//     this.fulfilled = []
//     this.rejected = []
//   }
//   then (onFulfilled, onRejected) {
//     this.callbacks.push(onFulfilled)
//     // // 2.2.1
//     // if (typeof onFulfilled !== 'function' || typeof onRejected !== 'function') {
//     //   return {}
//     // }
//     // // 2.2.2
//     // if (this.status === 'resolved') {
//     //   // onFulfilled(resolved)
//     //   const x = onResolved()
//     // }
//     // if (this.status === 'rejected') {
//     //   onRejected(reject)
//     // }
//     return this
//   }
//   resolve(value) {
//     this.status 
//     this.callbacks.forEach(fn => fn(value))
//   }
// }