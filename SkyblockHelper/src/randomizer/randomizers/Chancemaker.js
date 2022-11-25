/* eslint-disable class-methods-use-this */

const SkyblockHelperError = require('../../errors/SkyblockHelperError');
const { getRandomNumber } = require('../../utils/Functions');

class Chancemaker {
	/**
	 * Making custom chances for items has never been easier!
	 * @param {ChancemakerData} data 
	 */
	constructor(data) {
		if (data?.rolls && data?.minRolls && data?.maxRolls) throw new SkyblockHelperError(`A Chancemaker can only have either a specified amount of rolls or a specified amount of minRolls and maxRolls!`, `CHANCEMAKER_ROLL_VALUE`);

		if (data?.entries && data?.entries.length < 2) throw new SkyblockHelperError(`A Chancemaker needs at least 2 entries to make a random value!`, `CHANCEMAKER_ENTRY_VALUE`);

		this.entries = data?.entries ?? [];

		this.rolls = data?.rolls ?? 0;

		this.minRolls = data?.minRolls ?? 0;

		this.maxRolls = data?.maxRolls ?? 0;

		this.noRepeatingRes = data?.noRepeatingRes ?? false;
	}

	/**
	 * @param  {...ChancemakerEntryData} entries 
	 */
	setEntries(...entries) {
		if (entries.length < 2) throw new SkyblockHelperError(`A Chancemaker needs at least 2 entries to make a random value!`, `CHANCEMAKER_ENTRY_VALUE`);

		for (const entry of entries) {
			if (!(`chance` in entry)) entry.chance = 1;
			if (!(`minAmount` in entry)) entry.minAmount = 1;
			if (!(`maxAmount` in entry)) entry.maxAmount = 1;
			
			if (entry.minAmount > entry.maxAmount) throw new SkyblockHelperError(`A Chancemaker Entry's minAmount should be lesser than the Chancemaker Entry's maxAmount!`, `CHANCEMAKER_ENTRY_AMOUNT`);

			this.entries.push(entry);
		}

		return this;
	}

	/**
	 * @param  {...ChancemakerEntryData} entries 
	 */
	addEntries(...entries) {
		if ((this.entries.length + entries.length) < 2) throw new SkyblockHelperError(`A Chancemaker needs at least 2 entries to make a random value!`, `CHANCEMAKER_ENTRY_VALUE`);

		for (const entry of entries) {
			if (!(`chance` in entry)) entry.chance = 1;
			if (!(`minAmount` in entry)) entry.minAmount = 1;
			if (!(`maxAmount` in entry)) entry.maxAmount = 1;

			if (entry.minAmount > entry.maxAmount) throw new SkyblockHelperError(`A Chancemaker Entry's minAmount should be lesser than the Chancemaker Entry's maxAmount!`, `CHANCEMAKER_ENTRY_AMOUNT`);

			this.entries.push(entry);
		}

		return this;
	}

	/**
	 * Sets the amount of rolls the `Chancemaker` will do.
	 * @param {number} amount 
	 */
	setRolls(amount) {
		if (this.minRolls || this.maxRolls) throw new SkyblockHelperError(`A Chancemaker can only have either a specified amount of rolls or a specified amount of minRolls and maxRolls!`, `CHANCEMAKER_ROLL_VALUE`);

		if (isNaN(amount) || amount < 0 || amount === Infinity) throw new SkyblockHelperError(`A Chancemaker needs a roll value greater than 0`, `CHANCEMAKER_ROLL_VALUE`);

		this.rolls = amount;

		return this;
	}
	
	/**
	 * Sets the maximum amount of rolls the `Chancemaker` will do.
	 * @param {number} amount 
	 */
	setMaxRolls(amount) {
		if (this.rolls) throw new SkyblockHelperError(`A Chancemaker can only have either a specified amount of rolls or a specified amount of minRolls and maxRolls!`, `CHANCEMAKER_ROLL_VALUE`);

		if (isNaN(amount) || amount < 0 || amount === Infinity) throw new SkyblockHelperError(`A Chancemaker needs a roll value greater than 0`, `CHANCEMAKER_ROLL_VALUE`);

		this.maxRolls = amount;

		return this;
	}

	/**
	 * Sets the minimum amount of rolls the `Chancemaker` will do.
	 * @param {number} amount 
	 */
	setMinRolls(amount) {
		if (this.rolls) throw new SkyblockHelperError(`A Chancemaker can only have either a specified amount of rolls or a specified amount of minRolls and maxRolls!`, `CHANCEMAKER_ROLL_VALUE`);

		if (isNaN(amount) || amount < 0 || amount === Infinity) throw new SkyblockHelperError(`A Chancemaker needs a roll value greater than 0`, `CHANCEMAKER_ROLL_VALUE`);

		this.minRolls = amount;

		return this;
	}

	/**
	 * Sets the `Chancemaker` to repeat, or not repeat results.
	 * @param {number} amount 
	 */
	setRepeatingResults(boolean) {
		if (typeof boolean !== 'boolean') throw new SkyblockHelperError(`A Chancemaker's "noRepeatingRes" property must have a proper boolean value.`);

		this.noRepeatingRes = !boolean;

		return this;
	}

	/**
	 * Parses all the Chancemaker's entries and rolls into a Chancemaker result. 
	 * @returns 
	 */
	makeChance() {
		const data = [];

		for (const entry of this.entries) {
			for (let i = 0; i < entry.chance; i++) {
				data.push(entry);
			}
		}

		const rolls = this.rolls || getRandomNumber(this.minRolls, this.maxRolls);
		const res = [];

		while (res.length <= rolls) {
			const randomizer = getRandomNumber(0, (data.length - 1));
			const dataToPush = data[randomizer];
			const amount = Math.floor(Math.random() * (dataToPush.maxAmount - (dataToPush.minAmount - 1))) + dataToPush.minAmount;

			const itemAlreadyIncluded = !res.find(res => res.item === dataToPush.item) ? false : true;

			// eslint-disable-next-line no-continue
			if (this.noRepeatingRes && itemAlreadyIncluded) continue;

			res.push({ item: dataToPush.item, amount: amount });
		}

		return res;
	}

	/**
	 * Parses all entries into a `Possible Items` result.
	 */
	getPossibleItems() {
		const res = [];
		
		for (const entry of this.entries) {
			res.push({
				item: entry.item,
				maxAmount: entry.maxAmount,
				minAmount: entry.minAmount
			});
		}

		return res;
	}

	/**
	 * Parses all entries and rolls into a `Chances for Items` result.
	 */
	getChance() {
		const res = [];
		let totalWeight = 0;
		
		for (const entry of this.entries) {
			totalWeight += (entry?.chance ?? 0);
		}

		for (const entry of this.entries) {
			res.push({
				item: entry.item,
				chance: (totalWeight / (entry?.chance ?? 0)) * 100,
				maxAmount: entry.maxAmount,
				minAmount: entry.minAmount
			});
		}
	
		return res;
	}
}

module.exports = Chancemaker;

/**
 * @typedef ChancemakerData
 * @property {ChancemakerEntryData[]} entries
 * @property {number} [rolls=0]
 * @property {number} [minRolls=0]
 * @property {number} [maxRolls=0]
 * @property {boolean} [noRepeatingRes=false]
 */

/**
 * @typedef ChancemakerEntryData
 * @property {any} item
 * @property {number} [minAmount=1]
 * @property {number} [maxAmount=1]
 * @property {number} [chance=1]
 */