# 发布一个NPM包 

>  纯js包，没有其他设置

> 项目 package.json type 属性默认 common.js

[TOC]



## 创建项目

创建一个文件夹目录

```
md my-npm-demo
```



## 初始化

```shell
cd my-npm-demo
npm init
```



## 写js文件

```js
// index.js
```

## 登录 npm

没有账号，去[官网]([www.npmjs.com/](https://www.npmjs.com/))注册

```shell
npm login
```



## 发布npm包

```shell
npm publish
```



## 其他项目使用

```shell
npm install my-npm-demo --save
```



## 更新npm包

```shell
npm version patch   # 小变动，比如修复bug等，版本号变动 v1.0.0->v1.0.1
npm version minor   # 增加新功能，不影响现有功能,版本号变动 v1.0.0->v1.1.0
npm version major   # 破坏模块对向后的兼容性，版本号变动 v1.0.0->v2.0.0
```

```shell
npm publish  # 发布更新后的npm包
```

## 查看npm版本

```shell
npm view my-npm-demo versions
```



## 废弃npm包（使用会出现警告）

```shell
npm deprecate my-npm-demo@1.0.0 'test deprecate'
```



## 删除（删除的包不能再使用）

+ 删除的版本24小时后方可重发!
+ 只有发布72小时之内的包可以删除!

```shell
npm unpublish my-npm-demo --force
```



## 参考

	+ [如何自己写一个公用的NPM包 vue](https://segmentfault.com/a/1190000010521272)
	+ [如何发布一个npm包 vue](https://segmentfault.com/a/1190000015766869?utm_source=sf-similar-article)
	+ [如何发布自己的NPM包 js](https://juejin.cn/post/6844903673684836365)
	+ [废弃/删除npm包](https://segmentfault.com/a/1190000017479985)




