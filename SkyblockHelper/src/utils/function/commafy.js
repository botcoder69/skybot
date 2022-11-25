function commafy(number) {
	if (!number) return "0";
	
	const str = number.toString().split('.');
	str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return str.join('.');
}

module.exports = commafy;