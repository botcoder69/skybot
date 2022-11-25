/* eslint-disable no-unused-vars */

const { Collection } = require('discord.js');
const Database = require('@replit/database');
const { commafy } = require('../functions/Functions');
const DeveloperTypeError = require('../errors/DeveloperTypeError');

/**
 * @typedef {object} CraftingOptions
 * @property {string} [type="oneItem"]
 */

/**
 * @param {string} query The item the user wants to search for.
 * @param {string} maid The user id that instantiated this.
 * @param {Collection} assetMap A `Collection` that contains all the assets used in Skybot.
 * @param {Database} db The replit database. The variable you assigned `new Database()` to
 * @param {number} wantedAmount This is how much of the item you want.
 * @param {CraftingOptions} options
 * @returns {Promise<(string[] | boolean)[] | string[][]>} Returns [true, listOfItems] if the user has enough items to craft it. Otherwise, returns [itemsNeeded, listOfItems] 
 */
module.exports = async function CraftingBETA(query, maid, assetMap, db, wantedAmount, options) {
	if (options.type === "oneItem") {
		const craftableItems = assetMap.filter(asset => 'crafting' in asset && asset.crafting.type === "oneItem");

		if (!craftableItems.size) return new DeveloperTypeError('None of your assets have their crafting type set to "oneItem"');

		const craftItem = craftableItems.get(query) ||
			craftableItems.find(item => item.search.includes(query));

		if (!craftItem) return "❗ Check your syntax! `$$craft <item> <amount>`";

		const itemReq = [],
			itemsNeeded = [];
		for (const item of craftItem.crafting.materials) {
			const [display_name, skyblock_ID, emoji_ID, required_amount] = item;

			if (typeof display_name !== "string") throw new TypeError(`Expected type string but recieved type ${typeof key}`);

			if (typeof skyblock_ID !== "string") throw new TypeError(`Expected type string but recieved type ${typeof key}`);

			if (typeof emoji_ID !== "string") throw new TypeError(`Expected type string but recieved type ${typeof key}`);

			if (typeof required_amount !== "number") throw new TypeError(`Expected type number but recieved type ${typeof key}`);

			// eslint-disable-next-line no-await-in-loop
			const amountOfItem = maid[skyblock_ID];
			if (amountOfItem < required_amount * wantedAmount) {
				itemsNeeded.push(`**${commafy(required_amount * wantedAmount - amountOfItem)}x** ${emoji_ID} \`${display_name}\``);
			}
			itemReq.push(`${amountOfItem > required_amount * wantedAmount ? "<:check:885408207097462786>" : "<:cross:885408206959046678>"} **${commafy(amountOfItem)}x**/**${commafy(required_amount)}x** ${emoji_ID} \`${display_name}\``);
		}

		if (itemsNeeded.length === 0) {
			return [true, itemReq];
		} else {
			return [itemsNeeded, itemReq];
		}
	} else if (options.type === "multiItem") {
		const craftableItems = assetMap.filter(asset => 'crafting' in asset && asset.crafting.type === "multiItem");

		if (!craftableItems.size) return new DeveloperTypeError('None of your assets have their crafting type set to "multiItem"');

		const craftItem = craftableItems.get(query) ||
			craftableItems.find(item => item.search.includes(query));

		if (!craftItem) return "❗ Check your syntax! `$$craft <item> <amount>`";

		const itemReq = [],
			itemsNeeded = [];

		let craftingAmount = wantedAmount;
		for (const item of craftItem.crafting.materials) {
			const [display_name, skyblock_ID, emoji_ID, required_amount] = item;

			if (typeof display_name !== "string") throw new TypeError(`Expected type string but recieved type ${typeof key}`);

			if (typeof skyblock_ID !== "string") throw new TypeError(`Expected type string but recieved type ${typeof key}`);

			if (typeof emoji_ID !== "string") throw new TypeError(`Expected type string but recieved type ${typeof key}`);

			if (typeof required_amount !== "number") throw new TypeError(`Expected type number but recieved type ${typeof key}`);

			// eslint-disable-next-line no-await-in-loop
			const amountOfItem = await db.get(`${maid}${skyblock_ID}`);
			if (amountOfItem < required_amount * wantedAmount) {
				itemsNeeded.push(`**${commafy(required_amount * wantedAmount - amountOfItem)}x** ${emoji_ID} \`${display_name}\``);
			}
			itemReq.push(`${amountOfItem > required_amount * wantedAmount ? "<:check:885408207097462786>" : "<:cross:885408206959046678>"} **${commafy(amountOfItem)}x**/**${commafy(required_amount)}x** ${emoji_ID} \`${display_name}\``);
		}

		if (itemsNeeded.length === 0) {
			return [true, itemReq];
		} else {
			return [itemsNeeded, itemReq];
		}
	}
};