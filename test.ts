// sync 和v-model的区别？$emit('update:value', val)
// router.push,pushState？
// todo: https://github.com/vuejs/vue-next/tree/master/packages/reactivity

// 将对象作为数据传递给组件实例时，Vue 会将其转换为 Proxy。这个 Proxy 使 Vue 能够在 property 被访问或修改时执行依赖项跟踪和更改通知。每个 property 都被视为一个依赖项。

// 首次渲染后，组件将跟踪一组依赖列表——即在渲染过程中被访问的 property。反过来，组件就成为了其每个 property 的订阅者。当 Proxy 拦截到 set 操作时，该 property 将通知其所有订阅的组件重新渲染。
// const map = reactive(new Map([['count', ref(0)]]))
// function fab(n) {
// 	if (isFinite(n) && n > 0 && n == Math.round(n)) {
// 		if (!(n in fab)) {
// 			fab[n] = n * fab(n - 1)
// 		}
// 		return fab[n]
// 	}
// }
// fab[1] = 1


// initMixin
// initLifeCycle
// initEvent
// initRender
// initState

// initState
// initProps
// initMethods
// initData


// ╭────────────────╮                 ╭───────────────╮   Fire Event   ╭──────────────╮
// │             		│   							│ initMixin     │───────────────>│              │
// │  Options.data  │────────────────>│ Event Channel │                │  Subscriber  │
// │             		│                 │               │<───────────────│              │
// ╰────────────────╯                 ╰───────────────╯    Subscribe   ╰──────────────╯

// function Foo() {
// 	getName = function () { console.log(1) }
// 	return this
// }
// Foo.getName = function () { console.log(2) }
// Foo.prototype.getName = function () { console.log(3) }
// var getName = function () { console.log(4) }
// function getName() { console.log(5) }

// Foo.getName()
// getName()
// Foo().getName()
// getName()
// new Foo.getName()
// new Foo().getName()

// function memorize (f) {
// 	var cache = {}
// 	return function () {
// 		var key = arguments.length + Array.prototype.join.call(arguments, '')
// 		if (key in cache) {
// 			return cache[key]
// 		}
// 		else {
// 			console.log(this, '-')
// 			return cache[key] = f.apply(this, arguments)
// 		} 
// 	}
// }

// function gcd(a,b) {
// 	var t;
// 	if(a < b) t = b, b = a, a = t;
// 	while(b != 0) t = b, b = a%b, a = t;
// 	return a;
// }

// var gcdDemo = memorize(gcd)
// const a = gcdDemo(85, 187)
// console.log(a)
