/* eslint-disable no-unused-vars */
const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const { Confirmation, Functions: { commafy }, FuzzySearchUtil } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`buy`)
		.setDescription(`Buys an item from a villager`)
		.addStringOption(option => option
			.setName(`item`)
			.setDescription(`The item you want to buy`)
			.setRequired(true)
		)
		.addIntegerOption(option => option
			.setName(`amount`)
			.setDescription(`The amount of the item you want to buy`)
			.setRequired(true)
		),
	group: `Currency`,
	require: {
		start: true,
		update: `>=v3.3.0`
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const { coins } = maidObj;
		const { assetMap } = interaction.client;

		const query = interaction.options.getString('item', true);
		const amount = interaction.options.getInteger('amount', true);

		const asset = FuzzySearchUtil.searchAndReturn(assetMap, query);
				
		if (!asset) return interaction.reply(`what are you doing that item doesn't exist`);

		if (!asset.NPC.buy.buyable) return interaction.reply(`you cant buy this item`);

		if ((amount * asset.NPC.buy.price) > coins) return interaction.reply(`❗ Not enough coins! You need at least **$${commafy(amount * asset.NPC.buy.price)}**!`);

		const confirmation = new Confirmation(interaction, { content: `🛒 ${interaction.user}, are you sure you want to buy **${commafy(amount)}x** ${asset.emoji.name} \`${asset.name.toLowerCase()}\` for <:Coins:885677584749318154> **${commafy(amount * asset.NPC.buy.price)}**?` });

		confirmation.on('check', async (button, sent) => {
			maidObj.coins -= (amount * asset.NPC.buy.price);
			maidObj[asset.keyName] += amount;

			await db.set(maid, maidObj);

			sent.edit(`<:check:885408207097462786> You purchased **${commafy(amount)}x** ${asset.emoji.name} \`${asset.name.toLowerCase()}\` for <:Coins:885677584749318154> **${commafy(amount * asset.NPC.buy.price)}** \`coins\`! You now have <:Coins:885677584749318154> **${commafy(maidObj.coins)}** \`coins\``);
		});
	
		confirmation.on('cross', (button, sent) => {
			sent.edit({ content: `<:cross:885408206959046678> Purchase cancelled!` });
		});
	
		confirmation.on('error', (error, sent) => {
			sent.edit({ content: `<:cross:885408206959046678> Purchase cancelled!` });
		});
	}
};