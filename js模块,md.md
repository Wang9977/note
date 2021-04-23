# JS模块

+ CommonJS模块 (简称CJS) Node.js 专用
+ ES6模块 （简称ESM）

> 二者不兼容

## CJS和ESM差异

1. 语法
   + commonJS使用 require()加载，module.exports 输出
   + ES6 使用 import 和 export
2. 用法
   + require()  同步加载
   + import 异步加载

## Node.js 的区分

+ ES6 

  + 采用 .mjs后缀文件名 默认启用严格模式， `use strict`

  + 或者 将项目中的 package.json文件中 type字段设为 `module` 

    ```json
    { 
        "type":"module"
    }
    ```

    +  设置之后，该目录下的js被解释为ES6模块
    + 若此时，还想用CommonJS模块，需要将文件后缀名改为 .cjs

+ CommonJS
  + type 不设置 默认为commonjs

## CommonJS模块加载ES6模块

require()命令不能加载ES6模块，因为是同步加载，而ES6是同步加载，所以CommonJS只能使用import()

```js
(async () => {
    await import ('./test.mjs')
})
```



## ES6模块加载CommonJS

+ ES6 的import 可以加载CommonJS，但是只能整体加载，不能只加载单一的输出项

+ 因为ES6需要支持静态代码分析，而CommonJS的输出是一个对象，无法被静态分析，所以只能整体加载。

  ```js
  import testPackage from 'commonjs-package'
  const {method} = testPackage
  ```

  

## 同时支持两种格式的模块

+ 原始模块是ES6

  + 需要一个整体的输出接口 比如 `export default obj`
  + 使得 CommonJS 可以勇import()进行加载

+ 原始模块是CommonJS

  + 加一个包装层，先整体输入CommonJS模块，然后根据需要输出具名接口

    ```js
    import cjsModule from './index.js'
    export const foo = cjsModule.foo
    ```

  + 可以把这个文件后缀名改为`.mjs` 或者将其放在子目录，在子目录放入package.json type:module

  + 另一种方法 在package.json文件中 `exports`字段，知名两种格式模块各自的加载入口

    ```json
    "exports": {
        "require" : "./index.js",
        "import" : './esm/wrapper.js'
    }
    ```

    

    

    

