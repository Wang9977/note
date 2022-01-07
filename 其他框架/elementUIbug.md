# el-table

+ row-key  选择表格数据 tableData里面的唯一标识

## 多选框表格

+ 分页时，回显表格

  + el-table 必须有row-key

  + `:reserve-selection="true"`

    ```vue
    <el-table-column
              slot="selection"
              type="selection"
              :selectable="checkSelect"
              :reserve-selection="true"
              width="40"
    />
    ```

    