/**
 * https://stackabuse.com/quicksort-in-javascript/
 * @param {*} arr 
 * @param {*} start 
 * @param {*} end 
 * @returns 
 */
function partition(arr, start, end){
	// Taking the last element as the pivot
	const pivotValue = arr[end];
	let pivotIndex = start; 
	for (let i = start; i < end; i++) {
			if (arr[i] < pivotValue) {
				// Swapping elements
				[arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
				// Moving to next element
				pivotIndex++;
			}
	}
	
	// Putting the pivot value in the middle
	[arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
	return pivotIndex;
};

function quickSortRecursive(arr, start, end) {
	// Base case or terminating case
	if (start >= end) {
			return;
	}
	
	// Returns pivotIndex
	let index = partition(arr, start, end);
	
	// Recursively apply the same logic to the left and right subarrays
	quickSort(arr, start, index - 1);
	quickSort(arr, index + 1, end);
}
/**
 * quickSort https://flaviocopes.com/quicksort-javascript/
 * @param {*} originalList 
 * @returns 
 */
//  const quickSort = (originalList) => {
//   const list = [...originalList]

//   if (list.length < 2) {
//     return list
//   }

//   const pivot = list[0]

//   const smaller = list.filter((item) => item < pivot)
//   const bigger = list.filter((item) => item > pivot)

//   return [...quickSort(smaller), pivot, ...quickSort(bigger)]
// }


/**
 * 阮一峰 http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
 * @param {*} arr 
 * @returns 
 */
var quickSort = function(arr) {

	　　if (arr.length < 2) return arr;
	
			let pivotIndex = Math.floor(arr.length / 2);
			let pivot = arr.splice(pivotIndex, 1)[0];
	
			let left = [];
			let right = [];
	
	　　for (var i = 0; i < arr.length; i++){
	
	　　　　if (arr[i] < pivot) {
	
	　　　　　　left.push(arr[i]);
	
	　　　　} else {
	
	　　　　　　right.push(arr[i]);
	
	　　　　}
	
	　　}
		return[...quickSort(left), pivot, ...quickSort(right)]
	
	};

	
// const a = [12, 3, 4, 1, 2, 12, 10, 321]
// const res = quickSort(a)
// console.log(res, 'res')










function qSort(arr) {
	if (arr.length < 2) return arr

	// let pivotVal = Math.floor(arr.length / 2)[0]
	// let pivotVal = arr[0]
	
	// let pivotIndex = Math.floor(arr.length / 2);
	// let pivotVal = arr.splice(pivotIndex, 1)[0];
	let pivotVal = arr[0]

	let left = []
	let right = []

	for(let i = 0; i < arr.length; i++) {
		if (arr[i] < pivotVal) {
			left.push(arr[i])
		} else {
			right.push(arr[i])
		}
	}
	return [...qSort(left), pivotVal, ...qSort(right)]
}
const a = [12, 3, 4, 1, 2, 12, 10, 321]
const res = qSort(a)
console.log(res, 'res')






























