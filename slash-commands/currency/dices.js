/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType } = require('discord.js');
const { Functions: { commafy, getRandomNumber, getSettingValue } } = require('../../SkyblockHelper/src/index');

const dicesEnabledRow = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId('roll')
			.setLabel('Roll')
			.setStyle(ButtonStyle.Success),
		new ButtonBuilder()
			.setCustomId('end')
			.setLabel('End')
			.setStyle(ButtonStyle.Danger)
	]);

const dicesDisabledRow = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId('roll')
			.setLabel('Roll')
			.setStyle(ButtonStyle.Success)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId('end')
			.setLabel('End')
			.setStyle(ButtonStyle.Danger)
			.setDisabled(true)
	]);

const tutorialEmbed = new EmbedBuilder()
	.setColor(`#2f3136`)
	.setTitle(`Dices`)
	.setDescription(`This command is a gambling command.\n\nMake a bet and roll 4 dice against the bot. Each roll contributes to your dice's total value. If you get a higher total value than the bot, you win. If you get a lower total value, you lose, and if your total value is the same as the bot, you tie.`)
	.addFields(
		{ name: `Losing Dices`, value: `What makes this command stand out is that there is a chance for the bot to "return" your money back to you, since this command is purely RNG. If the bot makes some kind of "epic comeback" by getting a 6, it also increases the chance of the bot giving back your money.` }
	)
	.setFooter({ text: `The embeds of this game heavily throws a reference to Dank Memer's blackjack command.` });

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`dices`)
		.setDescription(`Roll 4 dice and get a higher value than your opponent to win`)
		.addIntegerOption(option => option
			.setName('bet')
			.setDescription('The amount of coins you and your opponent will bet.')
			.setRequired(true)	
		),
	group: `Currency`,
	cooldown: 30,
	cooldownMessage: `If I let you play dices whenever you wanted, you'd be broke lmao. Wait **{secondsLeft}**\n`,
	tutorial: {
		embeds: [tutorialEmbed],
		key: `dices`	
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
		const { coins } = maidObj;

		if (!maidObj.gambleStats) maidObj.gambleStats = {
			dices: {
				moneyWon: 0,
				moneyLost: 0,
				totalWins: 0,
				totalLoses: 0
			}
		};

		if (!maidObj.gambleStats.dices) maidObj.gambleStats.dices = {
			moneyWon: 0,
			moneyLost: 0,
			totalWins: 0,
			totalLoses: 0
		};

		const compDiceArray = [];
		const playerDiceArray = [];
		const bet = interaction.options.getInteger('bet', true);
		let compDiceTotal = 0,
			playerDiceTotal = 0,
			counter = 1,
			/** If the computer somehow manages to get a 6, this will be turned on, increasing the rate of the computer returning the coins. */
			increaseGiveChance = false;

		if (bet < 1_000) return interaction.reply(`You cannot bet any less than <:Coins:885677584749318154> **1,000** \`coins\`!`);

		if (bet > 50_000_000) return interaction.reply(`You cannot bet any more than <:Coins:885677584749318154> **50,000,000** \`coins\`!`);
	
		if (bet > coins) return interaction.reply(`You dont have enough <:Coins:885677584749318154> \`coins\`!`);

		const diceEmbed1 = new EmbedBuilder()
			.setColor(`#99eeff`)
			.setAuthor({ name: `${interaction.user.username}'s dices game`, iconURL: interaction.user.displayAvatarURL() })
			.addFields(
				{ name: `${interaction.user.username}`, value: '\nDice - [`0`](https://www.youtube.com/watch?v=dQw4w9WgXcQ&)\nTotal - `0`', inline: true },
				{ name: `${interaction.client.user.username}`, value: 'Dice - [`0`](https://www.youtube.com/watch?v=dQw4w9WgXcQ&)\nTotal - `0`', inline: true }
			);

		const sent = await interaction.reply({ embeds: [diceEmbed1], components: [dicesEnabledRow], fetchReply: true });

		const collector = interaction.channel.createMessageComponentCollector(
			{ 
				filter: i => i.user.id === interaction.user.id, 
				max: 4,
				componentType: ComponentType.Button,
				idle: 15000
			}
		);

		collector.on('collect', async button => {
			if (button.customId === "roll") {
				const computerRng = getRandomNumber(1, 100);
				const playerRng = getRandomNumber(1, 100);

				let compDiceValue,
					playerDiceValue;

				if (computerRng <= 10) {
					compDiceValue = 1;
				} else if (computerRng <= 20) {
					compDiceValue = 2;
				} else if (computerRng <= 40) {
					compDiceValue = 3;
				} else if (computerRng <= 60) {
					compDiceValue = 4;
				} else if (computerRng <= 80) {
					compDiceValue = 5;
				} else {
					compDiceValue = 6;
					increaseGiveChance = true;
				}
				
				if (playerRng <= 5) {
					playerDiceValue = 1;
				} else if (playerRng <= 15) {
					playerDiceValue = 2;
				} else if (playerRng <= 30) {
					playerDiceValue = 3;
				} else if (playerRng <= 50) {
					playerDiceValue = 4;
				} else if (playerRng <= 75) {
					playerDiceValue = 5;
				} else {
					playerDiceValue = 6;
				}

				if (getSettingValue(maidObj, 'developerOverride_Advantage')) playerDiceValue = 6;

				const compDice = compDiceValue;
				const playerDice = playerDiceValue;

				compDiceTotal += compDice;
				playerDiceTotal += playerDice;
				
				compDiceArray.push(`[\`${compDice}\`](https://www.youtube.com/watch?v=dQw4w9WgXcQ&)`);
				playerDiceArray.push(`[\`${playerDice}\`](https://www.youtube.com/watch?v=dQw4w9WgXcQ&)`);

				const diceEmbedRoll = new EmbedBuilder()
					.setColor(`#99eeff`)
					.setAuthor({ name: `${interaction.user.username}'s dices game`, iconURL: interaction.user.displayAvatarURL() })
					.addFields(
						{
							name: `${interaction.user.username}`,
							value: `Dices - ${playerDiceArray.join(', ')}\nTotal - \`${playerDiceTotal}\``,
							inline: true
						},
						{
							name: `${interaction.client.user.username}`,
							value: `Dices - ${compDiceArray.join(', ')}\nTotal - \`${compDiceTotal}\``,
							inline: true
						}
					);

				if (getSettingValue(maidObj, 'developerOverride_Advantage')) diceEmbedRoll.data.author.name += ` | Developer Overrides: Advantage`;

				if (counter < 4) {
					await button.update({ embeds: [diceEmbedRoll] });
				} else {
					await button.update({ embeds: [diceEmbedRoll], components: [dicesDisabledRow] });
				}

				counter += 1;
			} else if (button.customId === "end") {
				await button.update({ content: "you ended the game. The person you challenged kept your money for wasting time.", components: [dicesDisabledRow] });

				collector.stop(`User doesn't want to play anymore.`);
				
				maidObj.coins -= bet;
				
				await db.set(maid, maidObj);
			}
		});

		collector.on('end', async (_collected, reason) => {
			if (reason === `User doesn't want to play anymore.` || reason.includes('time')) return;

			if (playerDiceTotal > compDiceTotal) {
				const diceEmbedWin = new EmbedBuilder()
					.setColor(`55ff55`)
					.setDescription(`**You win! You have ${playerDiceTotal} and, ${interaction.client.user.username} has ${compDiceTotal}**\nYou won <:Coins:885677584749318154> **${commafy(bet)}** \`coins\`. You now have <:Coins:885677584749318154> **${commafy(bet + coins)}** \`coins\``)
					.setAuthor({ name: `${interaction.user.username}'s dices game`, iconURL: interaction.user.displayAvatarURL() })
					.addFields(
						{
							name: `${interaction.user.username}`,
							value: `Dices - ${playerDiceArray.join(', ')}\nTotal - \`${playerDiceTotal}\``,
							inline: true
						},
						{
							name: `${interaction.client.user.username}`,
							value: `Dices - ${compDiceArray.join(', ')}\nTotal - \`${compDiceTotal}\``,
							inline: true
						},
					);

				sent.edit({ embeds: [diceEmbedWin], components: [dicesDisabledRow] });

				maidObj.coins += bet;

				maidObj.gambleStats.dices.totalWins += 1;
				maidObj.gambleStats.dices.moneyWon += bet;

				await db.set(maid, maidObj);
			} else if (playerDiceTotal === compDiceTotal) {
				const diceEmbedTie = new EmbedBuilder()
					.setColor(`#ffff55`)
					.setDescription(`**You tied! You tied with your opponent!**\nThe person you challenged gave you back your <:Coins:885677584749318154> **${commafy(bet)}** \`coins\``)
					.setAuthor({ name: `${interaction.user.username}'s dices game`, iconURL: interaction.user.displayAvatarURL() })
					.addFields(
						{
							name: `${interaction.user.username}`,
							value: `Dices - ${playerDiceArray.join(', ')}\nTotal - \`${playerDiceTotal}\``,
							inline: true
						},
						{
							name: `${interaction.client.user.username}`,
							value: `Dices - ${compDiceArray.join(', ')}\nTotal - \`${compDiceTotal}\``,
							inline: true
						},
					);

				sent.edit({ embeds: [diceEmbedTie], components: [dicesDisabledRow] });
				
				maidObj.gambleStats.dices.totalWins += 1;
				
				await db.set(maid, maidObj);
			} else {
				const giveBackMoney = getRandomNumber(1, 100) <= (increaseGiveChance ? 20 : 35);

				const diceEmbedLose = new EmbedBuilder()
					.setColor(`#ff5555`)
					.setDescription(`**You lost! You have ${playerDiceTotal}, ${interaction.client.user.username} has ${compDiceTotal}**\nYou lost <:Coins:885677584749318154> **${commafy(bet)}** \`coins\`${giveBackMoney ? `, but the person you challenged is feeling nice today, so he gave you back your <:Coins:885677584749318154> **${commafy(bet)}** \`coins\`. You now have <:Coins:885677584749318154> **${commafy(coins)}** \`coins\`` : `. You now have <:Coins:885677584749318154> **${commafy(coins - bet)}** \`coins\``}`)
					.setAuthor({ name: `${interaction.user.username}'s dices game`, iconURL: interaction.user.displayAvatarURL() })
					.addFields(
						{
							name: `${interaction.user.username}`,
							value: `Dices - ${playerDiceArray.join(', ')}\nTotal - \`${playerDiceTotal}\``,
							inline: true
						},
						{
							name: `${interaction.client.user.username}`,
							value: `Dices - ${compDiceArray.join(', ')}\nTotal - \`${compDiceTotal}\``,
							inline: true
						},
					);

				sent.edit({ embeds: [diceEmbedLose], components: [dicesDisabledRow] });

				maidObj.gambleStats.dices.totalLoses += 1;

				if (giveBackMoney) {
					await db.set(maid, maidObj);
				} else {
					maidObj.coins -= bet;
					maidObj.gambleStats.dices.moneyLost += bet;

					await db.set(maid, maidObj);
				}
			}
		});
	}
};