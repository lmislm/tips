const arr = [10,21,0,-7,35,7,9,23,18]

for (let i, len = arr.length; i < len; i++) {
	let index, min;
	 if (arr[i] > 0 && min > arr[i]) {
		 	min = arr[i]
			index = i
	 }
	 return i
}