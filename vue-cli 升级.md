# vue-cli 升级

vue-cli升级到5.0.0-rc.1

迁移https://next.cli.vuejs.org/migrations/migrate-from-v4.html



## 全局安装 vue-cli

```shell
npm install -g @vue/cli@next
# OR
yarn global add @vue/cli@next # 推荐
```



## 升级plugin

### 一次性升级所有

```shell
vue upgrade --next
```

> ⚠️  迁移不能覆盖所有情况  需要了解每个包的具体信息
>
> ⚠️ 如果遇到`setup compilation vue-loader-plugin(node:44156) UnhandledPromiseRejectionWarning: TypeError: The 'compilation' argument must be an instance of Compilation` 问题，需要删除`yarn.lock`文件或者删除`package-loack.json`文件，并将项目中的`node-modules`文件包删除，重新装依赖项
>
> 

### 指定的plugin

```shell
vue upgrade @vue/cli-xxx --next
```



## 变化

### 对于所有的package

1. 不支持Node8-11 和13 版本
2. 不支持npm5



###  vue 命令 (global `@vue/cli` package)

1. 弃用 [instant prototyping functionalities](https://v4.cli.vuejs.org/guide/prototyping.html)
2. `vue serve`代替 `npm run serve`       `vue build` 代替  `npm run build ` 按照package.json的命令执行
3. 如果需要独立开发.vue 文件  使用  https://sfc.vuejs.org/ or https://vite.new/vue 



###  @vue/cli-serve

#### Webpack5

已经将底层的webpack版本 升级至5，webpack5有很多变化，详情请看 [Webpack 5 release (2020-10-10)](https://webpack.js.org/blog/2020-10-10-webpack-5-release/).

⚠️ 除了对自定义配置内部的修改，还有本地开发代码需要注意的地方

1. 不再支持来自JSON文件的命名导出 

   ```js
   import { version } from './package.json'
   console.log(version)
   
   // 改为
   
   import package from './package.json'
   consoloe.log(package.version)
   ```

   

2. 默认情况下，webpack5不再支持 polyfill. 如果代码依赖任一模块，将看到一条错误信息。[polyfill 模块的详细列表](https://github.com/webpack/webpack/pull/8460/commits/a68426e9255edcce7822480b78416837617ab065) 

#### Dev Server


`webpack-dev-server` 已经从 v3 更新到 v4。因此 vue.config.js 中的 devServer 选项发生了重大变化。请查看 `webpack-dev-server` 迁移指南以获取更多详细信息。







## 遇到的问题

![image-20211201161715296](/Users/wangyuan198/Library/Application Support/typora-user-images/image-20211201161715296.png)

(node:44717) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 upgrade listeners added to [Server]. Use emitter.setMaxListeners() to increase limit
(Use `node --trace-warnings ...` to show where the warning was created)(node:44717) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 upgrade listeners added to [Server]. Use emitter.setMaxListeners() to increase limit
(Use `node --trace-warnings ...` to show where the warning was created)