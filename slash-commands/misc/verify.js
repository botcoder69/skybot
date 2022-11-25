/* eslint-disable no-unused-vars */
const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const SkyblockHelper = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`verify`)
		.setDescription(`Verify that you are a human and not a bot.`)
		.addIntegerOption(option => option
			.setName(`answer`)
			.setDescription(`Your answer to the verification question?`)
			.setRequired(true)
		),
	group: `Misc`,
	require: {
		start: true
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const answer = interaction.options.getInteger('answer', true);

		if (!maidObj?.verification?.ongoing) return interaction.reply({ content: `You are not suspected as a robot!`, ephemeral: true });

		if (answer === maidObj.verification.answer) {
			await interaction.reply({ content: `Verification complete! You can continue playing Skybot now!` });
		} else if (maidObj.verification.chances >= 1) {
			maidObj.verification.chances -= 1;

			await interaction.reply({ content: `Wrong answer! Please try again! (**${maidObj.verification.retries}** chance${maidObj.verification.retries > 1 ? `s` : ``} left)` });
		}

		
		Reflect.deleteProperty(maidObj, 'verification');

		if (maidObj.verification.chances === 0) {
			maidObj.banned = {
				timestamp: Date.now() + 86_400_000,
				performer: {
					display: `WATCHDOG`,
					mention: `WATCHDOG`
				},
				reason: `Botting. If you didn't bot, please send a screenshoot to the owner.`
			};
			
		}
		
		await db.set(maid, maidObj);
	}
};