/* eslint-disable no-await-in-loop */
const Database = require('@replit/database');

/**
 * Syncs an old Repl.it Database, with a new Repl.it Database. Perfect for transferring important data from one repl to another.
 * @param {string} dbUrlToSyncTo The URL of the Repl.it Database that you want to add the values from the old database to. Basically, this is the database you are copying all the data to.
 * @param {string} dbUrlToSyncFrom The URL of the Repl.it Database that you want to extract the values from the old database to. Basically, this is the database you are copying all the data from. 
 * @param {boolean} [logResults=false] If you would like to log results of adding keys to the database, simply enable this. Automatically sets to `false` when undefined.
 */
async function databaseResync(dbUrlToSyncTo, dbUrlToSyncFrom, logResults=false) {

	if (!dbUrlToSyncTo || !dbUrlToSyncTo.startsWith('https://kv.replit.com/')) throw new TypeError('Expected variable dbUrlToSyncTo to be a string Repl.it Database URL.');

	if (!dbUrlToSyncFrom || !dbUrlToSyncFrom.startsWith('https://kv.replit.com/')) throw new TypeError('Expected variable dbUrlToSyncFrom to be a string Repl.it Database URL.');
	
	
	const oldDatabase = new Database(dbUrlToSyncFrom),
		newDatabase = new Database(dbUrlToSyncTo),
		keys = await oldDatabase.list();
	
	let successAdd = 0,
		failureAdd = 0,
		maxItemAdd = 0;
	
	for (const key of keys) {
		maxItemAdd += 1;
		try {
			const value = await oldDatabase.get(key);
			await newDatabase.set(key, value);
	
			if (logResults) console.log(`Successfully set ${key} to the new Database!`);
	
			successAdd += 1;
		} catch (error) {
			console.log(`An error occured while trying to sync key ${key}! ${error}`);
			failureAdd += 1;
		}
	}
	
	if (logResults) console.log(`Successfully added ${successAdd} keys to the new Database, failed to add ${failureAdd} keys to the Database. Handled a total of ${maxItemAdd} keys.`);
}

module.exports = databaseResync;