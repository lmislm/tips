// proxy
const target = {}
const handler = {
  set (target, key, value) {
    console.log('set')
    target[key] = value
    return true
  }
}
const proxy = new Proxy(target, handler)
// console.log(proxy)
