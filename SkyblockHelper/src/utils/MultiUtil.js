
class MultiUtil {
	/** 
	 * @param {MultiData} data 
	 */
	constructor(data) {
		this.number = data?.number ?? null;

		if (data?.multi < 1) {
			this.multi = data.multi;
		} else if (data?.multi >= 1) {
			this.multi = (data.multi / 100);
		}
	}

	/**
	 * @returns {MultiTotalData}
	 */
	getMultiTotal() {
		const addedAmount = Math.round(this.number * this.multi);
		const totalAmount = addedAmount + this.number;

		const returnObj = {
			total: totalAmount,
			added: addedAmount,
			multi: (this.multi * 100)
		};

		return returnObj;
	}

	/**
	 * @param {number} number 
	 */
	setNumber(number) {
		if (isNaN(number)) throw new Error('The variable "number" must be a valid number.');

		this.number = number;
		
		return this;
	}

	/**
	 * @param {number} multiplier
	 */
	setMultiplier(multiplier) {
		if (isNaN(multiplier)) throw new Error('The variable "multiplier" must be a valid number.');

		if (multiplier < 1) {
			this.multi = multiplier;
		} else if (multiplier > 1) {
			this.multi = (multiplier / 100);
		} else {
			throw new Error(`The variable "multiplier" must be a valid decimal.`);
		}

		return this;
	}
}

module.exports = MultiUtil;

/**
 * @typedef MultiData
 * @property {number} number
 * @property {number} multi
 */

/**
 * @typedef MultiTotalData 
 * @property {number} total
 * @property {number} added
 * @property {number} multi
 */