function dateWeek() {
	const nums = ["一", "二", "三", "四", "五", "六", "日"];
	return nums.map((item, i) => {
		// 最后的日为1
		return {
			label: item,
			value: i !== nums.length - 1 ? String(i + 2) : String(1)
		};
	});
}
console.log(dateWeek(), '--')