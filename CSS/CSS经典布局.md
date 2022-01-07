# Grid网格布局

## 基础知识

### Grid语法

```css
display : grid  //  容器采用网格布局
```

![grid 效果](https://www.wangbase.com/blogimg/asset/201903/bg2019032504.png)

```css
display : inline-grid  // 容器是行内元素，采用grid网格布局
```

![行内元素网格布局](https://www.wangbase.com/blogimg/asset/201903/bg2019032505.png)

> 注意，设为网格布局以后，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。





## 	容器属性

### **`grid-template-columns`**属性  **`grid-template-rows`**属性

+ **`grid-template-columns`**属性定义每一列的列宽 
+  **`grid-template-rows`**属性定义每一行的行高。

+ 可以是绝对单位，也可以是百分比

+ 可以使用**`repeat()`**函数，简化重复的值。` grid-template-columns: repeat(3, 33.33%);` 

  + 第一个参数是重复的次数（上例是3），
  + 第二个参数是所要重复的值。

+ **auto-fill 关键字** 希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用`auto-fill`关键字表示自动填充。

  + ```css
    grid-template-columns: repeat(auto-fill, 100px);//表示每列宽度100px，然后自动填充，直到容器不能放置更多的列。
    ```

+ **fr 关键字**表示比例关系 

  + 如果两列的宽度分别为`1fr`和`2fr`，就表示后者是前者的两倍。
  + 可以与绝对长度的单位结合使用 `grid-template-columns: 150px 1fr 2fr;`第一列的宽度为150像素，第二列的宽度是第三列的一半。

+ **`minmax()`**函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

  + `grid-template-columns: 1fr 1fr minmax(100px, 1fr);` 表示列宽不小于`100px`，不大于`1fr`。

+ **`auto`关键字**表示由浏览器自己决定长度。

  + `grid-template-columns: 100px auto 100px;`  第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了`min-width`，且这个值大于最大宽度。

+ **网格线的名称** `grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

  + ```css
     grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
     grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
    // 上面代码指定网格布局为3行 x 3列，因此有4根垂直网格线和4根水平网格线。方括号里面依次是这八根线的名字。
    ```

  + 网格布局允许同一根线有多个名字，比如`[fifth-line row-5]`。

+ **布局实例**

  + ```css
    div{
      display: grid
      grid-template-colums: 70% 30% // 两列布局
    }
    ```

  + ```css
    div{
      display: grid
      grid-template-columns: repeat(12, 1fr); // 传统十二网格布局
    }
    ```

    

### row-gap 属性， column-gap 属性， gap 属性

+ `row-gap`属性设置行与行的间隔（行间距）。

+ `column-gap`属性设置列与列的间隔（列间距）。

+ `gap`属性是`column-gap`和`row-gap`的合并简写形式。

  ```css
  .container {
    row-gap: 20px;
    column-gap: 20px;
    // gap: 20px 20px;
  }
  ```

  

![](https://www.wangbase.com/blogimg/asset/201903/bg2019032511.png)

### grid-template-areas 属性

网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。`grid-template-areas`属性用于定义区域。

> ```css
> .container {
>   display: grid;
>   grid-template-columns: 100px 100px 100px;
>   grid-template-rows: 100px 100px 100px;
>   grid-template-areas: 'a b c'
>                        'd e f'
>                        'g h i';
> }
> // 先划分出9个单元格，然后将其定名为a到i的九个区域，分别对应这九个单元格。
> ```

+ 多个单元格合并成一个区域的写法如下。

  ```css
  grid-template-areas: 'a a a'
                       'b b b'
                       'c c c';
  // 将9个单元格分成a、b、c三个区域。
  ```

  

+ 实例

  ```css
  grid-template-areas: "header header header"
                       "main main sidebar"
                       "footer footer footer";
  ```

  

### grid-auto-flow 属性

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，即下图数字的顺序。

![](https://www.wangbase.com/blogimg/asset/201903/bg2019032506.png)

这个顺序由`grid-auto-flow`属性决定，默认值是`row`，即"先行后列"。也可以将它设成`column`，变成"先列后行"。

> ```css
> grid-auto-flow: column;  // 默认row
> ```



![](https://www.wangbase.com/blogimg/asset/201903/bg2019032512.png)

### justify-items 属性， align-items 属性， place-items 属性

+ `justify-items`属性设置单元格内容的水平位置（左中右）
+ `align-items`属性设置单元格内容的垂直位置（上中下）。
+ `place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式。

> ```css
> .container {
>   justify-items: start | end | center | stretch;
>   align-items: start | end | center | stretch;
>   place-items: <align-items> <justify-items>;
> }
> // stretch：拉伸，占满单元格的整个宽度（默认值）。
> ```



### justify-content 属性， align-content 属性， place-content 属性

+ `justify-content`属性是整个内容区域在容器里面的水平位置（左中右）

+ `align-content`属性是整个内容区域的垂直位置（上中下）。

+ `place-content`属性是`align-content`属性和`justify-content`属性的合并简写形式。

  ```css
  .container {
    justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
    align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
  }
  // stretch - 项目大小没有指定时，拉伸占据整个网格容器。
  // space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
  // space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
  // space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

### grid-auto-columns 属性， grid-auto-rows 属性

+ `grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高。
+ 它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。
+ 如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

### grid-template 属性， grid 属性

+ `grid-template`属性是`grid-template-columns`、`grid-template-rows`和`grid-template-areas`这三个属性的合并简写形式。
+ `grid`属性是`grid-template-rows`、`grid-template-columns`、`grid-template-areas`、 `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow`这六个属性的合并简写形式。





## 项目属性

### grid-column-start 属性， grid-column-end 属性， grid-row-start 属性， grid-row-end 属性

- `grid-column-start`属性：左边框所在的垂直网格线

- `grid-column-end`属性：右边框所在的垂直网格线

- `grid-row-start`属性：上边框所在的水平网格线

- `grid-row-end`属性：下边框所在的水平网格线

  ```css
  .item-1 {
    grid-column-start: 2;
    grid-column-end: 4;
  }
  // 1号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线。
  ```

  ![示意图](https://www.wangbase.com/blogimg/asset/201903/bg2019032526.png)

指定四个边框位置

```css
 .item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;
}
```

![](https://www.wangbase.com/blogimg/asset/201903/bg2019032527.png)

+ 除了指定为第几个网格线，还可以指定为网格线的名字。

+ 还可以使用`span`关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。

  

### grid-column 属性， grid-row 属性

+ `grid-column`属性是`grid-column-start`和`grid-column-end`的合并简写形式，

+ `grid-row`属性是`grid-row-start`属性和`grid-row-end`的合并简写形式。

  ```css
  .item-1 {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }
  /* 等同于 */
  .item-1 {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  ```

+ 斜杠以及后面的部分可以省略，默认跨越一个网格。

  ```css
  .item-1 {
    grid-column: 1;
    grid-row: 1;
  }
  ```

  ![](https://www.wangbase.com/blogimg/asset/201903/bg2019032529.png)



### grid-area 属性

+ `grid-area`属性指定项目放在哪一个区域。

  ```css
  .item-1 {
    grid-area: e;
  }
  ```

  ![](https://www.wangbase.com/blogimg/asset/201903/bg2019032530.png)

+ `grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置。

```css
.item {
    grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
```

### justify-self 属性， align-self 属性， place-self 属性

+ `justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。
+ `align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。
+ `place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式。





## 参考 

[阮一峰CSS Grid 网格布局教程](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

