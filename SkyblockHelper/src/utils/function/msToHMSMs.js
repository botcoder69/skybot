function msToHMSMs(ms) {
	// 1. Extract hours.
	const hours = parseInt(ms / 3600000);
	ms = ms % 3600000;
	// 2. Extract minutes.
	const minutes = parseInt(ms / 60000);
	ms = ms % 60000;
	// 3. Extract seconds.
	const seconds = parseInt(ms / 1000);
	ms = ms % 1000;

	const returnedArray = [];

	if (hours !== 0) returnedArray.push(`${hours} hour${hours === 1 ? "" : "s"}`);

	if (minutes !== 0) returnedArray.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);

	if (seconds !== 0) returnedArray.push(`${seconds} second${seconds === 1 ? ", and" : "s, and"}`);

	if (ms !== 0) returnedArray.push(`${ms} millisecond${ms === 1 ? "" : "s"}`);

	return returnedArray.join(", ");
}

module.exports = msToHMSMs;