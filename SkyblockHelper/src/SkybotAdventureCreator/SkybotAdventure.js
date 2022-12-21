/* eslint-disable no-console */

const { ChatInputCommandInteraction } = require("discord.js");
const SkyblockHelperError = require("../errors/SkyblockHelperError");
const Functions = require("../utils/Functions");

class SkybotAdventureDebugOperator extends Error {
	constructor(message = ``) {
		super(message);

		this.name = this.constructor.name;
	}
}

class SkybotAdventure {
	constructor() {
		/**
		 * @type {AdventureEvent<import("SkyblockHelper").AnyAdventureOutcome>[]}
		 */
		this.adventureEvents = [];

		this.db = null;

		/**
		 * @type {ChatInputCommandInteraction}
		 */
		this.interaction = null;

		this.debug = false;
	}

	/** 
	 * @private 
	 */
	normalizeOutcomes() {
		const res = this.adventureEvents.flat(Infinity);
		this.adventureEvents = res;
	}

	setDatabaseInstance(database) {
		this.db = database;

		return this;
	}

	/**
	 * Set the ChatInputCommandInteraction instance for this `SkybotAdventure`
	 * @param {ChatInputCommandInteraction} interaction 
	 * @returns 
	 */
	setInteractionInstance(interaction) {
		if (!(interaction instanceof ChatInputCommandInteraction)) throw new SkyblockHelperError(`Expected instanceof ChatInputCommandInteraction for variable "interaction"!`, `INTERACTION_VARIABLE_VALUE`);
		this.interaction = interaction;

		return this;
	}

	/**
	 * @param {AdventureEvent<import("SkyblockHelper").AnyAdventureOutcome>[] | AdventureEvent<import("SkyblockHelper").AnyAdventureOutcome[][]} adventureEvents 
	 */
	setAdventureEvents(...adventureEvents) {
		this.adventureEvents = adventureEvents;
		this.normalizeOutcomes();

		return this;
	}


	setGlobalDebugMode(debugMode, log) {
		if (log) {
			try {
				throw new SkybotAdventureDebugOperator(`SkybotAdventure#setGlobalDebugMode has been set to ${debugMode}`);
			} catch (error) {
				console.error(error);
			}
		}

		this.debug = debugMode;

		return this;
	}

	/**
	 * @param {AdventureEvent<import("SkyblockHelper").AnyAdventureOutcome>} adventureEvent 
	 */
	addAdventureEvent(adventureEvent) {
		this.adventureEvents.push(adventureEvent);
		this.normalizeOutcomes();

		return this;
	}

	/**
	 * @param {AdventureEvent<import("SkyblockHelper").AnyAdventureOutcome>[] | AdventureEvent<import("SkyblockHelper").AnyAdventureOutcome[][]} adventureEvents
	 */
	addAdventureEvents(...adventureEvents) {
		this.adventureEvents.push(adventureEvents);
		this.normalizeOutcomes();

		return this;
	}

	async runSkybotAdventure() {
		const { interaction, db } = this;
		const maidObj = await db.get(interaction.user.id);

		if (this.debug) console.log(this.adventureEvents);
		
		this.adventureEvents
			.map(adventureEvent => adventureEvent
				.setInteractionInstance(interaction)
				.setDatabaseInstance(db)
				.setDebugMode(this.debug, true)
			);

		if (!this.adventureEvents.length) throw new SkyblockHelperError(`You need at least one adventure event to create a SkybotAdventure!`, `INSUFFICIENT_ADVENTURE_EVENTS`);

		if (this.debug) console.log(`Indexes being listened for: ${this.adventureEvents.map(adventureEvent => adventureEvent.indexTrigger).filter(indexTrigger => !isNaN(indexTrigger))}\nCurrent Index: ${maidObj.adventure.interactions}`);
		if (this.adventureEvents.map(adventureEvent => adventureEvent.indexTrigger).filter(indexTrigger => !isNaN(indexTrigger)).includes(maidObj.adventure.interactions)) {
			if (this.debug) console.log(`An indexTrigger has been found matching ${maidObj.adventure.interactions}`);



			const adventureEvent = this.adventureEvents.find(adventureEvent => adventureEvent.indexTrigger === maidObj.adventure.interactions);

			if (this.debug) console.log(`indexTrigger-based AdventureEvent:`, adventureEvent);

			await adventureEvent.runAdventureEvent();
		} else {
			const totalRNG = this.adventureEvents
				// Remove the adventure events that are set to trigger at certain indexes only.
				.filter(adventureEvent => !adventureEvent.eventIndexTriggerOnly)
				.reduce((acc, adventureEvent) => adventureEvent.rngValue + acc, 0);
			const filteredEvents = this.adventureEvents
				// Remove the adventure events that are set to trigger at certain indexes only.
				.filter(adventureEvent => !adventureEvent.eventIndexTriggerOnly);
			const selectedRNG = Functions.getRandomNumber(1, totalRNG);

			if (this.debug) console.log(`Filtered out all adventure events that had AdventureEvent#eventIndexTriggerOnly set to true.`, filteredEvents);

			if (this.debug) console.log(`Total RNG has been parsed: ${totalRNG}`);
			if (this.debug) console.log(`Functions#getRandomNumber() has selected ${selectedRNG}`);

			let acc = 0;
			const adventureEvent = filteredEvents.find((adventureEvent, index) => {
				const minRange = acc;
				const maxRange = acc + adventureEvent.rngValue;

				if (this.debug) console.log(`Minimum range for filteredEvents[${index}] has been set to: ${minRange}`);
				if (this.debug) console.log(`Maximum range for filteredEvents[${index}] has been set to: ${maxRange}`);

				acc += adventureEvent.rngValue;

				if (this.debug) console.log(`Accumulator has been increased from ${minRange} to ${acc}`);

				if (this.debug) console.log(`Testing selected random number: ${selectedRNG} in ${minRange} <= ${selectedRNG} <= ${maxRange}`);
				if (this.debug) console.log(`Boolean for this event: ${minRange <= selectedRNG && selectedRNG <= maxRange}`);

				return minRange <= selectedRNG && selectedRNG <= maxRange;
			});

			await adventureEvent.runAdventureEvent();
		}
	}
}

module.exports = SkybotAdventure;