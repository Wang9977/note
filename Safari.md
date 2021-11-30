# Chrome运行页面正常 Safari 运行页面打不开

Chrome 可以运行项目，Safari 有的页面打不开 ，报错如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87d0bfbc0318408b922c42e76cfe5ead~tplv-k3u1fbpfcp-zoom-1.image)

## 1. Chrome都可以运行，Safari本地和线上环境都不可以运行

原因 Safari 不支持向后正则

所以 chrome运行成功，Safari报错

## 2.Chrome都可以运行，Safari本地可以运行。线上运行不了

问题定位： webpack 动态加载？ webpack 打包动态加载分片时，多个页面js文件 chunk名称一致，要把chunk名字一致的js文件中的向后正则改掉

## 3. 向后正则

`(?<=y)x` 后行断言 仅当x前面是y 匹配x

`(?<!y)x` 反向否定查找 当x前面不是y的时候匹配x