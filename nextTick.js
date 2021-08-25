/**
	 https://juejin.cn/post/6844903711249022984
	我们在有之前的知识背景，再理解 nextTick 的实现就不难了，
	这里有一段很关键的注释：在 Vue 2.4 之前的版本，nextTick 几乎都是基于 micro task 实现的，但由于 micro task 的执行优先级非常高，
	在某些场景下它甚至要比事件冒泡还要快，就会导致一些诡异的问题，如 issue #4521、#6690、#6566；但是如果全部都改成 macro task，对一些有重绘和动画的场景也会有性能影响，
	如 issue #6813。所以最终 nextTick 采取的策略是默认走 micro task，对于一些 DOM 交互事件，如 v-on 绑定的事件回调函数的处理，会强制走 macro task。

	https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/281
	当数据发生变化的时候,将需要通知更新的watcher收集到一个队列中,
	然后在nextTick函数里会遍历执行watcher的更新,
	nextTick相当于创建了一个异步任务(可能是异步微任务也可能是异步宏任务),
	然后在下一个event loop执行这些异步任务.
	我的理解,	就是讲同步代码里的所有数据更改需要通知更新的操作都收集起来,
	放到一个异步任务中,统一处理.避免了频繁的更新视图这样耗费性能的操作.

	首先定义一个 callbacks 数组用来存储 nextTick，在下一个 tick 处理这些回调函数之前，所有的 cb 都会被存在这个 callbacks 数组中。pending 是一个标记位，代表一个等待的状态。
	这里用setTimeout做描述（真实源码里更复杂）：
	setTimeout 会在 task 中创建一个事件 flushCallbacks ，flushCallbacks 则会在执行时将 callbacks 中的所有 cb 依次执行。

	浏览器支持Promise.then或MutationObserver的情况下，
	“下一个的事件循环tick”指的是本次事件循环最后一个microtask，否则，指的是task队列中的最后一个task。
 * 
 * @param {*} cb 
 * @param {*} ctx 
 * @returns 
 */
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

/**
 * 
 *  首先定义一个 callbacks 数组用来存储 nextTick，在下一个 tick 处理这些回调函数之前，所有的 cb 都会被存在这个 callbacks 数组中。
 *  pending 是一个标记位，代表一个等待的状态。
		这里用setTimeout做描述（真实源码里更复杂）：
		setTimeout 会在 task 中创建一个事件 flushCallbacks ，flushCallbacks 则会在执行时将 callbacks 中的所有 cb 依次执行。
		watcher
		上面例子中，当我们将 number 增加 1000 次时，先将对应的 Watcher 对象给 push 进一个队列 queue 中去，等下一个 tick 的时候再去执行，这样做是对的。但是有没有发现，另一个问题出现了？

		因为 number 执行 ++ 操作以后对应的 Watcher 对象都是同一个，我们并不需要在下一个 tick 的时候执行 1000 个同样的 Watcher 对象去修改界面，而是只需要执行一个 Watcher 对象，使其将界面上的 0 变成 1000 即可。

		那么，我们就需要执行一个过滤的操作，同一个的 Watcher 在同一个 tick 的时候应该只被执行一次，也就是说队列 queue 中不应该出现重复的 Watcher 对象。

		那么我们可以用 id 来标记每一个 Watcher 对象，让他们看起来不太一样。

		我们再回过头聊一下第一个例子， number 会被不停地进行 ++ 操作，不断地触发它对应的 Dep 中的 Watcher 对象的 update 方法。然后最终 queue 中因为对相同 id 的 Watcher 对象进行了筛选，从而 queue 中实际上只会存在一个 number 对应的 Watcher 对象。在下一个 tick 的时候（此时 number 已经变成了 1000），触发 Watcher 对象的 run 方法来更新视图，将视图上的 number 从 0 直接变成 1000。
 * 
 * 
 */