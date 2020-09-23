function fProps(
  item: Object,
  props: Array<any>,
  separator?: String,
  separatorIndex?: number
) {
  let strArr = props
    .map(key => (~Object.keys(item).indexOf(key) ? item[key] : ""))
    .filter(Boolean);
  if (typeof separatorIndex !== "undefined") {
    strArr.splice(separatorIndex, 0, separator);
    return strArr.join("");
  }
  return strArr.join(`${separator || ""}`);
}
export default fProps;
