// // call继承
// // function Parent() {
// // }
// // function Child () {
// //   Parent.call(this)
// // }

// // prototype的继承
// // function Parent() {}
// // function Child () {}
// // Child.prototype = new Parent()

// // 组合继承
// // function Parent () {}
// // function Child () {
// //   Parent.call(this)
// // }
// // Child.prototype = new Parent()

// // 寄生组合继承，组合继承的优化
// function Parent () {}
// function Child () {
//   Parent.call(this)
// }
// Child.prototype = Object.create(Parent.prototype)
// Child.prototype.constructor = Child

// // 原型式继承
// function object(o) {
//   function F() {}
//   F.prototype = o
//   return new F()
// }
// // function Bromise () {
// //   var self = this

// //   self.status = 'pending'
// //   self.data = undefined
// //   self.onResolvedCallback = []
// //   self.onRejectedCallback = []

// // }

// // Bromise.prototype.then = function (resolved, rejected) {

// // }

// // funtion resolvePromise() {

// // }

let r = [
  {
    attrName: '粘稠度',
    attrValue: '5W-30'
  },
  {
    attrName: '规格',
    attrValue: '4L'
  }
]

r = r.map(item => {
  return item.attrName + '：' + item.attrValue
}).join('；')

console.log(r)
