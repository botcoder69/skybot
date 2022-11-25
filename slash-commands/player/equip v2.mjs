/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { FuzzySearchUtil, Confirmation, Functions: { keepOldObjectProperty }, Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`equip`)
		.setDescription(`Equips/Uses an "equipable item" from your inventory!`)
		.addSubcommand(subcommand => subcommand
			.setName(`power-up`)
			.setDescription(`Uses a power-up from your inventory!`)
			.addStringOption(option => option
				.setName(`power-up`)
				.setDescription(`The power-up you want to use`)
				.setRequired(true)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`armor`)
			.setDescription(`Equips armor from your inventory`)
			.addStringOption(option => option
				.setName(`armor`)
				.setDescription(`The armor you want to equip`)
				.setRequired(true)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`tool`)
			.setDescription(`Equips a tool from your inventory`)
			.addStringOption(option => option
				.setName(`tool`)
				.setDescription(`The tool you want to equip`)
				.setRequired(true)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`sword`)
			.setDescription(`Equips a sword from your inventory`)
			.addStringOption(option => option
				.setName(`sword`)
				.setDescription(`The sword you want to equip`)
				.setRequired(true)
			)
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

		const toolMap = interaction.client.assetMap.filter(asset => 'equipData' in asset);
		const toolToEquip = FuzzySearchUtil.searchAndReturn(
			toolMap,
			interaction.options.getString(`item`, true)
		);

		if (!toolToEquip) return interaction.reply({ content: `❗ The tool you wanted to equip **does not exist**!`, ephemeral: true });

		if (!(maidObj[toolToEquip.keyName]?.length ?? maidObj[toolToEquip.keyName])) return interaction.reply({ content: `❗ You have **0x** ${toolToEquip.displayEmojiName()} \`${toolToEquip.name.toLowerCase()}\`!`, ephemeral: true });

		if (toolToEquip.levelReq) {
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

			if (maidObj[skillResolver[toolToEquip.levelReq.skill]] < toolToEquip.levelReq.level) return interaction.reply({ content: `❗ You need ${skillEmojiResolver[toolToEquip.levelReq.skill]} **${toolToEquip.levelReq.skill} Level ${toolToEquip.levelReq.level}** to equip this item!`, ephemeral: true });
		}

		const toolToRemove = toolMap.find(tool => {
			const maidObj = {
				sword: {}
			};
			const equipData = toolToEquip.onEquip(interaction, maidObj);



			const data = toolToEquip.group === 'Sword'
				? maidObj[equipData.key]?.keyName
				: maidObj[equipData.key];

			const value = toolToEquip.group === 'Sword'
				? tool.keyName
				: tool.displayEmojiName();

			return value === data;
		});
	
		if (!maidObj[toolToEquip.keyName]) return interaction.reply({ content: `❗ You dont have any ${toolToEquip.emoji.name} \`${toolToEquip.name.toLowerCase()}\` to equip!`, ephemeral: true });
	
		const confirmation = new Confirmation(
			interaction,
			{ embeds: [
				new EmbedBuilder()
					.setColor(`Yellow`)
					.setTitle(`Equipping - \`${toolToEquip.name}\``)
					.setThumbnail(toolToEquip.emoji.url)
					.setDescription(`${interaction.user}, are you sure you want to equip your ${toolToEquip.emoji.name} \`${toolToEquip.name.toLowerCase()}\`?\n\nNOTE: This is still experimental. Any data saved with the old sword will be overwritten with the new sword. Keep in mind that swords with item abilites (like the :Aspect_Of_The_Spirit_Butterfly: Aspect of the Spirit Butterfly) may get their data overwriiten with the new sword (All the data may be replaced, causing you to lose all the stats)`)
			] }
		);
	
		confirmation.on('check', async (_button, sent) => {
			const confirmEmbed = new EmbedBuilder()
				.setColor(`Green`)
				.setTitle(`Equipping - \`${toolToEquip.name}\``)
				.setThumbnail(toolToEquip.emoji.url)
				.setDescription(`<:check:885408207097462786> You equipped your ${toolToEquip.emoji.name} \`${toolToEquip.name.toLowerCase()}\``);
				
			if (toolToRemove) maidObj[toolToRemove.keyName] += 1;
			maidObj[toolToEquip.keyName] -= 1;

			toolToEquip.onEquip(interaction, maidObj);

			await db.set(maid, maidObj);

			await sent.edit({ embeds: [confirmEmbed] });
		});
	
		confirmation.on('cross', async (_button, sent) => {
			const confirmEmbed = new EmbedBuilder()
				.setColor(`Red`)
				.setTitle(`Equipping - \`${toolToEquip.name}\``)
				.setThumbnail(toolToEquip.emoji.url)
				.setDescription(`<:cross:885408206959046678> Equip cancelled!`);
				
			await sent.edit({ embeds: [confirmEmbed] });
		});
	
		confirmation.on('error', async (error, sent) => {
			const confirmEmbed = new EmbedBuilder()
				.setColor(`Red`)
				.setTitle(`Equipping - \`${toolToEquip.name}\``)
				.setThumbnail(toolToEquip.emoji.url)
				.setDescription(`<:cross:885408206959046678> Equip cancelled!`);
				
			await sent.edit({ embeds: [confirmEmbed] });
		});
	}
};