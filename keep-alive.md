# keep-alive

## 用法

1. <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
2. 它是一个抽象的组件：自身不会渲染一个DOM元素，也不会出现在组件的父组件链中
3. 当组件在<keep-alive> 内被切换，该组件的activated 和 deactivated 两个生命周期钩子函数会被对应执行。
4. 在2.0.0以后，activated 和 deactivated 将在 <keep-alive> 树内所有嵌套组件中触发
5. **主要用于保留组件状态 或者 避免重新渲染**

## 核心流程
1. 默认进来，取得当前渲染的 vnode
2. 然后进入 mounted 钩子，缓存上
3. 当有更新的时候，再次调用 render，设置 vnodeToCache
4. 到 updated 钩子，再次缓存上
5. 下次如果命中缓存，直接用现有实例即可