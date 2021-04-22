function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

function serialize(params) {
    let result = '';
    if (isObject(params)) {
      Object.keys(params).forEach((key) => {
        let val = encodeURIComponent(params[key]);
        result += `${key}=${val}&`;
      });
    }
    return result;
}

const defaultHeaders = {
  "Content-Type": "application/x-www-form-urlencoded"
}

// ajax简单封装
function request(options) {
  return new Promise((resolve, reject) => {
    const { method, url, params, headers } = options
    const xhr = new XMLHttpRequest();
    if (method === 'GET' || method === 'DELETE') {
      // GET和DELETE一般用querystring传参
      const requestURL = url + '?' + serialize(params)
      xhr.open(method, requestURL, true);
    } else {
      xhr.open(method, url, true);
    }
    // 设置请求头
    const mergedHeaders = Object.assign({}, defaultHeaders, headers)
    Object.keys(mergedHeaders).forEach(key => {
      xhr.setRequestHeader(key, mergedHeaders[key]);
    })
    // 状态监听
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(xhr.status)
        }
      }
    }
    xhr.onerror = function(e) {
      reject(e)
    }
    // 处理body数据，发送请求
    const data = method === 'POST' || method === 'PUT' ? serialize(params) : null
    xhr.send(data);
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