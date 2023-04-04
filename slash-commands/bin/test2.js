/* eslint-disable no-unused-vars */
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, ComponentType, SlashCommandBuilder, SelectMenuBuilder, SelectMenuOptionBuilder } = require('discord.js');
const SkyblockHelper = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`test2`)
		.setDescription(`Code base for new class`),
	group: `Developer`,
	developerOnly: true,
	/**
	 * @param {CommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const confirmRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`confirmSelectMenu`)
					.setLabel(`Confirm`)
					.setStyle(ButtonStyle.Success)
			);

		const disabledConfirmRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`confirmSelectMenu`)
					.setLabel(`Confirm`)
					.setStyle(ButtonStyle.Success)
					.setDisabled(true)
			);

		const selectRow = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId(`selectMenu`)
					.setPlaceholder(`Pick a card!`)
					.setOptions(
						new SelectMenuOptionBuilder()
							.setLabel(`Card1`)
							.setValue(`Card1_ID`),
						new SelectMenuOptionBuilder()
							.setLabel(`Card1`)
							.setValue(`Card2_ID`),
						new SelectMenuOptionBuilder()
							.setLabel(`Card1`)
							.setValue(`Card3_ID`),
					)
			);

		const buttonRow = selectRow.components[0].data.options.find(option => option.data.default)
			? confirmRow
			: disabledConfirmRow;

		const sent = await interaction.reply({ content: `test2`, components: [selectRow, buttonRow] });

		const selectCollector = sent.createMessageComponentCollector({ filter: i => i.user.id === interaction.user.id, componentType: ComponentType.SelectMenu, idle: this.collectorTimeout });
		const buttonCollector = sent.createMessageComponentCollector({ filter: i => i.user.id === interaction.user.id, componentType: ComponentType.Button, idle: this.collectorTimeout });

		let selected = selectRow.components[0].data.options.find(option => option.default)?.value;

		selectCollector.on('collect', selectMenu => {
			[selected] = selectMenu.values;

			selectCollector.resetTimer({ idle: this.collectorTimeout });
			buttonCollector.resetTimer({ idle: this.collectorTimeout });

			const disabledSelection = this.options.find(option => option.value === selected).disabled
				? true
				: false;

			// console.log(selectRow.components[0]);

			for (let i = 0; i < selectRow.components[0].options.length; i++) {
				selectRow.components[0].options[i].data.default = false;
			}

			selectRow.components[0].options[indexOfSelectMenu].data.default = true;

			const option = this.options.find(option => option.value === selected[0]);

			if (disabledSelection) {
				if (option.message) {
					option.message.components = [selectRow, disabledConfirmRow];

					const sentEdit = option.message; 
					selectMenu.update(sentEdit);
				} else {
					selectMenu.update({ components: [selectRow, disabledConfirmRow] });
				}
			} else {
				if (option.message) {
					option.message.components = [selectRow, confirmRow];

					const sentEdit = option.message; 
					selectMenu.update(sentEdit);
				} else {
					selectMenu.update({ components: [selectRow, confirmRow] });
				}
			}
		});

		buttonCollector.on('collect', () => {
			selectCollector.stop(`Event.confirmed`);
			buttonCollector.stop(`Event.confirmed`);

			super.emit(`confirmed`, sent, selected);
		});

		buttonCollector.on('end', (_collected, reason) => {
			for (let i = 0; i < selectRow.components[0].options.length; i++) {
				selectRow.components[0].options[i].default = false;
			}

			selectRow.components[0].options[indexOfSelectMenu].data.default = true;

			selectRow.components[0].data.disabled = true;
		
			sent.edit({ components: [selectRow, disabledConfirmRow] });

			if (reason !== `Event.confirmed`) super.emit(`expired`, sent, reason);
		});
	}
};