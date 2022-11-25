/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType } = require('discord.js');
const { Functions: { getRandomNumber, commafy } } = require('../../SkyblockHelper/src/index');

const tutorialEmbed = new EmbedBuilder()
	.setColor(`#2f3136`)
	.setTitle(`Highlow`)
	.setDescription(`This command is used to grind for coins!\nThe bot picks a real number and a hint number. You have to choose if the real number is higher or lower than your hint number. Choose jackpot if you think it's the SAME number!`)
	.setFooter({ text: `This game throws a heavy reference to Dank Memer's old highlow command. The tutorial is also stripped from Dank Memer, since its just the same concept.` });

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`highlow`)
		.setDescription(`Guess the place of the number I am thinking of`),
	group: `Currency`,
	cooldown: 20,
	cooldownMessage: `You can have more coins in **{secondsLeft}**`,
	tutorial: {
		embeds: [tutorialEmbed],
		key: `highlow`
	},
	require: {
		start: true,
		update: `>=v2.0.0`
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const hintNum = getRandomNumber(1, 100);
		const realNum = getRandomNumber(1, 100);

		const guessRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('low')
					.setLabel('Lower')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('jackpot')
					.setLabel('Jackpot')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('high')
					.setLabel('Higher')
					.setStyle(ButtonStyle.Primary)
			);

		const guessEmbed = new EmbedBuilder()
			.setTitle(`${interaction.user.username}'s high-low game'`)
			.setDescription(`A number secret between 1-100 has been chosen. Your hint is **${hintNum}**${hintNum === 69 ? ` nice` : ``}.\n\nRespond with \`high\` if you think the number is higher than the hint, \`low\` if you think the number is lower than the hint, or \`jackpot\` if the number is the hint.`);

		/** @type {(import 'discord.js').Message} */
		const sent = await interaction.reply({ embeds: [guessEmbed], components: [guessRow], fetchReply: true });

		try {
			const button = await sent.awaitMessageComponent(
				{ 
					filter: i => {
						i.deferUpdate();
						return i.user.id === interaction.user.id;
					}, 
					componentType: ComponentType.Button,
					time: 10_000
				}
			);
	
			const youWonThis = Math.floor(Math.random() * 700) + 300;

			const hlWinEmbed = new EmbedBuilder()
				.setColor(`Green`)
				.setAuthor({ name: `${interaction.user.username}'s winning high-low game`, iconURL: interaction.user.displayAvatarURL() })
				.setDescription(`**You won <:Coins:885677584749318154> ${commafy(youWonThis)}!**\n\nYour hint was **${hintNum}**. The hidden number was **${realNum}**`)
				.setFooter({ text: 'winner winner' });
			const hlLoseEmbed = new EmbedBuilder()
				.setColor(`Red`)
				.setAuthor({ name: `${interaction.user.username}'s losing high-low game`, iconURL: interaction.user.displayAvatarURL() })
				.setDescription(`**You lost!**\n\nYour hint was **${hintNum}**. The hidden number was **${realNum}**`)
				.setFooter({ text: 'loser loser' });

			guessRow.components
				.forEach(component => {
					component.setDisabled(true);

					if (component.customId === button.customId) {
						component.setStyle(ButtonStyle.Primary);
					} else {
						component.setStyle(ButtonStyle.Secondary);
					}
				});

			if (button.customId === "high") {
				if (hintNum < realNum) {
					await interaction.editReply({ embeds: [hlWinEmbed], components: [guessRow] });

					maidObj.coins += youWonThis;
				} else {
					await interaction.editReply({ embeds: [hlLoseEmbed], components: [guessRow] });
				}
			} else if (button.customId === "low") {
				if (hintNum > realNum) {
					await interaction.editReply({ embeds: [hlWinEmbed], components: [guessRow] });
				
					maidObj.coins += youWonThis;
				} else {
					await interaction.editReply({ embeds: [hlLoseEmbed], components: [guessRow] });
				}
			} else if (button.customId === "jackpot") {
				if (hintNum === realNum) {
					await interaction.editReply({ embeds: [hlWinEmbed], components: [guessRow] });

					maidObj.coins += youWonThis;
				} else {
					await interaction.editReply({ embeds: [hlLoseEmbed], components: [guessRow] });
				}
			}

			await db.set(maid, maidObj);
		} catch (rejectedPromise) {
			const hlExpEmbed = new EmbedBuilder()
				.setColor(`#2f3132`)
				.setAuthor({ name: `${interaction.user.username}'s expired high-low game`, iconURL: interaction.user.displayAvatarURL() })
				.setDescription(`Too slow!\nYour hint was ${hintNum} and the hidden number was ${realNum}.`)
				.setFooter({ text: `imagine not answering lmao` });

			guessRow.components
				.forEach(component => {
					component
						.setDisabled(true)
						.setStyle(ButtonStyle.Secondary);
				});


			await interaction.editReply({ embeds: [hlExpEmbed], components: [guessRow] });
		}
	}
};