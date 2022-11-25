const DeveloperTypeError = require('../../errors/DeveloperTypeError');

async function requireSkillLevel(skill, level, messageAuthorID, db) {
	if (skill === "mining") {
		const mineLevel = await db.get(`${messageAuthorID}mineLevel`);
		return mineLevel >= level ? true : false;
	} else if (skill === "fishing") {
		const fishLevel = await db.get(`${messageAuthorID}fishLevel`);
		return fishLevel >= level ? true : false;
	} else if (skill === "foraging" || skill === "chopping") {
		const chopLevel = await db.get(`${messageAuthorID}chopLevel`);
		return chopLevel >= level ? true : false;
	} else {
		throw new DeveloperTypeError('You didn\'t provide a proper skill to check for you dummy.');
	}
}

module.exports = requireSkillLevel;