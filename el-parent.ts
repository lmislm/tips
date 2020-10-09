/**
 * document,返回e元素的第N层元素,权威指南-例15-2
 * @param {*} e 
 * @param {*} n 
 */
function backParent (e, n) {
  if (n === undefined) n === 1;
  while(e && n--) e = e.parentNode;
  if (!e || e.nodeType !== 1) return null;
  return e;
}
