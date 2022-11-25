
/* eslint-disable no-unused-vars */
const { Message, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, ChatInputCommandInteraction, ComponentType, SelectMenuOptionBuilder } = require('discord.js');
const SkyblockHelperError = require('../errors/SkyblockHelperError');
const CategoryPaginatorGroup = require('./CategoryPaginatorGroup');

class CategoryPaginator {
	constructor() {
		/**
		 * The message instance the `CategoryPaginator` will use.
		 * @type {ChatInputCommandInteraction}
		 */
		this.interaction = null;

		/**
		 * The groups the `CategoryPaginator` will use
		 * @type {CategoryPaginatorGroup<boolean>[]}
		 */
		this.groups = [];

		/**
		 * The amount of idle time the collector will wait before timing out.
		 * @type {number}
		 */
		this.collectorTimeout = 15_000;
	}

	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	setInteractionInstance(interaction) {
		this.interaction = interaction;
		
		return this;
	}

	/**
	 * 
	 * @param {CategoryPaginatorGroup<boolean>} group 
	 */
	addGroup(group) {
		this.groups.push(group);
		
		return this;
	}

	/**
	 * 
	 * @param {...CategoryPaginatorGroup<boolean>} groups
	 */
	addGroups(...groups) {
		this.groups.push(groups);
		this.groups = this.groups.flat(Infinity);
		
		return this;
	}

	/**
	 * 
	 * @param {...CategoryPaginatorGroup<boolean>} groups
	 */
	setGroups(...groups) {
		this.groups = groups;
		this.groups = this.groups.flat(Infinity);
		
		return this;
	}

	/**
	 * 
	 * @param {number} idle
	 */
	setCollectorTimeout(idle) {
		this.collectorTimeout = parseInt(idle);
		
		return this;
	}

	async runCategoryPaginator() {
		if (!this.interaction || !(this.interaction instanceof ChatInputCommandInteraction)) throw new SkyblockHelperError(`The "interaction" of a CategoryPaginator must be a valid instance of the Discord.js ChatInputCommandInteraction class!`, `INTERACTION_INSTANCE_VALUE`);

		if (!this.groups) throw new SkyblockHelperError(`The groups of a CategoryPaginator must be a valid array!`);

		const { interaction } = this;

		const selectRowOptions = this.groups.map((group, index) => {
			if (!group.label) throw new SkyblockHelperError(`The group on CategoryPaginator.groups[${index}] has no label!`, `PAGINATOR_GROUP_LABEL`);

			const option = new SelectMenuOptionBuilder()
				.setLabel(group.label)
				.setValue(group.label)
				.setDefault(group.default ?? false);

			if (group.description) option.setDescription(group.description ?? null);
			if (group.emoji) option.setEmoji(group.emoji ?? null);

			return option;	
		});

		const selectRow = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('selectMenu')
					.setOptions(selectRowOptions)
			);

		const disabledSelectRow = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('selectMenu')
					.setOptions(selectRowOptions)
					.setDisabled(true)
			);

		const forwardEnabledRow = new ActionRowBuilder()
			.addComponents([
				new ButtonBuilder()
					.setCustomId(`fastBackward`)
					.setEmoji(`⏪`)
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`backward`)
					.setEmoji(`◀`)
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`forward`)
					.setEmoji(`▶`)
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(`fastForward`)
					.setEmoji(`⏩`)
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(`endInteraction`)
					.setLabel(`End Interaction`)
					.setStyle(ButtonStyle.Secondary)
			]);

		const backwardEnabledRow = new ActionRowBuilder()
			.addComponents([
				new ButtonBuilder()
					.setCustomId(`fastBackward`)
					.setEmoji(`⏪`)
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(`backward`)
					.setEmoji(`◀`)
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(`forward`)
					.setEmoji(`▶`)
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`fastForward`)
					.setEmoji(`⏩`)
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`endInteraction`)
					.setLabel(`End Interaction`)
					.setStyle(ButtonStyle.Secondary)
			]);

		const allEnabledRow = new ActionRowBuilder()
			.addComponents([
				new ButtonBuilder()
					.setCustomId(`fastBackward`)
					.setEmoji(`⏪`)
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(`backward`)
					.setEmoji(`◀`)
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(`forward`)
					.setEmoji(`▶`)
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(`fastForward`)
					.setEmoji(`⏩`)
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId(`endInteraction`)
					.setLabel(`End Interaction`)
					.setStyle(ButtonStyle.Secondary)
			]);

		const partialEnabledRow = new ActionRowBuilder()
			.addComponents([
				new ButtonBuilder()
					.setCustomId(`fastBackward`)
					.setEmoji(`⏪`)
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`backward`)
					.setEmoji(`◀`)
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`forward`)
					.setEmoji(`▶`)
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`fastForward`)
					.setEmoji(`⏩`)
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`endInteraction`)
					.setLabel(`End Interaction`)
					.setStyle(ButtonStyle.Secondary)
			]);

		const noEnabledRow = new ActionRowBuilder()
			.addComponents([
				new ButtonBuilder()
					.setCustomId(`fastBackward`)
					.setEmoji(`⏪`)
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`backward`)
					.setEmoji(`◀`)
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`forward`)
					.setEmoji(`▶`)
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`fastForward`)
					.setEmoji(`⏩`)
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`endInteraction`)
					.setLabel(`End Interaction`)
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true)
			]);


		const group = this.groups.find(group => group.label === selectRowOptions.find(option => option.data.default === true).data.label);

		if (!group) throw new SkyblockHelperError(`A CategoryPaginator's group must have at least one default group!`, `GROUP_DEFAULT_RANGE`);

		if (group.messages.length === 1) {
			group.messages[0].components = [selectRow, partialEnabledRow];
		} else {
			group.messages[0].components = [selectRow, forwardEnabledRow];
		}

		await interaction.reply(group.messages[0]);

		/** @type {Message} */
		const sent = await interaction.fetchReply();

		const filter = i => i.user.id === interaction.user.id;

		const buttonCollector = sent.createMessageComponentCollector({ filter, componentType: ComponentType.Button, idle: this.collectorTimeout });
		const selectCollector = sent.createMessageComponentCollector({ filter, componentType: ComponentType.SelectMenu });

		let { messages } = group;

		/** 
			 * This variable contains the index of the message on the page displayed.
			 */
		let index = 0;

		buttonCollector.on(`collect`, async button => {
			if (button.customId === `fastBackward`) {
				// Since its fastBackward, we send the first page, which is index 0. 		
				index = 0;

				messages[index].components = [selectRow, forwardEnabledRow];

				// Since its fastBackward, we also edit the components to the forwardEnabledRow, there is no point in using backward since the page displayed is the first page.
				await button.update(messages[index]);
			} else if (button.customId === `backward`) {
				// Since its backward, we send the page earlier, which has an index lower by 1 than the page displayed.
				index -= 1;

				if (index === 0) {
					// If we hit the first page (which is index 0), we edit the components to the forwardEnabledRow, since you cant go backward anymore.
					messages[index].components = [selectRow, forwardEnabledRow];
				} else {
					// If we hit a page higher than 0 (forward takes care of the index hitting the last index), we edit the components to the allEnabledRow, since you can go backward and forward.
					messages[index].components = [selectRow, allEnabledRow];
				}
					
				await button.update(messages[index]);
			} else if (button.customId === `forward`) {
				// Since its forward, we send the page later, which has an index higher by 1 than the page displayed.
				index += 1;

				if (messages.length === index + 1) {
					// If we hit the last page (which is the length of the array minus 1), we edit the components to the backwardEnabledRow, since you cant go forward anymore.
					messages[index].components = [selectRow, backwardEnabledRow];
				} else {
					// If we hit a page below the last index (backward takes care of the index hitting 0), we edit the components to the allEnabledRow, since you can go forward and backward.
					messages[index].components = [selectRow, allEnabledRow];
				}

				await button.update(messages[index]);
			} else if (button.customId === `fastForward`) {
				// Since its fastForward, we send the last page, which has an index of (the length of the array - 1) => (group.messages.length - 1)
				index = messages.length - 1;

				messages[index].components = [selectRow, backwardEnabledRow];

				await button.update(messages[index]);
			} else if (button.customId === `endInteraction`) {
				// If the user wants to end the interaction, we send the noEnabledRow, which ends the interaction and makes the buttons unclickable.
				await button.update({ components: [disabledSelectRow, noEnabledRow] });

				selectCollector.stop(`end_interaction`);
				buttonCollector.stop(`end_interaction`);
			}
		});

		buttonCollector.on('end', async () => {
			await interaction.editReply({ components: [disabledSelectRow, noEnabledRow] });
		});

		selectCollector.on('collect', async selectMenu => {
			const [selected] = selectMenu.values;

			const group = this.groups.find(group => group.label === selected);

			({ messages } = group);

			const newSelectOptions = [];
			for (const option of selectRowOptions) {
				option.data.default = false;

				newSelectOptions.push(option);
			}

			const option = selectRowOptions.find(option => option.data.label === selected);
			option.data.default = true;

			selectRow.setComponents(
				new SelectMenuBuilder()
					.setCustomId('selectMenu')
					.setOptions(newSelectOptions)
			);

			disabledSelectRow.setComponents(
				new SelectMenuBuilder()
					.setCustomId('selectMenu')
					.setOptions(newSelectOptions)
					.setDisabled(true)
			);

			if (messages.length === 1) {
				messages[0].components = [selectRow, partialEnabledRow];
			} else {
				messages[0].components = [selectRow, forwardEnabledRow];
			}

			buttonCollector.resetTimer({ idle: this.collectorTimeout });

			await selectMenu.update(messages[0]);

			index = 0;
		});
	}
}

module.exports = CategoryPaginator;
