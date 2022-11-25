// eslint-disable-next-line no-unused-vars
const { User, Collection, EmbedBuilder } = require('discord.js');
const { sliceIntoChunks } = require('../../../functions/Functions');

/**
 *
 * @param {any} db
 * @param {string} maid
 * @param {User} messageAuthor
 * @param {Collection<any, any>} itemMap
 * @returns {Promise<(EmbedBuilder)[]>}
 */
module.exports = async function inventory(db, maid, messageAuthor, itemMap) {
	const maidObj = await db.get(maid);
	const placedMinionArray = maidObj.placedMinions;

	const minionInventoryArray = [];
	// eslint-disable-next-line guard-for-in
	for (let i = 0; i < placedMinionArray.length; i++) {
		try {
			const minion = placedMinionArray[i];
			// eslint-disable-next-line no-inline-comments, no-unused-vars
			const [name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, fuelLastPlacedAt, automatedShipping, automatedShippingEmoji, timeLastCollected, searchTerm] = minion;
			
			const minionFile = itemMap.filter(item => item.group === "Minion").get(name.toLowerCase());
			
			const minionFuelFile = fuel !== null ? itemMap.filter(asset => `minionFuel` in asset).get(fuel.toLowerCase()) : null;

			const { timeBetweenActions, maxStorage } = minionFile.tiers[tier];

			const msElapsed = Date.now() - timeLastCollected;

			if (fuel === null) {
				const totalItemsProduced = Math.floor(((Date.now() - timeLastCollected) / 1000) / timeBetweenActions);
	
				const amount = totalItemsProduced <= maxStorage ? totalItemsProduced : maxStorage;
		
				minionInventoryArray.push(`${placedEmoji} \`${name} ${tier}\`\nTime Between Actions: ${timeBetweenActions} ${fuel === null ? `` : `**(+ ${minionFuelFile.minionFuel.speed}%)**`}\nCapacity: **${amount}/${maxStorage}**${amount === maxStorage ? " **FULL**" : ""}${upgrade1 === null ? "" : `\nUpgrade 1: ${upgrade1Emoji} \`${upgrade1}\``}${upgrade2 === null ? "" : `\nUpgrade 2: ${upgrade2Emoji} \`${upgrade2}\``}${fuel === null ? "" : `\nFuel: ${fuelEmoji} \`${fuel}\``}${automatedShipping === null ? "" : `\nAutomated Shipping: ${automatedShippingEmoji} \`${automatedShipping}\``}`);
			} else {
				const fuelSpeed = minionFuelFile.minionFuel.speed / 100;
				const fuelDuration = (Date.now() - fuelLastPlacedAt) + (minionFuelFile.minionFuel.duration * 1000);
				
				if (msElapsed <= fuelDuration) {
					/** 
					 * This happens when the fuel duration is < more than | equal to > the elapsed time.
					 * Let's say that your fuel lasts for 5 hours, and the minion has been collecting
					 * for 5 hours, that means that the fuel just finished, and we can remove the 
					 * redundant equations from this code block since the duration is full of it.
					 */

					/** 
					 * Refer to this [page](https://hypixel-skyblock.fandom.com/wiki/Minion_Fuel#Minion_Speed_Bonus) for the formula 
					 */
					const newCooldown = (timeBetweenActions*(1-(fuelSpeed/(1 + fuelSpeed)))) * 1000;
	
					// console.log(timeBetweenActions*(1-(fuelSpeed/(1 + fuelSpeed))));

					// cooldown(1-(fuelSpeed/1+fuelSpeed))

					const totalItemsProduced = Math.floor(((Date.now() - timeLastCollected) / newCooldown));
		
					const amount = totalItemsProduced <= maxStorage ? totalItemsProduced : maxStorage;

					minionInventoryArray.push(`${placedEmoji} \`${name} ${tier}\`\nTime Between Actions: ${Math.floor(newCooldown) / 1000} ${fuel === null ? `` : `**(+ ${minionFuelFile.minionFuel.speed}%)**`}\nCapacity: **${amount}/${maxStorage}**${amount === maxStorage ? " **FULL**" : ""}${upgrade1 === null ? "" : `\nUpgrade 1: ${upgrade1Emoji} \`${upgrade1}\``}${upgrade2 === null ? "" : `\nUpgrade 2: ${upgrade2Emoji} \`${upgrade2}\``}${fuel === null ? "" : `\nFuel: ${fuelEmoji} \`${fuel}\``}${automatedShipping === null ? "" : `\nAutomated Shipping: ${automatedShippingEmoji} \`${automatedShipping}\``}`);
				} else {
					// This happpens when the fuel duration is less than the elapsed time.
					// The fuel will eventually be "destroyed" and the minion will return 
					// to its normal cycle. Here we have to calculate how much time will
					// our minion produce with fuel and without fuel

					// newCooldown is how many seconds your minions can produce with that 
					// fuel, but now we need to get how many hours this newCooldown will 
					// last since here, the fuel gets destroyed instead. 

					// This is how many milliseconds the minion still runs on fuel.
					const fuelDuration = Date.now() - fuelLastPlacedAt;
					// This is how many milliseconds the minion runs without fuel.
					const leftDuration = msElapsed - fuelDuration;

					/** 
					 * Refer to this [page](https://hypixel-skyblock.fandom.com/wiki/Minion_Fuel#Minion_Speed_Bonus) for the formula 
					 */
					// This is the cooldown when the fuel is included
					const newCooldown = (timeBetweenActions*(1-(fuelSpeed/(1 + fuelSpeed)))) * 1000;
					// This is the cooldown when the fuel is not included; It is the minions real cooldown
					const realCooldown = timeBetweenActions * 1000;

					// This is how many items the minion produces whilst running on fuel.
					const fuelItemsProduced = Math.floor(fuelDuration / newCooldown);
					// This is how many items the minion produces without fuel.
					const leftItemsProduced = Math.floor(leftDuration / realCooldown);

					// This is how much items in total the minion has produced.
					const totalItemsProduced = fuelItemsProduced + leftItemsProduced;

					/**
					 * Of course, we have to check if the total items produced by the minion exceeds the
					 * minions max storage. Max storage, later on, can be manipulated with minion chests
					 */
					const amount = totalItemsProduced <= maxStorage ? totalItemsProduced : maxStorage;

					minionInventoryArray.push(`${placedEmoji} \`${name} ${tier}\`\nTime Between Actions: ${timeBetweenActions}\nCapacity: **${amount}/${maxStorage}**${amount === maxStorage ? " **FULL**" : ""}${upgrade1 === null ? "" : `\nUpgrade 1: ${upgrade1Emoji} \`${upgrade1}\``}${upgrade2 === null ? "" : `\nUpgrade 2: ${upgrade2Emoji} \`${upgrade2}\``}${fuel === null ? "" : ``}${automatedShipping === null ? "" : `\nAutomated Shipping: ${automatedShippingEmoji} \`${automatedShipping}\``}`);
				}
			}
		} catch (error) {
			const minion = placedMinionArray[i];
			// eslint-disable-next-line no-unused-vars
			const [name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, fuelLastPlacedAt, automatedShipping, automatedShippingEmoji, timeLastCollected, searchTerm] = minion;

			console.error(`\nAn error occured with trying to parse ${searchTerm}:\n${error}`);
		}
	}

	const slicedChunks = sliceIntoChunks(minionInventoryArray, 5);

	const embedArray = [];
	for (let i = 0; i < slicedChunks.length; i++) {
		const chunk = slicedChunks[i];
		const embed = new EmbedBuilder()
			.setAuthor({ name: `${messageAuthor.username} - Minions`, iconURL: messageAuthor.displayAvatarURL() })
			.setDescription(`${chunk.join('\n\n')}`)
			.setFooter({ text: `Page: ${i + 1}/${slicedChunks.length}` });
		embedArray.push(embed);
	}
	return embedArray;
};