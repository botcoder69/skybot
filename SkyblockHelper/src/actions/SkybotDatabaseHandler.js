
/* eslint-disable no-await-in-loop, no-console, no-return-await, no-unused-vars */

const chalk = require('chalk');
const { Collection } = require("discord.js");
const SkybotDatabase = require('./SkybotDatabase');
const Functions = require('../utils/Functions');
const SkyblockHelperError = require('../errors/SkyblockHelperError');

class SkybotDatabaseHandler {
	constructor() {
		this.retries = 1;

		/** @type {SkybotDatabase[]} */
		this.databases = [];

		this.debugMode = false;

		this.keyTreshold = 5000;

		this.initFailFn = () => {};
		
		this.formatKeyValueFn = null;



		this.EMPTY_OBJECT_CONFIRMATION = true;
	}
	
	/** 
	 * @private 
	 */
	normalizeDatabases() {
		const res = this.databases.flat(Infinity);
		this.databases = res;
	}

	/** 
	 * @private 
	 */
	// eslint-disable-next-line class-methods-use-this
	debug(message) {
		if (this.debugMode) console.log(`${Functions.getUTCTime()} [SkybotDatabaseHandler]${[chalk.greenBright(`[Logging]`)]} |`, message);
	}

	setRequestRetries(retries) {
		this.retries = retries;

		return this;
	}
	
	setKeyTreshold(treshold) {
		this.keyTreshold = treshold;

		return this;
	}
	
	setDatabases(...databases) {
		this.databases = databases;
		this.normalizeDatabases();
	
		return this;
	}
	
	addDatabases(...databases) {
		this.databases.push(databases);
		this.normalizeDatabases();
	
		return this;
	}
	
	addDatabase(database) {
		this.databases.push(database);
		this.normalizeDatabases();
	
		return this;
	}

	setDebugMode(debug) {
		this.debugMode = debug;

		return this;
	}

	setInitFailFn(fn) {
		this.initFailFn = fn;

		return this;
	}

	setFormatKeyValueFn(fn) {
		this.formatKeyValueFn = fn;

		return this;
	}



	async get(key) {
		const startTs = Date.now();

		this.debug(`get() | Finding parent SkybotDatabase for '${key}'`);
		const parentDatabase = await this.getParentDatabase(key);
		if (parentDatabase) {
			this.debug(`get() | Parent SkybotDatabase for '${key}' has been found: '${parentDatabase.friendlyName}'!`);
		} else {
			this.debug(`get() | Parent SkybotDatabase for '${key}' cannot be found!`);
		}

		if (!parentDatabase) {
			this.debug(`get() | Returning early: Cannot find parent SkybotDatabase for '${key}'`); 

			return null;
		}

		this.debug(`get() | Sending 'GET' Request to '${parentDatabase.friendlyName}'`); 
		const value = await parentDatabase.database.get(key);
		this.debug(`get() | 'GET' request complete!`); 

		this.debug(`get() | Finished processing 'GET' function in ${Date.now() - startTs}ms.`);

		return value;
	}

	/**
	 * @param {SkybotDatabase?} preferredDatabase
	 */
	async set(key, value, preferredDatabase=null) {
		const startTs = Date.now();

		this.debug(`set() | Checking preferred SkybotDatabase for '${key}'`);
		if (preferredDatabase) {
			this.debug(`set() | Preferred SkybotDatabase for '${key}' has been found: '${preferredDatabase.friendlyName}'!`);
		} else {
			this.debug(`set() | Preferred SkybotDatabase for '${key}' cannot be found!`);
		}

		this.debug(`set() | Finding parent SkybotDatabase for '${key}'`);
		const parentDatabase = await this.getParentDatabase(key);
		if (parentDatabase) {
			this.debug(`set() | Parent SkybotDatabase for '${key}' has been found: '${parentDatabase.friendlyName}'!`);
		} else {
			this.debug(`set() | Parent SkybotDatabase for '${key}' cannot be found!`);
		}

		this.debug(`set() | Finding new SkybotDatabase for '${key}'`);
		const newDatabase = this.databases.find(db => db.keyCount < this.keyTreshold);
		if (newDatabase) {
			this.debug(`set() | New SkybotDatabase for '${key}' has been found: '${newDatabase.friendlyName}'!`);
		} else {
			this.debug(`set() | New SkybotDatabase for '${key}' cannot be found!`);
		}

		/**
		 * How the Database is chosen.
		 * 
		 * First, we try to get the key's parent `SkybotDatabase`. If that doesn't work, 
		 * We try to check if a "preferred `SkybotDatabase`" was given. If there is no preferred `SkybotDatabase`,
		 * We find a new Database that satisfies the keyTreshold. There should be one, since new keys are locked 
		 * behind `/start`, and `/start` has a function to see if there is an available `SkybotDatabase` it can 
		 * save data to.
		 */
		this.debug(`set() | Choosing database based on precedence: parentDatabase, preferredDatabase, newDatabase.`);
		const database = parentDatabase ?? preferredDatabase ?? newDatabase;
		if (parentDatabase) {
			this.debug(`set() | SkybotDatabase for '${key}' has been chosen: '${database.friendlyName}' (parent).`);
		} else if (preferredDatabase) {
			this.debug(`set() | SkybotDatabase for '${key}' has been chosen: '${database.friendlyName}' (preferred).`);
		} else {
			this.debug(`set() | SkybotDatabase for '${key}' has been chosen: '${database.friendlyName}' (new).`);
		}

		this.debug(`set() | Sending 'POST' Request to '${database.friendlyName}'...`);

		await database.database.set(key, value);

		this.debug(`set() | 'POST' request complete!`);



		this.debug(`set() | Checking if '${key}' is new...`);
		
		if (database.keys.includes(key)) return this.debug(`set() | '${key}' already exists in '${database.friendlyName}'`);
		
		this.debug(`set() | '${key}' exists in '${database.friendlyName}'`);
		database.keys.push(key);
		this.debug(`set() | Adding '${key}' to 'keys' property in '${database.friendlyName}'`);
		database.keyCount += 1;
		this.debug(`set() | Adding 1 to 'keyCount' property in '${database.friendlyName}'`); 



		this.debug(`get() | Finished processing 'SET' function in ${Date.now() - startTs}ms.`);
	}

	async delete(key) {
		// There should be a parent `SkybotDatabase` if you are trying to delete something. If there is no parent, then the key doesn't exist.
		this.debug(`delete() | Finding parent SkybotDatabase for '${key}'`);
		const database = await this.getParentDatabase(key);
		if (database) {
			this.debug(`delete() | Parent SkybotDatabase for '${key}' has been found: '${database.friendlyName}'!`);
		} else {
			this.debug(`delete() | Parent SkybotDatabase for '${key}' cannot be found!`);
		}

		if (!database) return this.debug(`delete() | Returning early: Cannot find parent SkybotDatabase for '${key}'`); 

		this.debug(`delete() | Sending 'DELETE' Request to '${database.friendlyName}'`); 
		await database.database.delete(key);
		this.debug(`delete() | 'DELETE' request complete!`); 

		
		this.debug(`set() | Removing '${key}' from 'keys' property in '${database.friendlyName}'`);
		Functions.removeArrayElement(database.keys, key);
		this.debug(`set() | Subtracting 1 from 'keyCount' property in '${database.friendlyName}'`);
		database.keyCount -= 1;
	}

	/**
	 * @param {SkybotDatabase?} preferredDatabase
	 */
	async list(database) {
		if (database) {
			return this.databases.find(db => db === database).keys;
		} else {
			return this.databases
				.map(db => db.keys)
				.flat(1);
		}
	}

	async getParentDatabase(key, force=false) {
		this.debug(`getParentDatabase() | Checking if variable 'force' is 'true' with type 'boolean'...`);
		if (force) {
			this.debug(`getParentDatabase() | Variable 'force' is 'true' with type 'boolean'. Condition satisfied.`);
			this.debug(`getParentDatabase() | Using force getParentDatabase() function for 'force: true'...`);
			for (const db of this.databases) {
				this.debug(`getParentDatabase() | Checking '${key}' in ${db.friendlyName}...`);
				this.debug(`getParentDatabase() | Sending 'GET' Request to '${db.friendlyName}'...`);
				const value = await db.database.get(key);
				this.debug(`getParentDatabase() | 'GET' request complete!`);

				this.debug(`getParentDatabase() | Checking if 'value' is 'truthy'`);
				if (value) {
					this.debug(`getParentDatabase() | 'value' is 'truthy'. Returning...`);
					return db;
				}
				this.debug(`getParentDatabase() | 'value' is not 'truthy'. Checking next database...`);
			}

			this.debug(`getParentDatabase() | '${key}' can not be found in any registered databases! Returning...`);

			return null;
		} else {
			this.debug(`getParentDatabase() | Variable 'force' is 'false' with type 'boolean'. Condition unsatisfied.`);
			this.debug(`getParentDatabase() | Using normal getParentDatabase() function...`);
			
			const db = this.databases
				.find(db => db.keys.includes(key));

			return db ?? null;
		}
	}

	async init() {
		const startTs = Date.now();

		this.debug(`init() | Initializing all databases...`);
		for (const database of this.databases) {
			this.debug(`init() | Initializing '${database.friendlyName}'`);
			this.debug(`init() | Extracting entries from '${database.friendlyName}'`);
			const kvMap = await database.initDatabase(this.debugMode, this.initFailFn);

			this.debug(`init() | Checking for keys inside '${database.friendlyName}'`);
			if (kvMap.size) {
				this.debug(`init() | ${kvMap.size} keys have been found inside '${database.friendlyName}'! Running next check...`);

				this.debug(`init() | Checking for a value in 'formatKeyValueFn'...`);
				if (this.formatKeyValueFn) {
					this.debug(`init() | Value for 'formatKeyValueFn' found! Transforming values now...`);
	
					let i = 1;
					for (const [key, value] of kvMap.entries()) {
						this.debug(`init() | Transforming value of '${key}' according to 'formatKeyValueFn'...`);
						
						const newValue = await this.formatKeyValueFn(value, i, kvMap.size);

						if ((!newValue || newValue === {}) && this.EMPTY_OBJECT_CONFIRMATION) throw new SkyblockHelperError(`this.formatKeyValueFn has returned an object with it's value as: ${newValue}. If this was intentional, set the 'EMPTY_OBJECT_CONFIRMATION' property to false, otherwise, if this was not intentional, check if your function properly returns the object it transformed.`, `EMPTY_OBJECT_CONFIRMATION`);

						this.debug(`init() | Setting '${key}' back into '${database.friendlyName}'...`);
						await database.database.set(key, newValue);
						this.debug(`init() | Successfully set '${key}' back into '${database.friendlyName}'! (${i}/${kvMap.size})`);
						
						i += 1;
					}

					this.debug(`init() | Value transformation for '${database.friendlyName} complete! Checking next database...'`);
				} else this.debug(`init() | Value for 'formatKeyValueFn' was not found! Checking next database...`);
			} else this.debug(`init() | No keys were found inside '${database.friendlyName}'! Checking next database...`);

			database.kvMap = kvMap;
		}

		this.debug(`init() | All SkybotDatabases have been initialized!`);
		this.debug(`init() | Finished processing 'INIT' function in ${Date.now() - startTs}ms.`);
	}

	async getDatabaseStatuses() {
		const databaseStatuses = [];

		for (const database of this.databases) {
			const ping = await Functions.request(
				`${database.databaseURL}/ping`,
				{ method: 'GET' },
				5
			);

			if (!ping.ok) {
				databaseStatuses.push({
					database: database,
					ms: null,
					status: `OFFLINE`
				});
			} else {
				const requestTimestamp = Date.now();
				const list = await database.database.list();
				const responseTimestamp = Date.now();

				if (list.length > 0) {	
					databaseStatuses.push({
						database: database,
						ms: responseTimestamp - requestTimestamp,
						status: `ONLINE`
					});
				} else {
					databaseStatuses.push({
						database: database,
						ms: null,
						status: `EMPTY`
					});
				}
			}
		}

		return databaseStatuses;
	}
}

module.exports = SkybotDatabaseHandler;