# Git命令

## 配置命令

+ 查看当前配置 ----------- git config --list
+ 查看全局配置 ----------- git config --global --list
+ 查看系统配置 ----------- git config --system --list
+ 查看当前仓库配置信息 ------------------git config --local --list
+ 配置用户信息 
  + 配置用户名 ------------- git config --global user.name 'xx'
  + 配置邮箱  ---------------- git config --global user.email 'xxx@xx.com'

## 分支管理

+ 查看分支

  + 查看本地分支 ------ git branch
  + 查看远程分支 ------ git branch -r
  + 查看本地和远程分支 ------ git branch -a

+ 切换分支

  + 创建并切换分支 ------ git checkout -b 新分支名字
  + 切换分支 ------ git checkout 要切换的分支名字

+ 删除

  + 删除本地分支 ------- git branch -d 分支名字
  + 删除远程分支 ------ git push origin --d 分支名字

+ 重命名分支 ------- git branch -m 老名字 新名字


## Git撤销

+ 撤销git commit 

  + 没有执行 git push

    1. git log ------ 找到需要撤销的commit_id  上一个版本`HEAD^`
    2. git reset commit_id  ------  (默认--mixed) 不删除工作空间改动的代码，撤销commit，add .操作 
    3. git reset --soft commit_id ------- 不删除工作空间改动代码，撤销commit 不撤销add
    4. git reset --hard commit_id ------ 删除工作区间改动代码，代码恢复到前一commit_id对应的版本，撤销commit ，add.

  + 执行了git push 

    1. git revert commit_id ------- 代码回滚 用新的commit回滚之前的commit，git reset时删除指定commit 可能会导致冲突 revert不会
    2. git push ------- 把回滚的代码push到远端

    

+ commit 修改注释
  
  + git commit --amend

## Git 合并

### git merge

+ git merge --no--ff  强行关闭fast-forward  

  + fast-forward 就是当条件允许的时候，git直接把HEAD指针指向合并分支的头，完成合并。没有创建commit，删除分支会丢失分支信息。

+ git merge --squash

  把commit进行压缩，用 --squash 进行合并，不移动HEAD，不提交。需要使用新的commit总结，完成最终合并

+ ![比较图](https://segmentfault.com/img/bVkJAj)







## 文件状态变化周期

![文件状态变化周期图](https://git-scm.com/book/en/v2/images/lifecycle.png)

工作区目录下的文件两种状态：

+ 已跟踪   工作状态可能是未修改、已修改、已放入暂存区

+ 未跟踪

  > 初次克隆某个仓库时，工作目录中所有的文件都属于已跟踪文件





## 常用命令含义



## git status

检查文件状态

+ 初次克隆之后使用

  ```shell
  $ git status
  On branch master
  Your branch is up-to-date with 'origin/master'.
  nothing to commit, working directory clean
  ```

  

+ 修改之前的文件

  ```shell
  $ echo 'My Project' > README
  $ git status
  On branch master
  Your branch is up-to-date with 'origin/master'.
  Untracked files:
    (use "git add <file>..." to include in what will be committed)
  
      README
  
  nothing added to commit but untracked files present (use "git add" to track)
  ```

### 简写

+ git status -s 

  ```shell
  $ git status -s
   M README // 修改过的文件前面有 M 标记。 
  MM Rakefile
  A  lib/git.rb   // 新添加到暂存区中的文件前面有 A 标记
  M  lib/simplegit.rb
  ?? LICENSE.txt //新添加的未跟踪文件前面有 ?? 标记
  ```

  输出中有两栏，左栏指明了暂存区的状态，右栏指明了工作区的状态。例如，上面的状态报告显示： `README` 文件在工作区已修改但尚未暂存，而 `lib/simplegit.rb` 文件已修改且已暂存。 `Rakefile` 文件已修，暂存后又作了修改，因此该文件的修改中既有已暂存的部分，又有未暂存的部分。

## git add

1. 开始跟踪文件，并且该文件处于暂存状态，把已跟踪的文件放到暂存区
2. 合并时把有冲突的文件标记为已解决状态



## git diff

查看已暂存和未暂存的修改

+ 当前做的哪些更新尚未暂存
+ 有哪些更新已暂存并准备好下次提交   
+ git diff --cached 查看已经暂存起来的变化
+ git diff --staged  查看已经暂存的将要添加到下次提交里的内容

