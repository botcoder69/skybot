/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { SelectMenuConfirmation, Paginator } = require('../../SkyblockHelper/src/index.js');

const tutorialEmbed = new EmbedBuilder()
	.setColor(`#2f3136`)
	.setTitle('Barn')
	.setDescription('This allows you to interact with the Skybot Barn.')
	.addFields(
		{ name: `Help Argument`, value: `This gives you help on the enclosures inside the barn.` },
		{ name: `Switch Argument`, value: `This allows you to freely switch between enclosures.` }
	);

const enclosures = [
	new EmbedBuilder()	
		.setColor(`#2f3136`)
		.setTitle('📍 Enclosure - Cow Enclosure')
		.setDescription('This enclosure is where all the Cows are in. Here, you can get Raw Beef')
		.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/d/d9/The_Barn.png/revision/latest?cb=20210423112058'),
	new EmbedBuilder()	
		.setColor(`#2f3136`)
		.setTitle('📍 Enclosure - Pig Enclosure')
		.setDescription('This enclosure is where all the Pigs are in. Here, you can get Raw Porkchop')
		.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/d/d9/The_Barn.png/revision/latest?cb=20210423112058'),
	new EmbedBuilder()	
		.setColor(`#2f3136`)
		.setTitle('📍 Enclosure - Sheep Enclosure')
		.setDescription('This enclosure is where all the Sheep are in. Here, you can get Raw Mutton')
		.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/d/d9/The_Barn.png/revision/latest?cb=20210423112058'),
	new EmbedBuilder()	
		.setColor(`#2f3136`)
		.setTitle('📍 Enclosure - Chicken Enclosure')
		.setDescription('This enclosure is where all the Chickens are in. Here, you can get Raw Chicken')
		.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/d/d9/The_Barn.png/revision/latest?cb=20210423112058')
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`barn`)
		.setDescription(`Interacts with the Skybot barn.`)
		.addSubcommand(subcommand => subcommand
			.setName(`list`)
			.setDescription(`Lists all enclosures in the Skybot barn.`)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`switch`)
			.setDescription(`Switches to another enclosure in the Skybot barn.`)
		),
	group: `Islands`,
	tutorial: {
		embeds: [tutorialEmbed],
		key: `barn`
	},
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
		const command = interaction.options.getSubcommand();

		if (command === 'list') {
			await Paginator(interaction, enclosures);
		} else if (command === 'switch') {
			const selectOptions = [
				{
					label: `Cow Enclosure`,
					description: `The enclosure of Cows.`,
					emoji: `<:Cow:953484829935173652>`,
					value: `cow`,
					default: true,
					disabled: false,
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Barn Enclosure: Cow Enclosure`)
								.setDescription(`The first enclosure you will see, this is where you ~~kill~~ keel Cows.\n\nDrops:\n> <:Raw_Beef:953470247292244038>`)
						]
					},
				},
				{
					label: `Pig Enclosure`,
					description: `The enclosure of Pigs.`,
					emoji: `<:Pig:953484801925578752>`,
					value: `pig`,
					default: false,
					disabled: false,
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Barn Enclosure: Pig Enclosure`)
								.setDescription(`The second enclosure you will see, this is where you ~~kill~~ keel Pigs.\n\nDrops:\n> <:Raw_Porkchop:953469999509545000>`)
						]
					},
				},
				{
					label: `Sheep Enclosure`,
					description: `The enclosure of Sheep.`,
					emoji: `<:Sheep:953484839292653578>`,
					value: `sheep`,
					default: false,
					disabled: false,
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Barn Enclosure: Sheep Enclosure`)
								.setDescription(`The third enclosure you will see, this is where you ~~kill~~ keel Sheep.\n\nDrops:\n> <:Raw_Mutton:953484740571299970>`)
						]
					},
				},
				{
					label: `Chicken Enclosure`,
					description: `The enclosure of Chickens.`,
					emoji: `<:Chicken:953484815255093318>`,
					value: `chicken`,
					default: false,
					disabled: false,
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Barn Enclosure: Chicken Enclosure`)
								.setDescription(`The last enclosure you will see, this is where you ~~kill~~ keel Chickens.\n\nDrops:\n> <:Raw_Chicken:953470062302474250>`)
						]
					},
				}
			];

			const confirmation = new SelectMenuConfirmation()
				.setCollectorTimeout(15_000)
				.setInteractionInstance(interaction)
				.setMenuMessage(selectOptions[0].message)
				.setMenuOptions(selectOptions);

			confirmation.on('confirmed', async (sent, selected) => {
				const [enclosure] = selected;
				maidObj.enclosure = enclosure;

				const displayName = selectOptions.find(option => option.value === selected[0]).label ?? `LMAO`;

				const confirmEmbed = new EmbedBuilder()
					.setColor(`Green`)
					.setTitle(`Successful Barn Switch: ${displayName}`)
					.setDescription(`You have successfully switched to the \`${displayName}\`!`);	

				await sent.edit({ embeds: [confirmEmbed], components: [] });

				await db.set(maid, maidObj);
			});
			
			confirmation.on('expired', async sent => {
				const expiredEmbed = new EmbedBuilder()
					.setColor(`Yellow`)
					.setTitle(`Expired Barn Switch`)
					.setDescription(`You ran out of time!`);
				
				await sent.edit({ embeds: [expiredEmbed], components: [] });
			});

			await confirmation.runConfirmationMenu();
		}
	}
};