# 新特性

## 全局API



### vue 2

+ vue2 注册全局组件 `vue.component`

```vue
  Vue.component('btn-cnt',{
  	data:()=>({
  		cnt:0
  	}),
  	template: '<button @click="cnt++">clicked {{cnt}} times </button>'
  })
```

+ 使用全局指令

```js
Vue.directive('focus', {
  inserted: el => el.focus()
})
```

1. ==问题==

   + vue2 通过`new Vue()`创建根Vue实例

   + 同一个Vue构造函数创建的每个根实例共享相同的全局配置，很容易受到测试用例污染
   + 同一个页面 多个app共享一个vue副本 变得困难

### vue3

+ 一个新的全局API ==createAPP==  返回应用实例

```js
import { createApp } from 'vue'

const app = createApp({})
```

+ Vue.use ====> app.use
+ 挂载根组件实例 app.mount('#app')

```js
const app = createApp(MyApp)

app.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})

app.directive('focus', {
  mounted: el => el.focus()
})

// 现在所有应用实例都挂载了，与其组件树一起，将具有相同的 “button-counter” 组件 和 “focus” 指令不污染全局环境
app.mount('#app')
```



## 组合式API

+ 实际使用组合API位置 为setup 在创建组件之前执行