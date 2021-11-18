# 机器学习在前端的应用---imgcook

## 简介

[UI生成代码平台--imgcook](https://www.imgcook.com/) 阿里淘系前端团队 

[凹凸实验室 Deco]( https://jelly.jd.com/article/5ffbc4fcdd7c080151c80c74)



imgcook----设计稿 --->代码 的平台

引入了 CV、NLP 等 AI 技术来辅助识别设计稿信息智能生成可读性和可维护性较高的代码，例如 React、Vue等。 

**痛点**：针对大促期间活动页面UI难以复用的场景,节约人力资源

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f39ca2fcc1b942978ee9dc1809965e1e~tplv-k3u1fbpfcp-watermark.awebp)

![](https://img11.360buyimg.com/ling/jfs/t1/163904/32/2136/122043/5ffbc47cE149bf0b2/da3b95744523db5f.jpg)

用智能化的解决方案来替代传统的人工页面重构（分析图层样式+切图等），期望能从视觉稿原始信息中提取结构化的数据描述，进而再与智能布局等算法结合，输出可维护的页面代码。

**成果：**2020年双11活动页面的模块中，有 90.4% 的新增模块使用了 imgcook 来生成代码，生成代码的可用率达 79%，整体效率提升了 68%。

**发展阶段：** 

+ 2019年1.0版本，开始对外开放。
+ 2020年2.0版本，引入机器学习算法，产品链路完善。
+ 2021年3.0版本，整个体系完善，智能化程度提升。内测版，图片一键生成代码。

**大致流程:**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/840d6d90a6044aca8015592390d9c711~tplv-k3u1fbpfcp-watermark.awebp)

其中程序算法是指通过有限的规则计算来自动的识别设计稿，例如我们可以根据每个图层的坐标、宽高等信息来计算出它是不是一个循环结构，可以根据字体的大小和字数来判断这个文本是个标题还是提示信息。 通过机器学习模型来智能识别能够解决一部分程序算法无法覆盖的问题，对于程序算法和模型算法目前都还不能解决的问题，也提供了人工标记设计稿图层的方式来解决。



## 机器学习算法在imgcook的应用

### 相关概念介绍 

+ **人工智能** 机器智能化。机器能够像人一样思考和做决策，从而达到降低人力成本的目标。

* **机器学习** 实现人工智能的一种技术，计算机程序可以在给定某种类别的任务 T 和性能度量 P 下学习经验 E ，如果其在任务 T 中的性能恰好可以用 P 度量，则随着经验 E 而提高。
  * 可以给机器学习的算法输入大量的样本，算法学习到这些样本特征之后，可以去预测相似样本有什么特征。 机器学习的过程与人类学习的过程是很相似的，经过学习总结得到知识和经验，当有类似的任务时可以根据已有的经验做出决定或行动。 

+ **深度学习**    是机器学习的分支。现在一般是指神经网络

![示意图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79236188796347d9a935905a01e190b7~tplv-k3u1fbpfcp-zoom-1.image)









+ 深度学习在CV和NLP领域的应用

![应用示例图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fac843c2c0943fda0b5c10ec4997ee0~tplv-k3u1fbpfcp-zoom-1.image)



+ cv  基本任务
  + 图像分类 根据图像的主要内容进行分类。
  + 目标检测  要识别图像中的目标物体，还要知道这个物体的位置
  + 语义分割 对图像中的每个像素都划分出对应的类别，即对一幅图像实现像素级别的分类
  + 实体分割 对图像中的每个像素都划分出对应的类别，即实现像素级别的分类，类的具体对象，即为实例，那么实例分割不但要进行像素级别的分类，还需在具体的类别基础上区别开不同的实例。
+ Nlp 基本任务
  + 序列标注  从一段文本中识别哪些是地名哪些是人名
  + 文本分类  识别文本是问题标题，还是问题描述
  + 句子关系判断  智能客服问答
  + 生成式任务  机器翻译



### Imgcook 实现原理

那在 imgcook 中对页面中 UI 信息的识别问题，一般都会定义成图像分类、目标检测和文本分类任务。

+ 原理

  1. 组件识别
  2. 组成代码

  UI 的设计稿可以转换成一个JSON文件，里面每一个元素都是一个节点，且具有相关位置，颜色以及其他信息。通过算法对每个节点进行识别，得到每个节点的组件类型。

  ![image-20210720174313932](/Users/wangyuan198/Library/Application Support/typora-user-images/image-20210720174313932.png)



​		

在经过布局算法生成了具有比较合理的嵌套布局结构的 D2C Schema 之后，根据 div 容器节点的位置将这些页面内部截图裁剪出来，然后调用组件识别模型服务来识别，识别的结果再更新到 D2C Schema 中对应的节点的 smart 字段上。 

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7709436b63554f5cad2c4eadedbd0f86~tplv-k3u1fbpfcp-zoom-1.image)



**demo**

[Mac部署前端组件图片分类](https://juejin.cn/post/6854573211963785229)

训练集

![image-20210922001119167](/Users/wangyuan198/Library/Application Support/typora-user-images/image-20210922001119167.png)

测试集

![image-20210922001204526](/Users/wangyuan198/Library/Application Support/typora-user-images/image-20210922001204526.png)

![image-20210922001215267](/Users/wangyuan198/Library/Application Support/typora-user-images/image-20210922001215267.png)





**表达成代码**

大致的逻辑是递归遍历 D2C schema 中的节点，判断节点类型，转换成对应的标签。 

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7e3f2b207744c68a3437c729bd456b0~tplv-k3u1fbpfcp-zoom-1.image)



如果在转换过程中还需要将组件识别的结果转换成引入外部组件的话，还需要给DSL函数输入用户录入的组件，根据组件的类型和模型识别的结果，在生成代码时引入用户录入的外部组件。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a235ea17997341b7a1214522f11170d7~tplv-k3u1fbpfcp-zoom-1.image)





## imgcook 总结

### 优点

1.  前端的新思路
2. 一定程度上减少人力

### 缺点

1. 操作较难，需要UI标注
4. 逻辑需要自己填写
3. 准确率低，需要人为干预



## Demo

1. [colab实现组件分类](https://colab.research.google.com/drive/1qO-zT1Ds0WhaoeJBxiu-1lmsSSJqpucd?usp=sharing#scrollTo=TyG7M4KbOCD0)

