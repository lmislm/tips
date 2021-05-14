
// https://gist.github.com/katio/08bf3f5e058b950cd957
function splice( array, startIndex, numItems ){
	try {
	 var endIndex = startIndex + numItems;
	 var itemsBeforeSplice = [], splicedItems = [], itemsAfterSplice = [];
	 for( var i = 0; i < array.length; i++ ){
		if( i < startIndex ){ itemsBeforeSplice.push( array[i] ); }
		if( i >= startIndex && i < endIndex ){ splicedItems.push( array[i] ); }
		if( i >= endIndex ){ itemsAfterSplice.push( array[i] ); }      
	 }
	 
	 // Insert all arguments/parameters after numItems
	 for( i = 3; i < arguments.length; i ++ ){   
		itemsBeforeSplice.push( arguments[ ''+i ] );   
	 }
	 
	 // Combine before/after arrays
	 var remainingItems = itemsBeforeSplice.concat( itemsAfterSplice );
	 
	 // Rewrite array. Arrays can't be overwritten directly in SSJS
	 for( i = 0, len=Math.max( array.length, remainingItems.length ); i < len; i++ ){
		if( remainingItems.length > i ){
		 array[i] = remainingItems[i];
		} else {
		 array.pop();
		}
	 }
	 
	 return splicedItems;
	//} catch(e){ /*Debug.logException( e );*/ }
	} catch(e){ println("Error en polyfill > $.splice: " + e.message) }
 }

 const res = splice([1,2,3,4,5], 1, 3)
 console.log(res, 'res')

