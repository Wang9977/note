vue 本质是 一个用Function实现的Class类  它的原型prototype以及它本身都扩展了一系列的方法和属性



## 源码用到的工具函数

### isUndef

判断变量是不是未定义，即是否等于undefined或null

### isDef

判断变量是不是已定义，即是否不等于undefined与null



### sameVnode

通过对比`key` `tag` `inputType` 是否一致 判断两个节点类型是否一致 是否可复用

```js
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    a.asyncFactory === b.asyncFactory &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error)))
  );
}
```





```js
function patchVnode(
  oldVnode,
  vnode,
  insertedVnodeQueue,
  ownerArray,
  index,
  removeOnly
) {
  // step 1 当新旧节点一致时，不做修改直接返回
  if (oldVnode === vnode) {
    return;
  }

  // step 2  如果虚拟节点的 elm 属性存在的话，就说明有被渲染过了，如果 ownerArray 存在，说明存在子节点，如果这两点到成立，那就克隆一个 vnode 节点
  if (isDef(vnode.elm) && isDef(ownerArray)) {
    vnode = ownerArray[index] = cloneVNode(vnode);
  }

  // step 3  如果是异步占位，执行 hydrate 方法或者定义 isAsyncPlaceholder 为 true，然后退出
  const elm = (vnode.elm = oldVnode.elm);
  if (isTrue(oldVnode.isAsyncPlaceholder)) {
    if (isDef(vnode.asyncFactory.resolved)) {
      hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
    } else {
      vnode.isAsyncPlaceholder = true;
    }
    return;
  }

  // step 4  如果满足以下四个条件，那就赋值一下 componentInstance 属性之后直接 return，说明整个组件没有任何变化，还在之前的实例  
    // vnode 是静态节点
    // oldVnode 是静态节点
    // key 属性都相等
    // vnode 属于克隆的虚拟 DOM 或者是只渲染一次的组件（v-once）
  if (
    isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    vnode.componentInstance = oldVnode.componentInstance;
    return;
  }

  // step 5  
  // 定义 data 常量，data 上一般是定义以下属性的，attrs 属性、on 事件、directives 指令、props、hook 钩子；这里调用 prepatch 的钩子函数
  let i;
  const data = vnode.data;
  if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
    i(oldVnode, vnode);
  }

  // step 6 紧接着就是调用各种更新函数。
    // updateAttrs 更新 attr 属性
    // updateClass 更新 class 属性
    // updateDOMListeners 更新绑定事件属性
    // updateDOMProps 更新 props 属性
    // updateStyle 更新 style 属性
    // update 如果 ref 属性存在，根据 ref 属性进行更新
    // updateDrectives 更新 Drectives 属性
  const oldCh = oldVnode.children;
  const ch = vnode.children;
  if (isDef(data) && isPatchable(vnode)) {
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
    if (isDef((i = data.hook)) && isDef((i = i.update))) i(oldVnode, vnode);
  }
  // step 7  判断是否存在 text 文本
  if (isUndef(vnode.text)) {
    if (isDef(oldCh) && isDef(ch)) {
      // step 7-1  
      // 如果旧的 vnode 和新的 vnode 不相同就调用 updateChildren 函数更新
      if (oldCh !== ch)
        updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
    } else if (isDef(ch)) {
      // step 7-2
      // 在非生产环境下检查是否有重复的 key，如果存在重复会提示
      if (process.env.NODE_ENV !== "production") {
        checkDuplicateKeys(ch);
      }
      // step 7-3
      // 如果旧的 vnode 不存在子集，但是存在 text 属性，新的 vnode 存在子集，那就把 Text 清空
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, "");
      // step 7-4 
      // 添加新的节点
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
    } else if (isDef(oldCh)) {
      // step 7-5
      // 移除子节点
      removeVnodes(oldCh, 0, oldCh.length - 1);
    } else if (isDef(oldVnode.text)) {
      // step 7-6
      // 设置显示文本为空
      nodeOps.setTextContent(elm, "");
    }
  } else if (oldVnode.text !== vnode.text) {
    // step 8
    // 设置显示文本为最新的值
    nodeOps.setTextContent(elm, vnode.text);
  }
  // step 9
  // 执行 data.hook.postpatch钩子，表明patch完毕
  if (isDef(data)) {
    if (isDef((i = data.hook)) && isDef((i = i.postpatch))) i(oldVnode, vnode);
  }
}
```



## diff过程　 

> DOM diff 发生在视图更新前，目的是提升框架性能。这里讨论的是同级节点的diff。

```js
// src/core/vdom/patch.js
function updateChildren(
  parentElm,
  oldCh,
  newCh,
  insertedVnodeQueue,
  removeOnly
) {
  // 初始化变量
  let oldStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];

  let newStartIdx = 0;
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];

  let oldKeyToIdx, idxInOld, vnodeToMove, refElm;
  ...
  // 开整
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      // step 1：
      // 当前 oldStartVnode 为 undefined 或 null
       // oldStartIdx 向右移动
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (isUndef(oldEndVnode)) {
      // step 2：
      // 当前 oldEndVnode 为 undefined 或 null
      // oldEndIdx 向左移动
      oldEndVnode = oldCh[--oldEndIdx]; 
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // step 3：oldStartVnode 与 newStartVnode 节点一致，拷贝其实例，若存在子节点继续处理其子节点
      // 处理完之后  oldStartIdx、newStartIdx 向右移动
      patchVnode(
        oldStartVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // step 4：对比 oldEndVnode 与 newEndVnode 节点一致，拷贝其实例，若存在子节点则继续处理其子节点
      // 处理完之后，oldEndIdx、newEndIdx 向左移动
      patchVnode(
        oldEndVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // step 5：开始交叉对比 oldStartVnode、newEndVnode 
      // 若一致，拷贝其实例，若存在子节点则继续处理其子节点
      patchVnode(
        oldStartVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      // 如果可以移动
      // 则将 oldStartVnode 对应的真实节点右移到当前真实节点队列的末尾
      // （当前 oldEndVnode 的后一个位置）
      canMove &&
        nodeOps.insertBefore(
          parentElm,
          oldStartVnode.elm,
          nodeOps.nextSibling(oldEndVnode.elm)
        );
      oldStartVnode = oldCh[++oldStartIdx]; // oldStartIdx 向右移动
      newEndVnode = newCh[--newEndIdx]; // newEndIdx 向左移动
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // step 6：交叉对比 oldEndVnode、newStartVnode 
      // 一致，拷贝其实例，若存在子节点则继续处理其子节点
      patchVnode(
        oldEndVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      // 可以移动的话
      // 将 oldEndVnode 对应的真实节点左移到真实节点队列的首部
      //（当前 oldStartVnode 的前一个位置）
      canMove &&
        nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      if (isUndef(oldKeyToIdx))
        // step 7：遍历旧的 VNode 队列生成 key-id 的 Map （例如{c:2,d:3,f:4}）
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      // step 8：
      // 优先判断新 VD 是否存在 key
      // 存在 key 则直接使用 oldKeyToIdx 查找是否有 key 相同的节点
      // 不存在则调用 findIdxInOld 遍历旧 VD 队列通过 sameVnode 查找类型一致的 VD 对应的下标
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
      if (isUndef(idxInOld)) {
        // step 9：在旧 VD 中找不到一致的节点，说明是新节点，直接创建
        createElm(
          newStartVnode,
          insertedVnodeQueue,
          parentElm,
          oldStartVnode.elm,
          false,
          newCh,
          newStartIdx
        );
      } else {
        // 存在 key 值一样或类型一致的节点
        vnodeToMove = oldCh[idxInOld];
        // 针对 key 值一样的节点，进一步判断节点类型是否一致
        if (sameVnode(vnodeToMove, newStartVnode)) {
          // step 10：key 一致且节点类型一致
          // 拷贝其实例，若存在子节点则继续处理其子节点
          patchVnode(
            vnodeToMove,
            newStartVnode,
            insertedVnodeQueue,
            newCh,
            newStartIdx
          );
          // 节点被使用，置为 undefined
          oldCh[idxInOld] = undefined;
          // 允许移动的话，则将找到的可复用旧节点移动到真实 Dom 队列的队首
          canMove &&
            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
        } else {
          // step 11：key 一致，但是节点类型不一致，不可复用直接创建
          createElm(
            newStartVnode,
            insertedVnodeQueue,
            parentElm,
            oldStartVnode.elm,
            false,
            newCh,
            newStartIdx
          );
        }
      }
      newStartVnode = newCh[++newStartIdx]; // newStartIdx 向右移动
    }
  }
  // 循环结束
  // 若 oldStartIdx 大于 oldEndIdx，即 oldStartIdx 跑到 oldEndIdx 后面了
  // 说明旧 VD 队列遍历完了
  if (oldStartIdx > oldEndIdx) {
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
    // step 12：遍历余下的新 VD 并创建
    addVnodes(
      parentElm,
      refElm,
      newCh,
      newStartIdx,
      newEndIdx,
      insertedVnodeQueue
    );
  } else if (newStartIdx > newEndIdx) {
    // 若 newStartIdx 大于 newEndIdx
    // 则说明新 VD 遍历完了，而旧 VD 还有剩
    // step 13：删除余下的旧 VD
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
}
```





## 图解diff

初始化

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfb87cf24aef4fd68619a77b596bd11d~tplv-k3u1fbpfcp-watermark.image)

**第一轮diff**

`oldStartVnode` 与 `newStartVnode` 节点类型一致，进入 step 3，复用节点 A，`oldStartIdx`、`newStartIdx` 向右移动

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36b028c2968e40e5b94806c342425b6d~tplv-k3u1fbpfcp-watermark.image)



**第二轮diff**

`oldEndVnode` 与 `newEndVnode` 类型一致，进入 step 4，复用节点 G，`oldEndIdx`、`newEndIdx` 向左移动

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4840fd40e9d844a8ac8bec2cd724449d~tplv-k3u1fbpfcp-watermark.image)



**第三轮diff**

`oldStartVnode` 与 `newEndVnode` 节点类型一致，进入 step 5，**复用节点 B，节点 B 移动到节点 E（oldEndVnode）对应的真实节点之后**，`oldStartIdx` 向右移动，`newEndIdx` 向左移动

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8aa0b7fe350a4c038a367c8b92ae00a8~tplv-k3u1fbpfcp-watermark.image)



**第四轮diff**

`newStartVnode` 与 `oldEndVnode` 节点类型一致，进入 step 6，**复用节点 E，节点 E 移动到节点 C （oldStartVnode）对应的真实节点之前**，`newStartIdx` 向右移动，`oldEndIdx` 向左移动

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/feff68e379b64c20a1f85df1cc55cf24~tplv-k3u1fbpfcp-watermark.image)



**第五轮diff**

`oldStartVnode`、`oldEndVnode`、`newStartVnode`、`newEndVnode` 都没有类型一致的节点

- 进入 step 7：遍历还未处理的 Old VD 队列得到 `oldKeyToIdx = {c:2, d:3, f:4}`。
- 之后走 step 8：判断 `newStartVnode` 是否存在 key 值，这里 `newStartVnode` 的 key 值为 `H`，因此开始查找上一步的 `oldKeyToIdx` 中是否有 key 值相同的
- 找了一圈发现没有相同 key 值的，判断为新节点，走 step 9：创建节点 `H`，并插入到 `oldStartVnode` 节点之前（`createElm` 方法中实现）
- `newStartIdx` 向右移动

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/143a36c9802e4e4eb9ed8b744c4356da~tplv-k3u1fbpfcp-watermark.image)



这时的 `oldStartVnode` 与 `newStartVnode` 节点类型又是一致的，继续走 step 3，`oldStartIdx`、`newStartIdx` 继续向右移动

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fbfcad635efb4179bf3a8903eab052b5~tplv-k3u1fbpfcp-watermark.image)



这时，`newStartIdx` 与 `newEndIdx` 同时指向节点 `D`，优先判断 `oldStartVnode` 与 `newStartVnode` 为同一类型，因此继续走 step 3，`oldStartIdx`、`newStartIdx` 继续向右移动

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bbf4617a22f49609c92875c07bb0de3~tplv-k3u1fbpfcp-watermark.image)





**删除**

到这里，`newStartIdx` 已经移到了 `newEndIdx` 后面了，即 `newStartIdx` 大于 `newEndIdx`，因此跳出 while 循环走 step 13：删除余下的 Old Vnode，即这里的 `F` 节点



