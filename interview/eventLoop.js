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
