/**
 * 
 LazyMan('Tony');
 // Hi I am Tony
 
 LazyMan('Tony').sleep(10).eat('lunch');
 // Hi I am Tony
 // 等待了10秒...
 // I am eating lunch
 
 LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
 // Hi I am Tony
 // I am eating lunch
 // 等待了10秒...
 // I am eating diner
 
 LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
 // Hi I am Tony
 // 等待了5秒...
 // I am eating lunch
 // I am eating dinner
 // 等待了10秒...
 // I am eating junk food
 */
 class LazyManClass {
  constructor(name) {
    this.name = name
    this.queue = []
    console.log(`Hi I am ${name}`)
    setTimeout(() => {
      this._next()
    })
  }
  sleepFirst(time) {
    this.queue.unshift(
      () => {
        setTimeout(() => {
          console.log(`等待了${time}秒 first`)
          this._next()
        }, time * 1000)
      }
    )
    return this;
  }
  sleep(time) {
    this.queue.push(
      () => {
        setTimeout(() => {
          console.log(`等待了${time}秒`)
          this._next()
        }, time * 1000)
      }
    )
    return this
  }
  eat(food) {
    this.queue.push(() => {
      console.log(`I am eating ${food}`)
      this._next()
    })
    return this
  }
  _next() {
    const fn = this.queue.shift()
    fn && fn()
  }
}

const LazyMan = (name) => {
  return new LazyManClass(name)
}
