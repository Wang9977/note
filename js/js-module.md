# commonjs & ES6 module



# 一、模块化



+ 作用： 解决全局污染和依赖管理混乱的问题
  + 全局污染；每个加载的 js 文件都共享变量。
  + 依赖管理：正常情况下，执行 js 的先后顺序就是 script 标签排列的前后顺序，有依赖，下层可以调用上层，上层无法调用下层



# 二、Commonjs



+ 应用场景：
  + Node 是commonjs在服务端具有代表性的实现
  + Browserify  是commonjs在浏览器中的一种实现
  + Webpack 打包工具支持commonjs的转换

## 1. Commons 使用与原理

+ Commonjs 中每一个js文件 都是一个单独的模块 称为module
+ 核心变量包括 exports、module.exports、require
+  exports、module.exports负责对模块的内容导出
+ require 负责导入其他模块的内容



### 实现原理

+ module 记录当前模块信息

+ require 引入当前模块的方法

+ exports 当前模块导出的属性

  

编译过程

对js代码块进行首尾包装，形成包装函数

我们写的代码 将作为包装函数的执行上下文，使用的require exports module 通过形参传入包装函数

模块加载时，通过runThisContext执行modulefunction，传入require exports module 等参数



## 2. require文件加载流程

```js
const fs =      require('fs')      // ①核心模块
const sayName = require('./hello.js')  //② 文件模块
const crypto =  require('crypto-js')   // ③第三方自定义模块
```

- ① 为 nodejs 底层的核心模块。
- ② 为我们编写的文件模块，比如上述 `sayName`
- ③ 为我们通过 npm 下载的第三方自定义模块，比如 `crypto-js`。

当require方法执行时，接收的唯一参数作为一个标识符，Commonjs对不同的标识符处理流程不同，目的相同，都是找到对应的模块。



### require加载标识符原则

- 首先像 fs ，http ，path 等标识符，会被作为 nodejs 的**核心模块**。
  - 处理：优先级仅次于缓存加载，在node源码中，已经被编译成二进制编码，所以加载核心模块速度最快
- `./` 和 `../` 作为相对路径的**文件模块**， `/` 作为绝对路径的**文件模块**。
  - require()方法 会将路径转换为真实路径，并以真实路径为索引，将编译后的结果缓存起来，第二次加载更快
- 非路径形式也非核心模块的模块，将作为**自定义模块**。可能是一个文件或包
  1. 在当前目录下node_modules目录中找
  2. 在父级目录的node_modules查找，若没有，在父级的父级目录的node_modules查找
  3. 沿着路径向上，直到根目录的node_modules
  4. 在查找过程中，会找 `package.json` 下 main 属性指向的文件，如果没有 `package.json` ，在 node 环境下会以此查找 `index.js` ，`index.json` ，`index.node`。
  5. 流程图如下
  6. ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfb7a91998774fc78a9813e3b0db8199~tplv-k3u1fbpfcp-watermark.awebp)
- 

## 3 Require 模块引入与处理

Commons 同步加载并执行模块文件 

Commons 模块在执行阶段分析模块依赖，采用**深度优先遍历**，执行顺序是父-子-父



## require 加载原理

**`module`** :   在Node中每一个js文件都是一个module，module上保存了exports等信息，还有一个loaded表示该模块是否被加载。false表示还没有加载，true表示已经加载

**`Module`** ：以 nodejs 为例，整个系统运行之后，会用 `Module` 缓存每一个模块加载的信息。 



### 一次require的大致流程

1. require 会接收一个参数——文件标识符，然后分析定位文件，分析过程我们上述已经讲到了，加下来会从 Module 上查找有没有缓存，如果有缓存，那么直接返回缓存的内容。
2. 如果没有缓存，会创建一个 module 对象，缓存到 Module 上，然后执行文件，加载完文件，将 loaded 属性设置为 true ，然后返回 module.exports 对象。借此完成模块加载流程。
3. 模块导出就是 return 这个变量的其实跟 a = b 赋值一样， 基本类型导出的是值， 引用类型导出的是引用地址。
4. exports 和 module.exports 持有相同引用，因为最后导出的是 module.exports， 所以对 exports 进行赋值会导致 exports 操作的不再是 module.exports 的引用。



## require 避免重复加载------缓存

一个模块已经 require 引入了 a 模块，如果另外一个模块再次引用 a ，那么会直接读取缓存值 module ，所以无需再次执行模块。



## require 避免循环引用

- `a.js文件`

```js
const getMes = require('./b')
console.log('我是 a 文件')
exports.say = function(){
    const message = getMes()
    console.log(message)
}
复制代码
```

- `b.js`文件

```js
const say = require('./a')
const  object = {
   name:'《React进阶实践指南》',
   author:'我不是外星人'
}
console.log('我是 b 文件')
module.exports = function(){
    return object
}
复制代码
```

- 主文件`main.js`

```js
const a = require('./a')
const b = require('./b')

console.log('node 入口文件')
复制代码
```

接下来终端输入 `node main.js` 运行 `main.js`，效果如下：

![5.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b728ce249df740ce8b0232a889283f22~tplv-k3u1fbpfcp-watermark.awebp)

① 首先执行 `node main.js` ，那么开始执行第一行 `require(a.js)`；

② 那么首先判断 `a.js` 有没有缓存，因为没有缓存，先加入缓存，然后执行文件 a.js （**需要注意 是先加入缓存， 后执行模块内容**）;

③ a.js 中执行第一行，引用 b.js。

④ 那么判断 `b.js` 有没有缓存，因为没有缓存，所以加入缓存，然后执行 b.js 文件。

⑤ b.js 执行第一行，再一次循环引用 `require(a.js)` 此时的 a.js 已经加入缓存，直接读取值。接下来打印 `console.log('我是 b 文件')`，导出方法。

⑥ b.js 执行完毕，回到 a.js 文件，打印 `console.log('我是 a 文件')`，导出方法。

⑦ 最后回到 `main.js`，打印 `console.log('node 入口文件')` 完成这个流程。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a2084aa55764fa493a7b82dfe2f2d50~tplv-k3u1fbpfcp-watermark.awebp)





## 4 require 动态加载

> Require 可以在任意的上下文，动态加载模块

```js
// a.js
console.log('我是 a 文件')
exports.say = function(){
    const getMes = require('./b')
    const message = getMes()
    console.log(message)
}
```

```js
// main.js
const a = require('./a')
a.say()
```

- 如上在 a.js 模块的 say 函数中，用 require 动态加载 b.js 模块。然后在 main.js 中执行 a.js 模块的 say 方法。



## 5 exports 和 module.exports

Exports  就是传入到当前模块内的一个对象，本质上是module.exports

> + 为什么exports={} 直接赋值一个对象就不可以
>
> exports ， module 和 require 作为形参的方式传入到 js 模块中。我们直接 `exports = {}` 修改 exports ，等于重新赋值了形参，那么会重新赋值一份，但是不会在引用原来的形参。

module.exports 本质上是exports

+ 也可以单独导出一个函数或者一个类



# 三、Es Module

+ 优势
  + 实现了tree shaking
  +  `import()` 懒加载方式实现代码分割。



## 导出export 导入import

所有通过export导出的属性，在import中可以通过解构出来

### **export 正常导出，import 导入**

+ 例子

  ```js
  // a.js
  const name = '《React进阶实践指南》' 
  const author = '我不是外星人'
  export { name, author }
  export const say = function (){
      console.log('hello , world')
  }
  ```

  ```js
  // main.js
  import { name , author , say } from './a.js'
  ```

  

+ export{}, 与变量名绑定，命名导出
+ import {} from 'module'，导入module的命名导出
+ import内部的变量名称 要与export完全匹配



### 默认导出 export default

```js
//a.js
const name = '《React进阶实践指南》'
const author = '我不是外星人'
const say = function (){
    console.log('hello , world')
}
export default {
    name,
    author,
    say
} 
```

```js
import mes from './a.js'
```

+ `export default anything` 导入 module 的默认导出。 `anything` 可以是函数，属性方法，或者对象。
+ 对于引入默认导出的模块，`import anyName from 'module'`， anyName 可以是自定义名称。



### 混合导入导出

ES6 module 可以使用 export default 和 export 导入多个属性。

```js
// a.js
export const name = '《React进阶实践指南》'
export const author = '我不是外星人'

export default  function say (){
    console.log('hello , world')
}
```

**导入几种方式**

1. ```js
   import theSay , { name, author as  bookAuthor } from './a.js'
   console.log(
       theSay,     // ƒ say() {console.log('hello , world') }
       name,       // "《React进阶实践指南》"
       bookAuthor  // "我不是外星人"
   )
   ```

2. ```js
   import theSay, * as mes from './a'
   console.log(
       theSay, // ƒ say() { console.log('hello , world') }
       mes // { name:'《React进阶实践指南》' , author: "我不是外星人" ，default:  ƒ say() { console.log('hello , world') } }
   )
   // 导出的属性被合并到 mes 属性上， export 被导入到对应的属性上，export default 导出内容被绑定到 default 属性上。 theSay 也可以作为被 export default 导出属性。
   ```

   

### 重命名导入

```js
import { bookName as name, say, bookAuthor as author } from 'module'
console.log( bookName , bookAuthor , say ) //《React进阶实践指南》 我不是外星人
```

- 从 module 模块中引入 name ，并重命名为 bookName ，从 module 模块中引入 author ，并重命名为 bookAuthor。 然后在当前模块下，使用被重命名的名字。



### 重定向导出

可以把当前模块作为一个中转站，一方面引入 module 内的属性，然后把属性再给导出去。

```js
export * from 'module' // 第一种方式
export { name, author, ..., say } from 'module' // 第二种方式
export { bookName as name, bookAuthor as author, ..., say } from 'module' //第三种方式
```

- 第一种方式：重定向导出 module 中的所有导出属性， 但是不包括 `module` 内的 `default` 属性。
- 第二种方式：从 module 中导入 name ，author ，say 再以相同的属性名，导出。
- 第三种方式：从 module 中导入 name ，重属名为 bookName 导出，从 module 中导入 author ，重属名为 bookAuthor 导出，正常导出 say 。



### 无需导入模块，只运行模块

```js
import 'module' // 执行 module 不导出值 多次调用 module 只运行一次。
```

### 动态导入

```js
const promise = import('module')
```

- `import('module') `，动态导入返回一个 `Promise`。为了支持这种方式，需要在 webpack 中做相应的配置处理。



## ES6 module 特性

### 1. 静态语法

ES6 module 的引入和导出是静态的，`import` 会自动提升到代码的顶层 ，`import` , `export` 不能放在块级作用域或条件语句中，import 的导入名不能为字符串或在判断语句

这种静态语法，在编译过程中确定了导入和导出的关系，所以更方便去查找依赖，更方便去 `tree shaking` (摇树) ， 可以使用 lint 工具对模块依赖进行检查，可以对导入导出加上类型信息进行静态的类型检查。

### 2. 执行特性

ES6 module 和 Common.js 一样，对于相同的 js 文件，会保存静态属性。

**不同**

+ CommonJS 同步加载并执行模块文件

+ ES6 模块 提前加载并执行模块文件，在预处理阶段分析模块依赖，在执行阶段执行模块，两个阶段都在用深度优先遍历，执行顺序是 子---> 父

+ demo

  ```js
  // main.js
  console.log('main.js开始执行')
  import say from './a'
  import say1 from './b'
  console.log('main.js执行完毕')
  ```

  ```js
  // a.js
  import b from './b'
  console.log('a模块加载')
  export default  function say (){
      console.log('hello , world')
  }
  ```

  ```js
  // b.js
  console.log('b模块加载')
  export default function sayhello(){
      console.log('hello,world')
  }
  ```

  - `main.js` 和 `a.js` 都引用了 `b.js` 模块，但是 b 模块也只加载了一次。
  - 执行顺序是子 -> 父
  - ![结果](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97075c8d67824c42b4dc7bcb535cc903~tplv-k3u1fbpfcp-watermark.awebp)



### 3. 导出绑定

#### 不能直接修改import导入的属性

```js
export let num = 1
export const addNumber = ()=>{
    num++
}
```

```js
// main.js
import {  num , addNumber } from './a'
num = 2 // 报错

可以改为
import {  num , addNumber } from './a'
console.log(num) // num = 1
addNumber()
console.log(num) // num = 2
```

+ 使用 import 被导入的模块运行在严格模式下。
+ 使用 import 被导入的变量是只读的，可以理解默认为 const 装饰，无法被赋值
+ 使用 import 被导入的变量是与原变量绑定/引用的，可以理解为 import 导入的变量无论是否为基本类型都是引用传递。


## import 动态引入

`import()` 返回一个 `Promise` 对象， 返回的 `Promise` 的 then 成功回调中，可以获取模块的加载成功信息。



`import()` 可以动态使用，加载模块。

`import()` 返回一个 `Promise` ，成功回调 then 中可以获取模块对应的信息。 `name` 对应 name 属性， `default` 代表 `export default` 。`__esModule` 为 es module 的标识。




### import 作用

**动态加载**

- 首先 `import()` 动态加载一些内容，可以放在条件语句或者函数执行上下文中。

- ```js
  if(isRequire){
      const result  = import('./b')
  }
  ```



**懒加载**

- `import()` 可以实现懒加载，举个例子 vue 中的路由懒加载；

  ```js
  [
     {
          path: 'home',
          name: '首页',
          component: ()=> import('./home') ,
     },
  ]
  ```

  `import()` 这种加载效果，可以很轻松的实现**代码分割**。避免一次性加载大量 js 文件，造成首次加载白屏时间过长的情况。



## tree shaking实现

Tree Shaking 在 Webpack 中的实现，是用来尽可能的删除没有被使用过的代码，一些被 import 了但其实没有被使用的代码。

构建打包的时候，`delNumber`将作为没有引用的方法，不被打包进来。



# 四、总结

## Commonjs特性

1. 由JS运行时实现
2. 单个值导出，本质上导出的是exports属性
3. 可以动态加载，对每一个加载都存在缓存，可以有效的解决循环引用问题
4. 同步加载并执行模块文件

## es module 特性

1. 静态的，不能放在块级作用域内，代码发生在编译时
2. 动态绑定，可以通过导出方法修改，可以直接访问修改结果
3. 可以导出多个属性和方法，可以单个导出，混合导入导出
4. 提前加载并执行
5. 导入模块在严格模式下
6. 容易实现 tree shaking 和 代码分割 code splitting
