/* eslint-disable no-unused-vars */
const { commafy } = require('./Functions');

/**
 * @param {CraftingOptions} options The options for crafting this item.
 * @returns {Promise<CraftingResults>}
 * @example 
 * await Crafting(
 * 	{
 * 		// ...
 * 		items: [
 * 			['planks', 'planks', ':Planks:', 2], 
 * 			['stick', 'stick', ':Stick:', 1]
 * 		],
 * 		craftType: 'one-to-one'
 * 	}
 * )
 * 
 * // If they were to craft this item, all of these items will be consumed to make that item
 */
async function Crafting(options) {
	if (!options.amount) options.amount = 1;

	const itemReq = [],
		itemsNeeded = [],
		itemsConsumed = [],
		maidObj = await options.db.get(options.maid);

	for (const item of options.items) {
		const [display_name, skyblock_ID, emoji_ID, required_amount] = item;

		if (typeof display_name !== "string") throw new TypeError(`Expected type string but recieved type ${typeof key}`);

		if (typeof skyblock_ID !== "string") throw new TypeError(`Expected type string but recieved type ${typeof key}`);

		if (typeof emoji_ID !== "string") throw new TypeError(`Expected type string but recieved type ${typeof key}`);

		if (typeof required_amount !== "number") throw new TypeError(`Expected type number but recieved type ${typeof key}`);

		const amountOfItem = maidObj[skyblock_ID] ?? 0;

		if (amountOfItem < (required_amount * options.amount)) itemsNeeded.push(`**${commafy((required_amount * options.amount) - amountOfItem)}x** ${emoji_ID} \`${display_name}\``);

		itemReq.push(`${amountOfItem >= (required_amount * options.amount) ? "<:check:885408207097462786>" : "<:cross:885408206959046678>"} **${commafy(amountOfItem)}x**/**${commafy(required_amount * options.amount)}x** ${emoji_ID} \`${display_name}\``);

		itemsConsumed.push(
			[skyblock_ID, required_amount]
		);
	}

	if (itemsNeeded.length === 0) {
		return {
			enoughItems: true,
			itemsNeeded: null,
			itemReq: itemReq,
			itemsConsumed: itemsConsumed
		};
	} else {
		return {
			enoughItems: false,
			itemsNeeded: itemsNeeded,
			itemReq: itemReq,
			itemsConsumed: itemsConsumed
		};
	}	
}

/**
 * @typedef CraftingResults
 * @property {boolean} enoughItems If the user has enough items to craft the new item.
 * @property {?string[]} itemsNeeded The missing items that needs to be consumed to craft the item
 * @property {string[]} itemReq The list of items that will be consumed upon crafting the item
 * @property {[string, number][]} itemsConsumed The items that should be consumed upon crafting the item. An array containing arrays with the format [skyblock_ID: string, requiredAmount: number]
 */



/**
 * @typedef CraftingOptions
 * @property {string} maid The user id that instantiated this
 * @property {(string | number)[][]} items An array containing arrays with the format [display_name: string, skyblock_ID: string, emoji_ID: string, required_amount: number]
 * @property {any} db The Repl.it database. The variable you assigned `new Database()` to
 * @property {?number} [amount=1] How many of the item you want to craft.
 * @property {'oneItem' | 'multiItem'} [craftType='oneItem'] 
 */

module.exports = Crafting;

/*
 * 
 * await Crafting(
 * 	{
 * 		// ...
 * 		items: [
 * 			['planks', 'planks', ':Planks:', 2], 
 * 			['stick', 'stick', ':Stick:', 1]
 * 		],
 * 		craftType: 'many-to-one'
 * 	}
 * )
 * 
 * // If they were to craft this item, 2 planks OR 1 stick will be consumed to make that item. If the person doesn't have any planks, this function will use the sticks instead.  
 * 
 * @property {'one-to-one' | 'many-to-one'} [craftType='one-to-one'] The type of crafting this function will use. `one-to-one` means that all the items listed in the `items` property will all yield one item, while `many-to-one` means that each item listed in the `items` property will yield one item each.
 */