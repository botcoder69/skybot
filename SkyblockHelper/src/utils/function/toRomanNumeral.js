const DeveloperTypeError = require('../../errors/DeveloperTypeError');

function toRomanNumeral(num) {
	if (isNaN(num)) throw new DeveloperTypeError(`Expected variabe num to be of type integer but recieved type ${typeof num}`);

	var digits = String(+num).split(""),
		key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
			"","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
			"","I","II","III","IV","V","VI","VII","VIII","IX"],
		roman = "",
		i = 3;
		// eslint-disable-next-line no-plusplus
	while (i--) roman = (key[+digits.pop() + (i * 10)] || "") + roman;
	return Array(+digits.join("") + 1).join("M") + roman;
}

module.exports = toRomanNumeral;