# 目录

```shell
src
├── compiler        # 编译相关 
├── core            # 核心代码 
├── platforms       # 不同平台的支持
├── server          # 服务端渲染
├── sfc             # .vue 文件解析
├── shared          # 共享代码
```



## compiler

1. 把模版解析成 ast语法树
2. ast语法树优化
3. 代码生成

> 编译可以在两个阶段做
>
> 构建时编译：借助webpack、vue- loader等辅助插件   // 推荐 因为编译是消耗性能的，所以推荐离线编译 
>
> 运行时编译：使用包含构建功能的vue.js 





## core

1. 内置组件
2. 全局API封装
3. Vue实例化
4. 观察者
5. 虚拟DOM
6. 工具函数



## platform

1. 跑在web上
2. 跑在native客户端（配合weex）



## server

所有服务端渲染相关的逻辑 

跑在服务端的Node.js上

> 服务端渲染主要的工作 ： 把组件渲染为服务器端的HTML字符串，将他们直接发送到浏览器，最后将静态标记混合为客户端上完全交互的应用程序





## sfc

将.vue文件 解析成js的对象

> 通常开发vue 会借助webpack构建，然后通过.vue单文件 来编写组件



## shared

vue定义的一些工具方法，这里定义的工具方法 都是会被浏览器端的vue.js和服务端的vue.js所共享的



