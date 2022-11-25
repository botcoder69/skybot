/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { FuzzySearchUtil, Functions } = require('../../SkyblockHelper/src/index');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`open`)
		.setDescription(`Opens a lootbox in your inventory`)
		.addStringOption(option => option
			.setName(`lootbox`)
			.setDescription(`The lootbox you want to open.`)
			.setRequired(true)
		),
	group: `Player`,
	cooldown: 5,
	cooldownMessage: `You just opened a lootbox recently! Wait **{secondsLeft}**\n`,
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
		const maidObj = await db.get(maid);

		const lootboxMap = interaction.client.assetMap
			.filter(asset => asset.group === 'Loot Box');

		/**
		 * @type {(import '../../SkyblockHelper/src/index').LootBox}
		 */
		const lootbox = FuzzySearchUtil.searchAndReturn(
			lootboxMap,
			interaction.options.getString('lootbox', true)
		);

		if (!lootbox) return interaction.reply({ content: `That lootbox doesn't even exist what are you doing`, ephemeral: true });

		if (!maidObj[lootbox.keyName]) return interaction.reply({ content: `You don't own this item??`, ephemeral: true });

		const loot = lootbox.loot.makeChance();

		const openingEmbed = new EmbedBuilder()
			.setTitle(`Opening ${lootbox.name}`)
			.setThumbnail(lootbox.displayEmojiURL('inventory'));

		await interaction.reply({ embeds: [openingEmbed] });

		const coins = Functions.getRandomNumber(lootbox.coins.min, lootbox.coins.max);

		const formattedLoot = loot
			.map(loot => `\`x${loot.amount}\` - ${loot.item.emoji} ${loot.item.name}`)
			.join('\n');

		const openedEmbed = new EmbedBuilder()
			.setTitle(`${interaction.user.username}'s Loot Haul!`)
			.setThumbnail(lootbox.displayEmojiURL('inventory'))
			.setDescription(`<:ReplyU:968443339147993108> <:Coins:885677584749318154> ${Functions.commafy(coins)}\n${formattedLoot}`)
			.setFooter({ text: `1x ${lootbox.name} opened | Inspired by Dank Memer.` });

		await wait(2000);

		await interaction.editReply({ embeds: [openedEmbed] });
		
		maidObj[lootbox.keyName] -= 1;
		maidObj.coins += coins;

		for (const lootData of loot) maidObj[lootData.item.keyName] += lootData.amount;
		
		await db.set(maid, maidObj);
	}
};