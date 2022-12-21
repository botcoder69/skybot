
const SkyblockHelperError = require("../errors/SkyblockHelperError");

class AdventureOutcome {
	constructor() {
		this.weight = null;

		this.message = null;

		this.image = null;

		this.itemTakenMessage = null;

		this.type = null;

		this.reward = null;
	}

	/**
	 * Set the message for this Outcomes. This will be used as the embed's description.
	 * @param {string} message
	 */
	setMessage(message) {
		this.message = message;

		return this;
	}
	
	setImage(image) {
		this.image = image;

		return this;
	}

	/**
	 * Sets the weight of this outcome. The sum of all weights must be equal to 100.
	 * @param {number} weight 
	 */
	setWeight(weight) {
		this.weight = weight;

		return this;
	}

	/**
	 * 
	 * @param {'DEATH' | 'FATAL_DEATH' | 'ITEM_LOSS' | 'NOTHING' | 'REWARD'} type 
	 */
	setType(type) {
		this.type = type;

		return this;
	}

	setReward(reward) {
		if (this.type !== 'REWARD') throw new SkyblockHelperError('To use AdventureOutcome#setReward(), you need to use the SkyblockTypes.AdventureOutcomeTypes.Reward type in order for it to work.');

		this.reward = reward;

		return this;
	}

	setItemTakenMessage(message) {
		if (this.type !== 'ITEM_LOSS') throw new SkyblockHelperError('To use AdventureOutcome#setItemTakenMessage(), you need to use the SkyblockTypes.AdventureOutcomeTypes.ItemLoss type in order for it to work.');

		this.itemTakenMessage = message;

		return this;
	}
}

module.exports = AdventureOutcome;