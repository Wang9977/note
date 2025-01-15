# vue-cli 升级

vue-cli升级到5.0.0-rc.1



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

⚠️ 最明显的三点如下

1. 删除了 `disableHostCheck`配置项，改为 `allowedHosts:all`

2. 删除了` public、sockHost、sockPath 和 sockPort `配置项，支持 `client.webSocketURL` 。

3. 默认情况下不启用开发服务器的 IE9 支持。如果需要在IE9下开发，请手动将devServer.webSocketServer选项设置为sockjs。



#### build 命令 和 Modern模式 


从 v5.0.0-beta.0 开始，运行 vue-cli-service build 将根据您的浏览器列表配置自动生成不同的包。不再需要 --modern 标志，因为它默认打开。



假设我们用默认配置构建一个简单的单页面app，可能出现以下场景

1. 使用默认浏览器打开 Vue2项目， `vue-cli-service` 构建将产生两种类型的包

   + 一种适用于支持 <script type="module">（app.[contenthash].js 和 chunk-vendors.[contenthash].js）的现代目标浏览器。构建后的包会小很多，因为它删除了polyfill和旧浏览器的转换
   + 一种是不支持 <script type="module"> 将通过`<script nomodule>`加载。
2. 您可以通过将 --no-module 标志附加到构建命令来选择退出此行为。 vue-cli-service build --no-module 将只输出支持所有目标浏览器的遗留包（通过普通的 <script> 加载）。
3. 使用 Vue 3 项目的默认 browserslist 目标（> 1%，最后 2 个版本，未死，不是 ie 11），所有目标浏览器都支持 <script type="module">，没有必要（也没有办法）区分它们，因此 vue-cli-service build 只会生成一种类型的包：app.[contenthash].js 和 chunk-vendors.[contenthash].js（通过普通的 <script>s 加载）。



#### CSS Modules

`css.requireModuleExtension` 选项被删除。如果您确实需要去除 CSS 模块文件名中的 .module 部分，请参阅https://next.cli.vuejs.org/guide/css.html#css-modules 以获取更多指导。



Css-loader 从v3升级到v6，一些与CSS模块相关的选项已经重命名，还有一些其他的更改，参考https://github.com/webpack-contrib/css-loader/blob/master/CHANGELOG.md



#### Sass/SCSS

不再支持使用 node-sass 生成项目。用 sass 包。



#### Asset Modules

为了支持asset模块，移除`url-loader` 和 `file-loader` 。如果你想调整内联图片资源的大小限制，现在你需要设置
`Rule.parser.dataUrlCondition.maxSize`选项
```js
//  vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('images')
        .set('parser', {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4KiB
          }
        })
  }
}
```



#### 底层加载器和插件  Underlying Loaders and Plugins

+ `html-webpack-plugin` 从 v3 升级到 v5。更多细节可以在 html-webpack-plugin v4 的[发布公告](https://github.com/jantimon/html-webpack-plugin/blob/main/CHANGELOG.md)和完整的更新日志中找到。
+ `sass-loader` v7 支持被删除。在其更新日志中查看[v8](https://github.com/webpack-contrib/sass-loader/blob/master/CHANGELOG.md#800-2019-08-29) 的重大更改。
+ `postcss-loader` 从 v3 升级到 v5。最值得注意的是，`PostCSS `选项（`plugin`/`syntax`/`parser`/`stringifier`）被移到了 `postcssOptions `字段中。[更改日志](https://github.com/webpack-contrib/postcss-loader/blob/master/CHANGELOG.md#400-2020-09-07)中提供了更多详细信息。
+ `copy-webpack-plugin ` 从 v5 升级到 v8。如果您从未通过` config.plugin('copy') `自定义其配置，则不应有面向用户的重大更改。` copy-webpack-plugin` v6.0.0 [变更日志](https://github.com/webpack-contrib/copy-webpack-plugin/blob/master/CHANGELOG.md)中提供了完整的重大变更列表。
+ `terser-webpack-plugin` 从 v2 升级到 v5，使用 terser 5 ,一些选项格式有一些变化。在其[更改日志](https://github.com/webpack-contrib/terser-webpack-plugin/blob/master/CHANGELOG.md)中查看完整详细信息。
+ 创建新项目时，默认的`less-loader`从v5更新到v8；`less`从 v3 升级到 v4；`sass-loader`从 v8 到 v11 的 ； `stylus-loader` 从 v3 升级到 v5。
+ `mini-css-extract-plugin` [从 v1 升级到 v2](https://github.com/webpack-contrib/mini-css-extract-plugin/blob/master/CHANGELOG.md).





### Babel Plugin

`transpileDependencies` 选项 现在接收 一个布尔值，true 表示 将转译`node_modules`中 所有的依赖项



### ESLint Plugin

+ `eslint-loader` 被 `eslint-webpack-plugin` 替代，不支持ESLint<=6的版本 
+ 新的项目 通过`eslint-plugin-vue`v8 构造，改变详情看发行说明 ([v7](https://github.com/vuejs/eslint-plugin-vue/releases/tag/v7.0.0), [v8](https://github.com/vuejs/eslint-plugin-vue/releases/tag/v8.0.0)) 
+ `@vue/eslint-config-prettier` 被弃用。 [迁移指南](https://github.com/vuejs/eslint-config-prettier)



### PWA Plugin

底层的`workbox-webpack-plugin` 从v4升级到v6，指南如下

- [From Workbox v4 to v5](https://developers.google.com/web/tools/workbox/guides/migrations/migrate-from-v4)
- [From Workbox v5 to v6](https://developers.google.com/web/tools/workbox/guides/migrations/migrate-from-v5)

> PWA是一种可以提供类似于原生应用程序(native app)体验的网络应用程序(web app)。PWA 可以用来做很多事。其中最重要的是，在**离线(offline)**时应用程序能够继续运行功能。这是通过使用名为 [Service Workers](https://links.jianshu.com/go?to=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Ffundamentals%2Fprimers%2Fservice-workers%2F) 的网络技术来实现的。
>
> 
>
> 通过webpack中引用workbox-webpack-plugin插件简单实现浏览器缓存,防止服务器崩溃时候页面直接崩溃。



### TypeScript Plugin

+ TSLint 弃用 ， 删除版本中 与TSLint相关的代码，切换成ESLint，可以通过 `tslint-to-eslint-config` 大部分自动迁移
+ `ts-loader` 从v6 升级到v9 ，且仅支持TypeScript>=3.6
+ `fork-ts-checker-webpack-plugin` 从v3.x 升级到v6.x ，可以从以下发布笔记中查看具体变化
  - [v4.0.0](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/releases/tag/v4.0.0)
  - [v5.0.0](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/releases/tag/v5.0.0)
  - [v6.0.0](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/releases/tag/v6.0.0)



###  E2E-Cypress Plugin

做E2E自动化测试的插件

+ Cypress 要求作为 peer dependency
+ Cypress 从v3 升级到v8 [迁移指南](https://docs.cypress.io/guides/references/migration-guide)



### E2E-WebDriverIO Plugin

使用[WebdriverIO](http://webdriver.io/)运行e2e测试

+ WebDriverIO 从v6升级到v7。对于用户来说，重大变化不多，[更多细节](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released/)



### Unit-Jest Plugin

对vue进行 单元测试

⚠️ `peerDependencies`   它们不会被自动安装 

> 当一个依赖项 c 被列在某个包 b 的 peerDependency 中时，**它就不会被自动安装**。取而代之的是，包含了 b 包的代码库 a 则必须将对应的依赖项 c 包含为其依赖。

+ 对于vue2  `@vue/vue2-jest` 现在作为 `peerDependency` , 初始化的时候，安装  `@vue/vue2-jest` 作为项目的`dev dependency`
+ 对于ts项目， `ts-jest`作为 `peerDependency`，用户需要手动安装 `ts-jest@27`到项目的根目录中
+ 底层的`jest`有关的包，从v24升级到v27。对于大多数用户来说，这个过度是无缝衔接的
  + [jest, babel-jest](https://github.com/facebook/jest/blob/v27.1.0/CHANGELOG.md)
  + [ts-jest](https://github.com/kulshekhar/ts-jest/blob/v27.0.0/CHANGELOG.md)



### Unit-Mocha Plugin

作用：用作单元测试

+ `mocha` 从v6升级到v8, 重大改变请看发布文档。 [mocha v7](https://github.com/mochajs/mocha/releases/tag/v7.0.0) and [mocha v8](https://github.com/mochajs/mocha/releases/tag/v8.0.0)

+ `jsdom` 从v15升级到v18 ，重大改变请看发布文档。[v16.0.0 release notes](https://github.com/jsdom/jsdom/releases/tag/16.0.0) and [v18.0.0 release notes](https://github.com/jsdom/jsdom/releases/tag/18.0.0).



### Iternal Package 内部包

@vue/cli-shared-utils

+ `chalk` 从v2升级到v4. 
  +  `chalk`可以修改控制台字符串的样式，包括字体样式、颜色以及背景颜色等
+ `joi` 从v15(过去叫`@hapi/joi`)升级到v18 
  + 用作 对数据进行校验



# 参考文档

https://next.cli.vuejs.org/migrations/migrate-from-v4.html



## 遇到的问题

![image-20211201161715296](/Users/wangyuan198/Library/Application Support/typora-user-images/image-20211201161715296.png)

(node:44717) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 upgrade listeners added to [Server]. Use emitter.setMaxListeners() to increase limit
(Use `node --trace-warnings ...` to show where the warning was created)(node:44717) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 upgrade listeners added to [Server]. Use emitter.setMaxListeners() to increase limit
(Use `node --trace-warnings ...` to show where the warning was created)