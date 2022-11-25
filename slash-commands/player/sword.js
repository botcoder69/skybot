/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Functions } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`sword`)
		.setDescription(`Returns info on the equipped sword`),
	group: `Player`,
	require: {
		start: true,
		update: `>=v8.0.0`
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const { sword } = maidObj;
		const swordFile = interaction.client.assetMap.find(asset => asset.group?.toLowerCase() === "sword" && asset.keyName === sword.keyName);

		let color;
		if ('rarity' in swordFile) {
			if (swordFile.rarity.toLowerCase() === "common") {
				color = "#FFFFFF";
			} else if (swordFile.rarity.toLowerCase() === "uncommon") {
				color = "#55FF55";
			} else if (swordFile.rarity.toLowerCase() === "rare") {
				color = "#5555FF";
			} else if (swordFile.rarity.toLowerCase() === "epic") {
				color = "#AA00AA";
			} else if (swordFile.rarity.toLowerCase() === "legendary") {
				color = "#FFAA00";
			} else if (swordFile.rarity.toLowerCase() === "mythic") {
				color = "#FF55FF";
			} else if (swordFile.rarity.toLowerCase() === "supreme") {
				color = "#AA0000";
			} else if (swordFile.rarity.toLowerCase() === "special") {
				color = "#FF5555";
			} else if (swordFile.rarity.toLowerCase() === "very special") {
				color = "#FF5555";
			}
		} else {
			color = "#2F3135";
		}

		const swordEmbed = new EmbedBuilder()
			.setColor(color)
			.setTitle(swordFile.name)
			.setThumbnail(swordFile.emoji.url)
			.setDescription(`${swordFile.swordFunc.getSwordStats(sword)}`);

		if (swordFile?.sword?.itemAbility) {
			const [abilityName, abilityDescription] = swordFile.sword.itemAbility.split('\n');

			swordEmbed.data.description += `\n\n${abilityName}\n${Functions.splitMessage(abilityDescription, { char: ` `, maxLength: 32 }).join('\n')}`;
		}
		swordEmbed.data.description += `\n\n${swordFile.rarity.toUpperCase()} SWORD`;

		await interaction.reply({ embeds: [swordEmbed] });
	}
};