
/* eslint-disable no-unused-vars */
const { Collection, Message, EmbedBuilder } = require('discord.js');
const Database = require('@replit/database');
const { Functions: { commafy, parseTime, getUTCTime } } = require('./SkyblockHelper/src/index');
const chalk = require(`chalk`);

class Util extends null {
	static addAssetProperties(asset) {
		/**
		 * @param {'placed' | 'inventory'} [minionEmojiType='inventory'] 
		 * @returns 
		 */
		asset.displayEmojiURL = (minionEmojiType='inventory') => {
			if (asset.group.toLowerCase() === 'minion') {
				return asset.emoji.url[minionEmojiType];
			} else {
				return asset.emoji.url;
			}
		};

		/**
		 * @param {'placed' | 'inventory'} [minionEmojiType='inventory'] 
		 * @returns 
		 */
		asset.displayEmojiName = (minionEmojiType='inventory') => {
			if (asset.group.toLowerCase() === 'minion') {
				return asset.emoji.name[minionEmojiType];
			} else {
				return asset.emoji.name;
			}
		};

		if (asset.group === 'Tool' || asset.group === 'Sword' && !asset?.toolFunc) {
			if (!asset?.toolFunc?.generate) {
				asset.toolFunc = {
					generate(snowflake) {
						return {
							id: snowflake 
						};
					}
				};
			}
		}
	}

	/**
	 * Adds 1 to the number of times you used a command.
	 * @param {(import 'discord.js').RawUserObj} maidObj 
	 * @param {string} commandName 
	 * @param {any} db
	 */
	static async countCommandUse(maid, maidObj, commandName, db) {
		if (!('commandUses' in maidObj)) maidObj.commandUses = {};

		if (!(commandName in maidObj.commandUses)) maidObj.commandUses[commandName] = 0;

		maidObj.commandUses[commandName] += 1;

		await db.set(maid, maidObj);
	}

	/**
	 * Checks if a certain achievement exists in the User's object (maidObj)
	 * @param {(import 'discord.js').RawUserObj} maidObj 
	 * @param {string} achievementName 
	 * @returns {(import 'discord.js').AchievementData?}
	 */
	static checkAchievement(maidObj, achievementName) {
		if (!maidObj?.achievements) return undefined;

		const achievement = maidObj.achievements.find(achievement => achievement.name === achievementName);

		return achievement;
	}


	/**
	 * Wipes users over x amount of milliseconds
	 * @param {Collection<string, import('discord.js').AssetMapValues>} assetMap
	 * @param {Database} db 
	 * @param {number} milliseconds
	 * @param {import('discord.js').GuildTextBasedChannel} channel
	 */
	static async wipeAFKUsers(assetMap, db, milliseconds, channel) {
		const collectionDb = new Collection();
		const allUsersRegistered = await db.list();

		// eslint-disable-next-line no-console
		if (allUsersRegistered.length < 5000) return console.log(`${getUTCTime()} [UserWiper]${chalk.greenBright('[Logging]')} | Registered user count is less than 5,000. Prune Wipe has been cancelled!`);

		const startedTimestamp = Date.now();
		for (const user of allUsersRegistered) {
			// eslint-disable-next-line no-await-in-loop
			const userObj = await db.get(user);

			collectionDb.set(user, userObj);
		}
		const endedTimestamp = Date.now();

		// eslint-disable-next-line no-console
		console.log(`${getUTCTime()} [UserWiper]${chalk.greenBright('[Logging]')} | Cached all users in ${parseTime(Math.floor(endedTimestamp - startedTimestamp / 1000))}.`);

		const usersToWipe = collectionDb.filter(user => (Date.now() - user.lastCmdTimestamp) >= milliseconds);

		const coinsWiped = [];
		const bankWiped = [];
		const netWiped = []; 
		const usersWiped = usersToWipe.size;

		for (const [userToWipe, userToWipeObj] of usersToWipe.keys()) {
			let totalSellableValue = 0;
			for (const item of assetMap.values()) {
				try {
					// eslint-disable-next-line no-await-in-loop
					const userItems = userToWipeObj[item.keyName] ?? 0;
					const totalItemValue = (userItems * item.NPC.sell.price) ?? 0;
					
					totalSellableValue += totalItemValue;
				} catch (error) {
					console.error(error);
				}
			}

			coinsWiped.push(userToWipeObj.coins);
			bankWiped.push(userToWipeObj.bank);
			netWiped.push(totalSellableValue);

			// eslint-disable-next-line no-await-in-loop
			await db.delete(userToWipe);
		}

		const totalAmountWiped = coinsWiped.reduce((a, b) => a + b) + bankWiped.reduce((a, b) => a + b) + netWiped.reduce((a, b) => a + b);

		const wipedEmbed = new EmbedBuilder()
			.setTitle('Skybot User Wipe')
			.setDescription(`Statistics for this month's Skybot Wipe:\nUsers wiped: \`${usersWiped}\`\nCoins wiped: \`${commafy(coinsWiped.reduce((a, b) => a + b))}\`\nBank Coins wiped: ${commafy(bankWiped.reduce((a, b) => a + b))}\nInventories wiped: \`${netWiped.reduce((a, b) => a + b)}\`\n\nTotal amount wiped: ${totalAmountWiped}\n\n\`${usersWiped}\` slots are now available! Use /start to get a spot in Skybot now!`)
			.setImage('https://c.tenor.com/TG5OF7UkLasAAAAC/thanos-infinity.gif');

		channel.send({ embeds: [wipedEmbed] });
	}

	/**
	 * This takes 2 objects: a `partial` object, and a `filled` object. If a property in `filled` does not exist in `partial`, this function adds the property and value from `filled` to `partial`.
	 * If a property in `filled` exists in `partial`, but the overwrite array includes that element, the value of that property in `partial` will be overwritten with the value in `filled`.
	 * @example
	 * const partial = {
	 * 	hello: "world"
	 * };
	 * 
	 * const filled = {
	 * 	foo: "bar",
	 * 	hello: "rick"
	 * };
	 * 
	 * Util.fillUndefinedProperties(partial, filled);
	 * 
	 * console.log(partial);
	 * // Expected output: { hello: "world", foo: "bar" };
	 * 
	 * @example
	 * const partial = {
	 * 	hello: "world"
	 * };
	 * 
	 * const filled = {
	 * 	foo: "bar",
	 * 	hello: "rick"
	 * };
	 * 
	 * Util.fillUndefinedProperties(partial, filled, ['hello']);
	 * 
	 * console.log(partial);
	 * // Expected output: { hello: "rick", foo: "bar" };
	 * @param {object} partial The object to fill
	 * @param {object} filled The object to extract properties from
	 * @param {string[]} overwrite Properties to overwrite in partial, even if they exist.
	 */
	static fillUndefinedProperties(partial, filled, overwrite=[]) {
		for (const property in filled) {
			if (!(property in partial) || overwrite.includes(property)) {
				partial[property] = filled[property];
			} 
		}
	}
}

module.exports = Util;