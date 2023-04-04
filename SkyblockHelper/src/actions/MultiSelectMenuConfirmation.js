
/* eslint-disable no-unused-vars */
const { SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder, ComponentType, ButtonBuilder, ButtonStyle } = require("discord.js");
const EventEmitter = require("events");
const MultiSelectMenuConfirmationOption = require('./MultiSelectMenuConfirmationOption');
const SkyblockHelperError = require('../errors/SkyblockHelperError');
// const Functions = require('./Functions');


class MultiSelectMenuConfirmation extends EventEmitter {
	constructor() {
		super();
		
		/**
		 * @type {MultiSelectMenuConfirmationOption[]}
		 */
		this.baseOptions = [];

		/**
		 * @type {string | import ('discord.js').MessagePayload | import ('discord.js').InteractionReplyOptions}
		 */
		this.menuMessage = null;

		/**
		 * @type {import ('discord.js').ChatInputCommandInteraction}
		 */
		this.interaction = null;

		this.collectorTimeout = 15_000;

		this.debugMode = false;

		this.confirmEnable = null;
	}

	/**
	 * @private
	 */
	normalizeOptions() {
		this.baseOptions = this.baseOptions.flat(Infinity);
	}

	/**
	 * @private
	 * @param {string} item 
	 */
	debug(message) {
		// eslint-disable-next-line no-console
		if (this.debugMode) console.log(message);
	}

	/**
	 * @private
	 * @param {MultiSelectMenuConfirmationOption} option
	 */
	// eslint-disable-next-line class-methods-use-this
	checkChildOptions(option) {
		const instanceofResFalse = option.childOptions
			.map((baseOption, index) => ({ res: baseOption instanceof MultiSelectMenuConfirmationOption, index: index }))
			.filter(res => !res.res);
		
		if (instanceofResFalse.length > 0) throw new SkyblockHelperError(`Item[${instanceofResFalse.map(res => res.index).join(', ')}] of property 'childOptions' of 'MultiSelectMenuConfirmationOption' (value: ${option.data.value}) must have a valid instance of 'MultiSelectMenuConfirmationOption'`, `MULTICONFIRMATION_INVALID_INSTANCE`);
	}

	/**
	 * @typedef ChildSelectMenuConfirmationOptionValue
	 * @property {number} longestLength
	 * @property {Map<string, ChildSelectMenuConfirmationOptionMapValue>} optionMap
	 */

	/**
	 * @typedef ChildSelectMenuConfirmationOptionMapValue
	 * @property {string} selectMenuId
	 * @property {MultiSelectMenuConfirmationOption[]} childOptions
	 */

	/**
	 * @private
	 * @returns {ChildSelectMenuConfirmationOptionValue}
	 */
	checkChildrenWithLength() {
		const optionMap = new Map();
		let longestLength = 0;

		// Check every single option inside baseOptions
		for (const baseOption of this.baseOptions) {
			// Check if the options inside childOptions of MultiSelectMenuConfirmationOption have incorrect instances
			this.checkChildOptions(baseOption);
			// Set the childOptions and the baseOption to the optionMap, for easier accessing.
			optionMap.set(baseOption.data.value, { selectMenuId: `childOption1`, childOptions: baseOption.childOptions });
			// If the old longest child length is lower than the new longest child length, set new child length to be the old one.
			if (longestLength < 1) longestLength = 1;

			// Check if baseOption has childOptions. this.checkChildOptions() ignores a blank childOptions.
			if (baseOption.childOptions.length > 0) {

				// Check every single childOption inside baseOptions and repeat cycle.
				for (const childOption1 of baseOption.childOptions) {
					this.checkChildOptions(childOption1);
					optionMap.set(childOption1.data.value, { selectMenuId: `childOption2`, childOptions: childOption1.childOptions });
					if (longestLength < 2) longestLength = 2;

					if (childOption1.childOptions.length > 0) {
						for (const childOption2 of childOption1.childOptions) {
							this.checkChildOptions(childOption2);
							optionMap.set(childOption2.data.value, { selectMenuId: `childOption3`, childOptions: childOption2.childOptions });
							if (longestLength < 3) longestLength = 3;

							if (childOption2.childOptions.length > 0) {
								for (const childOption3 of childOption2.childOptions) {
									this.checkChildOptions(childOption3);
									optionMap.set(childOption3.data.value, { selectMenuId: `childOption4`, childOptions: childOption3.childOptions });
									if (longestLength < 4) longestLength = 4;

									if (childOption3.childOptions.length > 0) throw new SkyblockHelperError(`The maximum child chaining length for this MultiSelectMenuConfirmation is 4.`, `CHILD_CHAINING_LENGTH`);
								}
							}
						}
					}
				}
			}
		}

		return { longestLength, optionMap };
	}

	resolveConfirmEnable(longestLength) {
		if (typeof this.confirmEnable === 'string') {
			const confirmEnableValue = this.confirmEnable.toLowerCase();

			if (confirmEnableValue === 'max') return longestLength;
			else if (['always', 'min'].includes(confirmEnableValue)) return 1; 
		} else if (typeof this.confirmEnable === 'number') return this.confirmEnable;
	}



	setBaseOptions(...options) {
		this.baseOptions = options;
		this.normalizeOptions();

		return this;
	}

	addBaseOptions(...options) {
		this.baseOptions.push(options);
		this.normalizeOptions();

		return this;
	}

	/**
	 * Sets the message object that will be displayed with the SelectMenu. If this message object has components, it will be replaced.
	 * @param {string | import ('discord.js').MessagePayload | import ('discord.js').InteractionReplyOptions} message 
	 */
	setMenuMessage(message) {
		if (typeof message === 'string') message = { content: message };
		this.menuMessage = message;
		
		return this;
	}

	/**
	 * Sets the instance of `ChatInputCommandInteraction` the `SelectMenuConfirmation` is going to use.
	 * @param {ChatInputCommandInteraction}
	 */
	setInteractionInstance(interaction) {
		this.interaction = interaction;
		
		return this;
	}

	/**
	 * Sets the number of milliseconds the collector waits for interactions. 
	 * @param {number}
	 */
	setCollectorTimeout(timeout) {
		this.collectorTimeout = timeout;
		
		return this;
	}

	setDebugMode(debugMode) {
		this.debugMode = debugMode;

		return this;
	}

	setConfirmEnable(confirmEnableAt) {
		this.confirmEnable = confirmEnableAt;

		return this;
	}

	async runConfirmationMenu() {
		const instanceofResFalse = this.baseOptions
			.map((baseOption, index) => ({ res: baseOption instanceof MultiSelectMenuConfirmationOption, index: index }))
			.filter(res => !res.res);
		



		if (!this.baseOptions.length) throw new SkyblockHelperError(`Property 'baseOptions' of 'MultiSelectMenuConfirmation' must have at least one 'MultiSelectMenuConfirmationOption'!`, `MULTICONFIRMATION_OPTION_COUNT`);

		if (instanceofResFalse.length > 0) throw new SkyblockHelperError(`Item[${instanceofResFalse.map(res => res.index).join(', ')}] of property 'baseOptions' of 'MultiSelectMenuConfirmation' must have a valid instance of 'MultiSelectMenuConfirmationOption'`, `MULTICONFIRMATION_INVALID_INSTANCE`);



		const { longestLength: multiSelectMenuLength, optionMap } = this.checkChildrenWithLength();
		const componentArray = [
			new ActionRowBuilder()
				.addComponents(
					new SelectMenuBuilder()
						.setCustomId(`baseOptions`)
						.addOptions(
							this.baseOptions
								.map(baseOption => new SelectMenuOptionBuilder(baseOption.data))
						)
				)
		];

		// console.log(`optionMap:`, optionMap)

		if (multiSelectMenuLength >= 1) {
			for (let i = 1; i < multiSelectMenuLength; i += 1) {
				const defaultValue = componentArray[i-1].components[0].options.find(option => option.data.default);
				console.log(`previous selection has default value: ${!!defaultValue}`, defaultValue);
				if (defaultValue) {
					componentArray.push(
						new ActionRowBuilder()
							.addComponents(
								new SelectMenuBuilder()
									.setCustomId(`childOption${i}`)
									.setPlaceholder(`Make a selection!`)
									.setOptions(
										optionMap.get(defaultValue.data.value).childOptions
											.map(childOption => new SelectMenuOptionBuilder(childOption.data))
									)
							)
					);
				} else {	
					componentArray.push(
						new ActionRowBuilder()
							.addComponents(
								new SelectMenuBuilder()
									.setDisabled(true)
									.setCustomId(`childOption${i}`)
									.setPlaceholder(`Interact with the Select Menu above to open this selection!`)
									.setOptions(
										new SelectMenuOptionBuilder()
											.setLabel(`placeholder`)
											.setValue(`placeholder`)
									)
							)
					);
				}
			}
		}

		componentArray.push(
			new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel(`Confirm`)
						.setCustomId(`confirmSelections`)
						.setStyle(ButtonStyle.Success)
						.setDisabled(multiSelectMenuLength < this.resolveConfirmEnable(multiSelectMenuLength))
				)
		);



		this.menuMessage.components = componentArray;
		this.menuMessage.fetchReply = true;



		const sent = await this.interaction.reply(this.menuMessage);

		const selectFilter = i => i.user.id === this.interaction.user.id;	
		const buttonFilter = i => {
			i.deferUpdate();
	
			return i.user.id === this.interaction.user.id;
		};

		const selectCollector = sent.createMessageComponentCollector({ filter: selectFilter, componentType: ComponentType.SelectMenu, idle: this.collectorTimeout });
		const buttonCollector = sent.createMessageComponentCollector({ filter: buttonFilter, componentType: ComponentType.Button, idle: this.collectorTimeout, maxComponents: 1 });

		const chosenOptions = {
			baseOption: componentArray[0].components[0]?.options.find(option => option.data.default).data.value ?? null,
			childOption1: componentArray[1].components[1]?.options.find(option => option.data.default).data.value ?? null,
			childOption2: componentArray[2].components[2]?.options.find(option => option.data.default).data.value ?? null,
			childOption3: componentArray[3].components[3]?.options.find(option => option.data.default).data.value ?? null
		};

		// console.log(chosenOptions);

		selectCollector.on('collect', selectMenu => {
			const [selection] = selectMenu.values;
			const { selectMenuId, childOptions } = optionMap.get(selection);

			selectCollector.resetTimer({ idle: this.collectorTimeout });
			buttonCollector.resetTimer({ idle: this.collectorTimeout });



			if (selectMenuId !== `childOption3`) {
				componentArray.find(component => component.components[0].data.custom_id === selectMenuId)
					.components[0]
					.setDisabled(false)
					.setPlaceholder(`Make a selection!`)
					.setOptions(
						childOptions.map(childOption => new SelectMenuOptionBuilder(childOption.data))
					);
			}

			console.log(
				componentArray
					.filter((_actionRow, index) => {
						const selectedActionRow = componentArray.find(component => component.components[0].data.custom_id === selectMenuId);
						const indexOfSelectedActionRow = componentArray.indexOf(selectedActionRow) === -1
							? 3
							: componentArray.indexOf(selectedActionRow);

						console.log(`${_actionRow.components[0].data.custom_id}: ${index} > ${indexOfSelectedActionRow}`)

						return index > indexOfSelectedActionRow;
					})
					.filter(actionRow => actionRow.components[0] instanceof SelectMenuBuilder)
					.forEach(actionRow => actionRow.components[0]
						.setDisabled(true)
						.setPlaceholder(`Interact with the Select Menu above to open this selection!`)
						.setOptions(
							new SelectMenuOptionBuilder()
								.setLabel(`placeholder`)
								.setValue(`placeholder`)
						))
			);
			componentArray
				.filter((_actionRow, index) => index > (componentArray.indexOf(componentArray.find(component => component.components[0].data.custom_id === selectMenuId) ?? 3 )));
			

			/**
			 * @type {import ('discord.js').SelectMenuBuilder}
			 */
			const [editSelectMenu] = componentArray.find(component => component.components[0].data.custom_id === selectMenu.customId).components;

			// Edit default option to be not the default one
			editSelectMenu.options.find(option => option.data.default)?.setDefault(false);
			// Edit selected option to be the default.
			editSelectMenu.options.find(option => option.data.value === selection).setDefault(true);

			selectMenu.update({ components: componentArray });
		});

		buttonCollector.on('collect', () => {
			selectCollector.stop(`Event.confirmed`);
			buttonCollector.stop(`Event.confirmed`);

			super.emit(`confirmed`, sent, chosenOptions);
		});

		buttonCollector.on('end', (_collected, reason) => {
			for (const component of componentArray) {
				component.components[0].setDisabled(true);
			}
			
			sent.edit({ components: componentArray });

			if (reason !== `Event.confirmed`) super.emit(`expired`, sent, reason);
		});
	}
}

module.exports = MultiSelectMenuConfirmation;