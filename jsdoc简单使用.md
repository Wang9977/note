# jsdoc使用

## 简介

JSDoc 3是JavaScript的API文档生成器，类似于Javadoc或phpDocumentor。可以通过为源代码添加固定格式的注释。JSDoc工具将扫描源代码及其注释并生成一个HTML文档网站。

## 功能

+ JSDoc的目的是根据JS的API的注释，生成文档网页展示向应信息。如展示方法参数，返回类型，例子之类的内容。

+ JSDoc注释通常应放置在文档记录之前。每个注释必须以一个`/**`序列开头才能被JSDoc解析器识别。以`/*`，`/***`或超过3星开头的注释将被忽略。

## 安装

`npm install -g jsdoc`

## 使用

+ 单个js文件  执行`jsdoc XX.js`
+ 多个文件 通过配置conf.json，然后执行 `jsdoc -c conf.json`

## jsdoc配置文件 -- conf.json

```json
{
  "source": { // 表示传递给 JSDOC 的文件
      "include": [ "./src/utils/" ,"README.md"], //  表示 JSDOC 需要扫描哪些文件
      "exclude": [], // 表示 JSDOC 需要排除哪些文件
      "includePattern": ".+\\.js(doc)?$", // 只扫描以js或者doc结尾的文件
      "excludePattern": "(^|\\/|\\\\)_" // 不扫描对应文件
  },
  "opts": { //表示传递给 JSDOC 的选项
      "template": "node_modules/docdash", // 生成文档的模板，默认default  本utils项目里面使用了 docdash主题 
      "encoding": "utf8", // 读取文件的编码，默认是 utf8
      "destination": "./out/", // 生成文档的路径，默认是 ./out/
      "recurse": true, // 运行时是否递归子目录
      "verbose": true // 运行时是否输出详细信息，默认是 false
  },
  "tags": {
      "allowUnknownTags": true
  },
  "templates": {
    "cleverLinks": true,
    "default": {
      "outputSourceFiles": true,
      "includeDate": false,
      "useLongnameInNav": false,
      "systemName": "Common Modules",
      "footer": "",
      "navType": "vertical"
    }
  },
  "docdash": {
    "search": true,
    "collapse": true,
    "footer": "",
    "sort":true,

    "meta": {
      "title": "函数工具库",
      "description": "日常 JavaScript  函数工具库，方便查看",
      "keyword": "javaScript, utils, jsdoc"
    },
    "menu": {
      "GitLab": {
        "href": "https://git.jd.com/label-fe/js-utils",
        "class": "menu-item",
        "id": "website_link"
      }
    }
  }
}
```



## 注释

```js
/**
 * 两个数组的交集
 * @author w
 * @param {Array} arr1 数组1
 * @param {Array} arr2 数组2
 * @returns {Array} 数组1和数组2重复的部分
 * @example
 * const arr1 = [1,2,3]
 * const arr2 = [2,3,4]
 * getArrRepeat(arr1,arr2) => [2,3]
 */
export function getArrRepeat (arr1, arr2) {
  return arr1.filter((item) => {
    return arr2.includes(item)
  })
}
```

+ @author 作者
+ @param 函数入参  后面分别是 `{type}`类型  变量名name   变量描述description
+ @returns/@return 返回类型 及描述
+ @example 例子

## 展示效果

![](C:\Users\wangyuan198\Pictures\企业咚咚截图20210421174855.png)

## 遇到的问题

1. 扫描后的函数函数不分类，默认在GLOBAL里面，我们希望数组操作的函数都写array分类下

   解决： 在array.js里面 顶部写@module Array，这样写后array.js里面所有的函数都在module/array分组下

   ```js
   // arrat.js
   /**
   * @module Array
   */
   ```

   

## 参考

(jsdoc 主页)[https://github.com/jsdoc/jsdoc]

(docdash主页)[https://github.com/clenemt/docdash]