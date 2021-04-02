# git push 

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

[知乎](https://zhuanlan.zhihu.com/p/40634410)