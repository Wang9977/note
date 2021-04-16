# 隔代传值

## 1. v-bind='$attrs'

+ 将调用组件时的组件标签上绑定的**非props的特性**(class和style除外)向下传递。

+ 在子组件中应当添加 ==inheritAttrs: false== (避免父作用域的不被认作props的特性绑定应用在子组件的根元素上)。

+ **vm.$attrs** 

  + 包含了父作用域中 不作为prop被识别的特性。 
  + 当一个组件没有声明任何prop时，包含所有父作用域的绑定 通过v-bind="$attrs"传入内部组件

+ 例子

  ```vue
  //父组件
  <child notprops='123' :name=name >
  ```

  ```vue
  // 子组件
  <span>{{$attrs}}</span> // 展示 {"notprops":"123"}
  
  <script>
  inheritAttrs: false,
  </script>
  ```



## 2.  v-bind="$props"

+ 将父组件 所有的props下发给 父组件的子组件

+ 子组件通过props:{} 定义接收的props

+ 例子

  ```vue
  // grandfather
  <father :name=name />
  <script>
  export default{
      data(){return {
          name: 'wy'
      }}
  }
  </script>
  ```

  ```vue
  // father
  <child v-bind="$props" />
  
  <script>
  export default{
      data(){return {}},
  	props:['name']
  }
  </script>
  ```

  ```vue
  // child
  <span> {{name}}</span> // 显示wy
  
  <script>
  export default{
      data(){return {}},
  	props:['name']
  }
  </script>
  ```
## 3. v-bind ="$listeners"

+ 将组组件标签 自定义事件 向下传递 

+ 子组件（孙子组件） 可以直接通过 `this.$emit(eventName)方式调用`

+ **vm.$listeners**  包括了 父作用域中（不含 .native）的v-on监听事件 可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

+ ==vue3 弃用==  vue3中 $sttrs和$listeners合并

+ 例子 **vue2**


```vue
// grandFather
<Father @fun="fun" />
<script>
    methods:{
        fun(){
            console.log('test')
        }
    }
</script>
```

```vue
// father
<child v-on="$listeners" />
```

```js
//Child
mounted(){
	this.$emit('fun')
}
```

## 参考

[掘金](https://segmentfault.com/a/1190000020637062)





# .sync

+ 需要对prop进行“双向绑定” 

+ ```vue
  // 我是父组件
  <Child v-bind:title.sync="doc.title"></Child>
  ```

+ ```js
  // 我是子组件
  this.emit('update:title',newTitle)
  ```

+ **不能和表达式一起用**

  + `v-bind:title.sync=”doc.title + ‘!’”`**无效**

+ **不能和字面量对象一起用**

  + `v-bind.sync=”{ title: doc.title }”` **无效**

+ 同一个对象设置多个prop

  + ```vue
    <Child v-bind.sync="doc"></Child>
    ```

    

