/**
 * 模拟原型继承,JavaScript权威指南（原书第六版）6.1 创建对象
 * @param {*} p 
 */
function inherit (p) {
	if(p == null) throw TypeError();
	if(Object.create)
		return Object.create(p);
	var t = typeof p;
	if(t !== 'object' && t !== 'function') 
		throw TypeError();
	function f() {};
	f.prototype = p;
	return new f();
}