
/* eslint-disable no-await-in-loop, no-console */

const chalk = require('chalk');
const { Collection } = require("discord.js");
const Functions = require('../utils/Functions');

class SkybotDatabaseHandler {
	constructor() {
		this.retries = 1;

		this.localDb = new Collection();

		/** @type {SkybotDatabase[]} */
		this.databases = [];

		this.debugMode = false;

		this.keyTreshold = 5000;
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



	async get(key) {
		return this.localDb.get(key);
	}

	/**
	 * @param {SkybotDatabase?} preferredDatabase
	 */
	async set(key, value, preferredDatabase=null) {
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
		const database = parentDatabase ?? preferredDatabase ?? newDatabase;
		if (parentDatabase) {
			this.debug(`set() | SkybotDatabase for '${key}' has been chosen: '${database.friendlyName}' (parentDatabase).`);
		} else if (preferredDatabase) {
			this.debug(`set() | SkybotDatabase for '${key}' has been chosen: '${database.friendlyName}' (preferredDatabase).`);
		} else {
			this.debug(`set() | SkybotDatabase for '${key}' has been chosen: '${database.friendlyName}' (newDatabase).`);
		}

		this.debug(`set() | Sending 'POST' Request to '${database.friendlyName}'...`);
		await Functions.requestToSkybotDatabase(
			`${database.databaseURL}/database/${key}`,
			{
				body: JSON.stringify({ value: value }),
				headers: {
					'Authorization': database.authorization,
					'Content-Type': 'application/json'
				},
				method: 'POST'
			},
			this.retries
		);
		this.debug(`set() | 'POST' request complete!`);
		this.debug(`set() | Setting '${key}' with its value into this.localDb...`);
		this.localDb.set(key, value);
		this.debug(`set() | this.localDb.set() complete!`);

		this.debug(`set() | Checking if '${key}' is new...`);
		if (!database.keys.includes(key)) {
			this.debug(`set() | '${key}' exists in '${database.friendlyName}'`);
			database.keys.push(key);
			this.debug(`set() | Adding '${key}' to 'keys' property in '${database.friendlyName}'`);
			database.keyCount += 1;
			this.debug(`set() | Adding 1 to 'keyCount' property in '${database.friendlyName}'`);
		} else this.debug(`set() | '${key}' already exists in '${database.friendlyName}'`);
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
		await Functions.requestToSkybotDatabase(
			`${database.databaseURL}/database/key`,
			{
				headers: {
					'Authorization': database.authorization,
					'Content-Type': 'application/json'
				},
				method: 'DELETE'
			},
			this.retries
		);
		this.debug(`delete() | 'DELETE' request complete!`); 
		this.debug(`delete() | Deleting '${key}' from this.localDb...`);
		this.localDb.set(key);
		this.debug(`delete() | this.localDb.delete() complete!`);

		
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
		this.debug(`getParentDatabase() | Checking if variable 'force' is 'boolean:true'...`);
		if (force) {
			this.debug(`getParentDatabase() | Variable 'force' is 'boolean:true'. Condition satisfied.`);
			this.debug(`getParentDatabase() | Using getParentDatabase() function for 'force:true'...`);
			for (const db of this.databases) {
				this.debug(`getParentDatabase() | Checking '${key}' in ${db.friendlyName}...`);
				this.debug(`getParentDatabase() | Sending 'GET' Request to '${db.friendlyName}'...`);
				const value = await Functions.requestToSkybotDatabase(
					`${db.databaseURL}/database/${key}`,
					{
						headers: {
							'Authorization': db.authorization,
							'Content-Type': 'application/json'
						}
					},
					this.retries
				);
				this.debug(`getParentDatabase() | 'GET' request complete!`);

				this.debug(`getParentDatabase() | Checking if 'value' is 'truthy'`);
				if (value) {
					this.debug(`getParentDatabase() | 'value' is 'truthy'. Returning...`);
					return db;
				}
				this.debug(`getParentDatabase() | 'value' is not 'truthy'. Checking next database...`);
			}

			return null;
		} else {
			this.debug(`getParentDatabase() | Variable 'force' is 'boolean:false'. Condition unsatisfied.`);
			this.debug(`getParentDatabase() | Using normal getParentDatabase() function...`);
			
			const db = this.databases
				.find(db => db.keys.includes(key));

			return db ?? null;
		}
	}

	async init() {
		this.debug(`init() | Initializing all databases...`);
		for (const database of this.databases) {
			this.debug(`init() | Initializing '${database.friendlyName}'`);
			const kvMap = await database.initDatabase();

			this.debug(`init() | Extracting entries from '${database.friendlyName}'`);
			let i = 1;
			for (const [key, value] of kvMap.entries()) {
				this.debug(`init() | Setting '${key}' into this.localDb...`);
				this.localDb.set(key, value);
				this.debug(`init() | Successfully set '${key}' into this.localDb! (${i}/${kvMap.size})`);
				
				i += 1;
			}
		}
		this.debug(`init() | All SkybotDatabases have been initialized!`);
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
				const list = await Functions.requestToSkybotDatabase(
					`${database.databaseURL}/database/list`, 
					{ 
						method: 'GET', 
						headers: { 
							'Content-Type': 'application/json', 
							'Authorization': database.authorization 
						}
					},
					this.retries
				);
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