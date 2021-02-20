
/**
 * 
 https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
 */

/** ES5+ */
Object.keys(obj).length === 0 && obj.constructor === Object
/** pre ES5 */
function isEmpty (obj) {
	for(let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			return false
		}
	}
	return JSON.stringify(obj) === JSON.stringify({})
}



