# type属性

+ ‘commonjs’ （默认） 无扩展名的文件和.js结尾文件将被视为==commonjs==
+ ‘module’  .js结尾或没有任何扩展名的文件将作为==ES模块==进行加载

>  .mjs文件总是被当作ES模块，而.cjs文件总是被当作CommonJS。

### 总结

1. `type`字段的产生用于定义`package.json`文件和该文件所在目录根目录中`.js`文件和无拓展名文件的处理方式。值为`'moduel'`则当作es模块处理；值为`'commonjs'`则被当作commonJs模块处理
2. 目前node默认的是如果`pacakage.json`没有定义`type`字段，则按照commonJs规范处理
3. node官方建议包的开发者明确指定`package.json`中`type`字段的值
4. 无论`package.json`中的`type`字段为何值，`.mjs`的文件都按照es模块来处理，`.cjs`的文件都按照commonJs模块来处理

一个项目要相同时使用commonjs和ES6 需要bebel转换 

rollup打包 默认es6

jest测试默认 commonjs



require() 不支持 ES6原因是 它是同步加载的 而ES6模块内部是异步加载



ES6模块的 import 可以加载 commonJS模块 但是只能整体加载 ，不能只单一的加载输出项