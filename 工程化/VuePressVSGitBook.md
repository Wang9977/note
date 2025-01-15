#静态网站

## VuePress
### 介绍
由两部分组成。1、极简静态网站生成器，包含Vue驱动的主题系统和插件Api
2、默认主题。为书写技术文档而优化的，初衷是支持vue及其子项目的文档
每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。

### 特点
VuePress

1. 简洁至上
以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。

2. Vue 驱动
+ 是 Vue 驱动的静态网站生成器。
+ 享受 Vue + webpack 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。

3. 高性能
VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。

### 安装及使用
```shell
# 安装
yarn global add vuepress # 或者：npm install -g vuepress

# 创建项目目录
mkdir vuepress-demo && cd vuepress-demo

# 新建一个 markdown 文件
echo '# Hello VuePress!' > README.md

# 开始写作
vuepress dev .

# 构建静态文件
vuepress build .
```

### 目录结构
VuePress 遵循 “约定优于配置” 的原则，推荐的目录结构如下：
```shell
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│
└── package.json
```
⚠️注意
+ docs/.vuepress: 用于存放全局的配置、组件、静态资源等。
+ docs/.vuepress/components: 该目录中的 Vue 组件将会被自动注册为全局组件。
+ docs/.vuepress/theme: 用于存放本地主题。
+ docs/.vuepress/styles: 用于存放样式相关的文件。
+ docs/.vuepress/styles/index.styl: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
+ docs/.vuepress/styles/palette.styl: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
+ docs/.vuepress/public: 静态资源目录。
+ docs/.vuepress/templates: 存储 HTML 模板文件。
+ docs/.vuepress/templates/dev.html: 用于开发环境的 HTML 模板文件。
+ docs/.vuepress/templates/ssr.html: 构建时基于 Vue SSR 的 HTML 模板文件。
+ docs/.vuepress/config.js: 配置文件的入口文件，也可以是 YML 或 toml。
+ docs/.vuepress/enhanceApp.js: 客户端应用的增强。

## GitBook
### 常用指令
+ 安装 GitBook：npm i gitbook-cli -g

+ 初始化 GitBook 项目：gitbook init

+ 安装 GitBook 依赖：gitbook install

+ 开启 GitBook 服务：gitbook serve

+ 打包 GitBook 项目：gitbook build

+ GitBook 命令行查看：gitbook -help

+ GitBook 版本查看：gitbook -V

### 安装使用

1. 新建空文件夹，初始化一个 GitBook 项目。

2. gitbook init 初始化 README.md 和 SUMMARY.md 两个文件.

3. gitbook build 本地构建但不运行服务，默认输出到 _book/ 目录.

4. gitbook serve 本地构建并运行服务，默认访问 http://localhost:4000 实时预览.

### 目录文件
+ README.md 是默认首页文件，相当于网站的首页 index.html ,一般是介绍文字或相关导航链接.

+ SUMMARY.md 是默认概括文件，主要是根据该文件内容生成相应的目录结构，同 README.md 一样都是被 gitbook init 初始化默认创建的重要文件.

+ _book 是默认的输出目录，存放着原始 markdown 渲染完毕后的 html 文件，可以直接打包到服务器充当静态网站使用。一般是执行 gitbook build 或 gitbook serve 自动生成的.

+ book.json 是配置文件，用于个性化调整 gitbook 的相关配置，如定义电子书的标题、封面、作者等信息。虽然是手动创建但一般是必选的.

+ GLOSSARY.md 是默认的词汇表，主要说明专业词汇的详细解释，这样阅读到专业词汇时就会有相应提示信息，也是手动创建但是可选的.

+ LANGS.md 是默认的语言文件，用于国际化版本翻译和 GLOSSARY.md 一样是手动创建但是可选的.


## VuePress  VS GitBook

![image-20220330132434858](/Users/wangyuan198/Library/Application Support/typora-user-images/image-20220330132434858.png)

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

<https://vuepress.vuejs.org/zh/guide/>

<https://stackshare.io/stackups/gitbook-vs-vuepress>

<https://www.zhihu.com/question/272447285>
