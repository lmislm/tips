// 1

async function async1() {
  console.log('async1 start');
  new Promise((resolve, reject) => {
    try {
      throw new Error('error1')
    } catch(e) {
      console.log(e);
    }
    setTimeout(() => { 
      resolve('promise4')
    }, 3 * 1000);
  })
    .then((res) => { 
      console.log(res);
    }, err => {
      console.log(err);
    })
    .finally(res => {
      console.log(res);
    })
  console.log(await async2());
  console.log('async1 end');
}

function async2() {
  console.log('async2');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, 1 * 3000);
  })
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0)

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
})
  .then(() => {
    console.log('promise2');
    return new Promise((resolve) => {
      resolve()
    })
      .then(() => {
        console.log('then 1-1')
      })
  })
  .then(() => {
    console.log('promise3');
  })
