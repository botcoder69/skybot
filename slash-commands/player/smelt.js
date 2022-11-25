/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Confirmation, Functions: { commafy }, FuzzySearchUtil } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`smelt`)
		.setDescription(`Smelts useless raw ores into valuable minerals.`)
		.addStringOption(option => option
			.setName(`item`)
			.setDescription(`The ore you want to smelt in this furnace.`)
			.setRequired(true)
		)
		.addIntegerOption(option => option
			.setName(`amount`)
			.setDescription(`The amount of the ore you want to smelt. Coal usage is automatically determined.`)
			.setRequired(true)
		),
	group: `Player`,
	require: {
		start: true,
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const { coal } = maidObj;
		
		const query = interaction.options.getString('item', true);
		const amount = interaction.options.getInteger('amount', false) ?? 1;

		const smeltMap = interaction.client.assetMap
			.filter(asset => asset.group === "Item" && asset?.smeltable);

		const item = FuzzySearchUtil.searchAndReturn(
			smeltMap, 
			query
		);

		if (!item) return interaction.reply({ content: `❗ The **item** you are trying to smelt **does not exist**!`, ephemeral: true });

		const oreAmount = maidObj[item.keyName];

		const notEnoughOreEmbed = new EmbedBuilder()
			.setColor(`#2F3132`)
			.setTitle(`<a:Blast_Furnace:920484500461473833> Smelting - ${commafy(amount)}x \`${item.name}\``)
			.setDescription(`Smelting Materials:\n> <:cross:885408206959046678> **${commafy(oreAmount)}x**/**${commafy(amount)}x** ${item.emoji.name} \`${item.name.toLowerCase()}\`\n> ${coal < amount * 5 ? `<:cross:885408206959046678>` : `<:check:885408207097462786>`} ${commafy(coal)}/${commafy(amount * 5)} <:Coal:816982880802439178> \`coal\`\n\n${interaction.user}, you are missing some materials to smelt your ore!`);

		const notEnoughCoalEmbed = new EmbedBuilder()
			.setColor(`#2F3132`)
			.setTitle(`<a:Blast_Furnace:920484500461473833> Smelting - ${commafy(amount)}x \`${item.name.toLowerCase()}\``)
			.setDescription(`Smelting Materials:\n> <:cross:885408206959046678> **${commafy(oreAmount)}x**/**${commafy(amount)}x** ${item.emoji.name} \`${item.name.toLowerCase()}\`\n> <:cross:885408206959046678> **${commafy(coal)}x**/**${commafy(amount * 5)}x** <:Coal:816982880802439178> \`coal\`\n\n${interaction.user}, you are missing some materials to smelt your ore!`);

		if (oreAmount < amount) return interaction.reply({ embeds: [notEnoughOreEmbed] });		
				
		if (coal < (amount * 5)) return interaction.reply({ embeds: [notEnoughCoalEmbed] });

		const smeltingEmbed = new EmbedBuilder()
			.setColor(`#2F3132`)
			.setTitle(`<a:Blast_Furnace:920484500461473833> Smelting - ${commafy(amount)}x \`${item.name.toLowerCase()}\``)
			.setDescription(`Smelting Materials:\n> <:check:885408207097462786> **${commafy(oreAmount)}x**/**${commafy(amount)}x** ${item.emoji.name} \`${item.name.toLowerCase()}\`\n> <:check:885408207097462786> **${commafy(coal)}x**/**${commafy(amount * 5)}x** <:Coal:816982880802439178> \`coal\`\n\n${interaction.user}, do you want to consume these materials to smelt **${commafy(amount)}x** ${item.emoji.name} \`${item.name.toLowerCase()}\`?`);

		const confirmation = new Confirmation(
			interaction, 
			{ embeds: [smeltingEmbed] }
		);

		confirmation.on('check', async (_button, sent) => {
			const smelted =	item.smeltable.output.keyName;
	
			maidObj[item.keyName] -= amount;
			maidObj.coal -= (amount * 5);
			maidObj[smelted] += (amount * (item.smeltable?.amount ?? 0));

			const smeltingConfirmedEmbed = new EmbedBuilder()
				.setColor(`#2F3132`)
				.setTitle(`<a:Blast_Furnace:920484500461473833> Smelting - ${commafy(amount)}x \`${item.name.toLowerCase()}\``)
				.setDescription(`<:check:885408207097462786> You smelted **${commafy(amount)}x** \`${item.name.toLowerCase()}\`, consuming **${commafy(amount * 5)}x** <:Coal:816982880802439178> \`coal\``);

			await sent.edit({ embeds: [smeltingConfirmedEmbed] });
			await db.set(maid, maidObj);

			interaction.client.confirmations.set(interaction.user.id, false);
		});
		
		confirmation.on('cross', async (_button, sent) => {
			const smeltingCancelledEmbed = new EmbedBuilder()
				.setColor(`#2F3132`)
				.setTitle(`<a:Blast_Furnace:920484500461473833> Smelting - ${commafy(amount)}x \`${item.name.toLowerCase()}\``)
				.setDescription(`<:cross:885408206959046678> Smelting cancelled!`);

			await sent.edit({ embeds: [smeltingCancelledEmbed] });

			interaction.client.confirmations.set(interaction.user.id, false);
		});
		
		confirmation.on('error', async (_error, sent) => {
			const smeltingCancelledEmbed = new EmbedBuilder()
				.setColor(`#2F3132`)
				.setTitle(`<a:Blast_Furnace:920484500461473833> Smelting - ${commafy(amount)}x \`${item.name.toLowerCase()}\``)
				.setDescription(`<:cross:885408206959046678> Smelting cancelled!`);

			await sent.edit({ embeds: [smeltingCancelledEmbed] });

			interaction.client.confirmations.set(interaction.user.id, false);
		});
	}
};