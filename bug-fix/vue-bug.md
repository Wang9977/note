## 没有渲染成功

渲染不成功

```js
created(){
    this.res = await get1()
    if(true) await this.get2() // get2 获取数据，但是没有渲染≤
    //改为
    if(true) await this.get2()
    this.res = await get1() // 成功渲染
}
```