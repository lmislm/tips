// // proxy
// const target = {}
// const handler = {
//   set (target, key, value) {
//     console.log('set')
//     target[key] = value
//     return true
//   }
// }
// const proxy = new Proxy(target, handler)
// // console.log(proxy)

// 处理这些干扰？
// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/90
let a = [1];

let newA = new Proxy(a, {
  get(target, p, receiver) {
    console.log("get", target, p, receiver);
    return Reflect.get(target, p, receiver);
  },
  set(target, p, value, receiver) {
    console.log("set", target, p, value, receiver);
    return Reflect.set(target, p, value, receiver);
  }
});

newA.push(1);
console.log("=1==");
newA[2] = 2;
newA.length;
console.log("=2==");
newA.length = 100;
console.log("=3==");
newA.shift();
