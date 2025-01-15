# Reactive

+ 参考 
  + [vue3 响应式基础](https://v3.cn.vuejs.org/guide/reactivity-fundamentals.html)



作用： 为JS对象 创建响应式状态，使用 `reactive` 方法

例子：

```js
import { reactive } from 'Vue'
// 响应式状态
const state = reactive({
    count: 0
})
```



+ reactive  相当于 Vue2 里面的  `Vue.observable()` API
+ 该API 返回一个响应式的对象状态
+ 该响应式转换时“深度转换”  会影响嵌套对象传递的所有property
+  



## reactive

返回对象的响应式副本

```js
const obj = reactive({ count: 0})
```

+ 在ES2015 Proxy的实现中，返回的proxy是**不等于**原始对象的
+ 建议只使用proxy，避免依赖原始对象

### 提示

reactive 将解包所有深层的rfefs 同时维持ref的响应性

```js
const count = ref(1)
const obj = reactive({count})
 
// ref 会被解包
console.log(obj.count === count.value) // true

// 会更新 `obj.count`
count.value++
console.log(count.value) //2
console.log(obj.count) // 2

// 它会更新 `count` ref
obj.count++
console.log(obj.count) //3
console.log(count.value) //3
```



### 重要

当将 ref 分配给 reactive property时， ref 将被自动解包

```js
const count = ref(1)
const obj = reactive({})
obj.count = count
console.log(obj.count) // 1
console.log(obj.count === count.value) // t
```



 