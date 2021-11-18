# Chrome Devtool Performance使用指南

# 概念

### RAIL 以用户为核心的性能模型

RAIL 是 response （响应）、 animation（动画）、idle（浏览器空置状态）和 load（加载）。

1. **Response**

	- **tapping（轻触）** – 当用户轻触或者点击一个按钮或者图标时（比如，轻触菜单图标打开一个抽屉导航）。
	- 要得到响应式的回应，我们需要：
	  - 在首次收到输入时，在100毫秒内得到回应。
	  - 如果>100 需要 loading
	
2. **Animation**

   + 视觉动画

     +  这个包括了动画的开始和退出，状态改变时的动画，还有加载标识。

   + 滚动

     + 当用户开始滚动页面，页面出现猛动的情况。

   + 拖拽

     + 当我们需要对用户的拖拽交互在100毫秒以内做出响应时，比如平移地图或者缩放屏幕时，我们需要依赖动画。

     > 每一帧动画要**在16毫秒内完成**，才能达到60FPS（1000ms/60 ~= 16.6 ms）

3.  **IDLE**

   要制作响应迅速动画精良的应用通常需要比较长的工时。[Optimistic UI](https://link.zhihu.com/?target=http%3A//info.meteor.com/blog/optimistic-ui-with-meteor-latency-compensation)模式利用这个技术达到了很好的效果。并非所有工作都要在 response 阶段或者 load 阶段完成：评论引导、组件初始化、数据检索和排序和分析数据的送都不是需要立刻传达给用户的，所以可以在浏览器空闲的时候再处理这些任务。

   要想合理地应用浏览器空闲时间，最好把时间以 50 毫秒为单位分组。为什么要这么做呢？在上文里也提到的，用户做出动作后，应用应该在 100 毫秒内给出响应，不应该出现一个模板渲染 2 秒之久。

4. **LOAD**

   想要尽快将页面加载出来，我们需要把最需要传达的内容在 1 秒内渲染出来。超过 1 秒钟，用户的注意力就会被分散，当前执行的任务将有中断感。要达到在 1 秒内渲染完毕的目标，我们要优先考虑关键渲染路径，将所有不需要在加载时处理的任务延迟到浏览器空闲时再处理（或根据需求拦加载）。

![总结](https://pic4.zhimg.com/80/dfff1a886a2a76df2c0d54f4d5a34c6b_1440w.jpg)



## 分析报告

### FPS 每一秒的帧

FPS（frames per second）是用来分析动画的一个主要性能指标。能保持在60的FPS的话，那么用户体验就是不错的。

1. 观察FPS图表，如果你发现了一个红色的长条，那么就说明这些帧存在严重问题，有可能导致非常差的用户体验。一般来说，绿色的长条越高，说明FPS越高，用户体验越好。

   ![](https://pic3.zhimg.com/80/v2-fd871e192ca970f82b13334c60d3bd7a_1440w.jpg)

2. 就在FPS图表下方，你会看到CPU图表。在CPU图表中的各种颜色与Summary面板里的颜色是相互对应的，Summary面板就在Performance面板的下方。CPU图表中的各种颜色代表着在这个时间段内，CPU在各种处理上所花费的时间。如果你看到了某个处理占用了大量的时间，那么这可能就是一个可以找到性能瓶颈的线索。

   ![](https://pic1.zhimg.com/80/v2-1cc581f23f53c6c83c2d1fbf68cfb15c_1440w.jpg)

   3. 把鼠标移动到FPS，CPU或者NET图表之上，DevToos就会展示这个时间点界面的截图。左右移动鼠标，可以重发当时的屏幕录像。这被称为scrubbing, 他可以用来分析动画的各个细节。

      ![](https://pic3.zhimg.com/80/v2-a95f54334770c724b75c21b7fe88a9d6_1440w.jpg)

   4. 在Frames图表中，把鼠标移动到绿色条状图上，Devtools会展示这个帧的FPS。每个帧可能都在60以下，都没有达到60的标准。

      ![](https://pic2.zhimg.com/80/v2-5e4f0fbcaca27f49ebb20c4fc16549e5_1440w.jpg)

### 小工具

1. 按下 Command+Shift+P（Mac）或者 Control+Shift+P(Windows, Linux) 打开命令菜单
2. 输入Rendering，点选Show Rendering
3. 在Rendering面板里，激活FPS Meter。FPS实时面板就出现在页面的右上方。

![](https://pic1.zhimg.com/80/v2-8ed26d65f1d99968ba55b894e63eb914_1440w.jpg)



### 提高性能

1. 注意Summary面板，你会发现CPU花费了大量的时间在rendering上。因为提高性能就是一门做减法的艺术，你的目标就是减少rendering的时间
2. 展开Main图表，Devtools展示了主线程运行状况。X轴代表着时间。每个长条代表着一个event。长条越长就代表这个event花费的时间越长。Y轴代表了调用栈（call stack）。在栈里，上面的event调用了下面的event。







## 引用

[RAIL,以用户为核心的性能模型](https://pic4.zhimg.com/80/dfff1a886a2a76df2c0d54f4d5a34c6b_1440w.jpg)

