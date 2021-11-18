表单



```js
this.$refs.form.resetFields()
```

+ 作用：重置表单

```js
this.$refs.form.clearValidate()
```

+ 作用：清除表单提示语
+ 使用
  + 单个控件，将控件prop属性值传入
  + 该控件对应的el-form-item标签中增加ref属性值，然后调用clearValidate方法。

