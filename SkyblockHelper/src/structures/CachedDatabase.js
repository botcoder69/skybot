
const Database = require('@replit/database');
const { Collection } = require('discord.js');

class CachedDatabase extends Collection {
	/**
	 * A class that caches Database keys in its own local database. This allows for a more faster retrival of database keys with additional utility methods for significantly improved performance and ease-of-use.
	 * @param {string} databaseURL 
	 */
	constructor(databaseURL) {
		super();

		/**
		 * @private
		 */
		this.database = new Database(databaseURL);
	}

	/**
	 * Set a key to a designed value.
	 * @param {string} key 
	 * @param {any} value 
	 */
	async set(key, value) {
		super.set(key, value);
	}

	/**
	 * Gets the changes that happened to a specific key.
	 * @param {string} key 
	 */
	async get(key) {
		return super.get(key) ?? null;
	}

	async fetchDatabaseEntries(specificKeys) {
		const keyList = await this.database.list();
		const keys = specificKeys.length
			? keyList.filter(key => specificKeys.includes(key))
			: keyList;



		for (const key of keys) {
			// eslint-disable-next-line no-await-in-loop
			const value = await this.database.get(key);
	
			this.set(key, value);
		}
	}

	list() {
		const keys = [];
		for (const key of this.keys()) {
			keys.push(key);
		}

		return keys;
	}
}

module.exports = CachedDatabase;