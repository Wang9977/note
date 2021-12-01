# webpackChunkName 魔法注释

webpackChunkName是为预加载的文件取别名，作用是在webpack打包的时候，对异步引入的库代码（lodash）进行代码分割 为分割后的代码块取得名字



import 一步吗加载的写法 实现页面模块lazy loading 懒加载（Vue 中的路由异步加载）：Vue中运用import懒加载语句 以及webpack Chunk Name注释 在项目进行webpack打包的时候 对不同的块进行代码分割  在首评加载的时候 用到哪个模块 加载哪个模块。

实现懒加载进行页面优化