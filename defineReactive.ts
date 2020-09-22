// 数据描述符
// 存取描述符
function arrayDefineReactive (data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function get () {
      console.log(`get key: ${key},value: ${value}`)
      return value
    },
    set: function set (newVal) {
      console.log(`set key：${key},value：${newVal}`)
      value = newVal
    }
  })
}
function observeArray(data) {
  Object.keys(data).forEach((key) => {
    arrayDefineReactive(data, key, data[key])
  })
}
let arr = [1,2,3]
observeArray(arr)

// arr[1]
arr[1] = 4
// arr.push(5)
// console.log('shift')
// arr.shift(9)

// https://www.infoq.cn/article/sPCMAcrdAZQfmLbGJeGr

const res ={
  0: "未生效",
  1: "已生效"
}
const dd = [1, 2, 3].map(item => {
  return item
})
console.log()
