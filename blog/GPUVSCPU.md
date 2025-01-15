# IF GPUs Are SO Good, Why Do We Still USE CPUs At All

## YouTube 有一个视频
CPU和GPU进行了一场“绘画决斗”。处理器连接到一个发射弹珠的机器上。

CPU画了一个基础的笑脸
![CPU](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0927f893-ed1e-49f4-92bb-276e16223071_2350x1288.png)
GPU 画出了蒙娜丽莎
![GPU](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe933aca3-5b54-4a78-8063-d6dc5b387fae_2468x1264.png)

这段视频的一大亮点是：CPU 速度慢，而 GPU 速度快。虽然这是事实，但视频中还有很多细节没有透露。

## Tera Floating Point Operations Per Second(TFLOPS) 每秒兆级的浮点运算
当我们说GPU比CPU性能强得多时，我们指的是一个名为TFLOPS的度量，它基本上衡量处理器每秒能执行多少万亿次数学运算。例如，Nvidia A100 GPU可以执行9.7 TFLOPS（每秒9.7万亿次运算），而最近的英特尔24核处理器可以执行0.33 TFLOPS。这意味着中档GPU的性能至少比最强大的CPU快30倍。
但是我的MacBook（苹果M3芯片）中包含CPU和GPU。为什么？难道我们不能放弃这些速度慢得可怕的CPU吗？

## 两种程序的不同
让我们定义两种类型的程序：顺序程序(sequential programs)和并行程序(parallel programs)。
### sequential programs
run one-after-another
```python
def sequential_calculation():
    a = 0
    b = 1

    for _ in range(100):

        a, b = b, a + b

    return b
```
这里，我们连续100次计算下一个数字，使用前两个数字。这个程序的重要特点是，每一步都依赖于它之前的两步。如果你用手计算，你不能告诉朋友说“你计算第51到100步，而我从第1步开始”，因为他们需要第49和第50步的结果才能开始计算第51步。每一步都需要知道序列中前两个数字。

### parallel programs
并行程序是可以同时执行多个指令的程序，因为它们不依赖于彼此的结果。
```python
def parallel_multiply():
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    results = []

    for n in numbers:
        results.append(n * 2)

    return results
```
在这种情况下，我们进行十次完全独立的乘法运算。重要的是，顺序无关紧要。如果你想和朋友分担工作，你可以说：“你乘奇数，我乘偶数。”你们可以分别同时工作，得到准确的结果。

##  A False Dichotomy 错误的二分法
事实上，这种划分是错误的。大多数大型实际应用程序都包含顺序和并行代码。事实上，每个程序都会有一定比例的指令是可并行化的。
例如，假设我们有一个运行 20 个计算的程序。前 10 个是必须按顺序计算的斐波那契数，但后 10 个计算可以并行运行。我们会说这个程序是“50% 可并行化”的，因为一半的指令可以独立完成。为了说明这一点

  ```python
  def half_parallelizeable():
    # Part 1: Sequential Fibonacci calculation
    a, b = 0, 1
    fibonacci_list = [a, b]
    for _ in range(8):  # Calculate 8 more numbers
        a, b = b, a + b
        fibonacci_list.append(b)

    # Part 2: Each step is independent
    parallel_results = []
    for n in fibonacci_list:
        parallel_results.append(n * 2)

    return fibonacci_list, parallel_results
  ```

前一半必须是顺序的——每个斐波那契数都依赖于它之前的两个数。但是后一半可以利用完成的列表，并独立地将每个数字翻倍。你无法在计算第 8 个斐波那契数之前不先计算第 6 个和第 7 个数字，但是一旦你拥有了完整的序列，你就可以将翻倍操作分配给尽可能多的可用工作人员。

## Different Processors For Different Program Types
不同类型的程序需要不同的处理器

从广义上讲，CPU 更适合顺序程序，而 GPU 更适合并行程序。这是因为 CPU 和 GPU 的基本设计差异。
CPU 拥有少量大型核心（苹果的 M3 拥有 8 核 CPU），而 GPU 拥有许多小型核心（英伟达的 H100 GPU 拥有数千个核心）。
这就是为什么 GPU 非常适合运行高度并行程序的原因——它们拥有数千个简单的核心，可以同时对不同数据片段执行相同的操作。
渲染视频游戏图形是一个需要许多简单重复计算的应用。想象一下你的视频游戏屏幕是一个巨大的像素矩阵。当你突然将角色转向右侧时，所有这些像素都需要重新计算为新的颜色值。幸运的是，屏幕顶部像素的计算与屏幕底部像素的计算是独立的。因此，计算可以分散到 GPU 的数千个核心上。这就是为什么 GPU 对游戏至关重要。

## CPUs Are Good at Handling Random Events
CPU 在高度并行任务（例如，乘以 10,000 个独立数字的矩阵）方面比 GPU 慢得多。然而，它们擅长复杂的顺序处理和复杂的决策。

可以将 CPU 内核想象成繁忙餐厅厨房里的主厨。这位主厨可以：

在 VIP 客人带着特殊饮食要求出现时，立即调整烹饪计划

在准备精致酱汁和检查烤蔬菜之间无缝切换

处理意外情况（例如停电），通过重新组织整个厨房流程来应对

协调多道菜肴，确保它们在恰当的时刻都热腾腾、新鲜出炉

在处理数十个处于不同完成状态的订单时，保持食品质量

相比之下，GPU 内核就像一百名擅长重复性任务的厨师——他们可以在两秒钟内切好一个洋葱，但他们无法有效地管理整个厨房。如果你让 GPU 处理不断变化的用餐服务需求，它会难以应对。

这就是为什么 CPU 对运行计算机操作系统至关重要。现代计算机面临着不断涌现的不可预测事件：应用程序启动和停止、网络连接中断、文件访问以及用户在屏幕上随机点击。CPU 擅长处理所有这些任务，同时保持系统响应能力。它可以立即从帮助 Chrome 渲染网页切换到处理 Zoom 视频通话，再到处理新的 USB 设备连接——所有这些都在跟踪系统资源，并确保每个应用程序都能获得公平的关注。

因此，虽然 GPU 擅长并行处理，但 CPU 仍然对于其独特的处理复杂逻辑和适应变化条件的能力至关重要。像苹果的 M3 这样的现代芯片同时拥有两者：将 CPU 的灵活性与 GPU 的计算能力结合起来。

事实上，一个更准确的绘画视频版本将显示 CPU 管理图像下载和内存分配，然后再将 GPU 派遣出去快速渲染像素。