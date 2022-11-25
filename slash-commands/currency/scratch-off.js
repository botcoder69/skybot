/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType, MessageManager } = require('discord.js');
const { Functions } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`scratch-off`)
		.setDescription(`Bet and scratch 3 spots on a card for a chance to win big!`)
		.addIntegerOption(option => option
			.setName('bet')
			.setDescription('The amount of coins you and your opponent will bet.')
			.setRequired(true)	
		),
	group: `Currency`,
	cooldown: 10,
	cooldownMessage: `I can't create this many Scratch-Offs this fast! Wait **{secondsLeft}**\n`,
	require: {
		start: true,
		update: ">=v7.0.0"
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const { coins } = maidObj;

		if (!('gambleStats' in maidObj)) maidObj.gambleStats = {
			scratchoff: {
				moneyWon: 0,
				moneyLost: 0,
				totalWins: 0,
				totalLoses: 0
			}
		};

		if (!('scratchoff' in maidObj.gambleStats)) maidObj.gambleStats.scratchoff = {
			moneyWon: 0,
			moneyLost: 0,
			totalWins: 0,
			totalLoses: 0
		};

		const scratchButtons = [
			new ButtonBuilder()
				.setCustomId(`coal1`)
				.setEmoji(`<:Coal:929899617888370708>`)
				.setStyle(ButtonStyle.Success)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`coal2`)
				.setEmoji(`<:Coal:929899617888370708>`)
				.setStyle(ButtonStyle.Success)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`coal3`)
				.setEmoji(`<:Coal:929899617888370708>`)
				.setStyle(ButtonStyle.Success)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`coal4`)
				.setEmoji(`<:Coal:929899617888370708>`)
				.setStyle(ButtonStyle.Success)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`coal5`)
				.setEmoji(`<:Coal:929899617888370708>`)
				.setStyle(ButtonStyle.Success)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`blank1`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Danger)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`blank2`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Danger)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`blank3`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Danger)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`blank4`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Danger)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`iron1`)
				.setEmoji(`<:Iron_Ingot:885715125305221120>`)
				.setStyle(ButtonStyle.Success)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`iron2`)
				.setEmoji(`<:Iron_Ingot:885715125305221120>`)
				.setStyle(ButtonStyle.Success)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`iron3`)
				.setEmoji(`<:Iron_Ingot:885715125305221120>`)
				.setStyle(ButtonStyle.Success)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`gold1`)
				.setEmoji(`<:Gold_Ingot:885715142522855494>`)
				.setStyle(ButtonStyle.Success)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`gold2`)
				.setEmoji(`<:Gold_Ingot:885715142522855494>`)
				.setStyle(ButtonStyle.Success)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId(`diamond1`)
				.setEmoji(`<:Diamond:902764556697341952>`)
				.setStyle(ButtonStyle.Success)
				.setDisabled(true)
		];

		const scratchIDs = [
			new ButtonBuilder()
				.setCustomId(`coal1`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`coal2`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`coal3`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`coal4`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`coal5`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`blank1`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`blank2`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`blank3`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`blank4`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`iron1`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`iron2`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`iron3`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`gold1`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`gold2`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`diamond1`)
				.setLabel(` `)
				.setStyle(ButtonStyle.Secondary)
		];

		const bet = interaction.options.getInteger('bet', true);

		if (bet < 1_000) return interaction.reply(`❗ You cannot bet any less than <:Coins:885677584749318154> **1,000** \`coins\`!`);

		if (bet > 50_000_000) return interaction.reply(`❗ You cannot bet any more than <:Coins:885677584749318154> **50,000,000** \`coins\`!`);

		if (bet > coins) return interaction.reply(`❗ You dont have enough <:Coins:885677584749318154> \`coins\`!`);

		const jumbledScratchIDs = Functions.randomizeArray(scratchIDs);
		const slicedScratchIDs = Functions.sliceIntoChunks(jumbledScratchIDs, 3);
		const actionRows = slicedScratchIDs
			.map(scratchID => new ActionRowBuilder()
				.addComponents(scratchID)
			);

		const scratchEmbed = new EmbedBuilder()
			.setAuthor({ name: `${interaction.user.username}'s Scratch-Off`, iconURL: interaction.user.displayAvatarURL() })
			.setDescription(`You can scratch **3** more fields\nYou scratched: <:Coins:885677584749318154> **0 (${getWinOrLoss(0, bet)})**`);

		if (Functions.getSettingValue(maidObj, `developerOverride_Advantage`)) {
			scratchEmbed.data.author.name += ` | Developer Overrides: Advantage`;
	
			actionRows.forEach(actionRow => {
				actionRow.components.forEach(component => {
					const completeButton = scratchButtons.find(button => button.data.custom_id === component.data.custom_id);

					component.data.emoji = completeButton.data.emoji;
				});
			});
		}

			

		/** @type {(import 'discord.js').Message} */
		const sent = await interaction.reply({ embeds: [scratchEmbed], components: actionRows, fetchReply: true });



		const collector = sent.createMessageComponentCollector(
			{ 
				filter: i => {
					i.deferUpdate();
					return i.user.id === interaction.user.id;
				}, 
				componentType: ComponentType.Button, 
				idle: 7_500, 
				max: 3 
			}
		);

		let iterator = 3,
			gain = 0;

		collector.on(`collect`, async button => {
			iterator -= 1;
			const buttonToReplace = jumbledScratchIDs.find(scratchButton => scratchButton.data.custom_id === button.customId);
			const scratchButton = scratchButtons.find(scratchButton => scratchButton.data.custom_id === button.customId);
			const index = jumbledScratchIDs.indexOf(buttonToReplace);

			jumbledScratchIDs[index] = scratchButton;

			if (scratchButton.data.custom_id.startsWith(`coal`)) {
				gain += 15;
			} else if (scratchButton.data.custom_id.startsWith(`iron`)) {
				gain += 50;
			} else if (scratchButton.data.custom_id.startsWith(`gold`)) {
				gain += 75;
			} else if (scratchButton.data.custom_id.startsWith(`diamond`)) {
				gain += 150;
			}

			const newSlicedScratchIDs = Functions.sliceIntoChunks(jumbledScratchIDs, 3);
			const actionRows = newSlicedScratchIDs
				.map(scratchID => new ActionRowBuilder()
					.addComponents(scratchID)
				);

			const scratchEmbed = new EmbedBuilder()
				.setAuthor({ name: `${interaction.user.username}'s Scratch-Off`, iconURL: interaction.user.displayAvatarURL() })
				.setDescription(`You can scratch **${iterator}** more fields\nYou scratched: <:Coins:885677584749318154> **${Functions.commafy(Math.floor(bet * (gain / 100)))} (${getWinOrLoss(gain, bet)})**`)
				.setFooter({ text: `Use "pls scratch table" to see rewards` });

			if (Functions.getSettingValue(maidObj, `developerOverride_Advantage`)) scratchEmbed.data.author.name += ` | Developer Overrides: Advantage`;

			if (gain < 100) {
				scratchEmbed.setColor(`#FF5555`);
			} else if (gain > 100) {
				scratchEmbed.setColor(`#55FF55`);
			} else {
				scratchEmbed.setColor(`#FFFF55`);
			}

			if (iterator > 0) await sent.edit({ embeds: [scratchEmbed], components: actionRows });
		});

		collector.on('end', async () => {
			const unflippedScratchCards = jumbledScratchIDs.filter(button => !button.data.disabled);

			for (const unflippedScratchCard of unflippedScratchCards) {
				const buttonToReplace = jumbledScratchIDs.find(button => button === unflippedScratchCard);
				const scratchButton = scratchButtons.find(button => button.data.custom_id === buttonToReplace.data.custom_id);
				const index = jumbledScratchIDs.indexOf(buttonToReplace);

				jumbledScratchIDs[index] = scratchButton.setStyle(ButtonStyle.Secondary);
			}

			const newSlicedScratchIDs = Functions.sliceIntoChunks(jumbledScratchIDs, 3);
			const actionRows = newSlicedScratchIDs
				.map(scratchID => new ActionRowBuilder()
					.addComponents(scratchID)
				);

			const moneyGain = gain < 100 
				? bet - (bet * (gain / 100))
				: (bet * (gain / 100)) - bet;

			const scratchEmbed = new EmbedBuilder()
				.setAuthor({ name: `${interaction.user.username}'s Scratch-Off`, iconURL: interaction.user.displayAvatarURL() })
				.setDescription(`You can scratch **${iterator}** more fields\nYou scratched: <:Coins:885677584749318154> **${Functions.commafy(Math.floor(bet * (gain / 100)))} (${getWinOrLoss(gain, bet)})**\n\nYou ${gain < 100 ? `lost` : `won`} <:Coins:885677584749318154> **${Functions.commafy(moneyGain)}** in total`)
				.setFooter({ text: `Use "pls scratch table" to see rewards` });

			if (Functions.getSettingValue(maidObj, `developerOverride_Advantage`)) scratchEmbed.data.author.name += ` | Developer Overrides: Advantage`;

			if (gain < 100) {
				scratchEmbed.setColor(`#FF5555`);

				// The user lost the game, so we add these stats.
				maidObj.gambleStats.scratchoff.totalLoses += 1;
				maidObj.gambleStats.scratchoff.moneyLost += moneyGain;
				maidObj.coins -= moneyGain;
			} else if (gain > 100) {
				scratchEmbed.setColor(`#55FF55`);

				// The user won the game, so we add these stats.
				maidObj.gambleStats.scratchoff.totalWins += 1;
				maidObj.gambleStats.scratchoff.moneyWon += moneyGain;
				maidObj.coins += moneyGain;
			} else {
				scratchEmbed.setColor(`#FFFF55`);

				// The user tied, which is kind of a win, so we add one win.
				maidObj.gambleStats.scratchoff.totalWins += 1;
			}

			scratchEmbed.data.description += `\nYou now have <:Coins:885677584749318154> **${Functions.commafy(maidObj.coins)}**`;

			await db.set(maid, maidObj);

			await sent.edit({ embeds: [scratchEmbed], components: actionRows });
		});
	}
};

function getWinOrLoss(gain, bet) {
	const moneyGain = gain < 100 
		? bet - (bet * (gain / 100))
		: (bet * (gain / 100)) - bet;

	if (gain < 100) {
		const percent = Math.floor((moneyGain / bet) * 100);

		return `-${percent}%`;
	} else if (gain === 100) {
		return `0%`;
	} else {
		const percent = Math.floor((moneyGain / bet) * 100);

		return `+${percent}%`;
	}
}