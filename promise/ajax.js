function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]'
}

function serialize (params) {
	let result = ''
	if (isObject(params)) {
		Object.keys(params).forEach(key => {
			let val = encodeURIComponent(params[key])
			result += `${key}=${val}`
		})
	}
}
/**
 * xhr: {
 * 		open,
 * 		setRequestHeader,
 * 		onreadystatechange,
 * 			readyState,
 * 			status,
 * 		onerror,
 * 		send
 *}
 * @param {*} options 
 * @returns 
 */
function request(options) {
	const defaultHeaders = { 'Content-type': 'application/x-www-form-urlencoded' }
	return new Promise((resolve, reject) => {
		const { method, url, params, headers } = options
		const xhr = new XMLHttpRequest()
		if (method === 'GET' || method === 'DELETE') {
			const requestUrl = url + '?' + serialize(params)
			xhr.open(method, requestUrl, true)
		} else {
			xhr.open(method, url, true)
		}

		const mergedHeaders = Object.assign({}, defaultHeaders, headers)
		Object.key(params).forEach(key => {
			xhr.setRequestHeader(key, mergedHeaders[key])
		})

		xhr.onreadystatechange =- function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve(xhr.response)
				} else {
					reject(xhr.status)
				}
			}
		}
		
		xhr.onerror = function (e) {
			reject(e)
		}

		const data = method === 'POST' || method === 'PUT' ? serialize(params) : null
		xhr.send(data)
	})
}
const options = {
  method: 'GET',
  url: '/user/page',
  params: {
    pageNo: 1,
    pageSize: 10
  }
}

// 通过Promise的形式调用接口
request(options).then(res => {
  // 请求成功
}, fail => {
  // 请求失败
})