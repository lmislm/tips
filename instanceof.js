function myIOf (src, tgt) {
  // instanceof
  var proto = src.protoType
  while (true) {
    if (proto === null) return false
    if (proto === tgt.protoType) return true
    proto = proto.protoType
  }
}
