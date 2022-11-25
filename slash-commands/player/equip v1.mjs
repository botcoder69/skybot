/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { FuzzySearchUtil, Confirmation, Functions: { keepOldObjectProperty }, Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`equip`)
		.setDescription(`Equips an item from your inventory!`)
		.addStringOption(option => option
			.setName(`item`)
			.setDescription(`The item you want to equip`)
			.setRequired(true)
		),
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

		const toolMap = interaction.client.assetMap.filter(asset => 'equipData' in asset && asset.equipData);
		const toolToEquip = FuzzySearchUtil.searchAndReturn(
			toolMap,
			interaction.options.getString(`item`)
		);

		if (!toolToEquip) return interaction.reply({ content: `❗ The tool you wanted to equip **does not exist**!` });

		if (!(maidObj[toolToEquip.keyName]?.length ?? maidObj[toolToEquip.keyName])) return interaction.reply({ content: `❗ You have **0x** ${toolToEquip.displayEmojiName()} \`${toolToEquip.name.toLowerCase()}\`!` });

		if (toolToEquip.group === `Power-up`) {
			const confirmation = new Confirmation(
				interaction,
				{ embeds: [
					new EmbedBuilder()
						.setColor(`YELLOW`)
						.setTitle(`Equipping - \`${toolToEquip.name}\``)
						.setThumbnail(toolToEquip.emoji.url)
						.setDescription(`${interaction.user}, are you sure you want to equip your ${toolToEquip.emoji.name} \`${toolToEquip.name.toLowerCase()}\`?`)
				] }
			);

			// \n\nNOTE: This is still experimental. Any data saved with the old sword will be overwritten with the new sword. Keep in mind that swords with item abilites (like the :Aspect_Of_The_Spirit_Butterfly: Aspect of the Spirit Butterfly) will get their data overwriiten with the new sword (All the data will be replaced, causing you to lose all the stats)
	
			confirmation.on('check', async (_button, sent) => {
				const confirmEmbed = new EmbedBuilder()
					.setColor(`GREEN`)
					.setTitle(`Equipping - \`${toolToEquip.name}\``)
					.setThumbnail(toolToEquip.emoji.url)
					.setDescription(`<:check:885408207097462786> You equipped your ${toolToEquip.emoji.name} \`${toolToEquip.name.toLowerCase()}\``);
				
				await sent.edit({ embeds: [confirmEmbed] });

				const eqData = toolToEquip.equipData.value;
	
				if (!maidObj.activeItems) {
					maidObj.activeItems = [
						{
							name: eqData.name,
							keyName: eqData.keyName,
							emoji: eqData.emoji,
							endTimestamp: Date.now() + eqData.expAfter
						}
					];
				} else {
					maidObj.activeItems.push(
						{
							name: eqData.name,
							keyName: eqData.keyName,
							emoji: eqData.emoji,
							endTimestamp: Date.now() + eqData.expAfter
						}
					);
				}

				maidObj[toolToEquip.keyName] -= 1;
				
				await db.set(maid, maidObj);
			});
	
			confirmation.on('cross', async (_button, sent) => {
				const confirmEmbed = new EmbedBuilder()
					.setColor(`RED`)
					.setTitle(`Equipping - \`${toolToEquip.name}\``)
					.setThumbnail(toolToEquip.emoji.url)
					.setDescription(`<:cross:885408206959046678> Equip cancelled!`);
				
				await sent.edit({ embeds: [confirmEmbed] });
			});
	
			confirmation.on('error', async (error, sent) => {
				const confirmEmbed = new EmbedBuilder()
					.setColor(`RED`)
					.setTitle(`Equipping - \`${toolToEquip.name}\``)
					.setThumbnail(toolToEquip.emoji.url)
					.setDescription(`<:cross:885408206959046678> Equip cancelled!`);
				
				await sent.edit({ embeds: [confirmEmbed] });
			});
		} else if (toolToEquip.group === 'Sword' || toolToEquip.group === 'Tool' || toolToEquip.group === 'Armor') {
			const toolToRemove = toolMap.find(tool => {
				const data = toolToEquip.group === 'Sword'
					? maidObj[toolToEquip.equipData.key]?.keyName
					: maidObj[toolToEquip.equipData.key];

				const value = toolToEquip.group === 'Sword'
					? tool.keyName
					: tool.displayEmojiName();

				return value === data;
			});
	
			if (!toolToRemove && !(toolToEquip instanceof Armor)) throw new Error('Unable to get toolToRemove!');
	
			if (!maidObj[toolToEquip.keyName]) return interaction.reply({ content: `❗ You dont have any ${toolToEquip.emoji.name} \`${toolToEquip.name.toLowerCase()}\` to equip!` });
	
			const confirmation = new Confirmation(
				interaction,
				{ embeds: [
					new EmbedBuilder()
						.setColor(`YELLOW`)
						.setTitle(`Equipping - \`${toolToEquip.name}\``)
						.setThumbnail(toolToEquip.emoji.url)
						.setDescription(`${interaction.user}, are you sure you want to equip your ${toolToEquip.emoji.name} \`${toolToEquip.name.toLowerCase()}\`?\n\nNOTE: This is still experimental. Any data saved with the old sword will be overwritten with the new sword. Keep in mind that swords with item abilites (like the :Aspect_Of_The_Spirit_Butterfly: Aspect of the Spirit Butterfly) may get their data overwriiten with the new sword (All the data may be replaced, causing you to lose all the stats)`)
				] }
			);
	
			confirmation.on('check', async (_button, sent) => {
				const confirmEmbed = new EmbedBuilder()
					.setColor(`GREEN`)
					.setTitle(`Equipping - \`${toolToEquip.name}\``)
					.setThumbnail(toolToEquip.emoji.url)
					.setDescription(`<:check:885408207097462786> You equipped your ${toolToEquip.emoji.name} \`${toolToEquip.name.toLowerCase()}\``);
				
				if (maidObj[toolToEquip.equipData.key]) maidObj[toolToRemove.keyName] += 1;
				maidObj[toolToEquip.keyName] -= 1;

				if (toolToEquip.group === 'Sword') {
					maidObj[toolToEquip.equipData.key] = keepOldObjectProperty(maidObj[toolToEquip.equipData.key], toolToEquip.equipData.value, ['spiritButterflies', 'enchantments']);
				} else {
					maidObj[toolToEquip.equipData.key] = toolToEquip.equipData.value;
				}

				await db.set(maid, maidObj);

				await sent.edit({ embeds: [confirmEmbed] });
			});
	
			confirmation.on('cross', async (_button, sent) => {
				const confirmEmbed = new EmbedBuilder()
					.setColor(`RED`)
					.setTitle(`Equipping - \`${toolToEquip.name}\``)
					.setThumbnail(toolToEquip.emoji.url)
					.setDescription(`<:cross:885408206959046678> Equip cancelled!`);
				
				await sent.edit({ embeds: [confirmEmbed] });
			});
	
			confirmation.on('error', async (error, sent) => {
				const confirmEmbed = new EmbedBuilder()
					.setColor(`RED`)
					.setTitle(`Equipping - \`${toolToEquip.name}\``)
					.setThumbnail(toolToEquip.emoji.url)
					.setDescription(`<:cross:885408206959046678> Equip cancelled!`);
				
				await sent.edit({ embeds: [confirmEmbed] });
			});
		}
	}
};