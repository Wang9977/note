前端部署



# 静态资源组织

## 一个简单页面

静态页面 

前端资源：html css js

![资源组织结构](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/240634c5beaf49db92713ee281fa98fe~tplv-k3u1fbpfcp-watermark.awebp)

此时， 只需将 `HTML`、`JavaScript`、`CSS` 等静态资源通过 `FTP` 等软件，上传到 `Web` 服务器（如 `Nginx`）某目录，将 `Nginx` 启动做简单配置即可让用户访问。

## 利用缓存

但仔细观察，用户每次访问都会请求 `foo.css`, `bar.css` 等静态文件，即使该文件并无变更。对带宽甚是浪费，对页面首屏性能等也有影响。于是在网络带宽紧张的互联网早期，计算机先贤们在 `HTTP` 协议上制定了多种缓存策略。

> > 浏览器缓存：浏览器缓存(`Brower Caching`)是浏览器对之前请求过的文件进行缓存，以便下一次访问时重复使用，节省带宽，提高访问速度，降低服务器压力。

>  注意，缓存生效期间，浏览器是【自言自语】，和服务器无关。

### 协商缓存

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/149bb0b9e97f4032b1bd652d46e3f606~tplv-k3u1fbpfcp-watermark.awebp)

### 强缓存

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60b4eda718ff42d491c2aa788d0cbb42~tplv-k3u1fbpfcp-watermark.awebp?)

`From DiskCache`：从硬盘中读取。
`From MemoryCache`：从内存中读取，速度最快。
注：强缓存一般可在服务端通过设置 `Cache-Control:max-age`、`Expires` 等 `ResponseHeader `实现。



## 缓存更新问题

因为html会频繁更新，静态资源相对稳定。

=》html适合协商缓存 && 不常更新的静态资源使用强缓存

=〉问题：都不让浏览器发请求，但缓存还未到期我们发现有 `bug`，想更新 `foo.css` 怎么办？

1. 给资源加版本号  通过query

   ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff668da65572486db031eb113caaaaf1~tplv-k3u1fbpfcp-watermark.awebp)

   缺点：假如我们只想更新 `foo.css`，但 `bar.css` 缓存也失效了，又造成了带宽的浪费。

2. 文件内容与版本号绑定，内容改变 才变更版本号 称这种这个方式为 `query-hash`，后续发版上线时，只有被变更文件的 `URL` 会更新，

   ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93a85382a9f14e94b7c889a36f11809d~tplv-k3u1fbpfcp-watermark.awebp?)



## 覆盖式发布引发的问题

Query-hush 问题：

我们某次更新时，更改了 `foo.css` 样式，此时会将 HTML 中的foo.css url更新为最新的 hash，并将服务器中存储的 foo.css & index.html 文件覆盖为最新（V2版本），看似HTML和静态资源都对应更新了，但是没有考虑极端情况。那就是：

1. **先部署静态资源，部署期间访问时，会出现V1版本HTML访问到V2版本新静态资源，并按V1-hash缓存起来。**
2. **先部署HTML，部署期间访问时，会出现V2版本HTML访问到V1版本旧静态资源，并按V2-hash缓存起来。**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afed5037b76e48caac538b05d4db79b7~tplv-k3u1fbpfcp-watermark.awebp?)

> 绿色走向：正常访问并建立缓存的路径。
> 红色走向：先部署静态资源（V2），V1-HTML访问V2静态资源并缓存Case
> 黑色走向：先部署HTML（V2），V2-HTML访问V1资源并缓存Case



对于问题1，会有两种子Case：

1. 用户本地有缓存，此时无影响可正常访问。
2. 用户本地无缓存，则会将V2版本静态资源加载并按V1版本 hash 缓存起来。用户报错。当V2版本HTML部署完成后，用户再次访问时恢复。

对于问题2，则会出现严重的Case：
 V2 版本HTML，会将V1版本静态资源按V2版本Hash缓存起来。此时页面会出错，且缓存过期之前会持续报错。直到用户手动清除缓存，或者缓存过期，或者将来发布V3版本更新静态资源版本。否则用户会持续出错。
 上面方案的问题起源于静态资源只有一份，每次发布时都是**覆盖式发布**，导致页面与静态资源出现匹配错误的情况！解决问题方案也极其简单，使用**非覆盖式发布**，一种简单的改造方式是将文件摘要（`hash`）放置到`URL` 中，即将 `query-hash` 改为 `name-hash`。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69518680dfe345d6a4d74b4c00772111~tplv-k3u1fbpfcp-watermark.awebp?)


**这样，每次部署先全量部署静态资源，再灰度部署页面。此时服务器上会存在多份foo.[$hash].css文件**



## 结合CDN

将静态资源部署在 Nginx 服务器目录下，然后新的问题来了，随着时间推移，非覆盖部署导致文件逐渐增加多，硬盘逐渐吃紧。而且将文件存储在 `Nginx` `Web`服务器内某目录下，深度的将 `Nginx`、网站、部署过程等强耦合在一起，无法使用 `CDN` 技术。

>CDN 是一种内容分发网络，部署在应用层，利用智能分配技术，根据用户访问的地点，按照就近访问的原则分配到多个节点，来实现多点负载均衡。
 简单来说，用户就近访问，访问速度更快，大公司也无需搞一台超级带宽的存储服务器，只需使用多台正常带宽的 CDN 节点即可。
 而 CDN 的常见实现是有一台源站服务器，多个 CDN 节点定时从源站同步。



那如何将 CDN 与 Nginx 等 Web 服务器结合呢？
答案是将静态资源部署到 `CDN` 上，再将 `Nginx` 上的流量转发到 `CDN` 上，这种技术我们称之为『**反向代理**』。
此时，用户访问时流量走向 & 研发构建部署过程大致如下：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97e4477aff4a426896dcfee9a9492a41~tplv-k3u1fbpfcp-watermark.awebp?)

此时改造：

1. 构建时依据环境变量，将html中的静态资源地址加上CDN域名
2. 构建完成后，将静态资源上传到CDN
3. 配置Nginx的反向代理，将静态资源流量转发到CDN



其中1，2配置 以webpack为例 如下改造

```MD
a. 配置`output·为·content-hash`&`publicPath`
b. 配置`Weabpack-HTML-Plugin`
```



```js
// webpack.config.js
const CDN_HOST = process.env.CDN_HOST;// CDN 域名
const CDN_PATH = process.env.CDN_PATH; // CDN 路径
const ENV = process.env.ENV; // 当前的环境等等
const VERSION = process.env.VERSION; // 当前发布的版本

const getPublicPath = () => {
    // Some code here
    return `${CDN_HOST}/${CDN_PATH}/${ENV}/`;// 依据 ENV 等动态构造 publicPath
}

const publicPath = process.env.NODE_ENV === 'production' ? getPublicPath() : '.';

module.exports = {
    output: {
        filename: 'bundle.[name][contenthash:8].js',
        publicPath,
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
```

>备注1：我们往往会将一套代码部署到多套前端环境，还需要在构建时注入当前部署相关环境变量（如 `staging`、`prod`、`dev`、`pre`等），以便动态构建 `publicPath`。
 备注 2：这里动态构造的 publicPath 里，严格的将产物按环境 + 发布版本做了隔离 & 收敛。 某业务前端曾将所有环境的静态资源放到一起，以Hash做区分。但疑似出现了文件名 + hash 冲突，但文件内容不一样，导致了线上事故。故墙裂建议严格对产物做物理隔离。
 备注 3：`publicPath` 详解[webpack.docschina.org/configurati…](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.docschina.org%2Fconfiguration%2Foutput%2F%23outputpublicpath)
 备注 4：此处使用了 `content-hash`，与 `hash`、`chunkhash` 的区别请见：[详解webpack中的hash、chunkhash、contenthash区别](https://link.juejin.cn?target=https%3A%2F%2Fwww.cnblogs.com%2Fajaemp%2Fp%2F12915452.html)
 备注 5：使用 `contenthash` 时，往往会增加一个小模块后，整体文件的 `hash` 都发生变化，原因为`Webpack` 的 `module.id` 默认基于解析顺序自增，从而引发缓存失效。具体可通过设置 `optimization.moduleIds` 设置为 `'deterministic'` 。
 具体详见 [webpack 官方文档-缓存](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.docschina.org%2Fguides%2Fcaching%2F)
 注：关于 Webpack 的配置，校招生或客户端转前端同学，前期了解即可，后续建议深入学习。



3. 构建之后将资源上传CDN源站

上传 `CDN` 源站往往通过 `CLI` 调用各种客户端工具上传，此时要注意的是上传 `CDN` 依赖配置鉴权信息（如 文件存储的 Bucket Name/accessKey、ftp的账号密码）。这些鉴权信息不能直接写代码里，否则可能会有事故风险（想想为什么）！
 第 3 步改造是 `Nginx` 层反向代理改造

>反向代理（reverse proxy）：是指以代理服务器来接受网络请求，并将请求转发给内部的服务器，并且将内部服务器的返回，就像是二房东一样。
 一句话解释反向代理 & 正向代理：反向代理隐藏了真正的服务器，正向代理隐藏了真正的客户端。
 详见：[漫话：如何给女朋友解释什么是反向代理？](https://juejin.cn/post/6844903782556368910)

**Nginx设置proxy_pass配置代理转发**

```js
location ^~/static/ {
  proxy_pass $cdn
}
```

具体详见 [nginx 之 proxy_pass详解](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2Fb010c9302cd0)





### 总结一下，为了满足复杂的线上需求，在部署层面总体来说需要：**预发环境、版本管理、小流量、灰度、AB测试**等功能。



## 静态资源的加工

如前所述，前端静态资源部署到 `CDN` 后，有一道 `Nginx` 反向代理做转发的加工工序。事实上，为了解决各种部署问题或为了提升性能，人们往往而需要对静态资源做更多的加工工序。
 比如，部分 `Web` 应用为了提升首屏性能，一种常见的方式为通过 `BFF` 层或通过后端直出 `HTML`，并且在过程中注入若干信息，如 `userInfo`、用户权限信息、灰度信息等等，从而大幅降低前端登陆研发成本 & 降低首屏耗时。
 下面是后端直出 `HTML` 的一种简要流程。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1a8e5e937754a7b93c2545dc9822f58~tplv-k3u1fbpfcp-watermark.awebp)


主要流程为前端构建出的 `HTML` 包含若干模板变量，后端收到请求后，通过各种 `Proxy` 层将 `Cookie` 转换成用户信息，再按依据版本配置从 `CDN` 加载 `index.html`, 并使用模板引擎等方式将模板变量替换为用户信息，最终吐回给浏览器的则是已经包含用户信息的 `HTML` 了！



## Pre 环境、灰度上线的常见实现

### 方案一 Nginx 层动态转发

一种常见的 Pre 机制是静态资源部署多个版本后，开发者的通过 ModHeader 等浏览器插件，在请求中携带特定 Header（如xx-env=pre），在 Nginx 层消费该 Header 并动态转发到对应环境的静态资源上，实现访问 Pre 环境目的。此时，除静态资源为特定版本外，所有环境都是生产环境，可以将变量范围控制在最小。

流程大致如图：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d68c978a352b442398b9f93a7c5ea9bd~tplv-k3u1fbpfcp-watermark.awebp)


```js
location /example {
  rewrite ^$cdn/$http_x_xx_env/index.html break;
  proxy_pass $cdn/prod/index.html
}
# $http_x_xx_env 表示取自定义的 Request Header 字段 xx_env
```

该方案优点为配置简单高效，适用于工程师。
 缺点为每个用户都需要手动配置，不适用于移动端，且无法让特定用户被动精确访问某版本，比如 PM、KP 用户来配置 Header 成本过高。
 同理，也可以在 Nginx 层按一些其他规则处理，实现灰度上线的能力。
 如通过一定随机数 rewrite，达到小范围随机灰度。
 获取 ua 并 rewrite，达到按浏览器定向灰度。
 通过 Nginx GeoIP 获取地域信息，达到按地域灰度。
 但上述灰度方案配置复杂，而灰度比例 / 范围往往会配置较多，每次上线都需要运维登陆生产服务器修改，较容易出各种事故。故不推荐使用，仅供拓宽思路。




###  方案二 动态配置 + 服务端转发

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b36fe5f6468468e968a78db6fad315e~tplv-k3u1fbpfcp-watermark.awebp?)

主要流程为：

1. 前端攻城狮同学部署多个版本静态资源到 CDN 上（问题？如何管控多版本静态资源？）。
2. 后端收到请求后，通过各种 Proxy 层将 Cookie 转换成用户信息。
3. 后端读取配置中心数据，依据用户信息判断给用户访问什么环境，加载具体环境 index.html
4. 后端返回给浏览器加工后的 index.html
5. 若需添加具体 KP 等同学到 Pre 名单，攻城狮同学只需调用机器人/Bot 等，修改配置中心，即可生效。

此时，一些小流量配置，AB实验，版本管理其实也可以通过该方案实施。
 该方案**优点**：可以随时调整，不用后端发版，移动端也可生效。
 该方案**缺点**：

1. 和服务端强绑定（要求用户信息，在所难免）。
2. 每次都需要从 `CDN` 加载 `HTML`， 有一定性能浪费。但若缓存 `HTML`，发版环节还要通知服务端，总体增加复杂度。
3. 若考虑 `CDN` 故障，服务端做 `CDN` 降级会增加复杂度。
4. 版本管理 / 小流量等为通用需求，而该方案每个后端应用都需要开发或接入。
5. 常见的配置中心又一般为 `JSON` 配置，比较简陋，和发版的多环境无法关联，依赖人为配置，有出错的风险（如发版 `v1.2501`，配置中心手动配置时手误改成了`v1.2051`）。



## 总结

## 静态资源组织总结

1. 为了最大程度利用缓存，将页面入口(HTML)设置为协商缓存，将js、css等静态资源设置为永久强缓存
2. 为了解决强缓存更新问题，将文件摘要(hash)作为资源路径(URL)构成的一部分
3. 为了解决覆盖式发布引发的问题，采用name-hash 而不是 query-hash的组织方式，具体需要配置webpack的output.filename 为contenthash
4. 为了解决Nginx目录存储过大+结合CDN提升访问速度，采用了Nginx反向代理+将静态资源上传到CDN
5. 为了上传CDN 需要按环境动态构造publicPath + 按环境构造CDN目录并上传
6. 为了动态构造publicPath 并且随构建过程插入到HTML中，采用Webpack-HTML-Plugin等插件，将编译好的带hash+publicPath的静态资源插入到HTML中
7. 为了保证上传CDN的安全，需要一种机制管控上传CND密钥，而非简单的将密钥写到代码等明文文件中



## 自动化部署部分

为了提升部署效率，100% 避免因部署出错，需要设计 & 搭建自动化部署平台，以 Docker 等保证环境的一致性，以 Jenkins 等保证构建流程的串联。使用es-build等提升构建效率。



## 前端部署 & 静态资源加工

关于前端部署，能总结出下面几个原则/要求：

1. 构建发布后，不应该被覆盖。
2. 构建发布后，静态资源应当永久保存在服务器/CDN 上，即只可读。
3. 静态资源组织上，每个版本应该按文件夹存储，做到资源收敛。这样假如真要删除时，可按版本删除。（如某个版本代码泄密）
4. 发布过程应该自动化，开发人员不应该直接接触服务器
5. 版本切换时，也应当不接触服务器。
6. 版本切换能秒级生效。（如 v0.2 切换 v0.3，立即生效）。
7. 线上需要能同时生效多个版本，满足 AB 测试、灰度、PRE 环境等小流量需求。



## 前端发布服务

面对复杂的商业化需求，方便多前端业务实现版本管理、灰度、PRE、AB 测试等小流量功能，我们设计了一个中间服务 PageConfig Web & PageServer，与 Nginx 和各种后端相结合，达到配置即时生效的能力。