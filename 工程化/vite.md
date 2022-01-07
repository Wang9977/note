# <center>vite</center>

+ 简介 
  + 基于浏览器原生 ES imports  的开发服务器。
  + 利用浏览器解析 imports ，
  + 在服务端按需返回，跳过了打包的概念 服务器随起随用
  + 支持Vue 和 热更新 且热更新速度不会随着模块增多而变慢
  + 针对生产环境production 可以把同一份代码 勇rollup打包

+ 上手

  + ```shell
    npm init @vitejs/app
    ```

  + 创建项目名称

  + `npm install ` `npm run dev`

  + ```shell
    $ npm init vite-app <project-name>
    $ cd <project-name>
    $ npm install
    $ npm run dev
    ```

  + 

## 特性

+ Bundleless 无捆绑

基于浏览器开始原生的支持js模块功能，js模块依赖于 import和export特性，目前主流浏览器都支持。

### 去掉打包步骤

打包：通过打包工具将应用各个模块集合在一起形成bundle，以一定的规则读取代码，以便在不支持模块化的浏览器里使用，并可以减少http请求的数量 

但是本地开发过程中打包 会增加排查问题的难度，增加响应时长

vite在本地开发命令中去除打包步骤，缩短了构建时常。



### 按需加载

目的： 减少bundle的大小，一般有以下两种方法

1. 使用动态引入  `import()` 方式 异步加载模块，被引入模块需要提前编译打包

2. 使用 `tree shaking` 等方式 尽力去掉未引用的模块

   > tree shaking 通常用于描述 移除JS上下文中的未引用代码。
   >
   > 依赖于ES2015模板语法的静态结构特性
   >
   > 实际是由ES2015模块打包工具rollup普及起来的

Vite 只在某个模块被import的时候 动态的加载它，实现了真正的按需加载，减少了加载文件的体积，缩短了时长

### 引用

[掘金][https://juejin.cn/post/6979716166545571871]