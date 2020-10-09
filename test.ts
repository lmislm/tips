// sync 和v-model的区别？$emit('update:value', val)
// router.push,pushState？
// todo: https://github.com/vuejs/vue-next/tree/master/packages/reactivity

// 将对象作为数据传递给组件实例时，Vue 会将其转换为 Proxy。这个 Proxy 使 Vue 能够在 property 被访问或修改时执行依赖项跟踪和更改通知。每个 property 都被视为一个依赖项。

// 首次渲染后，组件将跟踪一组依赖列表——即在渲染过程中被访问的 property。反过来，组件就成为了其每个 property 的订阅者。当 Proxy 拦截到 set 操作时，该 property 将通知其所有订阅的组件重新渲染。
// const map = reactive(new Map([['count', ref(0)]]))
