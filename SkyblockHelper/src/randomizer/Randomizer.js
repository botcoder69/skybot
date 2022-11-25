const simpleRandomizer = require('./randomizers/simpleRandomizer.js')

module.exports = class Randomizer {
	constructor() {}
	/**
	 * Outputs a random item and its number based on the itemArray value
	 * @param {string[]} itemArray A stringed array with the template of displayName:skyblockID:minCollectable:maxCollectable:chance
	 * @returns {(string | number)[]}
	 */
	simpleRandomizer(itemArray) {
		simpleRandomizer(itemArray)
	}
}