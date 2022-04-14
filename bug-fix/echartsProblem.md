#  使用ECharts遇到的问题



## 版本问题

使用词云库的时候 word-cloud对应Echarts4版本 word-cloud对应Echarts5版本 需要找到对应版本 ，否则执行出错



## 事件处理问题

场景：在词云每个词点击触发点击函数，需要在echarts内部，将this传进去

```js
let that = this
this.chart.on('click', function (params) {
    // 在用户点击后控制台打印数据的名称
    that.$emit('getName', params.name)
})
```

 

