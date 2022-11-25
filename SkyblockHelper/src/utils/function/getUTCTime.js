function getUTCTime() {
	const date = new Date();
	return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds() <= 9 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds()}`;
}

module.exports = getUTCTime;