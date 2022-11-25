/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Functions: { commafy, sliceIntoChunks }, Paginator } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`shop`)
		.setDescription(`Look at whats on sale in the Skybot Shop.`),
	group: `Currency`,
	cooldown: 5,
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
		const buyableItems = interaction.client.assetMap
			.filter(asset => asset.NPC?.buy?.buyable)
			.sort((a, b) => a.NPC.buy.price - b.NPC.buy.price)
			.map(asset => `${asset.displayEmojiName()} **${asset.name}** (${commafy(maidObj?.[asset.keyName] ?? 0)}) — [<:Coins:885677584749318154> ${commafy(asset.NPC.buy.price)}](https://www.youtube.com/watch?v=dQw4w9WgXcQ&)\n${asset?.description ?? `No description provided.`}`);

		const splitBuyableItems = sliceIntoChunks(buyableItems, 8);

		const embeds = splitBuyableItems
			.map((splitBuyableItem, index, array) => 
				// eslint-disable-next-line implicit-arrow-linebreak
				new EmbedBuilder()
					.setTitle('Shop Items')
					.setDescription(splitBuyableItem.join('\n\n'))
					.setFooter({ text: `Inspired by Dank Memer | /examine query:<item> for more info ─ Page ${index + 1}/${array.length}` })
			);

		Paginator(interaction, embeds);
	}
};