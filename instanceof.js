//  ---- 错误的做法
// function myIOf (src, tgt) {
//   // instanceof
//   var proto = src.protoType
//   while (true) {
//     if (proto === null) return false
//     if (proto === tgt.protoType) return true
//     proto = proto.protoType
//   }
// }
function myInstanceof (source, targt) {
	const getProto = (val) => Object.getPrototypeOf(val)
	let sProto = getProto(source)
	while(true) {
		if (sProto == null) return false
		// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf#%E8%AF%B4%E6%98%8E
		// Object.prototype 区别于 Object.getPrototypeOf()
		if (sProto == (targt).prototype) return true
		sProto = getProto(sProto)
	}
}