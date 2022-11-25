/* eslint-disable no-unused-vars */
const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	group: `Misc`,
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		await interaction.reply({ content: `Pong! (**${interaction.client.ws.ping}ms** to gateway!)` });
	},
};
