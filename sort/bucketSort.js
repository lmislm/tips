// JavaScript实现算法 https://zh.wikipedia.org/wiki/%E6%A1%B6%E6%8E%92%E5%BA%8F#JavaScript%E5%AE%9E%E7%8E%B0%E7%AE%97%E6%B3%95
Array.prototype.bucketSort = function(num) {
  function swap(arr, i, j) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  const max = Math.max(...this)
  const min = Math.min(...this)
  const buckets = []
  const bucketsSize = Math.floor((max - min) / num) + 1
  for(let i = 0; i < this.length; i++) {
    const index = ~~(this[i] / bucketsSize)
    !buckets[index] && (buckets[index] = [])
    buckets[index].push(this[i])
    let l = buckets[index].length
    while(l > 0) {
      buckets[index][l] < buckets[index][l - 1] && swap(buckets[index], l, l - 1)
      l--
    }
  }
  let wrapBuckets = []
  for(let i = 0; i < buckets.length; i++) {
    buckets[i] && (wrapBuckets = wrapBuckets.concat(buckets[i]))
  }
  return wrapBuckets
}
const arr = [11, 9, 6, 8, 1, 3, 5, 1, 1, 0, 100]
console.log(arr.bucketSort(10))
// Array.prototype.bucketSort = function()
// {
//   var start = 0;
//   var size = this.length;
//   var min = this[0];
//   var max = this[0]; 
//   for (var i = 1; i < size; i++){
//     if (this[i] < min){min = this[i];}
//     else{ if(this[i] > max){max = this[i];} }
//   }
//   if (min != max){
//     var bucket = new Array(size);
//     for (var i = 0; i < size; i++){bucket[i] = new Array();}
//     var interpolation = 0;
//     for (var i = 0; i < size; i++){
//       interpolation = Math.floor(((this[i] - min) / (max - min)) * (size - 1));
//       bucket[interpolation].push(this[i]);
//     }
//     for (var i = 0; i < size; i++){
//       if (bucket[i].length > 1){bucket[i].bucketSort();}//遞歸
//       for(var j = 0; j < bucket[i].length; j++){this[start++] = bucket[i][j];}
//     }
//   }
// };