
/* eslint-disable class-methods-use-this */
const { ButtonBuilder } = require('discord.js');
const SkyblockHelperError = require('../errors/SkyblockHelperError');

class AdventureOutcomeGroup {
	constructor() {
		this.outcomes = [];

		this.button = null;
	}

	/**
	 * @private
	 */
	normalizeOutcomes() {
		const res = this.outcomes.flat(Infinity);
		this.outcomes = res;
	}

	setOutcomes(...outcomes) {
		this.outcomes = outcomes;
		this.normalizeOutcomes();

		return this;
	}

	addOutcomes(...outcomes) {
		this.outcomes.push(outcomes);
		this.normalizeOutcomes();

		return this;
	}

	addOutcome(outcome) {
		this.outcomes.push(outcome);
		this.normalizeOutcomes();

		return this;
	}

	/**
	 * @param {ButtonBuilder} button
	 */
	setButton(button) {
		if (!(button instanceof ButtonBuilder)) throw new SkyblockHelperError('The button of an AdventureOutcomeGroup must be an instance of ButtonBuilder!');

		this.button = button;

		return this;
	}
}

module.exports = AdventureOutcomeGroup;