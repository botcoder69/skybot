
/* eslint-disable no-nested-ternary */

/**
 * @param {number} SkybotTimeMs The number of milliseconds since the Day-Night Update epoch. ~~`October 25, 2021. 00:00:00`~~
 * @param {Object} [options={}]
 * @param {boolean} [options.newLine=false]
 */
function formatSkybotTime(SkybotTimeMs, { newLine = true } = {}) {
	let seconds = Math.floor((SkybotTimeMs - 1635120000000) / 1000);
	const SkybotYears = Math.floor(seconds / 432000);
	seconds = seconds % 432000;
	const SkybotMonths = Math.floor(seconds / 37200);
	seconds = seconds % 37200;
	const SkybotDays = Math.floor(seconds / 1200);
	seconds = seconds % 1200;
	const SkybotHours = Math.floor(seconds / 50);
	seconds = seconds % 50;
	const SkybotMinutes = Math.floor(seconds / 25) * 30;
	seconds = seconds % 25;
	// console.log(SkybotYears, SkybotMonths, SkybotDays, SkybotHours, SkybotMinutes, seconds);

	function OrdinalNumber(number) {
		let return_value;
		switch (number) {
		case 1:
			return_value = `1st`;
			break;
		case 2:
			return_value = `2nd`;
			break;
		case 3: 
			return_value = `3rd`;
			break;
		default:
			return_value = `${number}th`;
		}
		return return_value;
	}

	/**
	 * 
	 * @param {number} SkybotMonths 
	 * @returns {"Early Spring" | "Spring" | "Late Spring" | "Early Summer" | "Summer" | "Late Summer" | "Early Autumn" | "Autumn" | "Late Autumn" | "Early Winter" | "Winter" | "Late Winter"} 
	 */
	function SkyblockSeason(SkybotMonths) {
		let return_value = "None";
		switch (SkybotMonths) {
		case 1:
			return_value = "Winter";
			break;
		case 2:
			return_value = "Late Winter";
			break;
		case 3:
			return_value = "Early Spring";
			break;
		case 4:
			return_value = "Spring";
			break;
		case 5:
			return_value = "Late Spring";
			break;
		case 6:
			return_value = "Early Summer";
			break;
		case 7:
			return_value = "Summer";
			break;
		case 8:
			return_value = "Late Summer";
			break;
		case 9:
			return_value = "Early Autumn";
			break;
		case 10:
			return_value = "Autumn";
			break;
		case 11:
			return_value = "Late Autumn";
			break;
		case 12:
			return_value = "Early Winter";
			break;
		default: 
			console.log(SkybotMonths);
		}
		return return_value;
	}

	return `${SkybotHours <= 12 ? SkybotHours === 0 ? 12 : SkybotHours : SkybotHours - 12}:${SkybotMinutes < 9 ? SkybotMinutes + `0` : SkybotMinutes}${SkybotHours < 12 ? `am` : `pm`}${newLine ? `\n` : `, `}${OrdinalNumber(SkybotDays + 1)} of ${SkyblockSeason(SkybotMonths + 1)}, year ${SkybotYears}`;
}

module.exports = formatSkybotTime;