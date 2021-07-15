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
