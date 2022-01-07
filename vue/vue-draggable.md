# vue-draggable
```js
start,add,remove,update,end,choose,unchoose,sort,filter,clone

start (evt) {} // 刚开始拖动时候触发
add (evt) {} // 拖拽新增的时候触发
remove (evt) {} // 从列表拖走，移除触发
update (evt) {} // 列表更新触发
end (evt) {} // 和start对应，拖拽完了触发
choose(evt) {} // 选择拖拽元素触发
sort (evt) {} // 排序触发
change (evt) {} // 这个很重要，如果数据不是整个提交，单个提交数据的时候就会用到它 evt.added.element / evt.removed.element如果这个列表添加元素就会added的数据，如果删除元素就是removed的元素，还会获取到移动和删除的所在位置index
:move (evt, dragevt) {} // 这个也很重要，在两个列表相互拖拽的时候，有时候需要更新ui，在接口还没有更新之前，所以就会用到move，他是把元素从一个列表拖到另一个列表的瞬间触发，这时候可以给原来的位置设置元素样式等等。
```

## vue-draggable+transition-group

`transition-group` 内应含需要拖拽的节点：

```vue
<draggable v-model="myArray">
    <transition-group>
        <div v-for="element in myArray" :key="element.id">
            {{element.name}}
        </div>
    </transition-group>
</draggable>
```

+ `transition-group` 内的元素 `display` 必须是 `block`。
+ 在拖拽选中状态，默认会添加一个 class：`.sortable-drag`，利用 CSS 的 `:not()` 选择器可以排除在 `.sortable-drag` 的情况。