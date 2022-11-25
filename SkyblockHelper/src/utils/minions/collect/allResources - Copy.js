const { User, Collection } = require('discord.js');

/**
 * Gets the minion array, then outputs the total number of resources you collected in the format [["resource", "keyName", "amount"]]. Only to be used when you CONFIRMED getting items since it relies on the time there.
 * @param {Any} db The variable you set your `new Database()` to. 
 * @param {User} maid The id of the message author that instantiated this.
 * @param {Collection} itemMap The collection of your items.
 * @returns {Promise<(string | number)[][]>} 
 */
module.exports = async function allResources (db, maid, itemMap) {
	const maidObj = await db.get(maid, maidObj);
	const minionArray = maidObj.placedMinions;
	const newMinionArray = [],
		gainedItems = [];

	for (let i = 0; i < minionArray.length; i++) {
		try {
			const minion = minionArray[i];
			const [name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, automatedShipping, automatedShippingEmoji, timeLastCollected, searchTerm] = minion;
	
			const minionFile = itemMap.filter(asset => asset.group === "Minion").get(name.toLowerCase());
	
			const { timeBetweenActions, maxStorage } = minionFile.tiers[tier];
	
			const totalItemsProduced = Math.floor(((Date.now() - timeLastCollected) / 1000) / timeBetweenActions);
	
			const amount = totalItemsProduced <= maxStorage ? totalItemsProduced : maxStorage;
	
			gainedItems.push([minionFile.produces.displayName, minionFile.produces.keyName, amount, keyName]);
			newMinionArray.push([name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, automatedShipping, automatedShippingEmoji, Date.now(), searchTerm]);
		} catch (error) {
			const minion = minionArray[i];
			// eslint-disable-next-line no-unused-vars
			const [name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, automatedShipping, automatedShippingEmoji, timeLastCollected, searchTerm] = minion;

			console.error(`An error occured with trying to parse ${searchTerm}:\n${error}`);
		}
	}
	await db.set(`${maid}placedMinions`, newMinionArray);
	return gainedItems;
};