// “* * * 1,2,30 * ?” 每月 1,2,30
// “* * * ? ? 3,4,6” 每周，三四六


// const a = "* * * ? * ?"
const a = "* * * 1,2,30 * ?"
// const a = "* * * ? ? 3,4,6"
const res = a.split(" ")
// const r = parseInt(res[3])
const r = parseInt(res[3])

const f = (num, str) => {
	// return isNaN(parseInt(str.split(" ")[3]))
	return ((str.split(" ")[3]))
}

console.log(res, r, isNaN(r), f(3, a))