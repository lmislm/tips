<!-- 

2. 为什需要三次握手？
《计算机网络》第四版中讲“三次握手”的目的是“为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误”

书中的例子是这样的，“已失效的连接请求报文段”的产生在这样一种情况下：client发出的第一个连接请求报文段并没有丢失，而是在某个网络结点长时间的滞留了，以致延误到连接释放以后的某个时间才到达server。本来这是一个早已失效的报文段。但server收到此失效的连接请求报文段后，就误认为是client再次发出的一个新的连接请求。于是就向client发出确认报文段，同意建立连接。

假设不采用“三次握手”，那么只要server发出确认，新的连接就建立了。由于现在client并没有发出建立连接的请求，因此不会理睬server的确认，也不会向server发送数据。但server却以为新的运输连接已经建立，并一直等待client发来数据。这样，server的很多资源就白白浪费掉了。采用“三次握手”的办法可以防止上述现象发生。例如刚才那种情况，client不会向server的确认发出确认。server由于收不到确认，就知道client并没有要求建立连接。”。主要目的防止server端一直等待，浪费资源。


4.为什么建立连接是三次握手，而关闭连接却是四次挥手呢？
这是因为服务端在LISTEN状态下，收到建立连接请求的SYN报文后，把ACK和SYN放在一个报文里发送给客户端。而关闭连接时，当收到对方的FIN报文时，仅仅表示对方不再发送数据了但是还能接收数据，己方也未必全部数据都发送给对方了，所以己方可以立即close，也可以发送一些数据给对方后，再发送FIN报文给对方来表示同意现在关闭连接，因此，己方ACK和FIN一般都会分开发送。

来源：https://zhuanlan.zhihu.com/p/133906695
 -->
 <!-- 
 
// webpack 问题
// loader 和 plugin 有什么区别  plugin 时间段

 loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。
plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务
  -->
<!-- 
// 了解原型链吗？ 谈⼀谈你对原型链的理解。 prototype 和 __proto__ 他们有什么区别 * 13

  1. __proto__是每个对象都有的一个属性，而prototype是函数才会有的属性。
  2. __proto__指向的是当前对象的原型对象，而prototype指向的，是以当前函数作为构造函数构造出来的对象的原型对象。看起来有点绕，我 show you the code，下面我们用右手作为原型来给自己构造一个女朋友:
  来源：https://juejin.cn/post/6844903989088092174
  -->

  <!-- 
  xss 和 csrf
  
三、 CSRF 和 XSS 的区别
1、CSRF是跨站请求伪造;  XSS是跨域脚本攻击。
2、CSRF需要用户先登录网站A,获取cookie;  XSS不需要登录。
3、CSRF是利用网站A本身的漏洞,去请求网站A的api;  XSS是向网站A注入JS代码,然后执行JS里的代码,篡改网站A的内容。（XSS利用的是站点内的信任用户，而CSRF则是通过伪装来自受信任用户的请求来利用受信任的网站。你可以这么理解CSRF攻击：攻击者盗用了你的身份，以你的名义向第三方网站发送恶意请求。）
  
   -->