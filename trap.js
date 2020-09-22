// new Date('2020-01-12 12:12:12').getTime()
// 这样的转换在Safari有兼容性问题

// js中使用new Date()方法，例如：new Date("2017-06-23 17:00:00")结果为 invalid date 或为 null
// var time = "2017-06-23 17:00:00";
// time = time.replace(/-/g,':').replace(' ',':');
// time = time.split(':');
// var time1 = new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5]);
// console.log("time1"+time1);
// -- from
// ———— https://blog.csdn.net/qq_33348497/article/details/77896938

// ===================================================
// 以小找大
// fStrKey(
// 	item: Object,
// 	props: Array<any>,
// 	separator?: String,
// 	separatorIndex?: number
// ) {
// 	let strArr = props
// 		.map(key => (~Object.keys(item).indexOf(key) ? item[key] : ""))
// 		.filter(Boolean);
// 	console.log(strArr, "++++", Object.keys(item));
// 	if (typeof separatorIndex !== "undefined") {
// 		strArr.splice(separatorIndex, 0, separator);
// 		return strArr.join("");
// 	}
// 	return strArr.join(`${separator || ""}`);
// }
// 注意不要用这一行
// 	let strArr = Object.keys(item)
// 		.map(key => (~props.indexOf(key) ? item[key] : ""))
// 		.filter(Boolean);

// ========================
// Git - fatal: Unable to create '/path/my_project/.git/index.lock': File exists
// ---
// rm -f ./.git/index.lock

// Git: cannot checkout branch - error: pathspec '…' did not match any file(s) known to git
// ---
// git remote update
// git fetch
// git checkout branch


// ++++++++++++++++++++++++++++++
// safari中input文字不垂直居中
// line-height: height，改成
// vertical-align: middle;
