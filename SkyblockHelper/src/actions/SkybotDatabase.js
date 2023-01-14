
const Database = require('@replit/database');
const Functions = require(`../utils/Functions`);
const chalk = require('chalk');

class SkybotDatabase {
	constructor() {
		this.authorization = null;

		this.database = null;

		this.databaseURL = null;

		this.friendlyName = null;

		this.keys = [];

		this.keyCount = 0;

		this.kvMap = new Map();	

		this.REPLIT_DB_URL = null;
	}

	debug(message) { 
		if (this.debugMode) console.log(`${Functions.getUTCTime()} [SkybotDatabaseHandler]${[chalk.greenBright(`[Logging]`)]} |`, message); 
	}

	async initDatabase(debugMode=false, onFail=() => {}) {
		this.debugMode = debugMode;

		try {
			const REPLIT_DB_URL = await Functions.requestToSkybotDatabase(
				`${this.databaseURL}/database/url`,
				{
					method: `GET`,
					headers: {
						'Content-Type': `application/json`,
						'Authorization': this.authorization
					}
				},
				Infinity
			);

			this.debug(`init() | initDatabase() | Successfully aquired REPLIT_DB_URL from '${this.friendlyName}'!`);

			this.REPLIT_DB_URL = REPLIT_DB_URL;

			this.database = new Database(REPLIT_DB_URL);

			this.debug(`init() | initDatabase() | Successfully created new Database instance using aquired REPLIT_DB_URL!`);





			const list = await this.database.list();

			this.debug(`init() | initDatabase() | Successfully requested key list from '${this.friendlyName}'!`);

			this.keys = list;
			this.keyCount = list.length;

			this.debug(`init() | initDatabase() | Successfully set values of 'this.keys' and 'this.keyCount'!`);

			const kvMap = new Map();
			for (const key of list) {
				this.debug(`init() | initDatabase() | Sending 'GET' Request to '${this.friendlyName}'`); 

				try {
				// eslint-disable-next-line no-await-in-loop
					const value = await this.database.get(key);
					this.debug(`init() | initDatabase() | 'GET' request complete!`);

					kvMap.set(key, value);

					this.debug(`init() | initDatabase() | Successfully extracted '${key}' from '${this.friendlyName}'!`);
				} catch (error) {
					this.debug(`init() | initDatabase() | An error occured while trying to complete the 'GET' request!`);
					console.error(error);

					onFail();
				}
			}

			return kvMap;
		} catch (error) {
			this.debug(`init() | initDatabase() | An error occured while trying to get the 'REPLIT_DB_URL'!`);
			console.error(error);
			
			onFail();
		}
	}

	async getPing() {
		const [keyToTest] = this.keys;

		const requestTimestamp = Date.now();
		await Functions.requestToSkybotDatabase(
			`${this.databaseURL}/database/${keyToTest}`,
			{
				headers: {
					'Authorization': this.authorization,
					'Content-Type': `application/json`
				},
				method: `GET`
			}
		);
		const responseTimestamp = Date.now();

		return responseTimestamp - requestTimestamp;
	}

	setFriendlyName(name) {
		this.friendlyName = name;
		
		return this;
	}

	setDatabaseURL(dbURL) {
		this.databaseURL = dbURL;
		
		return this;
	}

	setAuthorization(auth) {
		this.authorization = auth;
		
		return this;
	}
}

module.exports = SkybotDatabase;