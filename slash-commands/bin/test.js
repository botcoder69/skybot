/* eslint-disable no-unused-vars */
const { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { GlobalFonts, createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');
const SkyblockHelper = require('../../SkyblockHelper/src/index');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Tests something. Usually used if the code allowance for /dev eval is too short.'),
	group: `Developer`,
	require: {
		start: true,
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		GlobalFonts.registerFromPath(
			path.join(__dirname, `../../`, `SkyblockHelper`, `font`, `Rickroll.ttf`), 
			`Rickroll`
		);

		console.info(GlobalFonts.families[GlobalFonts.families.length - 1]);

		const canvas = createCanvas(1024, 196);
		const context = canvas.getContext(`2d`);
		const background = await loadImage(path.join(__dirname, './test.png'));


		context.drawImage(background, 0, 0, 1024, 196);

		// Adventure Name
		context.font = '40px Rickroll';
		context.fillStyle = '#fbfafc';
		context.fillText(`Deeper into the Deep Mines`, 106, 65);



		const buffer = canvas.toBuffer(`image/png`);

		const questStart = new AttachmentBuilder()
			.setFile(buffer);

		await interaction.reply({ files: [questStart] });
	}
};