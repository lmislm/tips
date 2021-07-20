const test = [[1,2,3], [3,4,5]]
const flatten = arr => {
	return arr.reduce((flat, toFlatten) => {
		return flat.concat(
			Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
		);
	}, []);
};

const data = [ { a: [1, 2, 3] }, { a: [4, 5, 6] } ]

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

console.log(flatten(data.map(item => item.a)))