# 简介

Facebook出品的JS静态类型检查工具。

# 为什么用

保证项目的维护性和增强代码的可读性

Vue2 在ES2015的基础上，引入了Flow做静态类型检查。选择flow的原因是：Babel和ESLint都有对应的Flow插件，以支持语法。完全可以沿用现有的构建配置，非常小的改动就可以拥有静态类型检查的能力。



# Flow的工作方式

类型检查分为2种方法

+ 类型推断： 通过变量的使用上下文来推断出变量的类型，然后根据这些推断来检查类型
+ 类型注释： 事先注释好期待的类型，Flow会基于这些注释来判断

## 类型推断

```js
function split(str){
  return str.split('')
}
split(11) // 报错 ，期待字符串 却传入的是数字
```

## 类型注释

```js
/*@flow*/

function add(x: number, y: number): number {
  return x + y
}

add('Hello', 11)

```
```js
// 数组
var arr:Array<number> = [1,2,3]
```

```js
// 类和对象
/*@flow*/
class Bar {
  x: string;           // x 是字符串
  y: string | number;  // y 可以是字符串或者数字
  z: boolean;

  constructor(x: string, y: string | number) {
    this.x = x
    this.y = y
    this.z = false
  }
}

var bar: Bar = new Bar('hello', 4)

var obj: { a: string, b: number, c: Array<string>, d: Bar } = {
  a: 'hello',
  b: 11,
  c: ['hello', 'world'],
  d: new Bar('hello', 3)
}
```



```js
// 任意类型T可以为null 或者undefined 需写成	?T
var foo: ?string = null  // foo 可以为字符串 也可以为null
```

# Flow 在vue源码中的使用

引入第三方库的时候 或者 自定义的类型 Flow 不认识，因此检查报错 ，为了解决这个问题，flow提出了`libdef`概念，用来识别第三方库或者自定义类型，vue.js 也利用了这个特性 



vue.js的主目录下，有`.flowconfig`文件 是flow的配置文件 [官方文档](https://flow.org/en/docs/config/) 这其中的 `[libs]` 部分用来描述包含指定库定义的目录，默认是名为 `flow-typed` 的目录。这里 `[libs]` 配置的是 `flow`，表示指定的库定义都在 `flow` 文件夹内。我们打开这个目录，会发现文件如下：

```shell
flow
├── compiler.js        # 编译相关
├── component.js       # 组件数据结构
├── global-api.js      # Global API 结构
├── modules.js         # 第三方库定义
├── options.js         # 选项相关
├── ssr.js             # 服务端渲染相关
├── vnode.js           # 虚拟 node 相关
```



