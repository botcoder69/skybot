/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { FuzzySearchUtil, Confirmation, Functions: { keepOldObjectProperty }, Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`equip`)
		.setDescription(`Equips/Uses an "equipable item" from your inventory!`)
		.addStringOption(option => option
			.setName(`item`)
			.setDescription(`The item you want to equip/use`)
			.setRequired(true)
		)
		.addUserOption(option => option
			.setName(`target`)
			.setDescription(`The target of the item you want to equip/use (if applicable)`)
			.setRequired(false)
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

		const target = interaction.options.getUser('target');

		const equipableMap = interaction.client.assetMap.filter(asset => 'onEquip' in asset);
		const itemToEquip = FuzzySearchUtil.searchAndReturn(
			equipableMap,
			interaction.options.getString(`item`, true)
		);



		if (!itemToEquip) return interaction.reply({ content: `❗ The item you wanted to equip **does not exist**!`, ephemeral: true });

		if (!(maidObj[itemToEquip.keyName]?.length ?? maidObj[itemToEquip.keyName])) return interaction.reply({ content: `❗ You have **0x** ${itemToEquip.displayEmojiName()} \`${itemToEquip.name.toLowerCase()}\`!`, ephemeral: true });

		if (itemToEquip.requireTarget && !target) return interaction.reply({ content: `❗ The item you wanted to equip **requires a target**!`, ephemeral: true });

		if (itemToEquip.requireTarget && target.bot) return interaction.reply({ content: `❗ The item you wanted to equip **requires a proper user target**!`, ephemeral: true });



		if (itemToEquip.levelReq) {
			const skillResolver = {
				Foraging: `chopLevel`,
				Mining: `mineLevel`,
				Fishing: `fishLevel`,
				Combat: `combatLevel`
			};

			const skillEmojiResolver = {
				Foraging: `<:Foraging:885390554291122206>`,
				Mining: `<:Mining:885390554198868020>`,
				Fishing: `<:Fishing:885390554450501632>`,
				Combat: `<:Combat:946253940863942687>`
			};

			if (maidObj[skillResolver[itemToEquip.levelReq.skill]] < itemToEquip.levelReq.level) return interaction.reply({ content: `❗ You need ${skillEmojiResolver[itemToEquip.levelReq.skill]} **${itemToEquip.levelReq.skill} Level ${itemToEquip.levelReq.level}** to equip this item!`, ephemeral: true });
		}

		const itemToRemove = equipableMap.find(item => {
			// Power-ups should stack, therefore they shouldn't be removed.
			if (itemToEquip.group === `Power-up`) return false;

			// console.log(`maidObj[${itemToEquip?.key}] => ${maidObj[itemToEquip?.key]}`);

			// Get the users currently equipped item
			const currentlyEquippedItemData = maidObj[itemToEquip?.key];

			// console.log(currentlyEquippedItemData);

			const emojiOfItemToRemove = itemToEquip.group === `Sword`
				// Swords usually have an OBJECT working for them, so we get the emoji of that object.
				? currentlyEquippedItemData.emoji
				// Tools and Armor only have their emoji, so Swords have to adjust to them.
				: currentlyEquippedItemData;

			// console.log(`${item.displayEmojiName()} === ${emojiOfItemToRemove}; => ${item.displayEmojiName() === emojiOfItemToRemove}`);

			// Find the item emoji that matches the emoji of the item to remove. This is why it's dangerous to repeat emojis.
			return item.displayEmojiName() === emojiOfItemToRemove;
		});
	
		if (!maidObj[itemToEquip.keyName]) return interaction.reply({ content: `❗ You dont have any ${itemToEquip.emoji.name} \`${itemToEquip.name.toLowerCase()}\` to equip!`, ephemeral: true });
	
		const confirmation = new Confirmation(
			interaction,
			{ 
				embeds: [
					new EmbedBuilder()
						.setColor(`Yellow`)
						.setTitle(`Equipping - \`${itemToEquip.name}\``)
						.setThumbnail(itemToEquip.emoji.url)
						.setDescription(`${interaction.user}, are you sure you want to equip your ${itemToEquip.emoji.name} \`${itemToEquip.name.toLowerCase()}\`?\n\nNOTE: This is still experimental. Any data saved with the old sword will be overwritten with the new sword. Keep in mind that swords with item abilites (like the :Aspect_Of_The_Spirit_Butterfly: Aspect of the Spirit Butterfly) may get their data overwriiten with the new sword (All the data may be replaced, causing you to lose all the stats)`)
				],
				ephemeral: true
			}
		);
	
		confirmation.on('check', async (_button, sent) => {
			const confirmEmbed = new EmbedBuilder()
				.setColor(`Green`)
				.setTitle(`Equipping - \`${itemToEquip.name}\``)
				.setThumbnail(itemToEquip.emoji.url)
				.setDescription(`<:check:885408207097462786> You equipped your ${itemToEquip.emoji.name} \`${itemToEquip.name.toLowerCase()}\``);
				
			if (itemToRemove) maidObj[itemToRemove.keyName] += 1;
			maidObj[itemToEquip.keyName] -= 1;

			await itemToEquip.onEquip(interaction, maidObj);

			await db.set(maid, maidObj);

			await interaction.editReply({ embeds: [confirmEmbed], components: [] });
		});
	
		confirmation.on('cross', async (_button, sent) => {
			const confirmEmbed = new EmbedBuilder()
				.setColor(`Red`)
				.setTitle(`Equipping - \`${itemToEquip.name}\``)
				.setThumbnail(itemToEquip.emoji.url)
				.setDescription(`<:cross:885408206959046678> Equip cancelled!`);
				
			await interaction.editReply({ embeds: [confirmEmbed], components: [] });
		});
	
		confirmation.on('error', async (error, sent) => {
			const confirmEmbed = new EmbedBuilder()
				.setColor(`Red`)
				.setTitle(`Equipping - \`${itemToEquip.name}\``)
				.setThumbnail(itemToEquip.emoji.url)
				.setDescription(`<:cross:885408206959046678> Equip cancelled!`);
				
			await interaction.editReply({ embeds: [confirmEmbed], components: [] });
		});
	}
};