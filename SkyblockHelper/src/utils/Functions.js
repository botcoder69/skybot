/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */

/* eslint-disable no-unused-vars, no-await-in-loop, no-console */
const { Client, Collection, Guild, GuildMember, Interaction, Message, EmbedBuilder, Snowflake, ThreadMember, User } = require('discord.js');
const { REST } = require('@discordjs/rest');
const Database = require('@replit/database');
const SkyblockHelperError = require('../errors/SkyblockHelperError');
const fs = require('fs');
const HTTPResponseError = require('../errors/HTTPResponseError');
const Armor = require('../structures/Armor');

const extendNativeClasses = require('./extendNativeClasses');

const { Routes } = require('discord-api-types/v9');
const fetch = require('node-fetch');
const path = require('path');


extendNativeClasses({ extendArray: true, extendObject: false });

class Functions {
	constructor() {
		throw new TypeError(`The ${this.constructor.name} class may not be instantiated!`);
	}

	static calcTime(offset) {
		const d = new Date();
		const utc = d.getTime() + d.getTimezoneOffset() * 60000;
		const nd = new Date(utc + 3600000*offset);

		return nd.toLocaleString();
	}

	/**
	 * Inserts commas in your number. A better way to read large numbers
	 * @param {number} number
	 */
	static commafy(number) {
		if (!number) return "0";

		const str = number.toString().split('.');
		str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return str.join('.');
	}

	static getUTCTime() {
		const date = new Date();
		return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds() <= 9 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds()}`;
	}

	/**
	 * Makes a random ID with a set length
	 * @param {number} length The length of this id.
	 * @param {string} characters The amount of characters this id has.
	 */
	static makeid(length, characters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
		const res = [];

		for (let i = 0; i < length; i++) {
			res.push(
				characters.charAt(
					Math.floor(Math.random() * characters.length)
				)
			);
		}

		return res.join('');
	}

	static msToHMSMs(ms) {
		const hours = parseInt(ms / 3600000);
		ms = ms % 3600000;

		const minutes = parseInt(ms / 60000);
		ms = ms % 60000;

		const seconds = parseInt(ms / 1000);
		ms = ms % 1000;



		const returnedArray = [];

		if (hours !== 0) returnedArray.push(`${hours} hour${hours === 1 ? "" : "s"}`);
		if (minutes !== 0) returnedArray.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);
		if (seconds !== 0) returnedArray.push(`${seconds} second${seconds === 1 ? ", and" : "s, and"}`);
		if (ms !== 0) returnedArray.push(`${ms} millisecond${ms === 1 ? "" : "s"}`);

		return returnedArray.join(", ");
	}

	static secondsToHMS(seconds) {
		const hours = parseInt( seconds / 3600 );
		seconds = seconds % 3600;

		const minutes = parseInt( seconds / 60 );
		seconds = seconds % 60;

		return (`${hours}:${minutes <= 9 ? `0${minutes}` : minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`);
	}

	/**
	 * Splits an array into even chunks. Good for pages and your 2048 embed description character limit
	 * @param {any[]} array
	 * @param {number} chunkSize
	 */
	static sliceIntoChunks(array, chunkSize) {
		const res = [];
		for (let i = 0; i < array.length; i += chunkSize) {
			const chunk = array.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}

	/**
	 * Returns a roman numeral of a number
	 * @param {number} num
	 */
	static toRomanNumeral(num) {
		if (isNaN(num)) throw new SkyblockHelperError(`Expected variabe num to be of type integer but recieved type ${typeof num}`);

		const digits = String(+num).split("");
		const key = [
			"",
			"C",
			"CC",
			"CCC",
			"CD",
			"D",
			"DC",
			"DCC",
			"DCCC",
			"CM",
			"",
			"X",
			"XX",
			"XXX",
			"XL",
			"L",
			"LX",
			"LXX",
			"LXXX",
			"XC",
			"",
			"I",
			"II",
			"III",
			"IV",
			"V",
			"VI",
			"VII",
			"VIII",
			"IX"
		];
		let roman = "",
			i = 3;
			// eslint-disable-next-line no-plusplus
		while (i--) roman = (key[+digits.pop() + (i * 10)] || "") + roman;
		return Array(+digits.join("") + 1).join("M") + roman;
	}

	/**
	 * Checks if the last element in an array is a number in a string.
	 * @param {string[]} args
	 */
	static arrayValidNumber(args) {
		let number = args.slice().pop();

		if (!number) return false;

		number = number.toLowerCase().replace('k', "000");
		number = number.toLowerCase().replace('m', "000000");
		number = number.toLowerCase().replace('b', "000000000");

		return isNaN(number) || number === "Infinity" ? false : true;
	}

	/**
	 * @typedef SkybotTimeOptions
	 * @property {boolean} [newLine=false]
	 */

	/**
	 * @param {number} SkybotTimeMs The number of milliseconds since the Day-Night Update epoch. ~~`October 25, 2021. 00:00:00`~~
	 * @param {SkybotTimeOptions} options
	 */
	static formatSkybotTime(SkybotTimeMs, options) {
		let seconds = Math.floor((SkybotTimeMs - 1635120000000) / 1000);
		const SkybotYears = Math.floor(seconds / 432000);
		seconds = seconds % 432000;
		const SkybotMonths = Math.floor(seconds / 37200);
		seconds = seconds % 37200;
		const SkybotDays = Math.floor(seconds / 1200);
		seconds = seconds % 1200;
		const SkybotHours = Math.floor(seconds / 50);
		seconds = seconds % 50;
		const SkybotMinutes = Math.floor(seconds / 25) * 30;
		seconds = seconds % 25;
		// console.log(SkybotYears, SkybotMonths, SkybotDays, SkybotHours, SkybotMinutes, seconds);

		function OrdinalNumber(number) {
			let return_value;
			switch (number) {
			case 1:
				return_value = `1st`;
				break;
			case 2:
				return_value = `2nd`;
				break;
			case 3:
				return_value = `3rd`;
				break;
			default:
				return_value = `${number}th`;
			}
			return return_value;
		}

		/**
		 *
		 * @param {number} SkybotMonths
		 * @returns {"Early Spring" | "Spring" | "Late Spring" | "Early Summer" | "Summer" | "Late Summer" | "Early Autumn" | "Autumn" | "Late Autumn" | "Early Winter" | "Winter" | "Late Winter"}
		 */
		function SkyblockSeason(SkybotMonths) {
			let return_value = "None";
			switch (SkybotMonths) {
			case 1:
				return_value = "Winter";
				break;
			case 2:
				return_value = "Late Winter";
				break;
			case 3:
				return_value = "Early Spring";
				break;
			case 4:
				return_value = "Spring";
				break;
			case 5:
				return_value = "Late Spring";
				break;
			case 6:
				return_value = "Early Summer";
				break;
			case 7:
				return_value = "Summer";
				break;
			case 8:
				return_value = "Late Summer";
				break;
			case 9:
				return_value = "Early Autumn";
				break;
			case 10:
				return_value = "Autumn";
				break;
			case 11:
				return_value = "Late Autumn";
				break;
			case 12:
				return_value = "Early Winter";
				break;
			default:
				console.log(SkybotMonths);
			}
			return return_value;
		}

		// eslint-disable-next-line no-nested-ternary
		return `${SkybotHours <= 12 ? SkybotHours === 0 ? 12 : SkybotHours : SkybotHours - 12}:${SkybotMinutes < 9 ? SkybotMinutes + `0` : SkybotMinutes}${SkybotHours < 12 ? `am` : `pm`}${options.newLine ? `\n` : `, `}${OrdinalNumber(SkybotDays + 1)} of ${SkyblockSeason(SkybotMonths + 1)}, year ${SkybotYears}`;
	}

	/**
	 * Syncs an old Repl.it Database, with a new Repl.it Database. Perfect for transferring important data from one repl to another.
	 * @param {string} dbUrlToSyncTo The URL of the Repl.it Database that you want to add the values from the old database to. Basically, this is the database you are copying all the data to.
	 * @param {string} dbUrlToSyncFrom The URL of the Repl.it Database that you want to extract the values from the old database to. Basically, this is the database you are copying all the data from.
	 * @param {boolean} [logResults=false] If you would like to log results of adding keys to the database, simply enable this. Automatically sets to `false` when undefined.
	 */
	static async databaseResync(dbUrlToSyncTo, dbUrlToSyncFrom, logResults=false) {
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

	/**
	 * An array that you want to randomize. You can set how many items you would like.
	 * @param {any[]} array The array to take values from.
	 * @param {number} [count=array.length] The amount of items in the new randomized array.
	 */
	static randomizeArray(array, count=array.length) {
		const saidNumbers = [],
			newArray = [];
		while (newArray.length !== count) {
			const randomizer = Math.floor(Math.random() * array.length);
			if (!saidNumbers.includes(randomizer)) {
				saidNumbers.push(randomizer);
				newArray.push(array[randomizer]);
			}
		}
		return newArray;
	}

	/**
	 * Transforms 1 by 1 keys into an object. Requires the Repl.it Database and the user's ID
	 * @param {Database} db The Repl.it Database
	 * @param {string} uid The ID of the user that instantiated this
	 * @param {boolean} [remove=false] Remove keys on object creation
	 * @param {string[]} [exclude=[]] Keys to be excluded from deletion when deleting keys
	 * @returns {Promise<RawUserObj>}
	 */
	static async keysToObj(db, maid, remove=false, exclude=[]) {
		const rollbackData = new Collection();

		try {
			// If the user has an existing object, we add values to that object instead.
			const objData = await db.get(maid) ?? {};
			// This contains the list of keys the user has.
			const userKeys = (await db.list(maid))
				// This filters keys like 123456789123456789, because this will make a blank property, which would lead to an error.
				.filter(value => maid !== value);

			for (const userKey of userKeys) {
				// eslint-disable-next-line no-await-in-loop
				const value = await db.get(userKey);

				// We add the key to the objData.
				objData[userKey.slice(18)] = value;
				// Just in case something bad happens, we have a rollback ready.
				rollbackData.set(userKey, value);

				// This checks if keyRemoval is true, and if the key is not included in the excluded values.
				if (remove === true && !exclude.includes(userKey.slice(18))) {
					// eslint-disable-next-line no-await-in-loop
					await db.delete(userKey);
				}
			}

			return objData;
		} catch (error) {
			try {
				console.error(error);
				console.error(`Initiating Database rollback on the keys of ${maid}. Returning deleted data...`);

				const rollbackTimestamp = Date.now();
				// eslint-disable-next-line no-await-in-loop
				for (const [key, value] of rollbackData) await db.set(key, value);

				console.error(`Completed Database rollback on the keys of ${maid} in ${(Date.now() - rollbackTimestamp)} ms!`);
			} catch (error) {
				console.error(error);
				console.error(`Couldn't complete Database rollback on the keys of ${maid}! Returning rollback data now!`);

				return rollbackData;
			}
		}
	}

	/**
	 * Parses seconds to a days, hours, minutes, seconds format. Stripped from Dank Memer
	 * @see https://github.com/DankMemer/CommunityBot/blob/main/src/utils/misc.js#L102_L125
	 * @param {number} time
	 * @returns {string}
	 */
	static parseTime(time) {
		if (time === 0) {
			return '0s';
		}
		const methods = [
			{ name: 'd', count: 86400 },
			{ name: 'h', count: 3600 },
			{ name: 'm', count: 60 },
			{ name: 's', count: 1 }
		];

		const timeStr = [
			Math.floor(time / methods[0].count).toString() + methods[0].name
		];
		for (let i = 0; i < 3; i += 1) {
			timeStr.push(
				Math.floor(
					(time % methods[i].count) / methods[i + 1].count
				).toString() + methods[i + 1].name
			);
		}

		return timeStr.filter(t => !t.startsWith('0')).join(', ');
	}

	/**
	 * An easier way to add an item to a specific index in an array. If index is not supplied, the item will be added as the the last element in the array instead.
	 * @param {any[]} array
	 * @param {any} item
	 * @param {number} index
	 * @returns {any[]}
	 */
	static addArrayElement(array, item, index = array.length) {
		array.splice(index, 0, item);
	}

	/**
	 * An easier way to remove an item to a specific index in an array. If index is not supplied, the last element will be removed instead.
	 * @param {any[]} array
	 * @param {any} item
	 * @returns {any[]}
	 */
	static removeArrayElement(array, item) {
		if (!array.includes(item)) return;

		const index = array.indexOf(item);
		array.splice(index, 1);
	}

	/**
	 * Cleans a user id, ready to be used in searching for a user.
	 * @param {string} userId
	 */
	static cleanUserId(userId) {
		userId = userId.toString();

		return userId.replace(/\\?<?@?!?/, '').replace(/>/, '');
	}

	/**
	 * Resolves a GuildMember, User, MessageMention or a Snowflake into a User object. If the User doesn't exist, the message author will be used instead.
	 * @param {UserResolvable} user
	 * @param {Client} message
	 */
	static resolveUser(user, client) {
		if (!user) return undefined;

		if (user instanceof Message) return user.author;
		if (user instanceof Interaction) return user.user;
		if (user instanceof User) return user;
		if (user instanceof GuildMember) return user.user;
		if (user instanceof ThreadMember) return user.user;

		const userId = Functions.cleanUserId(user);

		return client.users.cache.get(userId);
	}

	/**
	 * Resolves a GuildMemberResolvable into a GuildMember object. If the GuildMember doesn't exist, undefined will be returned.
	 * @param {GuildMemberResolvable} guildMember The GuildMemberResolvable you want to resolve into a GuildMember object.
	 * @param {Guild} guild The guild to use in resolving the GuildMemberResolvable.
	 */
	static resolveGuildMember(guildMember, guild) {
		if (!guildMember) return undefined;

		if (guildMember instanceof Message && guildMember.inGuild()) return guildMember.member;
		if (guildMember instanceof Interaction && guildMember.inCachedGuild()) return guildMember.member;
		if (guildMember instanceof GuildMember) return guildMember;
		if (guildMember instanceof ThreadMember) return guildMember.guildMember;

		const userId = Functions.cleanUserId(guildMember);

		return guild.members.cache.get(userId);
	}

	/**
	 * Gets a random number from `min` to `max`.
	 * @param {number} min
	 * @param {number} max
	 */
	static getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	static getSpecifiedRandomNumber(min, max, exclude) {
		let res = Functions.getRandomNumber(min, max);

		while (exclude.includes(res)) res = Functions.getRandomNumber(min, max);

		return res;
	}

	/**
	 * Checks if the user has a specific "Active Item". Added to `Functions` to prevent "Code Duplication"
	 * @param {RawUserObj} maidObj
	 * @param {string} item
	 */
	static checkActiveItem(maidObj, item) {
		if (!('activeItems' in maidObj)) return false;

		const activeItem = maidObj?.activeItems?.find?.(activeItem => activeItem.keyName === item);

		if (!activeItem) return false;

		if (activeItem.endTimestamp <= Date.now()) return false;

		return true;
	}

	/**
	 * Check if the `Four_Leaf_Clover` item helped the user
	 * @param {boolean} clover The clover status effect.
	 * @param {number} rng The random number generator
	 * @param {number} oldValue The value before adding the clover. This refers to the value in the RNG.
	 * @param {number} newValue The value after adding the clover. This refers to the value in the RNG.
	 */
	static cloverHelped(clover, rng, oldValue, newValue) {
		if (!clover) return false;

		return newValue < rng && rng < oldValue;
	}

	/**
	 * Initiates the leaderboard.
	 * @param {Database} db
	 * @param {Collection<string, SkybotCurrencyProfile>} leaderboard
	 * @param {Client} client
	 */
	static async initLeaderboard(db, leaderboard, client, excludedKeys=[]) {
		const keys = (await db.list()).filter(key => !excludedKeys.includes(key));

		for (const key of keys) {
			// eslint-disable-next-line no-await-in-loop
			const userObj = await db.get(key);
			const coins = userObj?.coins ?? 0,
				netWorth = userObj?.netWorth ?? 0;

			const user = await client.users.fetch(key);
			const profile = {
				id: user.id,
				money: coins,
				netWorth: netWorth,
				username: user.username
			};

			leaderboard.set(user.id, profile);
		}
	}

	/**
	 * This handy function overwrites existing properties. If the property in `objectToOverwrite` doesn't exist in `objectFromOverwrite`, it will be kept, otherwise, it will be overwritten
	 * @param {{}} objectOverwriteTo The object to overwrite properties of
	 * @param {{}} objectOverwriteFrom The object to overwrite properties from
	 * @param {string[]} excludeOverwrite Items to exclude from overwriting
	 */
	static keepOldObjectProperty(objectOverwriteTo, objectOverwriteFrom, excludeOverwrite=[]) {
		const data = objectOverwriteTo;

		for (const key in objectOverwriteFrom) {
			if (key in objectOverwriteFrom && !excludeOverwrite.includes(key)) {
				data[key] = objectOverwriteFrom[key];
			}
		}

		return data;
	}

	/**
	 * Add a number to an object that you think is undefined. This safely adds the number to the object even if its null, and it wont return "NaN" unlike when you use the `+=` operator.
	 * @param {any} object The object that you want to add numbers to.
	 * @param {number} number
	 */
	static add(object, number) {
		if (!object) {
			return number;
		} else {
			return object + number;
		}
	}

	/**
	 * Sends a notification to a user. If the user has DM's off, this will send a message saying that they can't be DM'ed
	 * @param {EmbedBuilder} embed
	 * @param {User} user
	 * @param {string | import('discord.js').MessageOptions | import('discord.js').MessagePayload}
	 */
	static async sendNotification(embed, user) {
		const dmChannel = await user.createDM();

		dmChannel.send({ embeds: [embed] }).catch(() => {});
	}

	/**
	 * Checks if a flag exists in a given array. If a flag exists, returns the flag and its argument. Otherwise, returns just the flag and an empty array.
	 * @param {string} flag The flag to check for
	 * @param {number} length The length of arguments for the flag
	 * @param {ArrayType[]} array The array to check the flag in
	 * @param {?boolean} removeFromArray If the flag and arguments should be removed.
	 * @returns {FlagReturn<ArrayType>}
	 */
	static checkForFlag(array, flag, length=0, removeFromArray=false) {
		const flagInArray = array.includes(flag);

		if (!flagInArray) return {
			arguments: [],
			exists: false,
			flag: flag
		};

		const indexOfFlag = array.indexOf(flag) + 1;

		if (removeFromArray) {
			const items = array.splice(indexOfFlag - 1, (indexOfFlag - 1) + length);
			const flag = items.shift();

			return {
				arguments: items,
				exists: true,
				flag: flag
			};
		} else {
			return {
				arguments: array.slice(indexOfFlag, indexOfFlag + length),
				exists: true,
				flag: flag
			};
		}
	}

	/**
	 * Converts an Object's "property: value" structure into a Map.
	 * @param {{}} obj
	 * @param {Map} mapToUse
	 * @returns {void}
	 */
	static objToMap(obj) {
		try {
			const map = new Map();

			// eslint-disable-next-line guard-for-in
			for (const key in obj) {
				map.set(key, obj[key]);
			}

			return map;
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * Converts an Map's "key: value" structure into an Object. Note that all keys will be turned into strings.
	 * @param {Map | extends Map} map
	 * @param {{}} objToUse
	 * @returns {void}
	 */
	static mapToObj(map, objToUse={}) {
		try {
			if (!(map instanceof Map)) throw new Error('The "map" variable must be an uninstantiated Map or an uninstantiated class that extends Map!');

			// eslint-disable-next-line guard-for-in
			for (const [key, value] of map.entries()) {
				objToUse[key] = value;
			}

			return objToUse;
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * This handy function returns a or an whether `word` starts with "a", "e", "i", "o", "u". This is very handy for those persons who don't want to have a big ternary expression just for 'a' and 'an'.
	 * @param {string} word
	 */
	static aoran(word) {
		if (word.startsWith('a') || word.startsWith('e') || word.startsWith('i') || word.startsWith('o') || word.startsWith('u')) {
			return 'an';
		} else {
			return 'a';
		}
	}

	/**
	 * Gets a setting's value. Returns 'true' if the setting is set to true, and 'false' if it doesn't exist or is set to false.
	 * @param {RawUserObj} maidObj
	 * @param {string} setting
 	 */
	static getSettingValue(maidObj, setting) {
		const settingObj = maidObj?.settings?.find?.(_setting => _setting.setting === setting);

		return !settingObj
			? false
			: settingObj?.value;
	}

	/**
	 * Fetches an application command from the parentResolvable. If `parentResolvable` is a guild, the command will be fetched from the Guild, otherwise if `parentResolvable` is a client, the command will be fetched from the Client.
	 * @param {Guild | Client} parentResolvable The parent to use in fetching the slash command
	 * @param {string} commandName The name of the slash command you want to fetch.
	 */
	static async fetchApplicationCommand(parent, commandName) {
		if (!(parent instanceof Client) && !(parent instanceof Guild)) throw new SkyblockHelperError(`Expected an instanceof Client or Guild as value for variable "parent"!`, 'ALLOWED_VARIABLE_VALUES');

		const commandManager = parent instanceof Client
			? parent.application.commands
			: parent.commands;

		const commandCache = await commandManager.fetch();

		return commandCache.find(command => command.name === commandName);
	}

	static createProgressBar(
		percentage,
		maxTiles = 5,
		options = {
			bar1: {
				full: `<:Bar1_Full:973874228225015809>`,
				empty: `<:Bar1_Empty:973874143147724800>`
			},
			bar2: {
				full: `<:Bar2_Full:973874217768583178>`,
				empty: `<:Bar2_Empty:973874134461329419>`
			},
			bar3: {
				full: `<:Bar3_Full:973874202719449088>`,
				empty: `<:Bar3_Empty:973874121865854976>`
			}
		}
	) {
		const percentPerFilledTile = 100 / maxTiles;

		const filledTiles = Math.floor(percentage / percentPerFilledTile);

		const dataArray = [];

		let i = 1;

		for (; i <= filledTiles; i += 1) {
			if (i === 1) {
				dataArray.push(options.bar1.full);
			} else if (i === maxTiles) {
				dataArray.push(options.bar3.full);
			} else {
				dataArray.push(options.bar2.full);
			}
		}

		for (; i <= maxTiles; i += 1) {
			if (i === 1) {
				dataArray.push(options.bar1.empty);
			} else if (i === maxTiles) {
				dataArray.push(options.bar3.empty);
			} else {
				dataArray.push(options.bar2.empty);
			}
		}

		return dataArray.join('');
	}

	/**
	 * This collects all the userObjs of all users in `guild` that is registered to Skybot.
	 * @param {any} db
	 * @param {Guild} guild
	 */
	static async collectAllGuildUserObjs(db, guild) {
		/** @type {string[]} */
		const keys = await db.list();

		const users = keys
			.filter(key => guild.members.cache.has(key));

		const collection = new Collection();

		for (const user of users) {
			const userObj = await db.get(user);

			collection.set(user, userObj);
		}

		return collection;
	}

	/**
	 * @param {Armor} armor
	 */
	static resolveArmorStats(armor) {
		const stats = armor?.armor?.stats;

		return {
			health: stats?.health ?? 0,
			defense: stats?.defense ?? 0,
			strength: stats?.strength ?? 0,
			speed: stats?.speed ?? 0,
			critChance: stats?.critChance ?? 0,
			critDamage: stats?.critDamage ?? 0,
			inteligence: stats?.inteligence ?? 0
		};
	}

	/**
	 * Options for splitting a message.
	 * @typedef {Object} SplitOptions
	 * @property {number} [maxLength=2000] Maximum character length per message piece
	 * @property {string|string[]|RegExp|RegExp[]} [char='\n'] Character(s) or Regex(es) to split the message with,
	 * an array can be used to split multiple times
	 * @property {string} [prepend=''] Text to prepend to every piece except the first
	 * @property {string} [append=''] Text to append to every piece except the last
	 */

	/**
	 * Splits a string into multiple chunks at a designated character that do not exceed a specific length.
	 * @param {string} text Content to split
	 * @param {SplitOptions} [options] Options controlling the behavior of the split
	 * @returns {string[]}
	 */
	static splitMessage(text, { maxLength = 2_000, char = '\n', prepend = '', append = '' } = {}) {
		text = Functions.verifyString(text);

		if (text.length <= maxLength) return [text];


		let splitText = [text];
		if (Array.isArray(char)) {
			while (char.length > 0 && splitText.some(elem => elem.length > maxLength)) {
				const currentChar = char.shift();

				if (currentChar instanceof RegExp) {
					splitText = splitText.flatMap(chunk => chunk.match(currentChar));
				} else {
					splitText = splitText.flatMap(chunk => chunk.split(currentChar));
				}
			}
		} else {
			splitText = text.split(char);
		}

		if (splitText.some(elem => elem.length > maxLength)) throw new SkyblockHelperError('Chunk exceeds the max length and contains no split characters.', 'SPLIT_MAX_LEN');

		const messages = [];
		let msg = '';

		for (const chunk of splitText) {
			if (msg && (msg + char + chunk + append).length > maxLength) {
				messages.push(msg + append);
				msg = prepend;
			}

			msg += (msg && msg !== prepend ? char : '') + chunk;
		}

		return messages.concat(msg).filter(m => m);
	}

	/**
	 * Verifies the provided data is a string, otherwise throws provided error.
	 * @param {string} data The string resolvable to resolve
	 * @param {Function} [error] The Error constructor to instantiate. Defaults to Error
	 * @param {string} [errorMessage] The error message to throw with. Defaults to "Expected string, got <data> instead."
	 * @param {boolean} [allowEmpty=true] Whether an empty string should be allowed
	 * @returns {string}
	 */
	static verifyString(
		data,
		error = Error,
		errorMessage = `Expected a string, got ${data} instead.`,
		allowEmpty = true
	) {
		if (typeof data !== 'string') throw new error(errorMessage);
		if (!allowEmpty && data.length === 0) throw new error(errorMessage);
		return data;
	}

	static async request(url, requestData, retryMaximum, totalRetries=0) {
		console.log(`Sending a request to ${url}. Retry Count: ${totalRetries}, Maximum Retries: ${retryMaximum}`);
		const controller = new AbortController();
		const timeout = setTimeout(() => {
			controller.abort();
		}, 10_000).unref();

		try {
			if (typeof requestData === 'object') {
				requestData.signal = controller.signal;
			} else {
				requestData = {
					signal: controller.signal
				};
			}

			/**
			 * @type {(import 'node-fetch').Response}
			 */
			const response = await fetch(url, requestData);

			console.log(`Current response status: ${response.status}`);

			if ((500 <= response.status && response.status <= 599) || response.ok) {
				return response;
			} else {
				throw new HTTPResponseError(response, requestData, url);
			}
		} catch (error) {
			const retriesOverTotalR = retryMaximum >= totalRetries;


			if (retriesOverTotalR) {
				// eslint-disable-next-line no-return-await, no-plusplus
				return (await Functions.request(url, requestData, retryMaximum, ++totalRetries));
			}
		} finally {
			clearTimeout(timeout);
		}
	}

	static async requestToSkybotDatabase(url, requestData, retryMaximum) {
		const response = await Functions.request(url, requestData, retryMaximum, 0);
		const value = await response.json();

		return value.value;
	}

	/**
	 * Gets the path of a command file. This supports getting files where the name of the command isn't the same as the file name. (Filename: `test.js`; Command: `/dev`);
	 * @param {Client} client The instance of `Client` to reload the command from.
	 * @param {string} commandName The command name you want to reload.
	 * @param {string} commandFolderPath The path for the command folders your bot is using. This has to be the FULL directory path, therefore `path.join()` and `__dirname` are required.
	 * @returns {string}
	 */
	static getCommandFilePath(client, commandName, commandFolderPath) {
		const command = client.slashCommands.get(commandName);

		if (!command) throw new SkyblockHelperError(`Variable "command" must be a valid slash command!`, `COMMAND_RANGE_VALUE`);

		const commandFolders = fs.readdirSync(commandFolderPath).filter(file => file.includes('.'));
		const folderName = commandFolders.find(folder => fs.readdirSync(path.join(commandFolderPath, folder).includes(`${command.data.name}.js`)));

		if (folderName) return path.join(commandFolderPath, folderName, `${command.data.name}.js`);

		// This means that the command DOES exist but the name of the file is not the same as the command name (test.js -> /tcg), so we have to find it by checking all the files.

		for (const folder of commandFolders) {
			const commandFiles = fs.readdirSync(path.join(commandFolderPath, folder)).filter(file => file.endsWith('.js'));

			for (const file of commandFiles) {
				const commandData = require(path.join(commandFolderPath, folder, file));

				if (commandData.name === command.data.name) return path.join(commandFolderPath, folder, file);
			}
		}
	}

	/**
	 * Reloads a slash command
	 * @param {string} commandName The command name you want to reload.
	 * @param {string} commandFolderPath The path for the command folders your bot is using. This has to be the FULL directory path, therefore `path.join()` and `__dirname` are required.
	 * @param {Client} client The instance of `Client` to reload the command from.
	 * @param {string} token The token for your bot.
	 * @param {boolean} [apiRequest=true] Whether or not the command should request to the API. If you want to reload the code for the command, this should be set to `false` for convienence, but if the command parameters are included, set this to `true`. Automatically sets to true.
	 * @param {string} [guildId=''] The id of the `Guild` you want to reload the command in. If left blank, this will treat the command as a **Client** `ApplicationCommand`, otherwise, it will treat the command as a **Guild** `ApplicationCommand`
	 * @returns {Promise<void>}
	 */
	static async reloadCommand(commandName, commandFolderPath, client, token, apiRequest=true, guildId=null) {
		const guild = client.guilds.cache.get(guildId);
		const command = client.slashCommands.get(commandName);

		const commandPath = Functions.getCommandFilePath(client, commandName, commandFolderPath);

		delete require.cache[require.resolve(commandPath)];

		const rest = new REST({ version: '10' }).setToken(token);
		const applicationCommand = await Functions.fetchApplicationCommand(guild ?? client, command.data.name)

		const newCommand = require(commandPath);

		client.slashCommands.set(newCommand.data.name, newCommand);

		if (!apiRequest) return;

		const Route = !guild
			? Routes.applicationCommand(client.user.id, applicationCommand.id)
			: Routes.applicationGuildCommand(client.user.id, guild.id, applicationCommand.id);

		await rest.patch(
			Route,
			{ body: newCommand.data.toJSON() }
		);
	}
}

module.exports = Functions;

/**
 * @typedef RawUserObj
 * @property {string} [axe]
 * @property {string} [pickaxe]
 * @property {string} [rod]
 * @property {number} [cobblestone]
 * @property {number} [coal]
 * @property {number} [ironOre]
 * @property {number} [iron]
 * @property {number} [goldOre]
 * @property {number} [gold]
 * @property {number} [lapis]
 * @property {number} [diamond]
 * @property {number} [pureDiamond]
 * @property {boolean} [startMine]
 * @property {boolean} [ironMine]
 * @property {boolean} [goldMine]
 * @property {boolean} [lapisQua]
 * @property {boolean} [diaSanct]
 * @property {boolean} [redsMine]
 * @property {number} [mineLevel]
 * @property {number} [mineXp]
 * @property {number} [fishLevel]
 * @property {number} [fishXp]
 * @property {number} [chopLevel]
 * @property {number} [chopXp]
 * @property {number} [oakWood]
 * @property {number} [birchWood]
 * @property {number} [darkOakWood]
 * @property {number} [spruceWood]
 * @property {number} [acaciaWood]
 * @property {number} [jungleWood]
 * @property {number} [planks]
 * @property {number} [stick]
 * @property {boolean} [forest]
 * @property {boolean} [roofedForest]
 * @property {boolean} [taiga]
 * @property {boolean} [savannah]
 * @property {boolean} [jungle]
 * @property {number} [commonFish]
 * @property {number} [uncommonFish]
 * @property {number} [rareFish]
 * @property {number} [ultraRareFish]
 * @property {number} [legendaryFish]
 * @property {number} [coins]
 * @property {number} [bank]
 * @property {number} [netWorth]
 * @property {number} [invOakWoodMinion]
 * @property {number} [invBirchWoodMinion]
 * @property {number} [invDarkOakWoodMinion]
 * @property {number} [invSpruceWoodMinion]
 * @property {number} [invAcaciaWoodMinion]
 * @property {number} [invJungleWoodMinion]
 * @property {number} [invCobblestoneMinion]
 * @property {number} [invCoalMinion]
 * @property {number} [invIronMinion]
 * @property {number} [invGoldMinion]
 * @property {number} [invDiamondMinion]
 * @property {number} [invLapisMinion]
 * @property {(string | number)[][]} [placedMinions]
 * @property {number} [bankTier]
 * @property {number} [enchantedGold]
 * @property {number} [enchantedGoldBlock]
 * @property {number} [blockOfCoal]
 * @property {number} [enchantedBread]
 * @property {number} [enchantedCharcoal]
 * @property {number} [enchantedCoal]
 * @property {number} [enchantedLavaBucket]
 * @property {number} [enchantedCobblestone]
 * @property {number} [enchantedIron]
 * @property {number} [enchantedLapis]
 * @property {number} [enchantedDiamond]
 * @property {number} [enchantedOakWood]
 * @property {number} [enchantedBirchWood]
 * @property {number} [enchantedDarkOakWood]
 * @property {number} [enchantedSpruceWood]
 * @property {number} [enchantedAcaciaWood]
 * @property {number} [enchantedJungleWood]
 * @property {number} [redstone]
 * @property {number} [enchantedRedstone]
 * @property {number} [compactor]
 * @property {number} [superCompactor]
 * @property {number} [invRedstoneMinion]
 * @property {TutorialObj} [tutorials]
 * @property {GambleStatsObj} [gambleStats]
 * @property {SwordObj} [sword]
 * @property {number} [woodenSword]
 * @property {number} [stoneSword]
 * @property {number} [ironSword]
 * @property {number} [goldSword]
 * @property {number} [diamondSword]
 * @property {number} [aspectOfTheSpiritButterfly]
 * @property {number} [spiritButterfly]
 * @property {number} [woodenPickaxe]
 * @property {number} [stonePickaxe]
 * @property {number} [ironPickaxe]
 * @property {number} [goldPickaxe]
 * @property {number} [diamondPickaxe]
 * @property {number} [woodenAxe]
 * @property {number} [stoneAxe]
 * @property {number} [ironAxe]
 * @property {number} [goldAxe]
 * @property {number} [diamondAxe]
 * @property {number} [combatLevel]
 * @property {number} [combatXp]
 * @property {boolean} [start]
 * @property {string} [update]
 * @property {ActiveItemObj[]} [activeItems]
 * @property {SettingObj[]} [settings]
 */

/**
 * @typedef TutorialObj
 * @property {boolean} [minion]
 * @property {boolean} [dices]
 * @property {boolean} [highlow]
 * @property {boolean} [scratchoff]
 */

/**
 * @typedef GambleStatsObj
 * @property {GambleInfoObj} dices
 * @property {GambleInfoObj} scratchoff
 */

/**
 * @typedef GambleInfoObj
 * @property {number} [moneyWon]
 * @property {number} [moneyLost]
 * @property {number} [totalWins]
 * @property {number} [totalLoses]
 */

/**
 * @typedef SwordObj
 * @property {string} name
 * @property {string} keyName
 * @property {string} emoji
 * @property {number} baseDamage
 * @property {number} [strength=0]
 * @property {number} [critChance=0]
 * @property {string[]} enchantments
 * @property {number} [spiritButterfly=null]
 */

/**
 * @typedef ActiveItemObj
 * @property {string} name
 * @property {string} keyName
 * @property {string} emoji
 * @property {number} endTimestamp
 */

/**
 * @typedef {string | Snowflake | Message | Interaction | User | GuildMember | ThreadMember} UserResolvable
 */

/**
 * @typedef {string | Snowflake | Message<true> | Interaction<'cached'> | GuildMember | ThreadMember} GuildMemberResolvable
 */

/**
 * @typedef SkybotCurrencyProfile
 * @property {number} money
 * @property {number} netWorth
 * @property {string} username
 * @property {string} id
 */

/**
 * @typedef FlagReturn<Args>
 * @property {boolean} exists
 * @property {Args[]} arguments
 * @property {string} flag
 */

/**
 * @typedef SettingObj
 * @property {string} setting
 * @property {boolean} value
 */