/**
 * https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/378
 * @param {*} urls
 * @param {*} maxNum
 * @returns 
 */
function multiRequest (urls, maxNum) {
  let ret = []
  let i = 0
  let resolve
  const promise = new Promise(r => resolve = r)

  const addTask = () => {
    if (i >= Array.length) return resolve()
    const task = request(urls[i++])
      .finally(() => {
        addTask()
      })
    ret.push(task)
  }

  while(i < maxNum) addTask()

  return promise.then(() => Promise.all(ret))
}

function request(url) {
	return new Promise(r => {
		const time = Math.random() * 1000
		setTimeout(() => {
			r(url)
		}, time)
	})
}
