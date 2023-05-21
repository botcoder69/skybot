
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const AdventureOutcome = require('./AdventureOutcome');
const Functions = require('../utils/Functions');
const SkyblockHelperError = require('../errors/SkyblockHelperError');
const SkybotAdventure = require('./SkybotAdventure');

class SkybotAdventureHandler {
	constructor() {
		/** @type {any} */
		this.db = null;

		/** @type {ChatInputCommandInteraction} */
		this.interaction = null;

		/** @type {import ('./SkybotAdventure')} */
		this.skybotAdventure = null;

		this.onComplete = () => {};
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

	setSkybotAdventure(adventure) {
		if (!(adventure instanceof SkybotAdventure)) throw new SkyblockHelperError(`Expected instanceof SkybotAdventure for variable "adventure"!`, `ADVENTURE_VARIABLE_VALUE`);
		this.skybotAdventure = adventure;

		return this;
	}

	setOnCompleteFunction(onComplete) {
		if (typeof onComplete !== 'function') throw new SkyblockHelperError(`Expected type "function" for variable "onComplete"!`, `FUNCTION_VARIABLE_VALUE`);
		this.onComplete = onComplete;

		return this;
	}

	async runSkybotAdventureHandler() {
		const { db, interaction, skybotAdventure } = this;
		const maid = interaction.user.id;
		const maidObj = await db.get(maid);

		if (maidObj.adventure.expInteractions > 8) {
			const outcome = new AdventureOutcome()
				.setType('FATAL_DEATH')
				.setMessage('You let too many interactions expire so you died lol');

			const events = [
				`\` - \` You lost all items in your backpack, all your rewards, and your adventure has ended`
			];

			const outcomeEmbed = new EmbedBuilder()
				.setColor(`Random`)
				.setDescription(`${outcome.message}\n\n${events.join('\n')}`)
				.setFooter({ text: `Inspired by Dank Memer.` });

			await interaction.reply({ embeds: [outcomeEmbed] });

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

			return;
		}

		if (maidObj.adventure.interactions < 19) {
			interaction.client.confirmations.set(maid, true);

			skybotAdventure
				.setDatabaseInstance(db)
				.setInteractionInstance(interaction);

			await skybotAdventure.runSkybotAdventure();

			const newMaidObj = await db.get(maid);
			newMaidObj.adventure.nextInteraction = Date.now() + 300_000;

			await db.set(maid, newMaidObj);

			interaction.client.confirmations.set(maid, false);
		} else {
			const endEmbed = new EmbedBuilder()
				.setDescription('You reached the end of your adventure! Congrats')
				.setFooter({ text: `Inspired by Dank Memer` });

			await interaction.reply({ embeds: [endEmbed] });

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

			await interaction.followUp({ embeds: [adventureSummaryEmbed] });

			for (const item of maidObj.adventure.items) {
				maidObj[item.keyName] += item.amount;
			}

			for (const item of maidObj.adventure.rewards) {
				maidObj[item.keyName] += item.amount;
			}

			this.onComplete(interaction, maidObj);

			maidObj.adventure = {};

			await db.set(maid, maidObj);
		}
	}
}

module.exports = SkybotAdventureHandler;