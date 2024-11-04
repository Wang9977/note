# git push  出现client_loop: send disconnect: Connection reset by peer

### 文件过大

```shell
client_loop: send disconnect: Connection reset by peer
```

```shell
fatal: sha1 file '<stdout>' write error: Broken pipe

fatal: The remote end hung up unexpectedly
```

+ 原因
  
  1. Git中的“智能HTTP”协议在POST请求中使用“Transfer-Encoding：chunked”，当它包含大小超过1MB的打包对象时。某些代理服务器（如Nginx）默认情况下不支持此传输编码，请求将在到达Bitbucket Server之前被拒绝。因此，Bitbucket Server日志不会显示任何额外信息。
  2. 可能的原因是负载均衡器配置错误，即是网速不好的时候。
  3. GitHub 提交文件的时候，当文件很大的时候，就会提醒；因为GitHub默认不允许提交超过100M的文件.

+ 解决方案
  
  1. 解决方案：
     
     当推送大量数据时（初始推送大型存储库，使用非常大的文件进行更改）可能需要`http.postBuffer` 在git*客户端* （而不是服务器）上设置更高的 设置 ；将Git缓冲区大小增加到repo的最大单个文件大小：
     
     ```text
     git config --global http.postBuffer 157286400
     ```

## **参考**

[知乎](https://zhuanlan.zhihu.com/p/40634410)

# 测试 git 连接是否成功

复现：

```shell
ssh -T git@github.com
# 出现 You've successfully authenticated, but GitHub does not provide shell access.
```

解决：

在使用ssh加公钥认证时会输入 ssh -T Github.com，认证成功后会输出如下Log。
“but GitHub does not provide shell access ”这句话的意思是，GitHub不提供shell（ssh）访问/接入权限。
ssh -T选项的意思为，不分配伪终端。
当你在使用ssh协议连接到自己或者其他服务器时，本地终端会显示命令提示符，你可以在上面操作输入命令ls等。
结合上面几点，这句话的意思即为你无法使用ssh协议直接登录github，在github服务器上建立一个伪终端，并进行操作。
所以，这句提示并不是一个错误，而是github输出的一句提示语。
同样你可以在本地使用ssh协议进行git相关操作，并提交到github，没有任何影响。