/**
 https://github.com/mqyqingfeng/Blog/issues/42
 https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/134
 * 实现一个柯里化函数
  add(1); 	// 1
  add(1)(2);  	// 3
  add(1)(2)(3)；  // 6
  add(1)(2, 3);   // 6
  add(1, 2)(3);   // 6
  add(1, 2, 3);   // 6
 * @param  {...any} arg 
 */
function curry(fn) {
  return judge = (...args) => {
    return fn.length === args.length ? fn(...args) : (args2) => judge(...args, args2)
  }
}

function add(a, b, c) {
  return a + b + c;
}
const addFn = curry(add);
console.log(addFn(1)(2)(2));
