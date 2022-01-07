## chrome 解决跨域 
1. chrome 插件 Access-Control-Allow-Orrigin
2. chrome快捷方式 右键属性 目标输入框里加上 
`--disable-web-security --user-data-dir=C:MyChromeDevUserData`

## 新版本chrome浏览器(80版本以后)带来的跨域请求cookie丢失问题 

+ chrome浏览器输入  chrome://flags/
+ SameSite by default cookies 设为disabled


> 参考：https://www.cnblogs.com/tianma3798/p/13517449.html