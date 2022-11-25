/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder, Formatters } = require('discord.js');
const { SkybotDatabaseHandler, Functions: { commafy } } = require('../../SkyblockHelper/src');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Replies with bot status!'),
	group: `Misc`,
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction, db, maid) {
		const sent = await interaction.deferReply({ fetchReply: true, ephemeral: true });

		const statusEmbed = new EmbedBuilder()
			.setTitle('Bot Status')
			.addFields(
				{
					name: `Client Status:`,
					value: `**Status:** \`🟢 ONLINE\`\n**Ping:** \`${interaction.client.ws.ping}ms\`\n**Uptime**: <t:${Math.floor(interaction.client.readyTimestamp / 1000)}:R>\n**API Latency:** \`${sent.createdTimestamp - interaction.createdTimestamp}ms\``,
					inline: true
				}
			);

		// This codebase is being used for both Guide Bot and Skybot, since Guide Bot uses a `Map` as it's database, it doesn't have a cap (Memory leaks are going to be your only problem), while Skybot requires multiple databases connected into one.
		if (db instanceof SkybotDatabaseHandler) {
			const pingData = await db.getDatabaseStatuses();

			const statusRes = {
				ONLINE: `🟢 ONLINE`,
				OFFLINE: `🔴 OFFLINE`,
				ERROR: `⚠ ERROR`,
				EMPTY: `⚪ EMPTY`
			};

			statusEmbed
				.addFields(
					{ 
						name: `Database Status:`, 
						value: pingData
							.map(dbStatus => {
								return `**${dbStatus.database.friendlyName}**\n**Status:** \`${statusRes[dbStatus.status]}\`\n**Ping:** \`${dbStatus.ms ?? 0}ms\`\n**User Count:** \`${commafy(dbStatus.database.keyCount)}/${commafy(db.keyTreshold)}\``;
							})
							.join('\n\n'),
						inline: true
					}
				);
		}

		await interaction.editReply({ content: null, embeds: [statusEmbed] });
	},
};