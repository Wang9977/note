# VuePress  VS GitBook

![image-20220330132434858](/Users/wangyuan198/Library/Application Support/typora-user-images/image-20220330132434858.png)

## VuePress

优点：

+ 简洁。配置少
+ VUE驱动。 享受VUE+webpack
+ 加载高性能。为每个页面渲染生成静态的HTML，每个页面加载时，作为SPA运行
+ 良好SEO
+ 自定义主题

缺点：

+ 不支持全局搜索 需要插件配合
+ 目录不能自动生成
+ 特殊字符无法转换

效果：

[Demo](https://wang9977.github.io/note/#/)



## GitBook

优点：

+ 阅读体验佳。可以调节背景字体大小
+ 可以导出PDF
+ 支持全文搜素

缺点：

+ 当文件很多时，每次编辑后的重新加载时间长

+ 默认主题导航结构也比较有限制性
+ 主题系统不是Vue驱动
+ 之后的定位，专注于商业产品 

效果：

[Demo](https://491988016.gitbook.io/notes/css/css-weight)





## VuePress VS GitBook

<table>
    <tr>
        <th>-</th><th>相同点</th><th>不同点</th>
    </tr>
    <tr>
        <td >VuePress</td><td rowspan="2">目前只支持 markdown 格式，图片、视频 等静态资源可以保存在本地，或者保存到允许访问的第三方服务商</td><td>1. VuePress 的配置成本稍稍大一点，不过可以使用 Vue 的语法与组件，定制化更自由一点，而且 VuePress 中编写 Vue和平时一样，学习成本几乎为零，可以本地用 VsCode 编辑，然后直接命令行部署。<br>
      2.vuepress默认只能搜索标题，全文需要引用第三方的工具
      </td>
    </tr>
    <tr>
        <td>GitBook</td><td>1.GitBook 的配置成本很小，可以本地编辑，然后直接部署；GitBook 官方还有个在线编辑器，不过内容要存在 GitBook的服务器上。<br>
      2. 搜索支持全文搜索
      </td>
    </tr>



## 参考链接

https://vuepress.vuejs.org/zh/guide/

https://stackshare.io/stackups/gitbook-vs-vuepress

https://www.zhihu.com/question/272447285





