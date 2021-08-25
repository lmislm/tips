/**
 * 
 https://stackoverflow.com/questions/44639309/javascript-difference-between-reflect-get-and-objfoo
 
	Well, a pedantic answer to your question would be that they are entirely different: a property accessor returns a reference to a property, while Reflect.get returns its value.
	From the practical standpoint that doesn't make any difference since property references are always dereferenced on the right side.
	One practical usage of Reflect.get would be with its third argument, which, when combined with a Proxy, can be used to create different "views" of the same data.
 * @param {*} obj 
 * @returns 
 */
let numbersView = obj => new Proxy(obj, {
	get(target, key, receiver) {
			return receiver(target[key])
	}
});

let decimal = x => String(x);

let english = x => {
	if (x === 1) return 'one';
	if (x === 2) return 'two';

};

let v = numbersView({
	a: 1,
	b: 2
});

console.log(Reflect.get(v, 'a', decimal))
console.log(Reflect.get(v, 'a', english))