# 自适应实现五种经典布局





## 空间居中布局

> 项目在容器的中心位置

![空间居中](https://www.wangbase.com/blogimg/asset/202008/bg2020080703.jpg)

```css
.container {
    display: grid;
    place-items: center;
} 
```





## 并列式布局

> 多个项目并列，项目宽度不够，就自动折行

<img src="https://www.wangbase.com/blogimg/asset/202008/bg2020080706.jpg"/>

<img src="https://www.wangbase.com/blogimg/asset/202008/bg2020080707.jpg" />

```css
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.item{
   flex: 0 1 150px;
   margin: 5px;
}
```

+ `flex`属性是`flex-grow`、`flex-shrink`、`flex-basis`这三个属性的简写形式。

  + `flex-grow`：指定如果有多余宽度，项目是否可以扩大。
  + `flex-shrink`：指定如果宽度不足，项目是否可以缩小。
  + `flex-basis`：项目的初始宽度。

+ 如果写成`flex: 1 1 150px;`，就表示项目始终会占满所有宽度。

  ![](https://www.wangbase.com/blogimg/asset/202008/bg2020080711.jpg)

  ![](https://www.wangbase.com/blogimg/asset/202008/bg2020080710.jpg)

## 两栏式布局

> 一个边栏，一个主栏

![](https://www.wangbase.com/blogimg/asset/202008/bg2020080712.jpg)

实现边栏固定，主栏自适应。

```css
.container {
    display: grid;
    grid-template-columns: minmax(150px, 25%) 1fr;
}
// 第二列为1fr，即所有剩余宽度。
```





## 三明治布局

> 垂直方向上，页面分为：页眉、内容区、页脚 三部分
>
> 这个布局会根据设备宽度，自动适应，并且不管内容区有多少内容，页脚始终在容器底部（粘性页脚）。也就是说，这个布局总是会占满整个页面高度。

![](https://www.wangbase.com/blogimg/asset/202008/bg2020080715.jpg)

```css
.container {
    display: grid;
    grid-template-rows: auto 1fr auto;
}
```

`grid-template-rows`那一行，指定垂直高度怎么划分，这里是从上到下分成三部分。第一部分（页眉）和第三部分（页脚）的高度都为`auto`，即本来的内容高度；第二部分（内容区）的高度为`1fr`，即剩余的所有高度，这可以保证页脚始终在容器的底部。





## 圣杯布局

> 圣杯布局是最常用的布局，所以被比喻为圣杯。它将页面分成五个部分，除了页眉和页脚，内容区分成左边栏、主栏、右边栏。
>
> 这里的实现是，不管页面宽度，内容区始终分成三栏。如果宽度太窄，主栏和右边栏会看不到。如果想将这三栏改成小屏幕自动堆叠，可以参考并列式布局。

![](https://www.wangbase.com/blogimg/asset/202008/bg2020080717.jpg)

```html
<div class="container">
    <header/>
    <div/>
    <main/>
    <div/>
    <footer/>
</div>
```

```css
.container {
    display: grid;
    grid-template: auto 1fr auto / auto 1fr auto;
}
```

`grid-template-rows`和`grid-template-columns`都是`auto 1fr auto`，就表示页面在垂直方向和水平方向上，都分成三个部分。第一部分（页眉和左边栏）和第三部分（页脚和右边栏）都是本来的内容高度（或宽度），第二部分（内容区和主栏）占满剩余的高度（或宽度）。