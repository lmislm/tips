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
// ————————————————
// 版权声明：本文为CSDN博主「前端司南」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/weixin_41196185/article/details/114573462