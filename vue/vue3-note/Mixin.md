# Mixin

[TOC]



## 基础

+ 分发Vue组件中的可复用功能
+ 一个mixin对象可以包含任意组件选项。
+ 当组件使用mixin对象时，所有mixin对象的选项将被“混合”进入该组件本身

```js
// define a mixin object
const myMixin = {
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log('hello from mixin!')
    }
  }
}

// define an app that uses this mixin
const app = Vue.createApp({
  mixins: [myMixin]
})

app.mount('#mixins-basic') // => "hello from mixin!"
```

## 选项合并

+ 当组件和mixin对象含有同名选项时，这些选项将以恰当的方式进行合并。

  （比如 数据对象再内部会进行递归合并，并在发生冲突时以组件数据优先）

```js
const myMixin = {
  data() {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

const app = Vue.createApp({
  mixins: [myMixin],
  data() {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created() {
    console.log(this.$data) // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

+ 同名钩子函数 将合并为一个数组。mixin对象的钩子将在组件自身钩子之前调用

```js
const myMixin = {
  created() {
    console.log('mixin 对象的钩子被调用')
  }
}

const app = Vue.createApp({
  mixins: [myMixin],
  created() {
    console.log('组件钩子被调用')
  }
})

// => "mixin 对象的钩子被调用"
// => "组件钩子被调用"
```

+ 值为对象的选项（methods、components，directives）将被合并成同一个对象。两个对象键名冲突时，选取==组件对象==的键值对

```js
const myMixin = {
  methods: {
    foo() {
      console.log('foo')
    },
    conflicting() {
      console.log('from mixin')
    }
  }
}

const app = Vue.createApp({
  mixins: [myMixin],
  methods: {
    bar() {
      console.log('bar')
    },
    conflicting() {
      console.log('from self')
    }
  }
})

const vm = app.mount('#mixins-basic')

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```



## 全局mixin

+ 可以为全局Vue应用程序应用mixin
+ 可以进行全局注册 **使用后 将影响每一个之后创建的组件**



## 自定义选项合并策略

+ 自定义选项在合并时，默认简单覆盖现有值

+ 如果需要自定义逻辑 可以在`app.config.optionMergeStrategies` 中添加一个函数：

  ```js
  const app = Vue.createApp({})
  
  app.config.optionMergeStrategies.customOption = (toVal, fromVal) => {
    // return mergedVal
  }
  ```

+ 合作策略接收在父实例和子实例上定义的该选项的值，分别作为第一个和第二个参数。