/**
 * 题目1
 * @param {*} mutationRecords 
 * @param {*} observer 
 */
function mutationCallback(mutationRecords, observer) {
	console.log('mt1')
}

const observer = new MutationObserver(mutationCallback)
observer.observe(document.body, { attributes: true })

Promise.resolve().then(() => {
	console.log('mt2')
	setTimeout(() => {
			console.log('t1')
	}, 0)
	document.body.setAttribute('test', "a")
}).then(() => {
	console.log('mt3')
})

setTimeout(() => {
	console.log('t2')
}, 0)




/**
 * 题目2 promise async
 */

 async function async1() {
	console.log('async1 start');
	await async2();
	console.log('async1 end');
}
async function async2() {
	console.log('async2');
}
console.log('script start');
setTimeout(function() {
	console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
	console.log('promise1');
	resolve();
}).then(function() {
	console.log('promise2');
});
console.log('script end');


/**
 * 题目3
 */
 const promise = new Promise(async (resolve, reject) => {
	console.log(1)
	await resolve()
	console.log(2)
	})
	
	promise.then(() => {
	console.log(3)
	})
	
	console.log(4);


/**
 * 题目4
 * source： https://careersjs.com/magazine/javascript-job-queue-microtask/
 */

 function firstFunction() {
  thirdFunction()

  const firstResponse = Promise.resolve('1st Promise');
  const secondResponse = Promise.resolve('2nd Promise');

  setTimeout(() => {
    firstResponse.then(res=> {
      console.log(res);
    })
  })

  secondResponse.then(res=> {
    console.log(res);
  })
}

function thirdFunction() {
  const thirdResponse = Promise.resolve('3rd Promise');
  const fourthResponse = Promise.resolve('4th Promise');

  queueMicrotask(() => {
    console.log('Hello from the microtask queue')
  })

  thirdResponse.then(res=> {
    console.log(res);
  })

  setTimeout(() => {
    fourthResponse.then(res=> {
      console.log(res);
    })
  })
}

function secondFunction() {
  let i = 0;
  let start = Date.now();

  for (let j = 0; j < 5.e9; j++) {
    i++;
  }
  console.log("Loop done in " + (Date.now() - start) + 'ms');
}

setTimeout(() => {
  console.log('first timeout')
});

firstFunction()
secondFunction()
console.log('first console log')


/**
 * timu 4
 */
 function test () {
  console.log('start')
   setTimeout(() => {
       console.log('children2')
       Promise.resolve().then(() => {console.log('children2-1')})
   }, 0)
   setTimeout(() => {
       console.log('children3')
       Promise.resolve().then(() => {console.log('children3-1')})
   }, 0)
   Promise.resolve().then(() => {console.log('children1')})
   console.log('end') 
}

test()
