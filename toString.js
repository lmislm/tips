/* 

Object.prototype.toString.call()

对象的类属性（class attribute）是一个字符串，用以表示对象的类型信息。
ECMAScript 3和ECMAScript 5都未提供设置这个属性的方法，并只有一种间接的方法可以查询它。
默认的toString（）方法（继承自Object.prototype）返回了如下这种格式的字符串：[object class]
因此，要想获得对象的类，可以调用对象的toString（）方法，然后提取已返回字符串的第8个到倒数第二个位置之间的字符。
不过让人感觉棘手的是，很多对象继承的toString（）方法重写了，为了能调用正确的toString（）版本，
必须间接地调用Function.call（）方法（参照JS权威指南第四版8.7.3节）。

-------------------------------------------------
如果对象的 toString() 方法未被重写，就会返回如上面形式的字符串。

({}).toString();     // => "[object Object]"
Math.toString();     // => "[object Math]"

参考： https://zhuanlan.zhihu.com/p/118793721

*/