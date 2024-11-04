## performance

网站的性能。

网页在浏览器下载和显示的速度。性能优化：提高网页效能的技术领域

### FCP 第一次有内容的绘制

第一次内容丰富的绘画(FCP)指标衡量了从页面开始加载到页面内容的任何部分呈现在屏幕上的时间。对于该指标，"内容 "指的是文本、图像（包括背景图像）、元素或非白色元素。

Largest Contentful Paint (LCP)之间的一个重要区别--LCP的目的是衡量页面的主要内容何时完成加载。

### speedIndex

> 速度指数衡量的是内容在页面加载过程中的视觉显示速度。Lighthouse首先会在浏览器中捕获一段页面加载的视频，并计算出各帧之间的视觉进度。然后，Lighthouse使用Speedline Node.js模块来生成速度指数得分。

### LCP

最大内容画（LCP）指标报告了在视口中可见的最大图像或文本块的渲染时间，相对于页面首次开始加载的时间

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fe34160f7344500b6527912c2d5723b~tplv-k3u1fbpfcp-watermark.awebp)

好的页面。网站LCP<=2.5秒

### Cumulative Layout Shift (CLS)

> Cumulative Layout Shift (CLS)是一种视觉稳定性的测量方法，它量化了页面内容在视觉上的移动程度。它量化了一个页面的内容在视觉上移动的程度。

### Total Blocking Time (TBT)

> 总阻塞时间（Total Blocking Time，TBT）量化了负载响应能力，测量了主线程被阻塞的时间长到足以阻止输入响应的总时间。TBT衡量的是第一次有内容的绘画（FCP）和交互时间（TTI）之间的总时间。它是TTI的配套指标，它为量化主线程活动带来了更多的细微差别，这些活动阻碍了用户与您的页面进行交互的能力。

## Accessibility

网页无故障(非典型使用者体验)

某些使用者以不同预期的方式访问网页以及交互，而网页无障碍类别则测试屏幕阅读器能力以及其他辅助技术是否在网页中正常运行

## SEO

网页搜索引擎最佳化

使搜索引擎更容易找到网站

## Progressive Web App：Web App 分析項目 （PWA）

為了幫助團隊創造最好的體驗，Lighthouse 整理了一份詳細的清單，列舉出想要

創建一個 Baseline PWA 需要滿足的條件。