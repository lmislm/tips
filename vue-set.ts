// vuejs
export function set(target: Array<any> | Object, key: any, val: any): any {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    // 从第 key 位开始删除 1 个元素，插入“val”
    target.splice(key, 1, val)
    return
  }
  // 对于对象，如果 key 本来就是对象中的属性，直接修改值就可以触发更新
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  // key不是对象中的属性，vue 的响应式对象中都会添加了 __ob__ 属性，所以可以根据是否有 __ob__ 属性判断是否为响应式对象
  // target['__ob__'] = 'mock'
  const ob = (target: any).__ob__
  // 不是响应式属性，直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 响应式属性
  // 新增了属性，重新定义响应式对象，给数据添加 getter 和 setter

  // defineReactive(ob.value, key, val)
  // ob.dep.notify()
  return val
}

function isValidArrayIndex(data: any) {
  return data
}
function defineReactive(data: any) {
  return data
}

