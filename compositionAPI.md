#  compositionAPI

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