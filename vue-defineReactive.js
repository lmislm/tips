// function defineReactive (obj,key,val,customsetter,shallow) {
//   var dep = new Dep();
//   Object.defineProperty(obj, key, {
//     enumerable: true,
//     configurable: true,
//     get: function reactiveGetter () {
//       dep.depend()

//     }
//   })
// }

// // get --dep.depend()
// // set --dep.notify()
const a = {"310101":"ersdveaf","310102":"1311313","310100":"海南"}
for (let i in a) {
  console.log(a[i],i )
}
