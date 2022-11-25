function sToHMS( seconds ) {
	const hours = parseInt( seconds / 3600 );
	seconds = seconds % 3600; 

	const minutes = parseInt( seconds / 60 );
	seconds = seconds % 60;
	
	return (`${hours}:${minutes <= 9 ? `0${minutes}` : minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`);
}

module.exports = sToHMS;