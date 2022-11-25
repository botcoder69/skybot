/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Functions: { commafy, sliceIntoChunks, createProgressBar }, Paginator } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`achievement`)
		.setDescription(`Check your collection of Skybot achievements.`),
	group: `Player`,
	require: {
		start: true,
		update: `>=v9.0.0`
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);

		const achievements = interaction.client.achievements
			.map(achievement => `**${achievement.name}**\n${formatRewards(achievement.rewards)}\n<:Reply:949105560224157706> ${createProgressBar(flat100(achievement.status(maidObj)), 5)} \`${flat100(Math.floor(achievement.status(maidObj)))}%\`\n`);

		const descriptions = sliceIntoChunks(achievements, 5);

		const embeds = descriptions.map((description, index, array) => 
			// eslint-disable-next-line implicit-arrow-linebreak
			new EmbedBuilder()
				.setColor(`#2f3136`)
				.setDescription(description.join('\n'))
				.setFooter({ text: `Page ${index + 1} of ${array.length}. Heavily inspired by Dank Memer` })
		);

		console.log(embeds);

		await Paginator(
			interaction,
			embeds
		);
	}
};

function formatRewards(rewards) {
	return rewards
		.map(data => {
			if (data.keyName === 'coins') {
				return `<:Reply_Continuous:950690065787539488> \`Reward:\` ${data.emoji} ${commafy(data.amount)}`;
			} else {
				return `<:Reply_Continuous:950690065787539488> \`Reward:\` ${commafy(data.amount)}x ${data.emoji} ${data.name}`;
			}
		})
		.join('\n');
}

function flat100(number) {
	if (number > 100) return 100;
	else return number;
}