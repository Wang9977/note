# WebGL教程 MDN

+ 在支持HTML的`canvas`标签的浏览器中，不需要安装任何插件，便可以使用基于OpenGL ES2.0的API在canvas中进行2D和3D渲染。
+ WebGL包括使用js编写的控制代码，以及在图形处理单元(GPU)中执行的着色代码(GLSL 是OpenGL着色语言)。
+ WebGL元素可以和其他HTML元素混合使用，并且可以和网页其他部分或网页背景结合起来。
+ three.js babylon.js等框架封装了WebGL,提供了各个平台之间的兼容性。使用这些框架而非原生的WebGL可以更容易地开发3D应用和游戏。

## 准备3D渲染

+ 建立一个canvas元素并设置一个onload事件处理程序来初始化WebGL的一部分

  ```html
  <body onload="main()">
    <canvas id="glcanvas" width="640" height="480">
      你的浏览器似乎不支持或者禁用了HTML5 <code>&lt;canvas&gt;</code> 元素.
    </canvas>
  </body>
  ```



### 准备WebGL上下文

js中的main()函数 将会在文档加载完成之后被调用。任务是设置WebGL上下文并开始渲染内容。

```js
// 从这里开始
function main() {
  const canvas = document.querySelector("#glcanvas");
  // 初始化WebGL上下文
  const gl = canvas.getContext("webgl");

  // 确认WebGL支持性
  if (!gl) {
    alert("无法初始化WebGL，你的浏览器、操作系统或硬件等可能不支持WebGL。");
    return;
  }

  // 使用完全不透明的黑色清除所有图像
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 用上面指定的颜色清除缓冲区
  gl.clear(gl.COLOR_BUFFER_BIT);
}
```



+ 获取到canvas之后，调用`getContext`函数并向它传递`webgl`参数（浏览器不支持webgl，会返回null）
+ WebGL基本成功初始化，变量gl会引用该变量。

## 使用WebGL创建2D内容

### 渲染场景

#### 着色器

渲染简单场景并画出物体。是使用OpenGL ES着色语言编写的程序，记录像素点的位置和颜色。

绘制WebGL时候 有两种不同的着色器函数，**顶点着色器**和**片段着色器**。二者的集合通常称为**着色器程序**。

1. **顶点着色器**

   + 每渲染一个形状时，顶点着色器会在形状中的每个顶点运行。它的工作是 将输入顶点从原始坐标系转换到WebGL使用的缩放空间(clipspace)坐标系，其中每个轴的坐标范围从-1.0到1.0，并且不考虑横纵比、实际尺寸或任何其他因素。
   + 顶点着色器需要对顶点坐标进行必要的转换，在每个顶点基础上进行其他调整或计算，然后通过将其保存在有GLSL提供的特殊变量(gl_Position)中来返回变换后的顶点。
   + 着色器根据需要，可以完成其他工作。例如 通过法线来确定应用到顶点的光照因子等，然后将这些信息存储到变量或属性中，以便与片段着色器共享。
   + 例子

   以下顶点着色器接收一个我们定义的属性(aVertexPosition)的顶点位置值。之后这个值与两个4*4的矩阵(uProjectionMatrix和uModelMatrix)相乘，积赋值给gl_Position。

   ```js
    const vsSource = `
       attribute vec4 aVertexPosition;
   
       uniform mat4 uModelViewMatrix;
       uniform mat4 uProjectionMatrix;
   
       void main() {
         gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
       }
     `;
   ```

2. **片段着色器**

   + 在顶点着色器处理完顶点后，会被要绘制的每个图形的每个像素点调用一次。它的职责是==确定像素的颜色==，通过指定应用到像素的纹理元素（也就是图形纹理中的像素），获取纹理元素的颜色，然后将适当的光照应用于颜色。之后，颜色存储在特殊变量gl_FragColor中，返回到WebGL层。该颜色将最终绘制到屏幕上图形对应像素的对应位置。

   + ```js
     const fsSource = `
         void main() {
           gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
         }
       `;
     ```

#### 初始化着色器

将两个着色器编译并连接在一起，传递给WebGL。下面的代码通过调用loadShader（），为着色器传递类型和来源，创建了两个着色器。然后创建一个附加着色器的程序，将它们连接在一起。如果编译或链接失败，代码将弹出alert。

```js
//  初始化着色器程序，让WebGL知道如何绘制我们的数据
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // 创建着色器程序

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // 创建失败， alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// 创建指定类型的着色器，上传source源码并编译
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
```

+ loadShader函数 将WebGL上下文，着色器类型和源码 作为参数输入，然后按照如下步骤创建和编译着色器。

  1. 调用 gl.createShader() 创建一个新的着色器
  2. 调用gl.shadeSource() 将源代码发送到着色器
  3. 一旦着色器获取到源代码，就使用gl.compileShader()进行编译
  4. 为了检查是否成功编译了着色器，将检查着色器参数gl.COMPILE_STATUS状态。通过调用[`gl.getShaderParameter()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/getShaderParameter)获得它的值，并指定着色器和我们想要检查的参数的名字（gl.COMPILE_STATUS）。如果返回错误，则着色器无法编译，因此通过[`gl.getShaderInfoLog()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderInfoLog)从编译器中获取日志信息并alert，然后删除着色器返回null，表明加载着色器失败。
  5. 如果着色器被加载并成功编译，则返回编译的着色器

+ ```js
  const shaderProgram = initShaderProgram(gl,vsSource,fsSource)
  ```

+ 在创建着色器程序之后，我们需要查找WebGL返回分配的输入位置。在上述情况下，我们有一个属性和两个uniforms。属性从缓冲区接收值。顶点着色器的每次迭代都从分配给该属性的缓冲区接收下一个值。uniforms类似于JavaScript全局变量。它们在着色器的所有迭代中保持相同的值。由于属性和统一的位置是特定于单个着色器程序的，因此我们将它们存储在一起以使它们易于传递

  ```js
  const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      },
    };
  ```

  

### 创建对象

在画正方形之前，需要创建一个缓冲器来存储它的顶点。会用到initBuffers()函数。

```js
function initBuffers(gl) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var vertices = [
    1.0,  1.0,  0.0,
    -1.0, 1.0,  0.0,
    1.0,  -1.0, 0.0,
    -1.0, -1.0, 0.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(vertices),
                gl.STATIC_DRAW);

  return {
    position: positionBuffer,
  };
}
```

1. 调用 gl 函数 `createBuffer()` 得到了缓冲对象 并存储在顶点缓冲器
2. 调用bindBuffer() 绑定上下文
3. 创建js数组 记录正方体每一个顶点 然后将其转化为WebGL浮点型类型数组 
4. 将数组传递到 bufferData() 建立对象的顶点

**绘制场景**

当着色器和物体都创建好之后，可以开始渲染场景。

```js
function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing 启动深度测试
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things 近处的事务遮盖住远处的事务

  // Clear the canvas before we start drawing on it.
  // 绘图前清空canvas

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // 创建透视图矩阵，这是一种特殊的矩阵，用于模拟相机中透视图的变形。 我们的视场为45度，宽/高比与画布的显示尺寸匹配，并且我们只希望看到距离相机0.1到100单位之间的对象。

  const fieldOfView = 45 * Math.PI / 180;   // 45度视图角度
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight; //实际图像宽高比
  const zNear = 0.1;
  const zFar = 100.0; // 指定摄像机距离0.1到100单位长度的范围内 物体可见
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  // glmatrix.js始终将第一个参数作为接收结果
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  // 将绘图位置设置为场景中心
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  // 将绘图位置移到要开始绘制正方形的位置

  mat4.translate(modelViewMatrix,     // destination matrix 目标矩阵
                 modelViewMatrix,     // matrix to translate 转换矩阵
                 [-0.0, 0.0, -6.0]);  // amount to translate 转换数量

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  // 告诉WebGL如何将位置从位置缓冲区中拉出到vertexPosition属性中。
  {
    const numComponents = 3;  // pull out 3 values per iteration 每次迭代提取3个值
    const type = gl.FLOAT;    // the data in the buffer is 32bit floats
    const normalize = false;  // don't normalize
    const stride = 0;         // how many bytes to get from one set of values to the next
                              // 0 = use type and numComponents above
    const offset = 0;         // how many bytes inside the buffer to start from  缓冲区中从多少字节开始
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL to use our program when drawing
  // 告诉WebGL在绘图时使用我们的程序
  gl.useProgram(programInfo.program);

  // Set the shader uniforms
  // 设置着色器规范

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount); // 调用drawArrays()方法画出对象
  }
}
```

1. 用背景色，擦除画布，
2. 接着建立透视矩阵。设置45度的视图角度，并且设置一个适合实际图像的宽高比。指定在摄像机距离0.1到100 单位长度的范围内的物体可见。
3. 接着加载特定位置，并把正方形放在距离摄像机6个单位的位置。
4. 然后，绑定正方形的顶点缓冲到上下文，并配置好。
5. 再通过调用drawArrays()方法来画出对象。



### 矩阵通用计算

使用矩阵运算库  [glMatrix library](https://glmatrix.net/)

