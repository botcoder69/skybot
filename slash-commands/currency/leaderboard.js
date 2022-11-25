/* eslint-disable no-unused-vars, no-await-in-loop */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Collection, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { Functions: { commafy, getSettingValue, sliceIntoChunks }, Paginator } = require('../../SkyblockHelper/src/index');

const forwardEnabledRow = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId(`fastBackward`)
			.setEmoji(`⏪`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`backward`)
			.setEmoji(`◀`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`forward`)
			.setEmoji(`▶`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`fastForward`)
			.setEmoji(`⏩`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`endInteraction`)
			.setLabel(`End Interaction`)
			.setStyle(ButtonStyle.Secondary)
	]);

const backwardEnabledRow = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId(`fastBackward`)
			.setEmoji(`⏪`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`backward`)
			.setEmoji(`◀`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`forward`)
			.setEmoji(`▶`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`fastForward`)
			.setEmoji(`⏩`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`endInteraction`)
			.setLabel(`End Interaction`)
			.setStyle(ButtonStyle.Secondary)
	]);

const allEnabledRow = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId(`fastBackward`)
			.setEmoji(`⏪`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`backward`)
			.setEmoji(`◀`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`forward`)
			.setEmoji(`▶`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`fastForward`)
			.setEmoji(`⏩`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`endInteraction`)
			.setLabel(`End Interaction`)
			.setStyle(ButtonStyle.Secondary)
	]);

const noEnabledRow = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId(`fastBackward`)
			.setEmoji(`⏪`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`backward`)
			.setEmoji(`◀`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`forward`)
			.setEmoji(`▶`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`fastForward`)
			.setEmoji(`⏩`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`endInteraction`)
			.setLabel(`End Interaction`)
			.setStyle(ButtonStyle.Secondary)
			.setDisabled(true)
	]);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`leaderboard`)
		.setDescription(`Shows the Skybot no-lifers in your guild.`),
	group: `Currency`,
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
		await interaction.deferReply();
		
		/**
		 * @type {Collection<string, (import 'discord.js').SkybotCurrencyProfile}
		 */
		const leaderboard = new Collection();
		const registeredUsers = await db.list();

		for (const guildMember of interaction.guild.members.cache.values()) {
			if (registeredUsers.includes(guildMember.id)) {
				/**
				 * @type {import('discord.js').RawUserObj}
				 */
				const guildMemberObj = await db.get(guildMember.id);

				if (!getSettingValue(guildMemberObj, 'hideFromLb') && guildMemberObj && interaction.client.updateMap.get(guildMemberObj?.update) >= 3) {
					leaderboard.set(guildMember.id, 
						{ 
							money: guildMemberObj.coins,
							netWorth: guildMemberObj.netWorth,
							username: guildMember.user.username,
							id: guildMember.id
						}
					);
				}
			}
		}

		const leaderboardData = leaderboard.sort((a, b) => b.netWorth - a.netWorth)
			.filter(user => user.netWorth > 0)
			.first(10)
			.map((user, position) => `${medal(position)} **${ordinalNumber(position + 1)}:** ${user.username}\nNet Worth: **$${commafy(user.netWorth)}**\nCoins: **$${commafy(user.money)}**`);

		const embed = new EmbedBuilder()
			.setColor(`#2f3136`)
			.setTitle(`Skybot Leaderboard for ${interaction.guild.name}`)
			.setDescription(leaderboardData.join('\n\n'));

		if (!leaderboardData.length) {
			embed
				.setColor(`#2f3136`)
				.setTitle(`Skybot Leaderboard for ${interaction.guild.name}`)
				.setDescription(`None`)
				.setFooter({ text: `Page: 1/1` });
		}

		await interaction.editReply({ embeds: [embed] });
	}
};

/**
 * 
 * @param {number} pos 
 */
function medal(pos) {
	switch (pos) {
	case 0:
		return '🥇';
	case 1:
		return '🥈';
	case 2:
		return '🥉';
	default:
		return '';
	}
}

function ordinalNumber(number) {
	switch (number) {
	case 1:
		return `1st`;
	case 2:
		return `2nd`;
	case 3: 
		return `3rd`;
	default:
		return `${number}th`;
	}
}