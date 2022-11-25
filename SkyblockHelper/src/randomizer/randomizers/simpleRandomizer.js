const SkyblockHelperError = require("../../errors/SkyblockHelperError.js");


/**
 * Outputs a random item and its number based on the itemArray value
 * @param {String[]} itemArray A stringed array with the template of displayName:skyblockID:minCollectable:maxCollectable:chance
 * @returns {(String | Number)[]}
 */
module.exports = function simpleRandomizer(itemArray) {
	const throwError = {
		below2: () => {
			throw new SkyblockHelperError(`A simple randomizer's "itemArray" should have a length of at least 2!`);
		},
		missing: {
			/**
			 * @param {Number} arrayNumber 
			 */
			incomplete: (arrayNumber) => {
				throw new SkyblockHelperError(`The item in itemArray[${arrayNumber}] is incomplete!`);
			},
			/**
			 * @param {Number} arrayNumber 
			 */
			displayName: (arrayNumber) => {
				throw new SkyblockHelperError(`The "displayName" of an item in itemArray[${arrayNumber}] is missing!`);
			},
			/**
			 * @param {Number} arrayNumber 
			 */
			skyblockID: (arrayNumber) => {
				throw new SkyblockHelperError(`The "skyblockID" of an item in itemArray[${arrayNumber}] is missing!`);
			},
			/**
			 * @param {Number} arrayNumber 
			 */
			minCollectable: (arrayNumber) => {
				throw new SkyblockHelperError(`The "minCollectable" of an item in itemArray[${arrayNumber}] is missing!`);
			},
			/**
			 * @param {Number} arrayNumber 
			 */
			maxCollectable: (arrayNumber) => {
				throw new SkyblockHelperError(`The "maxCollectible" of an item in itemArray[${arrayNumber}] is missing!`);
			},
			/**
			 * @param {Number} arrayNumber 
			 */
			chance: (arrayNumber) => {
				throw new SkyblockHelperError(`The "chance" of an item in itemArray[${arrayNumber}] is missing!`);
			}
		},
		unparsable: {
			/**
			 * @param {Number} arrayNumber 
			 */
			minCollectable: (arrayNumber) => {
				throw new SkyblockHelperError(`The "minCollectable" of an item in itemArray[${arrayNumber}] is not a parsable number. Take note that we can only parse stringed whole numbers!`);
			},
			/**
			 * @param {Number} arrayNumber 
			 */
			maxCollectable: (arrayNumber) => {
				throw new SkyblockHelperError(`The "maxCollectible" of an item in itemArray[${arrayNumber}] is not a parsable number. Take note that we can only parse stringed whole numbers!`);
			},
			/**
			 * @param {Number} arrayNumber 
			 */
			chance: (arrayNumber) => {
				throw new SkyblockHelperError(`The "chance" of an item in itemArray[${arrayNumber}] is not a parsable number. Take note that we can only parse stringed whole numbers!`);
			}
		}
	};
	
	if (!itemArray) throwError.below2();

	if (itemArray.length === 1) throwError.below2();

	let totalChance = 0,
		arrayIteration = 1;
	const itemsArray = [];
	for (const item of itemArray) {
		const array = item.split(":");

		arrayIteration += 1;

		if (array.length !== 5) throwError.missing.incomplete(arrayIteration);
		const [displayName, skyblockID, minCollectable, maxCollectable, chance] = array;

		if (displayName.length === 0) {
			throwError.missing.displayName(arrayIteration); 
		} else if (skyblockID.length === 0) {
			throwError.missing.skyblockID(arrayIteration);
		} else if (minCollectable.length === 0) {
			throwError.missing.minCollectable(arrayIteration);
		} else if (maxCollectable.length === 0) {
			throwError.missing.maxCollectable(arrayIteration);
		} else if (chance.length === 0) {
			throwError.missing.chance(arrayIteration);
		}

		if (isNaN(minCollectable) || minCollectable === Infinity) throwError.unparsable.minCollectable(arrayIteration);

		if (isNaN(maxCollectable) || maxCollectable === Infinity) throwError.unparsable.maxCollectable(arrayIteration);

		if (isNaN(chance) || chance === Infinity) throwError.unparsable.chance(arrayIteration);
		
		const itemChance = parseInt(chance),
			minimumCollectable = parseInt(minCollectable),
			maximumCollectable = parseInt(maxCollectable);
		
		totalChance += itemChance;

		itemsArray.push([displayName, skyblockID, minimumCollectable, maximumCollectable, itemChance]);
	}

	let foundState = false, 
		totalNumber = 0;
	const rng = Math.floor(Math.random() * totalChance) + 1;
	for (let loop = 0; loop < itemsArray.length; loop++) {
		const [displayName, skyblockID, minCollectable, maxCollectable, chance] = itemsArray[loop];

	
		if (rng < (chance + totalNumber)) {
			const collectableRNG = Math.floor(Math.random() * maxCollectable) + minCollectable,
				message = displayName,
				keyID = skyblockID;

			foundState = true;
			return [message, keyID, collectableRNG];
		} else {
			totalNumber += chance;
		}
	}
};