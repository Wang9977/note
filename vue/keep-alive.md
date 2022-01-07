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





# 

## 背景 - 页面缓存

在Vue构建的单页面应用中，路由模块一般使用vue-router。该路由不保存被切换组件的状态，它进行push或者replace时，旧组件会被销毁，新组件会被新建，完成一遍完整的生命周期。

痛点:

跳转到详情页时，需要保持列表页的滚动深度，使得返回时依旧在这个位置，提高用户体验。

vue中通过keep-alive 解决



## 使用方式

+ keep-alive 是一个抽象概念  实际上不会被渲染到DOM树中。
+ 它的作用是在内存中 缓存组件（不让组件销毁），等到下次渲染保存其中的状态，并且触发activated钩子函数

1. 缓存的需要通常出现在页面切换时，常与router-view一起出现

   ```vue
   同时
   <keep-alive>
       <router-view />
   </keep-alive>
   ```

   + 每一个在 router-view 中渲染的组件，都会被缓存起来

2. 渲染某一个页面/组件， 使用include/exclude 属性

   ```vue   
   // 假如可能出现在同一router-view的N个页面中，只想缓存列表页和详情页 // 不常用
   <keep-alive :include="['ListView','DetailView']">
       <router-view/>
   </keep-alive>
```
   
   + include 表示要缓存的组件名（即组件定义时的name属性） 接收类型为string RegExp 或string数组
   + exclude 表示匹配的组件 不被缓存



## 条件缓存：全局的include数组

### 使用场景

> 首页 A 列表页B 详情页C    正常A->B->C
>
> B->C->B  B要保持列表滚动的距离
>
> B->A->B   B重新加载

+ B是条件缓存的  

  + C->B 保持缓存
  + A-B 不缓存 

+ 解决：B动态的从include里面增加/删除

  

