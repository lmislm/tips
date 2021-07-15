const a = {
	a: 1,
	b: '2',
	c: null,
	d: undefined,
	e: Number
}

console.log(JSON.stringify(a));
console.log(JSON.stringify(a, (item) => { console.log('222', item)}, '\t'));

