
# bug
## npm install 会出现各种问题
如：'vue-cli-service' 不是内部或外部命令，也不是可运行的程序
解决方法 
    1. 删除node_module 重新install 无用
    2. 改为 yarn 可以
## yarn VS Code中报错：无法加载文件 D:\nodejs\node_global\webpack.ps1
解决方法：
1. 首先以管理员的身份运行 VS Code .
2. 在终端执行 get-ExecutionPolicy,打印显示出 Restricted,表示禁止状态.
3. 接下来在终端执行 set-ExecutionPolicy RemoteSigned.
4. 在此输入 get-ExecutionPolicy查看，显示 RemoteSigned.

# npm 和 yarn 区别
## 命令对比
```
npm install === yarn 
npm install taco --save === yarn add taco
npm uninstall taco --save === yarn remove taco
npm install taco --save-dev === yarn add taco --dev
npm update --save === yarn upgrade
```

## yarn 优点
1. 速度快 
    + npm按照队列执行任务  yarn同步执行所有任务  
    + 离线模式 如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了。
2. 版本统一
   + Yarn 有一个锁定文件 (lock file) 记录了被确切安装上的模块的版本号。
3. 更简洁的输出
    + Yarn 简洁太多：默认情况下，结合了 emoji直观且直接地打印出必要的信息，也提供了一些命令供开发者查询额外的安装信息。
4. 多注册来源处理：
    + 所有的依赖包，不管他被不同的库间接关联引用多少次，安装这个包时，只会从一个注册来源去装，要么是 npm 要么是 bower, 防止出现混乱不一致。
5. 更好的语义化
    + yarn改变了一些npm命令的名称，比如 yarn add/remove，感觉上比 npm 原本的 install/uninstall 要更清晰。
