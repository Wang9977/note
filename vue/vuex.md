# <center>vuex</center>
# vuex概述
## 组件之间数据共享

**1. 小范围**

> + 父向子传值 v-bind 属性绑定
> + 子向父传值 v-on 事件绑定
> + 兄弟组件之间共享数据 EventBus
>    + $on 接收数据的组件
>    + $emit 发送数据的组件

**2. 大范围**
> vuex


## vuex是什么
实现全局组件状态（数据）管理的一种机制，可以方便的实现组件之间数据的共享。
![](./vuex.png)

## vuex优点
1. 能够在vuex中集中管理共享的数据，易于开发和后期维护
2. 能够高效的实现组件之间的数据共享，提高开发效率
3. 存储在vuex中的数据都是响应式的，能够实时保持数据和页面的同步

> 什么样的数据适合存储到vuex中
>
> > 组件之间共享的数据，组件中私有数据存储在组件中data中

# vuex的基本使用 
+ 安装vuex 
```js
npm install vuex --save
```
+ 导入vuex包
```js
import Vuex from 'vuex'
Vue.use(Vuex)
```
+ 创建store对象
```js
const store = new Vue.Store({
    // state中存放的是全局共享数据
    state:{count:0}
})
```

+ 将store对象挂载到vue实例当中
```js
new Vue({
    el:'#app',
    render:h => h(app),
    router,
    // 将创建的共享数据对象，挂载到vue实例中
    //所有组件，可以直接从store中获取全局数据
    store
})
```

# vuex核心概念
## 核心概念概述
+ State
+ Mutation
+ Action
+ Getter

## State
+ 提供唯一的公共数据源，所有共享的数据都要同意放到Store中的State中进行存储
+ state 指向对象
+ 组件中访问State中的数据
    1. $store.state.xx
    ```js
        this.$store.state.全局数据名称
    ```
     > 在template中访问this,this可以省略

    2. 通过导入的函数，将当前组件需要的全局数据，映射为当前组件的属性
    ```js
    //1.从vue中 按需导入mapState函数
    import {mapState} from 'vuex'
    ```
    ```js
    //2.将全局数据，映射为当前组件的计算属性
    computed:{
        ...mapState(['count'])
    }
    ```

    

## Mutation
> + 不可以在组件中，直接修改store中的数据
> + mutations里面 不能写异步函数
> + 用于变更Store中的数据
>    + 只能通过mutation变更store中的数据，不可以直接操作store中的数据，例如this.$store.state.count++
>    + 通过这种方式，可以集中监控所有数据的变化
> + 第一个参数是state
### 定义 Mutation
1. 不带参数
```js
// 定义Mutation
const store = new Vue.Store({
    state:{
        count:0
    },
    mutations:{
        add(state){ //拿到state对象
            //变更状态
            state.count++
        }
    }
})
```
2. 带参数
```js
// 定义mutation时，传递参数，第二个参数
const store = new Vuex.store({
    state:{
        count:0
    },
    mutations:{
        addN(state,step){
            //变更状态
            state.count+=step
        }
    }
})

```
### 触发 Mutation
#### 触发mutation第一种方式 $store.commit()
1. 不带参数
```js
// 触发 mutation
methods:{
    handle(){
        //触发mutation 第一种方式
        this.$store.commit('add')
    }
}
```

2. 带参数
```js
//触发mutation时，传递参数，第二个参数
methods:{
    handle(){
        //调用commit函数
        this.$store.commit('addN',3)
    }
}
```
> commit作用就是，调用某个mutation函数

#### 触发mutation第二种方式 映射成函数
通过导入的mapMutation函数。将需要的mutation函数，映射为当前组件的methods方法 
```js
//1. 从vuex中 按需导入mapMutations函数
import {mapMutations} from 'vuex'
```

```js
methods:{
    ...mapMutations(['add','addN'])
    btnHandler1(){
        this.add()
    },
    btnHandler2(){
        this.addN(3)
    }
}
```

### 使用常量作为突变类型
在各种Flux实现中将常数用于突变类型是一种常见的模式。这允许代码利用像linters这样的工具，并将所有常量放在一个文件中，使您的合作者可以快速了解整个应用程序中可能发生的变异：



用常量代替 字符串

原因:字符串容易出错

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```
```js
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // we can use the ES2015 computed property name feature
    // to use a constant as the function name
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```


## Action 
+ 用于处理异步任务 
+ Action 中 不能直接修改state里面的数据  通过触发Mutation的方式间接变更数据
+ commit 调用mutation
+ dispatch 调用action
### 定义
1. 不带参数
```js
const store = new Vuex.Store({
    //省略其他代码
    mutations:{
        add(state){
            state.count++
        }
    },
    actions:{
        addAsync(context){ // context 相当于new出来的store实例对象
            setTimeOut(()=>{
                context.commit('add') //commit 只能commit mutations里面的函数
            },1000)
        }
    }
})
```
> 在actions中,不能直接修改state中的数据，必须通过context.commit（）触发某个mutation才行
2. 带参数
```js
const store = new Vuex.Store({
    //省略其他代码
    mutations:{
        addN(state,step){
            state.count+=step
        }
    },
    actions:{
        addNAsync(context,step){ 
            setTimeOut(()=>{
                context.commit('addN',step)
            },1000)
        }
    }
})
```
### 触发

#### 第一种$store.dispatch
1. 不带参数
```js
methods:{
    handle(){
        // 这里的dispatch函数，专门用来触发action
        this.$store.dispatch('addAsync')
    }
}
```
2. 带参数 
```js
methods:{
    handle(){
        // 这里的dispatch函数，专门用来触发action
        this.$store.dispatch('addNAsync',5)
    }
}
```

#### 第二种 导入函数,将需要的actions函数，映射为当前组件的methods方法
```js
import { mapActions} from 'vuex'
```
```js
methods:{
    ...mapActions(['addAsync','addNAsync'])
}
```
```html
<button @click = 'addAsync'></button>
```


## Getter
+ 用于对Store中的数据进行加工处理形成新的数据
+ 不会修改 Store中的原数据
+ 可以对Store已有的数据加工处理之后，形成新的数据，类似于Vue的计算属性
+ Store中数据发生变化，Getter的数据也跟着变化 。 响应式
+ 相当于计算属性作用
### 定义Getter
```js
const store  = new Vuex.store({
    state:{
        count:0
    },
    getters:{
        showNum:state=>{
            return '当前最新的数量是【'+state.count+'】'
        }
    },

    //等价于
    getters:{
        showNum(state){
            return '当前最新的数量是【'+state.count+'】'
        }
    }
})
```

### 调用getters
#### 第一种方式 this.$store.getters.名称
```html
<h3>{{$store.getters.showNum}}</h3>
```
#### 第二种方式  映射成计算属性
```js
import {mapGetters} from 'vuex'
computed:{
    ...mapGetters(['showNum'])
}
```
```html
<h3>{{showNum}}</h3>
```



