https://segmentfault.com/a/1190000023717411



**没有设置div的height属性时，div的高度根据line-height的大小而变化，且文字垂直居中**



Line-height可继承

## 计算line-height

### 百分比赋值

```css
body {
    line-height：120%;
}
```

如果body没设置font-size，默认是16px。

所以计算的lie-height的值是(16px * 120% = 19.2px)，这个值会被继承下去。即使body下面子元素设置了font-size的值，如果没设置line-height的值，都按照当前继承的line-height值渲染。

注意：这种设置line-height的方式，不管子元素设置多少font-size的大小，line-height不会跟着做相应比例的缩放。





### 长度赋值方式

```css
body {
    line-height：20px;
}
```

如果body没设置font-size，默认是16px。

lie-height的值是(20px)，这个值会被继承下去。跟上面设置百分比的方式一样，即使body下面子元素设置了font-size的值，如果没设置line-height的值，都按照当前继承的line-height值渲染。

注意：这种设置line-height的方式，不管子元素设置多少font-size的大小，line-height也不会跟着做相应比例的缩放。


### line-height: normal
```css
body {
    line-height：normal;
}
```

如果body没设置font-size，默认是16px。

lie-height此时的值(约为1.2的倍数)，即当子元素设置font-size的时候，当前子元素的line-height是按照(font-size * 约1.2 = )来计算

注意：这种设置line-height的方式，line-height会跟着当前子元素的font-size的值做相应比例的缩放。


### line-height: 2.5，用数字赋值
```css
body {
    line-height：2.5；
}
```
如果body没设置font-size，默认是16px。

lie-height此时的值(2.5的倍数)，即当子元素设置font-size的时候，当前子元素的line-height是按照(font-size * 2.5 = )来计算

注意：这种设置line-height的方式，line-height会跟着当前子元素的font-size的值做相应比例的缩放。

**所以一般在使用的时候设置纯数字赋值的方式比较好**
