let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = Promise.resolve(3);
let p4 = Promise.resolve(4);
let p5 = Promise.reject(5);
let p6 = Promise.reject(6);

function any(arr) {
  return new Promise((resolve, reject) => {
    for (let i of arr) {
      console.log(arr, i);
      // 有点巧妙的做法，刚好符合any的定义。then和catch换个顺序又不一样的了。
      i.then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    }
  });
}

any([p4, p2, p5, p6])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
