# git 简介

## 工作区 暂存区

### 工作区

本地目录，不包括.git

### 版本库

工作区中有一个隐藏目录.git，这个不算工作区，而是Git的版本库。

Git的版本库里存在很多东西，其中最为重要的是stage（或者叫index）的暂存区。还有Git为我们自动创建的第一个分支master，以及指向master的第一个指针叫HEAD。

![工作区和版本库](https://img-blog.csdn.net/20170614164756098?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjIzMzc4Nzc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

+ git add  --------  把文件(修改之后的readme.txt)添加进去，实际上是把文件修改添加到暂存区；
  
  ![执行gi t add 之后的示意图](https://img-blog.csdn.net/20170614164914194?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjIzMzc4Nzc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

+ git commit ---  提交更改，实际上就是把暂存区的所有内容提交到当前分支。
  
  ![执行git commit 之后的存储示意图](https://img-blog.csdn.net/20170614165135525)