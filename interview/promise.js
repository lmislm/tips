// const a = {
// 	value: 1,
// 	func1 () {
// 		console.log(this.value)
// 	},
// 	func2 () {
// 		console.log(this.value)
// 	}
// }

// const b = {
// 	...a,
// 	value: 2
// }


// b.func1()
// b.func2()



// setTimeout(() => console.log(1))
// const p1 = new Promise(resolve => resolve(2))
// setTimeout(() => console.log(3));
// const p2 = new Promise(resolve => { console.log(4); resolve(5)})
// p2.then(value => console.log(value))
// p1.then(value => console.log(value))


const arr = ['a', 'b', 'c', 'd', 'e']
const obj = { e: 1, d: 2, c: 3, b: 4, a: 5 }
for (let i in arr) {
	console.log(i)
	// 0 1 2 3 4 5
}
for (let j of arr) {
	console.log(j)
	// a b c d e
}
for (let m in obj) {
	console.log(m)
	// e d c b a
}
for (let n of obj) {
	console.log(n)
	// error
}
