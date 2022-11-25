/* eslint-disable no-console */

/* eslint-disable class-methods-use-this, no-unused-vars */
const { ChatInputCommandInteraction, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const SkyblockHelperError = require('../errors/SkyblockHelperError');
const AdventureOutcome = require('./AdventureOutcome');
const AdventureOutcomeGroup = require('./AdventureOutcomeGroup');
const Functions = require('../utils/Functions');

class AdventureEventChangeOperator extends Error {
	constructor(message = ``) {
		super(message);

		this.name = this.constructor.name;
	}
}

class AdventureEvent {
	constructor() {
		this.db = null;
		
		this.interaction = null;

		this.content = null;

		/**
		 * All the outcomeGroups for this AdventureEvent
		 * @type {AdventureOutcomeGroup[]} outcomeGroups  
		 */
		this.outcomeGroups = [];

		this.type = 'NORMAL';

		this.debug = false;

		this.rngValue = 1;

		this.indexTrigger = null;

		this.eventIndexTriggerOnly = false;

		this.image = null;
	}

	/** 
	 * @private 
	 */
	validateOutcomes() {
		for (const outcomeGroup of this.outcomeGroups) {
			let total = 0;

			for (const outcome of outcomeGroup.outcomes) {
				total += parseInt(outcome.weight) || 0;
			}

			if (total !== 100) throw new SkyblockHelperError(`The sum of all outcomes in an AdventureOutcomeGroup must be equal to 100! Recieved ${total} for ${outcomeGroup.button.customId}`);
		}
	}

	/** 
	 * @private 
	 */
	normalizeOutcomes() {
		const res = this.outcomeGroups.flat(Infinity);
		this.outcomeGroups = res;
	}

	/** 
	 * @private 
	 */
	createAdventureProgressBar(interactions, middle='🟥') {
		if (interactions <= 4) {
			return `${middle} - ⦾ - ⦾ - ⦾ - ⦾`;
		} else if (interactions <= 9) {
			return `⦾ - ${middle} - ⦾ - ⦾ - ⦾`;
		} else if (interactions <= 14) {
			return `⦾ - ⦾ - ${middle} - ⦾ - ⦾`;
		} else {
			return `⦾ - ⦾ - ⦾ - ${middle} - ⦾`;
		}
	}


	/**
	 * Performs an Adventure Item Loss.
	 * @param {(import 'discord.js').RawUserObj} maidObj 
	 * @param {Message} sent 
	 * @param {AdventureOutcome<'ITEM_LOSS'>} outcome
	 * @private 
	 */
	async performAdventureItemLoss(maidObj, sent, outcome) {
		const [itemToTake] = Functions.randomizeArray(maidObj.adventure.items, 1);
		const events = [
			`\` - \` You lost your ${itemToTake.emoji} **${itemToTake.name}**`
		];

		if (!itemToTake) {
			const outcomeEmbed = new EmbedBuilder()
				.setColor(`Random`)
				.setDescription(`${outcome.message}\n\n\` - \` Nothing interesting happened`)
				.setFooter({ text: `Inspired by Dank Memer.` });

			Functions.removeArrayElement(maidObj.adventure.items, itemToTake);

			await sent.reply({ embeds: [outcomeEmbed] });
		} else {
			const outcomeEmbed = new EmbedBuilder()
				.setColor(`Random`)
				.setDescription(`${outcome.itemTakenMessage.replace(`\${itemToTake.name}`, itemToTake.name)}\n\n${events.join('\n')}`)
				.setFooter({ text: `Inspired by Dank Memer.` });

			Functions.removeArrayElement(maidObj.adventure.items, itemToTake);

			await sent.reply({ embeds: [outcomeEmbed] });
		}
	}

	/**
	 * Performs Adventure Death. This simply just ends the adventure. This is different from `AdventureEventCreator#performAdventureFatalDeath()` because this method just ends the adventure, while `AdventureEventCreator#peformAdventureFatalDeath()` ends the adventure and takes all of your items and rewards.
	 * @param {(import 'discord.js').RawUserObj} maidObj 
	 * @param {Message} sent 
	 * @param {AdventureOutcome<'DEATH'>} outcome
	 * @private 
	 */
	async performAdventureDeath(maidObj, sent, outcome) {
		const { db, interaction } = this;
		const events = [
			`\` - \` Your adventure has ended`
		];

		const outcomeEmbed = new EmbedBuilder()
			.setColor(`Random`)
			.setDescription(`${outcome.message}\n\n${events.join('\n')}`)
			.setImage(outcome.image)
			.setFooter({ text: `Inspired by Dank Memer.` });

		await sent.reply({ embeds: [outcomeEmbed] });

		const foundItems = maidObj.adventure.rewards
			.filter(item => item.keyName !== `coins`)
			.map(item => {
				const data = [];
				for (let i = 0; i < item.amount; i += 1) data.push(item.emoji);
				
				return data;
			})
			.flat(Infinity)
			.join('') || `-`;

		const foundCoins = maidObj.adventure.coins > 0
			? `<:Coins:885677584749318154> ${Functions.commafy(maidObj.adventure.coins)}`
			: `-`;

		const adventureSummaryEmbed = new EmbedBuilder()
			.setTitle(`Adventure Summary`)
			.addFields(
				{ name: `Name`, value: maidObj.adventure.name, inline: true },
				{ name: `Description`, value: maidObj.adventure.description, inline: true },
				{ name: `Backpack`, value: maidObj.adventure.items.length > 0 ? maidObj.adventure.items.map(item => item.emoji).join('') : `-`, inline: true },
				{ name: `Items Found`, value: foundItems, inline: true },
				{ name: `Coins Found`, value: foundCoins, inline: true },
				{ name: `Interactions`, value: `${maidObj.adventure.interactions}`, inline: true }
			);						
		
		await sent.reply({ embeds: [adventureSummaryEmbed] });

		for (const item of maidObj.adventure.items) {
			maidObj[item.keyName] += item.amount;
		}

		for (const item of maidObj.adventure.rewards) {
			maidObj[item.keyName] += item.amount;
		}

		maidObj.adventure = {};

		await db.set(interaction.user.id, maidObj);
	}

	/**
	 * Performs **Fatal** Adventure Death. This ends the adventure, and takes all the users items. This is different from `AdventureEventCreator#performAdventureDeath()` because this method ends the adventure and takes all the user's items and rewards away, while `AdventureEventCreator#peformAdventureDeath()` only ends the adventure.
	 * @param {(import 'discord.js').RawUserObj} maidObj 
	 * @param {Message} sent 
	 * @param {AdventureOutcome<'FATAL_DEATH'>} outcome
	 * @private 
	 */
	async performAdventureFatalDeath(maidObj, sent, outcome) {
		const { db, interaction } = this;
		const events = [
			`\` - \` You lost all items in your backpack, all your rewards, and your adventure has ended`
		];

		const outcomeEmbed = new EmbedBuilder()
			.setColor(`Random`)
			.setDescription(`${outcome.message}\n\n${events.join('\n')}`)
			.setImage(outcome.image)
			.setFooter({ text: `Inspired by Dank Memer.` });

		await sent.reply({ embeds: [outcomeEmbed] });

		const adventureSummaryEmbed = new EmbedBuilder()
			.setTitle(`Adventure Summary`)
			.addFields(
				{ name: `Name`, value: maidObj.adventure.name, inline: true },
				{ name: `Description`, value: maidObj.adventure.description, inline: true },
				{ name: `Backpack`, value: maidObj.adventure.items.length > 0 ? maidObj.adventure.items.map(item => item.emoji).join('') : `-`, inline: true },
				{ name: `Items Found`, value: ' - ', inline: true },
				{ name: `Coins Found`, value: ' - ', inline: true },
				{ name: `Interactions`, value: `${maidObj.adventure.interactions}`, inline: true }
			);						
		
		await interaction.followUp({ embeds: [adventureSummaryEmbed] });

		// eslint-disable-next-line require-atomic-updates
		maidObj.adventure = {};

		await db.set(interaction.user.id, maidObj);
	}

	/**
	 * Performs an Adventure Reward.
	 * @param {(import 'discord.js').RawUserObj} maidObj 
	 * @param {Message} sent 
	 * @param {AdventureOutcome<'REWARD'>} outcome
	 * @param {{ luckyItems: { luck: number; name: string; emoji: string; }[]; totalLuck: number; }} luckObj
	 * @private 
	 */
	async performAdventureReward(maidObj, sent, outcome, luckObj) {
		const { db, interaction } = this;
		const { reward } = outcome;
		const events = [];

		if (reward.keyName === 'coins') {
			events.push(`\` - \` + ${reward.emoji} ${Functions.commafy(reward.amount)}`);
		} else {
			events.push(`\` - \` +${reward.amount} ${reward.emoji} **${reward.name}**`);
		}

		for (const luckyItem of luckObj.luckyItems) events.push(`\` - \` ${luckyItem.emoji} **${luckyItem.name}** gave you ${luckyItem.luck}% luck during this interaction`);

		const outcomeEmbed = new EmbedBuilder()
			.setColor(`Random`)
			.setDescription(`${outcome.message.replace(`\${reward.name}`, reward.name).replace(`\${reward.emoji}`, reward.emoji)}\n\n${events.join('\n')}`)
			.setImage(outcome.image)
			.setFooter({ text: `All rewards are given at the end of the adventure. | Inspired by Dank Memer.` });

		if (maidObj.adventure.rewards.find(item => item.keyName === reward.keyName)) {
			const item = maidObj.adventure.rewards.find(item => item.keyName === reward.keyName);

			item.amount += 1;
		} else {
			maidObj.adventure.rewards.push(
				{
					name: reward.name,
					keyName: reward.keyName,
					emoji: reward.emoji,
					amount: 1
				}
			);
		}

		await sent.reply({ embeds: [outcomeEmbed] });

		await db.set(interaction.user.id, maidObj);
	}

	/**
	 * Performs the 'Nothing Interesting Happened' event.
	 * @param {(import 'discord.js').RawUserObj} maidObj 
	 * @param {Message} sent 
	 * @param {AdventureOutcome<'NOTHING'>} outcome
	 * @param {{ luckyItems: { luck: number; name: string; emoji: string; }[]; totalLuck: number; }} luckObj
	 * @private 
	 */
	async performAdventureNothing(maidObj, sent, outcome) {		
		const { db, interaction } = this;

		const outcomeEmbed = new EmbedBuilder()
			.setColor(`Random`)
			.setDescription(`${outcome.message}\n\n\` - \` Nothing interesting happened`)
			.setImage(outcome.image)
			.setFooter({ text: `${this.createAdventureProgressBar(maidObj.adventure.interactions, `🚶‍♂️`)} | Inspired by Dank Memer.` });

		await sent.reply({ embeds: [outcomeEmbed] });

		await db.set(interaction.user.id, maidObj);
	}

	/**
	 * @param {(import 'discord.js').BaseItemData[]} items 
	 * @private
	 */
	addAdventureLuck(items) {
		const itemDatas = {
			fourLeafClover: {
				weakLuck: 3,
				goodLuck: 6
			},
			stopwatch: {
				weakLuck: 3,
				goodLuck: 6
			},
			piggyBank: {
				weakLuck: 6,
				goodLuck: 9
			},
			crackedPiggyBank: {
				weakLuck: 3,
				goodLuck: 6
			},
			brokenPiggyBank: {
				weakLuck: 3,
				goodLuck: 6
			},
			spiritButterfly: {
				weakLuck: 10,
				goodLuck: 20
			},
			diamond: {
				weakLuck: 3,
				goodLuck: 6
			},
			enchantedCoal: {
				weakLuck: 6,
				goodLuck: 9
			},
			legendaryFish: {
				weakLuck: 6,
				goodLuck: 9
			}
		};

		const luckArray = [];

		for (const item of items) {
			const luckFactor = itemDatas[item.keyName];

			if (Functions.getRandomNumber(1, 100) <= 10) {
				luckArray.push(
					{
						luck: Functions.getRandomNumber(1, 100) > 75 ? luckFactor.weakLuck : luckFactor.goodLuck,
						name: item.name,
						emoji: item.emoji,
					}
				);
			}
		}

		let totalLuck = 0;
		for (const item of luckArray) {
			if (!isNaN(item.luck)) {
				totalLuck += item.luck;
			}
		}

		return {
			luckyItems: luckArray,
			totalLuck: totalLuck
		};
	}

	setDatabaseInstance(database) {
		this.db = database;

		return this;
	}

	/**
	 * Set the ChatInputCommandInteraction instance for this `AdventureEvent`
	 * @param {ChatInputCommandInteraction} interaction 
	 * @returns 
	 */
	setInteractionInstance(interaction) {
		if (!(interaction instanceof ChatInputCommandInteraction)) throw new SkyblockHelperError(`Expected instanceof ChatInputCommandInteraction for variable "interaction"!`, `INTERACTION_VARIABLE_VALUE`);
		this.interaction = interaction;

		return this;
	}

	setContent(content) {
		this.content = content;

		return this;
	}

	setImage(image) {
		this.image = image;

		return this;
	}

	setType(type) {
		this.type = type;

		return this;
	}

	/**
	 * Sets the outcomeGroups for this AdventureEvent
	 * @param  {AdventureOutcome[] | AdventureOutcome[][]} outcomeGroups 
	 * @returns 
	 */
	setOutcomeGroups(...outcomeGroups) {
		this.outcomeGroups = outcomeGroups;
		this.normalizeOutcomes();

		return this;
	}

	/**
	 * Sets "debug" mode to true. This will console.log() important stuff thats happening.
	 * @param {boolean} debugMode 
	 */
	setDebugMode(debugMode, globalSet) {
		if (!globalSet) {
			try {
				throw new AdventureEventChangeOperator(`AdventureEvent#setDebugMode was set to ${debugMode}`);
			} catch (error) {
				console.error(error);
			}
		}

		this.debug = debugMode;

		return this;
	}

	/**
	 * Adds outcomeGroups to this AdventureEvent
	 * @param  {AdventureOutcome[] | AdventureOutcome[][]} outcomeGroups 
	 * @returns 
	 */
	addOutcomeGroups(...outcomeGroups) {
		this.outcomeGroups.push(outcomeGroups);
		this.normalizeOutcomes();

		return this;
	}

	/**
	 * Add an outcome to this AdventureEvent
	 * @param  {AdventureOutcome} outcomeGroups 
	 * @returns 
	 */
	addOutcomeGroup(outcome) {
		this.outcomeGroups.push(outcome);
		this.normalizeOutcomes();

		return this;
	}

	setEventWeight(weight) {
		if (!weight) throw new SkyblockHelperError('Expected type number greater than 0 for variable "weight"', `WEIGHT_VARIABLE_VALUE`);

		this.rngValue = weight;

		return this;
	}

	setIndexTrigger(index) {
		if (typeof index !== `number` || isNaN(index)) throw new SkyblockHelperError('Expected type number for variable "index"', `INDEX_VARIABLE_VALUE`);

		if (index < 0 || index > 19) throw new SkyblockHelperError('Expected type number in the range 0-18 for variable "index"', `INDEX_VARIABLE_RANGE`);

		this.indexTrigger = index;

		return this;
	}

	setIndexTriggerOnly(trigger) {
		if (typeof trigger !== `boolean`) throw new SkyblockHelperError('Expected type boolean for variable "index"', `TRIGGER_VARIABLE_VALUE`);

		console.log(`(${0 > this.indexTrigger} || ${19 < this.indexTrigger}) && ${!this.indexTrigger} => ${(0 > this.indexTrigger || 19 < this.indexTrigger) && !this.indexTrigger}`);

		if ((0 > this.indexTrigger || 19 < this.indexTrigger) && !this.indexTrigger) throw new SkyblockHelperError('You need to set an index trigger using the AdventureEvent#setIndexTrigger method before using this method.', `REQUIRED_METHOD_DATA`);

		this.eventIndexTriggerOnly = trigger;

		return this;
	}

	/**
	 * This function is VERY important. Your adventure event **CANNOT** run without this function being executed. This function allows you to parse all the outcomeGroups into one adventure event without writing a gigaheap of code.
	 * @returns {Promise<void>}
	 */
	async runAdventureEvent() {
		if (this.debug) console.log(`Mode 'DEBUG' has been set to TRUE.`);

		const { image, content, db, interaction, type, outcomeGroups } = this;
		const maid = interaction.user.id;
		const maidObj = await db.get(maid);

		let { interactions, expInteractions } = maidObj.adventure;

		if (type === 'NOTHING') {
			const eventEmbed = new EmbedBuilder()
				.setColor(`Random`)
				.setDescription(`${content}\n\n\` - \` Nothing interesting happened`)
				.setFooter({ text: `${this.createAdventureProgressBar(maidObj.adventure.interactions, `🚶‍♂️`)} | Inspired by Dank Memer.` });

			const choiceRow = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('hubAdv_EndInteraction')
						.setLabel(`End Interaction`)
						.setStyle(ButtonStyle.Secondary)
				);

			const disabledChoiceRow = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('hubAdv_EndInteraction')
						.setLabel(`End Interaction`)
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true)
				);

			/** @type {Message<boolean>} */
			const sent = interaction?.replied
				? await interaction.editReply({ embeds: [eventEmbed], components: [choiceRow] })
				: await interaction.reply({ embeds: [eventEmbed], components: [choiceRow], fetchReply: true });


			try {
				await sent.awaitMessageComponent(
					{
						filter: i => {
							i.deferUpdate();
							return i.user.id === interaction.user.id;
						},
						time: 10_000
					}
				);

				eventEmbed.setImage(image);

				await sent.edit({ embeds: [eventEmbed], components: [disabledChoiceRow] });
		
				interactions += 1;
			} catch (error) {
				await sent.edit({ components: [disabledChoiceRow] });

				expInteractions += 1;
			}
		} else {			
			this.validateOutcomes();

			const choiceEmbed = new EmbedBuilder()
				.setColor(`Random`)
				.setDescription(content)
				.setImage(image)
				.setFooter({ text: `${this.createAdventureProgressBar(maidObj.adventure.interactions, `🚶‍♂️`)} | Inspired by Dank Memer.` });

			const buttons = outcomeGroups
				.map(outcome => outcome.button);

			const choiceRow = new ActionRowBuilder()
				.addComponents(buttons);



			/** @type {Message<boolean>} */
			const sent = interaction.replied
				? await interaction.editReply({ embeds: [choiceEmbed], components: [choiceRow] })
				: await interaction.reply({ embeds: [choiceEmbed], components: [choiceRow], fetchReply: true });



			const disabledButtons = outcomeGroups
				.map(outcome => outcome.button.setDisabled(true));

			const disabledChoiceRow = new ActionRowBuilder()
				.addComponents(disabledButtons);

			try {
				const button = await sent.awaitMessageComponent(
					{
						filter: i => {
							i.deferUpdate();
							return i.user.id === interaction.user.id;
						},
						time: 10_000
					}
				);
	
				await sent.edit({ components: [disabledChoiceRow] });

				const outcomeGroup = this.outcomeGroups.find(group => group.button.data.custom_id === button.customId);

				const outcomeRng = Functions.getRandomNumber(1, 100);
				const luckObj = this.addAdventureLuck(maidObj.adventure.items);

				const goodOutcomes = outcomeGroup.outcomes.filter(outcome => outcome.type === 'REWARD').length ?? 0;
				const goodLuckEach = Math.ceil(luckObj.totalLuck / goodOutcomes);

				const badOutcomes = outcomeGroup.outcomes.filter(outcome => outcome.type !== 'REWARD' && outcome.type !== 'NOTHING').length ?? 0;
				const badLuckEach = Math.ceil(luckObj.totalLuck / badOutcomes);

				if (this.debug) console.log(`goodLuckEach: ${goodLuckEach}\nbadLuckEach: ${badLuckEach}\noutcomeRng: ${outcomeRng}`);

				let accumulatedRng = 0;
				const parsedOutcomes = outcomeGroup.outcomes
					.map(outcome => {
						if (outcome.type === 'REWARD') {
							const res = {
								rng: (outcome.weight + goodLuckEach) + accumulatedRng,
								outcome: outcome
							};

							accumulatedRng += (outcome.weight + goodLuckEach);

							return res;
						} else if (outcome.type === 'NOTHING') {
							const res = {
								rng: outcome.weight + accumulatedRng,
								outcome: outcome
							};
							
							accumulatedRng += outcome.weight;

							return res;
						} else {
							const res = {
								rng: (outcome.weight - badLuckEach) + accumulatedRng,
								outcome: outcome
							};
							
							accumulatedRng += (outcome.weight - badLuckEach);

							return res;
						}
					});

				if (this.debug) console.log(parsedOutcomes);

				const outputOutcome = parsedOutcomes.find(parsedOutcome => {
					if (this.debug) console.log(`${outcomeRng} <= ${parsedOutcome.rng}`);

					return outcomeRng <= parsedOutcome.rng;
				});

				if (this.debug) console.log(outputOutcome);

				const outcomeType = outputOutcome.outcome.type;

				if (outcomeType === 'DEATH') {
					if (this.debug) console.log(`Performing AdventureEvent#performAdventureDeath() on AdventureOutcome<'${outputOutcome.outcome.type}'>`);

					await this.performAdventureDeath(maidObj, sent, outputOutcome.outcome);

					if (this.debug) console.log(`Finished performing AdventureEvent#performAdventureDeath() on AdventureOutcome<'${outputOutcome.outcome.type}'>`);
				} else if (outcomeType === 'FATAL_DEATH') {
					if (this.debug) console.log(`Performing AdventureEvent#performAdventureFatalDeath() on AdventureOutcome<'${outputOutcome.outcome.type}'>`);
					
					await this.performAdventureFatalDeath(maidObj, sent, outputOutcome.outcome);

					if (this.debug) console.log(`Finished performing AdventureEvent#performAdventureFatalDeath() on AdventureOutcome<'${outputOutcome.outcome.type}'>`);
				} else if (outcomeType === 'ITEM_LOSS') {
					if (this.debug) console.log(`Performing AdventureEvent#performAdventureItemLoss() on AdventureOutcome<'${outputOutcome.outcome.type}'>`);

					await this.performAdventureItemLoss(maidObj, sent, outputOutcome.outcome);

					if (this.debug) console.log(`Finished performing AdventureEvent#performAdventureItemLoss() on AdventureOutcome<'${outputOutcome.outcome.type}'>`);
				} else if (outcomeType === 'NOTHING') {
					if (this.debug) console.log(`Performing AdventureEvent#performAdventureNothing() on AdventureOutcome<'${outputOutcome.outcome.type}'>`);

					await this.performAdventureNothing(maidObj, sent, outputOutcome.outcome);
					
					if (this.debug) console.log(`Finished performing AdventureEvent#performAdventureNothing() on AdventureOutcome<'${outputOutcome.outcome.type}'>`);
				} else {
					if (this.debug) console.log(`Performing AdventureEvent#performAdventureReward() on AdventureOutcome<'${outputOutcome.outcome.type}'>`);

					await this.performAdventureReward(maidObj, sent, outputOutcome.outcome, luckObj);

					if (this.debug) console.log(`Finished performing AdventureEvent#performAdventureReward() on AdventureOutcome<'${outputOutcome.outcome.type}'>`);
				}
				
				interactions += 1;
			} catch (error) {
				console.error(error);

				await sent.edit({ components: [disabledChoiceRow] });

				expInteractions += 1;
			}
		}

		if (this.debug) console.log(`interactions: ${interactions}`);
		if (this.debug) console.log(`expInteractions: ${expInteractions}`);

		if (this.debug) console.log(`BEFORE maidObj.adventure.interactions: ${maidObj.adventure.interactions}`);
		if (this.debug) console.log(`BEFORE maidObj.adventure.expInteractions: ${maidObj.adventure.expInteractions}`);

		maidObj.adventure.interactions = interactions;
		maidObj.adventure.expInteractions = expInteractions;

		if (this.debug) console.log(`AFTER maidObj.adventure.interactions: ${maidObj.adventure.interactions}`);
		if (this.debug) console.log(`AFTER maidObj.adventure.expInteractions: ${maidObj.adventure.expInteractions}`);



		if (this.debug) console.log('Saving database changes...');
		
		await db.set(maid, maidObj);
		
		if (this.debug) console.log('Successfully saved database changes...');
	}
}

module.exports = AdventureEvent;