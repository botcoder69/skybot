/* eslint-disable no-underscore-dangle, class-methods-use-this */

/**
 * A Map that acts like a Database
 * @extends {Map}
 */
module.exports = class MapDatabase extends Map {
	constructor() {
		super();
	}

	/**
     * Identical to [Map.get()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get).
     * Gets an element with the specified key, and returns its value, or `undefined` if the element does not exist. Returned objects **DONT** reference the original object, therefore, you need to use MapDatabase.prototype.set() to save changes made to the key.
     * @param {string} key - The key to get from this database
	 * @param {boolean} nullify - If the key doesn't exist, returns `null` instead of `undefined`. Automatically sets to true if left undefined
     * @returns {* | undefined | null}
     */
	get(key, nullify=true) {
		const value = super.get(key);

		return nullify && (value === null || value === undefined) 
			? null
			: JSON.parse(JSON.stringify(value));
	}
	
	/**
     * Identical to [Map.set()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set).
     * Sets a new element in the database with the specified key and value.
     * @param {*} key - The key of the element to add
     * @param {*} value - The value of the element to add
     * @returns {this}
     */
	set(key, value) {
		return super.set(key, value);
	}

	/**
     * Identical to [Map.delete()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete).
     * Deletes an element from the database.
     * @param {*} key - The key to delete from the database
     * @returns {boolean} `true` if the element was removed, `false` if the element does not exist.
     */
	delete(key) {
		return super.delete(key);
	}

	/**
     * Identical to [Map.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys), except returns an `Array` of keys.
     * Returns all keys in the database.
     * @returns {string[]} A list of all the keys in this Database.
     */
	list() {
		const keys = [];

		for (const key of super.keys()) keys.push(key);

		return keys;
	}

	/**
	 * Identical to [Map.clear()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear).
	 * Removes all elements from the database.
	 * @returns {void}
	 */
	empty() {
		return super.clear();
	}
};