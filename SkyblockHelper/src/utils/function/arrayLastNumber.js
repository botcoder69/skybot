/**
 * Checks if the last element in an array is a number in a string.
 * @param {string[]} args 
 */
function arrayLastNumber(args) {
	let number = args.slice().pop();

	if (!number) return false;

	number = number.toLowerCase().replace('k', "000");
	number = number.toLowerCase().replace('m', "000000");
	number = number.toLowerCase().replace('b', "000000000");
	
	return isNaN(number) || number === "Infinity" ? false : true;
}

module.exports = arrayLastNumber;