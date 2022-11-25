/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { SelectMenuConfirmation, Paginator, SkyblockTypes } = require('../../SkyblockHelper/src/index');

const floatingIslandsIslands = [
	new EmbedBuilder()
		.setColor(`#2f3136`)
		.setTitle('📍 Location - `Forest Plains`.')
		.setDescription('This place is where you start chopping trees, The Forest Plains. Here, the trees are oak and birch. You will gain access to higher level islands when you get <:Foraging:849535876357947412> Foraging Level 2')
		.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/6/61/ThePark.png/revision/latest?cb=20191203065930'),
	new EmbedBuilder()
		.setColor(`#2f3136`)
		.setTitle('📍 Location - `Roofed Forest`.')
		.setDescription('This place is where you start chopping dark oak trees. In this island, dark oak trees are the only type of tree that can grow here. You will gain access to higher level islands when you get <:Foraging:849535876357947412> Foraging Level 4')
		.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/6/61/ThePark.png/revision/latest?cb=20191203065930'),
	new EmbedBuilder()
		.setColor(`#2f3136`)
		.setTitle('📍 Location - `Snowy Taiga`.')
		.setDescription('This place is where you start chopping spruce trees. In this island, spruce trees are the only type of tree that can grow here. You will gain access to higher level islands when you get <:Foraging:849535876357947412> Foraging Level 6')
		.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/6/61/ThePark.png/revision/latest?cb=20191203065930'),
	new EmbedBuilder()
		.setColor(`#2f3136`)
		.setTitle('📍 Location - `Savanna Woodlands`.')
		.setDescription('This place is where you start chopping acacia trees. In this island, acacia trees are the only type of tree that can grow here. You will gain access to higher level islands when you get <:Foraging:849535876357947412> Foraging Level 8')
		.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/6/61/ThePark.png/revision/latest?cb=20191203065930'),
	new EmbedBuilder()
		.setColor(`#2f3136`)
		.setTitle('📍 Location - `Bamboo Jungle`.')
		.setDescription('This place is the last mine in the Floating Islands as of now. In this island, jungle trees are the only type of tree that can grow here. \n\nThis is the last island of the Floating Islands.')
		.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/6/61/ThePark.png/revision/latest?cb=20191203065930')
];

const tutorialEmbed = new EmbedBuilder()
	.setColor(`#2f3136`)
	.setTitle('Floating Islands (floatingislands)')
	.setDescription('This allows you to interact with the Skybot Floating Islands.')
	.addFields(
		{ name: `Help Argument`, value: `This gives you help on the islands included in the Floating Islands.` },
		{ name: `List Argument (DEPRECATED)`, value: `This lists all the mines currently included in the Floating Islands.` },
		{ name: `Switch Argument`, value: `This allows you to freely switch between islands, given that you have the proper Foraging Level to enter.` }
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`floatingislands`)
		.setDescription(`Interacts with the Floating Islands`)
		.addSubcommand(subcommand => subcommand
			.setName(`help`)
			.setDescription(`Gets information on all the islands inside the Floating Islands`)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`switch`)
			.setDescription(`Switches to another island inside the Floating Islands`)
		),
	group: `Islands`,
	tutorial: {
		embeds: [tutorialEmbed],
		key: `floatingislands`
	},
	require: {
		start: true,
		update: `>=v1.0.0`
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const command = interaction.options.getSubcommand();

		if (command === `help`) {
			await Paginator(interaction, floatingIslandsIslands);
		} else if (command === `switch`) {
			const { chopLevel } = maidObj;
			const selectOptions = [
				{
					label: `Forest Plains`,
					description: `Requires: Foraging Level 0`,
					emoji: `<:Tree:945601922537226281>`,
					value: `forest_plains`,
					default: true,
					disabled: chopLevel >= 0 ? false : true,
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Floating Islands: Forest Plains`)
								.setDescription(`The first cave of the deepmines, this is where you normally start.\n\nTrees:\n> <:Oak_Log:885390554005897237>\n> <:Birch_Log:885390554400165938>`)
						]
					}
				},
				{
					label: `Roofed Forest`,
					description: `Requires: Foraging Level 8`,
					emoji: `<:Tree:945601922537226281>`,
					value: `roofed_forest`,
					disabled: chopLevel >= 8 ? false : true,
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Floating Islands: Roofed Forest`)
								.setDescription(`The next cave of the deepmines, this is where you start to get iron.\n\nTrees:\n> <:Dark_Oak_Log:885390554362433587>`)
						]
					}
				},
				{
					label: `Snowy Taiga`,
					description: `Requires: Foraging Level 12`,
					emoji: `<:Tree:945601922537226281>`,
					value: `snowy_taiga`,
					disabled: chopLevel >= 12 ? false : true,
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Floating Islands: Snowy Taiga`)
								.setDescription(`The next cave of the deepmines, this is where you start to get gold.\n\nTrees:\n> <:Spruce_Log:885390554404380693>`)
						]
					}
				},
				{
					label: `Savanna Woodlands`,
					description: `Requires: Foraging Level 16`,
					emoji: `<:Tree:945601922537226281>`,
					value: `savanna_woodlands`,
					disabled: chopLevel >= 16 ? false : true,
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Floating Islands: Savanna Woodlands`)
								.setDescription(`The next cave of the deepmines, this is where you get acacia wood.\n\nTrees:\n> <:Acacia_Log:885390554471485480>`)
						]
					}
				},
				{
					label: `Bamboo Jungle`,
					description: `Requires: Foraging Level 20`,
					emoji: `<:Tree:945601922537226281>`,
					value: `bamboo_jungle`,
					disabled: chopLevel >= 20 ? false : true,
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Floating Islands: Bamboo Jungle`)
								.setDescription(`The last island of the floating islands, this is where you get jungle wood.\n\nTrees:\n> <:Jungle_Log:885390554240802817>`)
						]
					}
				}
			];
			
			const selectConfirmation = new SelectMenuConfirmation()
				.setCollectorTimeout(10_000)
				.setInteractionInstance(interaction)
				.setMenuMessage(selectOptions[0].message)
				.setMenuOptions(selectOptions);

			let displayName = `Forest Plains`;

			selectConfirmation.on(`confirmed`, async (sent, selected) => {
				displayName = selectOptions.find(option => option.value === selected[0]).label ?? `Starter Mine`;
				
				const confirmEmbed = new EmbedBuilder()
					.setColor(`Green`)
					.setTitle(`Successful Floating Islands Switch: ${displayName}`)
					.setDescription(`You have successfully switched to the \`${displayName}\`!`);				
				
				if (displayName === `Forest Plains`) {
					maidObj.forest = SkyblockTypes.SkyblockForests.Forest;
				} else if (displayName === `Roofed Forest`) {
					maidObj.forest = SkyblockTypes.SkyblockForests.RoofedForest;
				} else if (displayName === `Snowy Taiga`) {
					maidObj.forest = SkyblockTypes.SkyblockForests.Taiga;
				} else if (displayName === `Savanna Woodlands`) {
					maidObj.forest = SkyblockTypes.SkyblockForests.Savannah;
				} else if (displayName === `Bamboo Jungle`) {
					maidObj.forest = SkyblockTypes.SkyblockForests.Jungle;
				}

				await sent.edit({ embeds: [confirmEmbed], components: [] });

				await db.set(maid, maidObj);
			});

			selectConfirmation.on(`expired`, async sent => {
				const expiredEmbed = new EmbedBuilder()
					.setColor(`Yellow`)
					.setTitle(`Expired Deepmines Switch: ${displayName}`)
					.setDescription(`You ran out of time!`);
				
				await sent.edit({ embeds: [expiredEmbed], components: [] });
			});
			
			await selectConfirmation.runConfirmationMenu();

			await db.set(maid, maidObj);
		} 
	}
};