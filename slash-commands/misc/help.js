/* eslint-disable no-unused-vars */
const { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, Collection, EmbedBuilder } = require('discord.js');
const { CategoryPaginator, CategoryPaginatorGroup, Functions } = require('../../SkyblockHelper/src/index');
const { developerIDs } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`help`)
		.setDescription(`Displays a list of Skybot's commands.`),
	group: `Misc`,
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const { slashCommands } = interaction.client;

		const currencyCommands = slashCommands.filter(slashCmd => slashCmd?.group?.toLowerCase?.() === 'currency');
		const islandsCommands = slashCommands.filter(slashCmd => slashCmd?.group?.toLowerCase?.() === 'islands');
		const miscCommands = slashCommands.filter(slashCmd => slashCmd?.group?.toLowerCase?.() === 'misc');
		const playerCommands = slashCommands.filter(slashCmd => slashCmd?.group?.toLowerCase?.() === 'player');
		const developerCommands = slashCommands.filter(slashCmd => slashCmd?.group?.toLowerCase?.() === 'developer');

		const currencyCommandData = formatSlashCommands(currencyCommands);
		const islandsCommandData = formatSlashCommands(islandsCommands);
		const miscCommandData = formatSlashCommands(miscCommands);
		const playerCommandData = formatSlashCommands(playerCommands);
		const developerCommandData = formatSlashCommands(developerCommands);

		const categoryPaginator = new CategoryPaginator()
			.setCollectorTimeout(15_000)
			.setInteractionInstance(interaction)
			.setGroups(
				new CategoryPaginatorGroup()
					.setDefault(true)
					.setLabel(`Currency`)
					.setEmoji(`<:Coins:885677584749318154>`)
					.addMessages(currencyCommandData),
				new CategoryPaginatorGroup()
					.setLabel(`Islands`)
					.setEmoji(``)
					.addMessages(islandsCommandData),
				new CategoryPaginatorGroup()
					.setLabel(`Misc.`)
					.setEmoji(`🔧`)
					.addMessages(miscCommandData),
				new CategoryPaginatorGroup()
					.setLabel(`Player`)
					.addMessages(playerCommandData)
			);

		if (developerIDs.includes(maid)) {
			categoryPaginator
				.addGroup(
					new CategoryPaginatorGroup()
						.setLabel('Developer')
						.setEmoji(`🛠`)
						.addMessages(developerCommandData)
				);
		}

		await categoryPaginator.runCategoryPaginator();
	}
};

/**
 * @param {Collection<string, import('discord.js').SlashCommand} collection 
 */
function formatSlashCommands(collection) {
	const data = collection
		.map(command => {
			const res = [];
		
			for (const option of command.data.options) {
				if (option instanceof SlashCommandSubcommandGroupBuilder) {
					for (const subcommand of option.options) {
						if (subcommand instanceof SlashCommandSubcommandBuilder) {
							res.push(`[**/${command.data.name} ${option.name} ${subcommand.name}**](https://www.youtube.com/watch?v=dQw4w9WgXcQ& "${subcommand.name}")\n<:Reply:949105560224157706> ${subcommand.description}`);
						}
					}
				} else if (option instanceof SlashCommandSubcommandBuilder) {
					res.push(`[**/${command.data.name} ${option.name}**](https://www.youtube.com/watch?v=dQw4w9WgXcQ& "${option.name}")\n<:Reply:949105560224157706> ${option.description}`);
				}
			}

			if (!res.length) res.push(`[**/${command.data.name}**](https://www.youtube.com/watch?v=dQw4w9WgXcQ& "${command.data.name}")\n<:Reply:949105560224157706> ${command.data.description}`);

			return res;
		})
		.flat(1);

	const dataString = Functions.sliceIntoChunks(data, 8)
		.map((slashCmdString, index, array) => {
			return {
				embeds: [
					new EmbedBuilder()
						.setDescription(slashCmdString.join('\n'))
						.setFooter({ text: `Page ${index + 1}/${array.length} | Heavily inspired by Dank Memer.` })
				]
			};
		});

	return dataString;
}