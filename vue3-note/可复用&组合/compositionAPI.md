[TOC]



#  compositionAPI介绍

## 作用 

+ 共享和重用代码

## 使用

### setup

+ 用组合式API的位置 成为setup
+ 在==创建组件之前==执行
+ setup选项中 没有this 。因此，除了props 无法访问组件中声明的任何属性--本地状态、计算属性或方法
+ setup接收 props 和 context

### 带ref的响应式变量

+ vue3.0  通过一个新的ref函数 使任何响应式变量在任何地方起作用

  ```js
  import {ref} from 'vue'
  const counter = ref(0)
  ```

+ ref 接收参数并返回它包装在具有`value`property的对象中，然后直接使用该property访问或更改响应式变量的值

  ```js
  import {ref} from 'vue'
  const counter = ref(0)
  console.log(counter) // {value:0}
  console.log(counter.value) // 0
  ```

+ ref 创建了一个**响应式引用**。

### 生命周期钩子注册内部`setup`

+ 选项式API 钩子函数  create created mount mounted update updated 

+ 组合式API 钩子函数  onCreat onCreated onMount onMounted onUpdate onUpdated

  ```js
  import {ref,onMounted} from 'vue'
  ```

  

### watch 响应式更改

+ 接收三个参数

  1. 一个**响应式引用** 或者 想要监听的getter函数
  2. 一个回调
  3. 可选的配置项

+ toRefs 确保监听器能够对`user` prop所做的更改作出反应

  ```js
  // 使用 toRefs 创建对prop的user 属性的响应式引用
  const {user} = toRefs(props) 
  ```

  

### 独立的`computed`属性

+ 在Vue组件 外部创建计算属性 computed函数 返回一个作为computed的第一个参数传递的getter类回调的输出的一个只读的**响应式引用**





# Setup

## 参数

1. props
2. context

### props

+ 是响应式的，当传入新的prop，它将被更新

  > 因为props是响应式的，所以不能使用ES6解构，ES6解构会消除prop的响应性

+ 如果需要解构prop，通过使用toRefs来完成

+ ```js
  import { toRefs } from 'vue'
  
  setup(props) {
  	const { title } = toRefs(props)
  
  	console.log(title.value)
  }
  // title是可选的prop
  import { toRef } from 'vue'
  setup(props) {
  	const title = toRef(props, 'title')
  	console.log(title.value)
  }
  ```



### Context

+ 暴露组件三个属性 
  + context.attrs
  + context.slots
  + context.emit
+ 是一个普通js对象，不是响应式，可以使用ES6解构
+ attrs 和 slots 是有状态的对象，总会随组件本身的更新而更新。意味着应该避免解构，并始终以`attrs.x`或`slots.x`引用属性。因为不是响应式，当更改时，应该在`onUpdated`中操作



## 访问组件的property

+ 执行setup时，组件实例未被创建。只能访问一下property
  + props
  + attrs
  + slots
  + emit
+ 无法访问
  + data
  + computed
  + methods

## 结合模板使用

如果`setup`返回一个对象，则可以再组建的模板中访问该对象的property

```vue
<template>
  <div>{{ readersNumber }} {{ book.title }}</div>
</template>

<script>
  import { ref, reactive } from 'vue'

  export default {
    setup() {
      const readersNumber = ref(0)
      const book = reactive({ title: 'Vue 3 Guide' })
      //定义: 接收一个普通对象然后返回该普通对象的响应式代理。等同于 2.x 的 Vue.observable()

      // expose to template
      return {
        readersNumber,
        book
      }
    }
  }
</script>
```

从setup返回的refs在模板中访问是被自动解开的，因此不应再模板中使用`.value`

## 使用渲染函数

+ setup 可以返回一个渲染函数，该函数可以直接使用再同一作用域中声明的响应式状态

```js
import { h, ref, reactive } from 'vue'

export default {
  setup() {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    // Please note that we need to explicitly expose ref value here
    return () => h('div', [readersNumber.value, book.title])
  }
}
```

+ h() 函数返回一个虚拟节点，

## 使用this

+ 再setup()内部，this不会是该活跃实例的引用

# 生命周期钩子

| 选项式 API        | Hook inside `setup` |
| ----------------- | ------------------- |
| `beforeCreate`    | Not needed*         |
| `created`         | Not needed*         |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |

# Provide/ Inject

## 使用Provide

+ 首先从vue显示导入provide方法
+ provide函数参数定义
  1. name {String}
  2. value

```vue
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    provide('location', 'North Pole')
    provide('geolocation', {
      longitude: 90,
      latitude: 135
    })
  }
}
</script>
```

## 使用inject

+ 从vue显示导入
+ inject两个参数
  1. 需要inject 的属性的名称（name）
  2. 一个默认的值（**可选**）

```vue
<!-- src/components/MyMarker.vue -->
<script>
import { inject } from 'vue'

export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')

    return {
      userLocation,
      userGeolocation
    }
  }
}
</script>
```

## 响应性

### 添加响应性

+ 在provide值时，使用ref或者reactive。使得inject的组件自动更新

```vue
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, reactive, ref } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    provide('location', location)
    provide('geolocation', geolocation)
  }
}
</script>
```

### 修改响应式property

+ 当使用响应式的provide/inject值时，**尽可能在provide内保持响应式property的任何更改**

```vue
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, reactive, ref } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    provide('location', location)
    provide('geolocation', geolocation)

    return {
      location
    }
  },
  methods: {
    updateLocation() {
      this.location = 'South Pole'
    }
  }
}
</script>
```

+ 当需要在inject组件内部更新inject的数据时，建议在provide组件中再使用一个provide方法改变响应式property

```vue
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, reactive, ref } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    const updateLocation = () => {
      location.value = 'South Pole'
    }

    provide('location', location)
    provide('geolocation', geolocation)
    provide('updateLocation', updateLocation)
  }
}
</script>
```

```vue
<!-- src/components/MyMarker.vue -->
<script>
import { inject } from 'vue'

export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')
    const updateUserLocation = inject('updateLocation')

    return {
      userLocation,
      userGeolocation,
      updateUserLocation
    }
  }
}
</script>
```

+ **readonly** 对提供者的property使用 确保通过provide传递的数据不会被inject的组件更改





# 模板引用

## JSX中的用法

```js
export default {
  setup() {
    const root = ref(null)

    return () =>
      h('div', {
        ref: root
      })

    // with JSX
    return () => <div ref={root} />
  }
}
```

## v-for 中的用法

+ 没有特殊处理
+ 使用ref函数执行自定义处理

```vue
<template>
  <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }">
    {{ item }}
  </div>
</template>

<script>
  import { ref, reactive, onBeforeUpdate } from 'vue'

  export default {
    setup() {
      const list = reactive([1, 2, 3])
      const divs = ref([])

      // 确保在每次更新之前重置ref
      onBeforeUpdate(() => {
        divs.value = []
      })

      return {
        list,
        divs
      }
    }
  }
</script>
```



## 侦听模板引用

+ 侦听模板引用的变更可以替代上个例子里面的生命周期函数
+ 区别在于 `watch()` 和 `watchEffect()` 副作用是在 DOM 被挂载或更新**之前**运行的，所以当侦听器运行时，模板引用还没有被更新。

```vue
<template>
  <div ref="root">This is a root element</div>
</template>

<script>
  import { ref, watchEffect } from 'vue'

  export default {
    setup() {
      const root = ref(null)

      watchEffect(() => {
        // 这个副作用在 DOM 更新之前运行，因此，模板引用还没有持有对元素的引用。
        console.log(root.value) // => null
      })

      return {
        root
      }
    }
  }
</script>
```

+ 通过`flush:'post'` 确保模板引用与DOM保持同步，并引用正确的元素。

```vue
<template>
  <div ref="root">This is a root element</div>
</template>

<script>
  import { ref, watchEffect } from 'vue'

  export default {
    setup() {
      const root = ref(null)

      watchEffect(() => {
        console.log(root.value) // => <div></div>
      }, 
      {
        flush: 'post'
      })

      return {
        root
      }
    }
  }
</script>
```





