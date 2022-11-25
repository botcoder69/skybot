
function makeid(length, characters) {
	const res = [];

	for (let i = 0; i < length; i++) {
		res.push(
			characters.charAt(
				Math.floor(Math.random() * characters.length)
			)
		);
	}

	return res.join('');
}

module.exports = makeid;