/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const SkyblockHelper = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`vote`)
		.setDescription(`Vote for the bot on Top.gg!`),
	group: `Currency`,
	require: {
		start: true,
		update: `>=v10.0.0`
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const voteRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()	
					.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ&')
				// .setDisabled(api.hasVoted(maid))
					.setDisabled(true)
					.setLabel('Top.gg')
					.setStyle(ButtonStyle.Link)
			);

		const voteEmbed = new EmbedBuilder()
			.setTitle('Vote for Skybot')
			.addFields(
				{ name: `Rewards`, value: `>>> **1x** <:Ticket:955745457181716480> \`adventure ticket\`\n**1x** <a:Daily_Box:956735467414519899> \`daily box\`\n**20,000** <:Coins:885677584749318154> \`coins\``, inline: true }
			)
			.setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/322/ballot-box-with-ballot_1f5f3-fe0f.png')
			.setFooter({ text: `Inspired by Dank Memer.` });

		await interaction.reply({ embeds: [voteEmbed], components: [voteRow] });
	}
};