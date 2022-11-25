/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const SkyblockHelper = require('../../SkyblockHelper/src/index');

const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`tutorial`)
		.setDescription(`Go through an interactive Skybot guide`)
		.addStringOption(option => option
			.setName(`command`)
			.setDescription(`The command to query the tutorial of.`)
			.setRequired(false)
		),
	group: `Player`,
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const command = interaction.options.getString(`command`);

		if (!command) {
			if (maidObj?.start) return interaction.reply({ content: `You already started Skybot! You don't need a tutorial.`, ephemeral: true });

			const greetingEmbed = new EmbedBuilder()
				.setTitle(`Skybot Help`)
				.setURL(`https://www.youtube.com/watch?v=dQw4w9WgXcQ&`)
				.setDescription(`Hello ${interaction.user}! Thank you for trying out Skybot! In this tutorial, you will go through an interactive setup to get you familiarized with the commands and things you can do with Skybot!`);

			await interaction.reply({ embeds: [greetingEmbed] });
			await wait(5000);
			await interaction.followUp({ content: `To get started on your Skybot Adventure, use \`/start\`!` });

			const newMaidObj = {};
	
			newMaidObj.tutorial = 1;
	
			await db.set(maid, newMaidObj);
		} else {
			const tutorialCommandsMap = interaction.client.slashCommands.filter(textCommand => 'tutorial' in textCommand);

			const tutorialCommand = tutorialCommandsMap.get(command);

			if (!tutorialCommand) return interaction.reply({ content: `The command you are trying to query doesn't have a tutorial!`, ephemeral: true });

			return interaction.reply({ embeds: tutorialCommand.tutorial.embeds, ephemeral: true });
		}
	}
};