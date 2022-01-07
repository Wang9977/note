# husky 助力前端代码规范

## 简介

git hooks 是git 执行 特定事件后触发运行的脚本，没有设置时可以忽略。

husky是git hooks工具 为git 增加hook的工具

比如：pre-commit 钩子会在执行 git commit 命令时触发，可以做一些lint检查、单元测试、代码美化等操作。



## 安装使用

1. 将husky添加到项目的开发依赖中

```shell
npm install husky
```

2. 在package.json中设置我们需要的git hooks

```json
{
  "scripts": {
    "prepare": "husky install"
  }
  // 安装依赖时执行
}
```

prepare脚本会在`npm install`（不带参数）之后自动执行。也就是说当我们执行npm install安装完项目依赖后会执行 `husky install`命令，该命令会创建.husky/目录，并指定该目录为git hooks所在的目录。

3. 添加git hooks，运行一下命令创建git hooks

```shell
npx husky add .husky/pre-commit "npm run test"
```

运行完该命令后我们会看到.husky/目录下新增了一个名为pre-commit的shell脚本。也就是说在在执行git commit命令时会先执行pre-commit这个脚本。pre-commit脚本内容如下：

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run test  // 在git commit 执行时，运行这个命令
```





## 对应钩子函数

### 1. commit-msg  实现commit信息规范化

​	验证commit信息

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# npx 是npm的一个免安装工具，
# 本质就是可以临时download执行某个二进制
npx --no-install commitlint --edit $1
```
根目录下配置`.commitlintrc.js` 文件
```js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      // 数组中第一位为level，可选0,1,2，0为disable，1为warning，2为error，第二位为应用与否，可选always|never，第三位该rule的值。
      'type-enum': [
        2,
        'always',
        ['feat', 'fix', 'docs', 'refactor', 'style', 'perf', 'test', 'chore']
      ],
      'type-case': [0],
      'type-empty': [0],
      'scope-empty': [0],
      'scope-case': [0],
      'subject-full-stop': [0, 'never'],
      'subject-case': [0, 'never'],
      'header-max-length': [0, 'always', 72]
    }
  };

```

符合以上配置的commit通过

![](https://apijoyspace.jd.com/v1/files/4OfCS6sbqmMso6u6enpi/link)

否则不通过，commit失败，需要重新commit

![image-20210926153840988](https://apijoyspace.jd.com/v1/files/voDP3MH2cd8hRzZBh9eu/link)

####  跳过校验

```shell
git commit --no-verify -m 'xxxxx'
```



### 2. pre-commit 提交缓存区。做eslint检查

格式化代码 eslint

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 这里就是唤醒lint-staged
npx lint-staged 
```



####  link-stage

对被git add 的文件 ，配置 lint任务 做代码检查和规范



Package.json里面配置

```json
"lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint --fix"
    ]
  } 
# 在git commit 的时候，对add过的js/vue文件，进行eslint-fix，并把修复后的代码重新add
```

在根目录下，添加eslintrc.js ，配置相应的格式



## 总结

解决不同IDE需要本地配置代码格式的问题

逐渐实现代码规范化



## 引用

husky 官方文档：[husky docs](https://typicode.github.io/husky/)

commitlint 官方文档：[commitlint docs](https://commitlint.js.org/)

给 husky 添加 commitlint 钩子：[Install husky](https://commitlint.js.org/#/guides-local-setup?id=install-husky)
