Vecharts 引入词云

1. ⚠️依赖包

   + 使用 Echarts+wordcloud

   + Echarts4 对应wordcloud1 Charts 对应wordcloud2

     ```shell
     yarn add wordcloud@1
     ```

     

2. 使用

   ```js
   import * as echarts from 'echarts'
   import 'echarts-wordcloud';
   // js中加上引用
   ```

   

3. 在vecharts中使用

   + 获取图表实例 

     + 通过`ec.sync` 绑定echarts实例
     + 在mounted中使用实例

     ```vue
     <template>
       <ve-line-chart :data="chartData" :ec.sync="chart" :title="title" />
     </template>
     <script>
     module.exports = {
       data () {
         return {
           chart: null,
           title: {}
         }
       },
       created () {
         this.chartData = {
           dimensions: {
             name: 'Repo',
             data: [
               'Vue.js', 'React', 'Create RA', 'Puppteer', 'Axios',
               'VS Code', 'Prettier', 'RN', 'Element', 'Electron'
             ].reverse()
           },
           measures: [
             {
               name: 'Rising Star',
               data: [
                 40000, 27800, 22500, 22000, 21900,
                 20200, 17700, 15600, 14900, 14800
               ].reverse()
             }
           ]
         }
       },
       mounted () {
         this.title = {
           text: '获取图表宽高',
           subtext: `宽：${this.chart.getWidth()} / 高：${this.chart.getHeight()}`
         }
         // 点击事件处理
         this.chart.on('click',(params)=>{
           console.log(params)
         })
       }
     }
     </script>
     ```

     



## # monted才可以获取dom节点