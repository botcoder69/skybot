// eslint-disable-next-line no-unused-vars
const { User, Collection } = require('discord.js');

/**
 * Gets the minion array, then outputs the total number of resources you collected in the format [["resource", "keyName", "amount"]]. Only to be used when you CONFIRMED getting items since it relies on the time there.
 * @param {Any} db The variable you set your `new Database()` to. 
 * @param {User} maid The id of the message author that instantiated this.
 * @param {Collection<string, object>} itemMap The collection of your items.
 * @returns {Promise<(string | number)[][]>} 
 */
module.exports = async function allResources(db, maid, itemMap) {
	const maidObj = await db.get(maid);
	const minionArray = maidObj.placedMinions;
	const newMinionArray = [],
		gainedItems = [];
	try {
		for (let i = 0; i < minionArray.length; i++) {
			try {
				const minion = minionArray[i];
				const [name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, fuelLastPlacedAt, automatedShipping, automatedShippingEmoji, timeLastCollected, searchTerm] = minion;
	
				const minionFile = itemMap.filter(asset => asset.group === "Minion").get(name.toLowerCase());
				const minionFuelFile = fuel !== null ? itemMap.filter(asset => `minionFuel` in asset).get(fuel.toLowerCase()) : null;
	
				const { timeBetweenActions, maxStorage } = minionFile.tiers[tier];

				const msElapsed = Date.now() - timeLastCollected;

				if (fuel === null) {
					const totalItemsProduced = Math.floor(((Date.now() - timeLastCollected) / 1000) / timeBetweenActions);
	
					const amount = totalItemsProduced <= maxStorage ? totalItemsProduced : maxStorage;
		
					gainedItems.push([minionFile.produces.displayName, minionFile.produces.keyName, amount, keyName]);
					newMinionArray.push([name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, Date.now(), automatedShipping, automatedShippingEmoji, Date.now(), searchTerm]);
				} else {
					const fuelSpeed = minionFuelFile.minionFuel.speed / 100;
					const fuelDuration = Date.now() - fuelLastPlacedAt;
				
					if (msElapsed < fuelDuration) {
					/** 
					 * This happens when the fuel duration is more than the elapsed time.
					 * Let's say that your fuel lasts for 5 hours, and the minion has been 
					 * collecting for 4 hours, that means that the fuel isnt finished yet, and
					 * we can remove the redundant equations from this code block
					 */

						/** 
						 * Refer to this [page](https://hypixel-skyblock.fandom.com/wiki/Minion_Fuel#Minion_Speed_Bonus) for the formula 
						 */
						const newCooldown = (timeBetweenActions*(1-(fuelSpeed/(1 + fuelSpeed)))) * 1000;
	
						const totalItemsProduced = Math.floor(((Date.now() - timeLastCollected) / newCooldown) / 1000);
		
						const amount = totalItemsProduced <= maxStorage ? totalItemsProduced : maxStorage;
	
						gainedItems.push([minionFile.produces.displayName, minionFile.produces.keyName, amount, keyName]);
						newMinionArray.push([name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, Date.now(), automatedShipping, automatedShippingEmoji, Date.now(), searchTerm]);
					} else {
						/*
						 * This happpens when the fuel duration is less than the elapsed time.
						 * The fuel will eventually be "destroyed" and the minion will return 
						 * to its normal cycle. Here we have to calculate how much time will
						 * our minion produce with fuel and without fuel.
						 * 
						 * newCooldown is how many seconds your minions can produce with that 
						 * fuel, but now we need to get how many hours this newCooldown will 
						 * last since here, the fuel gets destroyed instead. 
						*/

						/**
						 * This is how many milliseconds the minion still runs on fuel.
						 */
						const fuelDuration = Date.now() - fuelLastPlacedAt;

						/**
						 * This is how many milliseconds the minion runs without fuel.
						 */
						const leftDuration = msElapsed - fuelDuration;

						/**
						 * This is the cooldown when the fuel is included. You can refer to this [page](https://hypixel-skyblock.fandom.com/wiki/Minion_Fuel#Minion_Speed_Bonus) for the formula 
						 */
						const newCooldown = (timeBetweenActions*(1-(fuelSpeed/(1 + fuelSpeed)))) * 1000;

						/**
						 * This is the cooldown when the fuel is not included; It is the minions real cooldown
						 */
						const realCooldown = timeBetweenActions * 1000;

						/**
						 * This is how many items the minion produces whilst running on fuel.
						 */
						const fuelItemsProduced = Math.floor(fuelDuration / newCooldown);

						/**
						 * This is how many items the minion produces without fuel.
						 */
						const leftItemsProduced = Math.floor(leftDuration / realCooldown);

						/**
						 * This is how much items in total the minion has produced.
						 */ 
						const totalItemsProduced = fuelItemsProduced + leftItemsProduced;

						/**
						 * Of course, we have to check if the total items produced by the minion exceeds the
						 * minions max storage. Max storage, later on, can be manipulated with minion chests
						 */
						const amount = totalItemsProduced <= maxStorage ? totalItemsProduced : maxStorage;

						gainedItems.push([minionFile.produces.displayName, minionFile.produces.keyName, amount, keyName]);
						newMinionArray.push([name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, Date.now(), automatedShipping, automatedShippingEmoji, Date.now(), searchTerm]);
					}
				}
			} catch (error) {
				const minion = minionArray[i];
				// eslint-disable-next-line no-unused-vars
				const [name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, fuelLastPlacedAt, automatedShipping, automatedShippingEmoji, timeLastCollected, searchTerm] = minion;

				console.error(`An error occured with trying to parse ${searchTerm}:\n${error}`);
			}
		}
		maidObj.placedMinions = newMinionArray;
		await db.set(maid, maidObj);

		return gainedItems;
	} catch (error) {
		console.error(`An error occured at allResources.js\nInitiated a rollback on the minion array of ${maid}`);
		
		maidObj.placedMinions = minionArray;
		await db.set(maid, maidObj);
	}
};