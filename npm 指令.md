# npm 指令

## 初始化模块

npm init ---- 在当前目录生成一个package,json文件，该文件记录一些项目信息

## 安装模块 npm install

+ --save、-S  把模块的版本信息 保存到dependencies（生产环境依赖）中，即package.json文件的dependencies字段中。

```shell
npm install packagename --save 或 -S 
```

+ --save-dev、-D 把模块版本信息保存到devDependencies（开发环境依赖）中，即你的package.json文件的devDependencies字段中；

```shell
npm install packagename --save-dev 或 -D
```

+ --save-optional 、 -O参数意思是把模块安装到optionalDependencies（可选环境依赖）中，即你的package.json文件的optionalDependencies字段中。

```shell
npm install packagename --save-optional 或 -O
```

+ --save-exact 、 -E参数的意思是精确的安装指定版本的模块，细心的同学会发现dependencies字段里每个模块版本号前面的^不见鸟。。。

```shell
npm install packagename --save-exact 或 -E
```

# 查看安装模块

```shell
npm list || npm ll || npm ls || npm la
```



# 卸载模块

```shell
npm uninstall packagename
```

# 更新模块

+ 列出过时的模块

  ```shell
  npm outdated
  ```

+ 更新过时的模块

  ```shell
  npm update [-g]
  ```

  