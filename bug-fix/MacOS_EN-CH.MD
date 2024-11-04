解决Mac中英文切换失灵方法

## 由TextInputSwitcher导致的输入法问题

可以首先尝试本方法，这是网上最常见的方法，打开「终端」APP，运行下面两行指令，每行输入完点击回车。

```
CODE
launchctl stop com.apple.TextInputSwitcher
launchctl start com.apple.TextInputSwitcher
```

## 

## 由大小写切换错误导致的输入法问题

这个就是我所遇到的问题解决方法，其实也非常简单，到「系统偏好设置」中的「键盘」->「输入法」->关闭「使用“中/英”键切换“ABC”输入模式」。关闭之后，亮灯为英文，灭灯为中文。没有长按切换大小写了。输入大写的时候可以按住Shift同时输入英文。

![](https://p.zhheo.com/REdt8225890881627979218098.png!blogimg)