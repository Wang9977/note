V-module 三元表达式

<input type="text" v-model="$data[testCondition ? 'name' : 'place']">

```vue
<input type="text" v-model="$data[testCondition ? 'name' : 'place']">
<script>
  data(){
    return {
      testCondition,
      name,
      place
    }
  }
```

el-table 多选框

数据刷新之后仍保留

```vue
row-key=唯一字段

:reserve-selection = true
```


