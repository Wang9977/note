# 第一章 概述

## 1.1 CSS世界的世界观

css全称是 cascading style sheets  层叠样式表

层叠的意思是 层层叠加，比如页面元素都继承12px  标题就可以设置成14像素

1996年 css1 诞生

1998年 css2 发布 推行 内容和表现分离

**css 世界的诞生 就是为了图文信息展示服务的**



## 流

流   是css世界中的一种基本的定位和布局机制

+ div自动铺满容器
+ 行内元素依次排列，不足则换行





## 相关术语

1. 属性

   例如：height color等

2. 值

   1. 整数值： 比如z-index:1 
   2. 数值: line-height:1.5
   3. 百分比值
   4. 长度值
   5. 颜色值
   6. 字符串值
   7. 位置值
   8. css3 角度值 频率值 时间值等类型

3. 关键字

   例如transparent  solid inherit 其中inherit 称为泛关键字

4. 变量

   比如 CSS3中currentColor 

5. 长度单位

   1. 相对长度单位
      1. 相对字体长度单位
         +  Css2中 em ex
         + CSS3中 rem ch(字符0的宽度)
      2. 相对视区长度单位
         + vh vw
         + vmin vmax
   2. 绝对长度单位
      1. px
      2. pt cm mm pc

6. 功能符  值以函数的形式指定

   1. 颜色 rgba(0,0,0,.5)
   2. 背景图片地址 url('xx.jpg')
   3. 计算 calc 
   4. 过渡效果 scale(-1)

7. 属性值 冒号后面所有内容

8. 声明

   属性名+属性值。color: transparente 

9. 声明块

   {}包裹的一系列声明

   ```css
   {
     height: 99px;
     color: transparent
   }
   ```

10. 规则或规则集

    选择器+声明块

    ```css
    .example{
      height: 99px;
      color: transparent
    }
    ```

11. 选择器

    用来瞄准目标元素的东西 比如 .example

    + 类选择器  以.开头的选择器
    + ID选择器  以#打头 一般指向唯一元素
    + 属性选择器 含有[]的选择器 [title]{}
    + 伪类选择器
    + 伪元素选择器

12. 关系选择器

    + 后代选择器              空格连接
    + 子选择器（相邻后代选择器）       合乎规则的儿子元素   > 连接
    + 兄弟选择器              ～连接
    + 相邻兄弟选择器       + 连接

13. @规则

    例如 @media @font- face @page @support



未定义行为

 