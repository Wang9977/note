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

  