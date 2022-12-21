
/* eslint-disable no-await-in-loop, no-console, no-unused-vars */
const { Collection } = require("discord.js");
const fetch = require('node-fetch');
const SkybotDatabase = require("./SkybotDatabase");
// const Functions = require('../utils/Functions');

class SkybotDatabaseHandlerError extends Error {
	constructor(response, ...args) {
		super(`${response.status} ${response.statusText} ${args.join(' ')}`);
		
		this.name = `${this.constructor.name}`;

		Error.captureStackTrace(this, this.constructor);
	}
}

class SkybotDatabaseHandler {
	constructor() {
		this.keyInfos = new Collection();

		/** @type {SkybotDatabase[]} */
		this.databases = [];

		this.debug = false;

		this.keyTreshold = 5000;

		this.localDb = new Collection();
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
	 * Adds 1 to the database's keyCount property if the key is a new key.
	 * @param {SkybotDatabase} database
	 */
	// eslint-disable-next-line class-methods-use-this
	async changeDatabaseKeyAmount(database, amount) {
		database.keyCount += amount;
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





	async get(key) {
		return this.localDb.get(key) ?? null;
	}

	async set(key, value) {
		await this.init();

		if (this.debug) console.log(`SkybotDatabaseHandler#set is finding the original database for "${key}"`);
		const database = await this.getParentDatabase(key, false);

		if (!database) {
			if (this.debug) console.log(`SkybotDatabaseHandler#set cannot find the original database for "${key}"`);
			if (this.debug) console.log(`SkybotDatabaseHandler#set is looking for a new database for "${key}"`);

			const newDatabase = this.databases.find(db => db.keyCount >= this.keyTreshold);

			if (this.debug) console.log(`SkybotDatabaseHandler#set has found Database: "${newDatabase.friendlyName}" as the database for "${key}"`);

			const body = { value: value };



			const response = await fetch(`${newDatabase.databaseURL}/database/${key}`, { 
				method: 'POST', 
				body: JSON.stringify(body),
				headers: { 'Content-Type': 'application/json', 'Authorization': newDatabase.authorization }
			});
			this.localDb.set(key, value);
			this.changeDatabaseKeyAmount(newDatabase, +1);

			

			checkStatus(response, key);

			if (this.debug) console.log(`SkybotDatabaseHandler#set has successfully set "${key}" to Database: "${database.friendlyName}"`);
		} else {
			if (this.debug) console.log(`SkybotDatabaseHandler#set has found the original database of "${key}". Database: "${database.friendlyName}"`);
			const body = { value: value };


			
			const response = await fetch(`${database.databaseURL}/database/${key}`, { 
				method: 'POST', 
				body: JSON.stringify(body),
				headers: { 'Content-Type': 'application/json', 'Authorization': database.authorization }
			});
			this.localDb.set(key, value);
			


			checkStatus(response, key);

			if (this.debug) console.log(`SkybotDatabaseHandler#set has successfully set "${key}" to Database: "${database.friendlyName}"`);
		}
	}

	async delete(key) {
		await this.init();

		const database = this.getParentDatabase(key);
		const response = await fetch(`${database.databaseURL}/database/${key}`, { 
			method: `DELETE`, 
			headers: { 'Content-Type': 'application/json', 'Authorization': database.authorization }
		});
		this.localDb.delete(key);
		this.changeDatabaseKeyAmount(database, -1);
			
		checkStatus(response, key);
	}
	
	async list() {		
		const keys = [];

		for (const database of this.databases) {
			const response = await fetch(`${database.databaseURL}/database/list`, { 
				method: `GET`, 
				headers: { 'Content-Type': 'application/json', 'Authorization': database.authorization }
			});

			const value = await response.json();

			checkStatus(response);

			if (value.value) {
				keys.push(value.value);
			}
		}

		return keys.flat(Infinity);
	}

	async init() {
		for (const database of this.databases) {
			const response = await fetch(`${database.databaseURL}/database/list`, { 
				method: 'GET', 
				headers: { 'Content-Type': 'application/json', 'Authorization': database.authorization }
			});

			const list = await response.json();
			
			if (this.debug) console.log(list);

			checkStatus(response);

			if (list.value) {
				database.keyCount = list.value.length;
			}

			for (const user of list.value) {
				const response = await fetch(`${database.databaseURL}/database/${user}`, { 
					method: 'GET', 
					headers: { 'Content-Type': 'application/json', 'Authorization': database.authorization }
				});

				const value = await response.json();

				this.localDb.set(user, value.value);
			}
		}

		return this;
	}

	async getParentDatabase(key, force=false) {
		if (this.keyInfos.has(key) && !force) {
			return this.keyInfos.get(key);
		} else {
			for (const database of this.databases) {
				if (this.debug) console.log(`SkybotDatabaseHandler#getParentDatabase is searching for "${key}" in Database: "${database.friendlyName}"`);
	
				const response = await fetch(`${database.databaseURL}/database/${key}`, { 
					method: 'GET', 
					headers: { 'Content-Type': 'application/json', 'Authorization': database.authorization }
				});
	
				const value = await response.json();
	
				if (this.debug) console.log(value);

				checkStatus(response);
	
				if (value.value) {
					if (this.debug) console.log(`SkybotDatabaseHandler#getParentDatabase has found "${key}" in Database: "${database.friendlyName}"`);
					
					if (!this.keyInfos.has(key)) this.keyInfos.set(key, database);
	
					return database;
				}
	
				if (this.debug) console.log(`SkybotDatabaseHandler#getParentDatabase cannot see "${key}" in Database: "${database.friendlyName}"`);
			}
	
			if (this.debug) console.log(`SkybotDatabaseHandler#getParentDatabase cannot find "${key}" in any declared databases!`);
	
			// This means that the key doesn't exist in all of the databases, because if it did exist, it would've been returned and ended the method. 
			return null;
		}
	}

	async getDatabaseStatuses() {
		const databaseStatuses = [];

		for (const database of this.databases) {
			const ping = await fetch(`${database.databaseURL}/ping`, {
				method: 'GET'
			});

			const pingValue = await ping.json();

			if (pingValue.message !== `202: Accepted + Pong`) {
				databaseStatuses.push({
					database: database,
					ms: null,
					status: `OFFLINE`
				});
			} else {
				const response = await fetch(`${database.databaseURL}/database/list`, { 
					method: 'GET', 
					headers: { 'Content-Type': 'application/json', 'Authorization': database.authorization }
				});
	
				const value = await response.json();
	
				if (value.value.length > 0) {
					const [keyToTest] = value.value;
	
					try {
						const requestTimestamp = Date.now();
						await this.get(keyToTest);
						const responseTimestamp = Date.now();
	
						databaseStatuses.push({
							database: database,
							ms: responseTimestamp - requestTimestamp,
							status: `ONLINE`
						});
					} catch (error) {
						databaseStatuses.push({
							database: database,
							ms: null,
							status: `ERROR`
						});
					}
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

function checkStatus(response, key=null) {
	if (!response.ok) {
		if (key) throw new SkybotDatabaseHandlerError(response, `for Key: ${key}`);
		else throw new SkybotDatabaseHandlerError(response);
	}
}

module.exports = SkybotDatabaseHandler;