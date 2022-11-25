
/* eslint-disable no-unused-vars */
const Database = require('@replit/database');
const { Collection, User, EmbedBuilder } = require('discord.js');
const { sliceIntoChunks } = require('../Functions');

class MinionsBETA extends null {
	/**
	 * Gets the minion array, then returns the total number of resources you collected. This should only be used when you CONFIRMED getting items. This function includes minion fuel.
	 * @param {Database<import('discord.js').RawUserObj>} db 
	 * @param {string} maid 
	 * @param {Collection<string, import('discord.js').AssetMapValues} assetMap 
	 * @returns {Promise<MinionOutputData[]>}
	 */
	static async allResources(db, maid, assetMap, timestamp=Date.now()) {
		const maidObj = await db.get(maid);
		const gainedItems = [];

		const newPlacedMinions = maidObj.placedMinions
			.map(placedMinion => {
				const placedMinionObj = minionDataToObject(placedMinion);

				const minionFile = assetMap.find(asset => asset.keyName === placedMinionObj.keyName);
				const minionFuelFile = assetMap.find(asset => asset.keyName === placedMinionObj.fuel);

				const { timeBetweenActions, maxStorage } = minionFile.tiers[placedMinionObj.tier];
				const msElapsed = timestamp - placedMinionObj.lastCollectedTimestamp;

				// console.log(placedMinionObj.fuelPlacedTimestamp + minionFuelFile?.minionFuel.duration);

				// eslint-disable-next-line no-nested-ternary
				const fuelTime = minionFuelFile
					? ((placedMinionObj.fuelPlacedTimestamp + minionFuelFile?.minionFuel.duration) || 0) < timestamp
						? (timestamp - (placedMinionObj.fuelPlacedTimestamp + minionFuelFile?.minionFuel.duration)) / 1000 
						: (timestamp - placedMinionObj.lastCollectedTimestamp)
					: 0;
				const normTime = fuelTime <= 0
					? msElapsed
					: fuelTime - msElapsed;

				// console.log(`fuelTime:`, fuelTime);
				// console.log(`normTime:`, normTime);

				const oldCooldown = timeBetweenActions;
				const newCooldown = timeBetweenActions * (1 / (1 + (minionFuelFile?.minionFuel?.speed || 0) / 100));

				// console.log(`oldCooldown:`, oldCooldown);
				// console.log(`newCooldown:`, newCooldown);

				const itemsProducedOnFuel = Math.floor((fuelTime / newCooldown) / 1000);
				const itemsProducedNormal = Math.floor((normTime / oldCooldown) / 1000);

				// console.log(`itemsProducedOnFuel:`, itemsProducedOnFuel);
				// console.log(`itemsProducedNormal:`, itemsProducedNormal);

				const amount = (itemsProducedOnFuel + itemsProducedNormal) >= maxStorage
					? maxStorage
					: (itemsProducedOnFuel + itemsProducedNormal);
			
				gainedItems.push(
					{
						name: minionFile.produces.displayName, 
						keyName: minionFile.produces.keyName, 
						amount: amount
					}
				);

				placedMinionObj.lastCollectedTimestamp = timestamp;
				if (placedMinionObj.fuel) placedMinionObj.fuelPlacedTimestamp = timestamp;

				return objectToMinionData(placedMinionObj);
			});

		maidObj.placedMinions = newPlacedMinions;

		await db.set(maid, maidObj);

		return gainedItems;
	}

	/**
	 * Collects from a minion in the given number. Since JavaScript arrays are zero-indexed, the number you will give will be subtracted by 1. This can also only be used when you have confirmed getting items from this minion.
	 * @param {Database<import('discord.js').RawUserObj>} db Can be the Repl.it `Database` or a `MapDatabase`
	 * @param {string} maid The ID of the user that instantiated this.
	 * @param {Collection<string, import('discord.js').AssetMapValues>} assetMap A collection of the items in Skybot. 
	 * @param {number} minionNumber An index in the minion array, added by 1.
	 * @returns {Promise<MinionOutputData>}
	 */
	static async minion(db, maid, assetMap, minionNumber, timestamp=Date.now()) {
		const maidObj = await db.get(maid);
		const placedMinion = maidObj.placedMinions[minionNumber - 1];

		const placedMinionObj = minionDataToObject(placedMinion);

		const minionFile = assetMap.find(asset => asset.keyName === placedMinionObj.keyName);
		const minionFuelFile = assetMap.find(asset => asset.keyName === placedMinionObj.fuel);

		const { timeBetweenActions, maxStorage } = minionFile.tiers[placedMinionObj.tier];
		const msElapsed = timestamp - placedMinionObj.lastCollectedTimestamp;

		// console.log(placedMinionObj.fuelPlacedTimestamp + minionFuelFile?.minionFuel.duration);

		// eslint-disable-next-line no-nested-ternary
		const fuelTime = minionFuelFile
			? ((placedMinionObj.fuelPlacedTimestamp + minionFuelFile?.minionFuel.duration) || 0) < timestamp
				? (timestamp - (placedMinionObj.fuelPlacedTimestamp + minionFuelFile?.minionFuel.duration)) / 1000 
				: (timestamp - placedMinionObj.lastCollectedTimestamp)
			: 0;
		const normTime = fuelTime <= 0
			? msElapsed
			: fuelTime - msElapsed;

		// console.log(`fuelTime:`, fuelTime);
		// console.log(`normTime:`, normTime);

		const oldCooldown = timeBetweenActions;
		const newCooldown = timeBetweenActions * (1 / (1 + (minionFuelFile?.minionFuel?.speed || 0) / 100));

		// console.log(`oldCooldown:`, oldCooldown);
		// console.log(`newCooldown:`, newCooldown);

		const itemsProducedOnFuel = Math.floor((fuelTime / newCooldown) / 1000);
		const itemsProducedNormal = Math.floor((normTime / oldCooldown) / 1000);

		// console.log(`itemsProducedOnFuel:`, itemsProducedOnFuel);
		// console.log(`itemsProducedNormal:`, itemsProducedNormal);

		const amount = (itemsProducedOnFuel + itemsProducedNormal) >= maxStorage
			? maxStorage
			: (itemsProducedOnFuel + itemsProducedNormal);
	
		placedMinionObj.lastCollectedTimestamp = timestamp;
		if (placedMinionObj.fuel) placedMinionObj.fuelPlacedTimestamp = timestamp;

		maidObj.placedMinions[minionNumber - 1] = objectToMinionData(placedMinionObj);

		await db.set(maid, maidObj);

		return {
			name: minionFile.produces.displayName, 
			keyName: minionFile.produces.keyName, 
			amount: amount
		};
	}

	/**
	 * Gets the minion array, then outputs an array of embeds you can put on your page. This function includes minion fuel.
	 * @param {Database<import('discord.js').RawUserObj} db 
	 * @param {User} user 
	 * @param {Collection<string, import('discord.js').AssetMapValues>} assetMap 
	 */
	static async inventory(db, user, assetMap, timestamp=Date.now()) {
		const maidObj = await db.get(user.id);

		return sliceIntoChunks(
			maidObj.placedMinions
				.map((placedMinion, index) => {
					const placedMinionObj = minionDataToObject(placedMinion);

					const minionFile = assetMap.find(asset => asset.keyName === placedMinionObj.keyName);
					const minionFuelFile = assetMap.find(asset => asset.keyName === placedMinionObj.fuel);
					const minionUpgrade1File = assetMap.find(asset => asset.keyName === placedMinionObj.upgrade1);
					const minionUpgrade2File = assetMap.find(asset => asset.keyName === placedMinionObj.upgrade2);
					const minionAutomatedShippingFile = assetMap.find(asset => asset.keyName === placedMinionObj.automatedShipping);
					

					const { timeBetweenActions, maxStorage } = minionFile.tiers[placedMinionObj.tier];
					const msElapsed = timestamp - placedMinionObj.lastCollectedTimestamp;

					// console.log(placedMinionObj.fuelPlacedTimestamp + minionFuelFile?.minionFuel.duration);

					// eslint-disable-next-line no-nested-ternary
					const fuelTime = minionFuelFile
						? ((placedMinionObj.fuelPlacedTimestamp + minionFuelFile?.minionFuel.duration) || 0) < timestamp
							? (timestamp - (placedMinionObj.fuelPlacedTimestamp + minionFuelFile?.minionFuel.duration)) / 1000 
							: (timestamp - placedMinionObj.lastCollectedTimestamp)
						: 0;
					const normTime = fuelTime <= 0
						? msElapsed
						: fuelTime - msElapsed;

					// console.log(`fuelTime:`, fuelTime);
					// console.log(`normTime:`, normTime);

					const oldCooldown = timeBetweenActions;
					const newCooldown = timeBetweenActions * (1 / (1 + (minionFuelFile?.minionFuel?.speed || 0) / 100));

					// console.log(`oldCooldown:`, oldCooldown);
					// console.log(`newCooldown:`, newCooldown);

					const itemsProducedOnFuel = Math.floor((fuelTime / newCooldown) / 1000);
					const itemsProducedNormal = Math.floor((normTime / oldCooldown) / 1000);

					// console.log(`itemsProducedOnFuel:`, itemsProducedOnFuel);
					// console.log(`itemsProducedNormal:`, itemsProducedNormal);

					const amount = (itemsProducedOnFuel + itemsProducedNormal) >= maxStorage
						? maxStorage
						: (itemsProducedOnFuel + itemsProducedNormal);

					const cooldown = placedMinionObj.fuel
						? Math.floor(newCooldown * 10) / 10
						: oldCooldown;

					let description = `${minionFile.displayEmojiName('placed')} \`${minionFile.name} ${placedMinionObj.tier.toUpperCase()}\``;
				
					description += `\nTime between actions: ${cooldown}`;
					if (placedMinionObj.fuel) description += ` **(- ${minionFuelFile?.minionFuel?.speed || 0}%)**`;

					description += `\nCapacity: **${amount}/${maxStorage}**`;
					if (amount === maxStorage) description += ` **FULL**`;

					if (minionUpgrade1File) description += `\nUpgrade 1: ${minionUpgrade1File.displayEmojiName()} \`${minionUpgrade1File.name}\``;
					if (minionUpgrade2File) description += `\nUpgrade 2: ${minionUpgrade2File.displayEmojiName()} \`${minionUpgrade2File.name}\``;
					if (minionFuelFile) description += `\nFuel: ${minionFuelFile.displayEmojiName()} \`${minionFuelFile.name}\``;
					if (minionAutomatedShippingFile) description += `\nAutomated Shipping: ${minionAutomatedShippingFile.displayEmojiName()} \`${minionAutomatedShippingFile.name}\``;

					description += `\nMinion Number: ${index + 1}`;

					return description;
				}),
			5
		).map(minionData => new EmbedBuilder()
			.setAuthor({ name: `${user.username} - Minions`, iconURL: user.displayAvatarURL() })
			.setDescription(minionData.join('\n\n'))
		);
	}
}

/**
 * Turns MinionData into a MinionDataObject
 * @param {import('discord.js').PlacedMinionsArrayData} minionData 
 * @returns {MinionDataObject}
 */
function minionDataToObject(minionData) {
	return {
		keyName: minionData[0],
		tier: minionData[1],
		upgrade1: minionData[2],
		upgrade2: minionData[3],
		fuel: minionData[4],
		fuelPlacedTimestamp: minionData[5],
		automatedShipping: minionData[6],
		lastCollectedTimestamp: minionData[7],
	};
}

/**
 * Turns a MinionDataObject into MinionData
 * @param {MinionDataObject} object 
 * @returns {import('discord.js').PlacedMinionsArrayData}
 */
function objectToMinionData(object) {
	return [
		object.keyName,
		object.tier,
		object.upgrade1,
		object.upgrade2,
		object.fuel,
		object.fuelPlacedTimestamp,
		object.automatedShipping,
		object.lastCollectedTimestamp,
	];
}

/**
 * @typedef MinionOutputData
 * @property {string} name
 * @property {string} id
 * @property {number} amount
 */

/**
 * @typedef MinionDataObject
 * @property {string} keyName
 * @property {string} tier
 * @property {string} upgrade1
 * @property {string} upgrade2
 * @property {string} fuel
 * @property {number} fuelPlacedTimestamp
 * @property {string} automatedShipping
 * @property {number} lastCollectedTimestamp
 */

module.exports = MinionsBETA;