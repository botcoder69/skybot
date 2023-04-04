/* eslint-disable no-await-in-loop, class-methods-use-this */

// eslint-disable-next-line no-unused-vars
const { ChatInputCommandInteraction, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, ComponentType, SelectMenuOptionBuilder } = require('discord.js');
const EventEmitter = require('events');
const SkyblockHelperError = require('../errors/SkyblockHelperError');
const wait = require('util').promisify(setTimeout);

class SelectMenuConfirmation extends EventEmitter {
	/**
	 * Creates a SelectMenuBuilder confirmation on a Message! This class has 2 events: `confirmed` and `expired`. The `selection` event fires when the user selects something off the selection menu, the `confirmed` event fires when the user confirms their selection, and the `expired` event fires when the user's time runs out.
	 */
	constructor() {
		super();
		/**
		 * The amount of milliseconds the collector waits for interactions
		 * @type {number}
		 */
		this.collectorTimeout = 15_000;

		/**
		 * The maximum number of selections allowed
		 * @type {?number}
		 */
		this.maxValues = 1;

		/**
		 * The message that the `SelectMenuConfirmation` is going to use.
		 * @type {string | (import 'discord.js').MessagePayload | (import 'discord.js').InteractionReplyOptions}
		 */
		this.menuMessage = null;

		/**
		 * The interaction instance the `SelectMenuConfirmation` is going to use.
		 * @type {ChatInputCommandInteraction}
		 */
		this.interaction = null;

		/**
    	 * The minimum number of selections required
    	 * @type {?number}
    	 */
		this.minValues = 1;

		/**
		 * The option that the `SelectMenuBuilder` is going to use.
		 * @type {SelectMenuConfirmationOptions[]}
		 */
		this.options = null;

		/**
		 * Custom placeholder text to display when nothing is selected
		 * @type {?string}
		 */
		this.placeholder = null;
	}

	/**
	 * Sets the options for the `SelectMenuBuilder` for this confirmation.
	 * @param {SelectMenuConfirmationOptions[] | SelectMenuConfirmationOptions[][]} options
	 */
	setMenuOptions(...options) {
		this.options = options.flat(Infinity);
		return this;
	}

	/**
	 * Sets the maximum number of selections allowed for this select menu
	 */
	setMenuMaxValues(maxValues) {
		this.maxValues = maxValues;
		return this;
	}

	/**
	 * Sets the minimum number of selections required for this select menu.
	 * This will default the maxValues to the number of options, unless manually set
	 */
	setMenuMinValues(minValues) {
		this.minValues = minValues;
		return this;
	}

	/**
	 * Sets the placeholder of this select menu
	 * @param {string} placeholder Custom placeholder text to display when nothing is selected
	 */
	setMenuPlaceholder(placeholder) {
		this.placeholder = placeholder;
		return this;
	}

	/**
	 * Sets the message of the SelectMenuBuilder. If this message has components, it will be replaced.
	 * @param {string | (import 'discord.js').MessagePayload | (import 'discord.js').MessageOptions} message
	 */
	setMenuMessage(message) {
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

	async runConfirmationMenu() {
		if (!this.options) throw new SkyblockHelperError(`A SelectMenuConfirmation must have options!`, `SELECT_OPTIONS_RANGE`);

		if (!this.menuMessage) throw new SkyblockHelperError(`A SelectMenuConfirmation must have a menuMessage!`, `SELECT_MESSAGE_RANGE`);

		if (!this.interaction || !(this.interaction instanceof ChatInputCommandInteraction)) throw new SkyblockHelperError(`A SelectMenuConfirmation must have a proper instance of ChatInputCommandInteraction!`, `SELECT_INTERACTION_INSTANCE`);

		const menuOptions = this.options
			.map(value => {
				return {
					default: value?.default ?? false,
					description: value?.description,
					emoji: value?.emoji,
					label: value?.label,
					value: value?.value
				};
			})
			.map(value => {
				return new SelectMenuOptionBuilder(value);
			});

		const { interaction } = this;

		const selectRow = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId(`selectMenu`)
					.setOptions(menuOptions)
			);

		if (this.placeholder) selectRow.components[0].setPlaceholder(this.placeholder);

		if (this.maxValues) selectRow.components[0].setMaxValues(1);

		if (this.minValues) selectRow.components[0].setMinValues(1);

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

		this.menuMessage.components = [selectRow, confirmRow];

		if (typeof this.menuMessage === 'string') {
			this.menuMessage = { content: this.menuMessage };
		}

		this.menuMessage.fetchReply = true;

		const dataToSend = this.menuMessage;

		const sent = await interaction.reply(dataToSend);

		const selectFilter = i => {
			return i.user.id === interaction.user.id;
		};

		const buttonFilter = i => {
			i.deferUpdate();

			return i.user.id === interaction.user.id;
		};


		const selectCollector = sent.createMessageComponentCollector({ filter: selectFilter, componentType: ComponentType.SelectMenu, idle: this.collectorTimeout });
		const buttonCollector = sent.createMessageComponentCollector({ filter: buttonFilter, componentType: ComponentType.Button, idle: this.collectorTimeout });

		let indexOfSelectMenu = 0;
		let selected = [this.options.find(option => option.default)?.value];

		selectCollector.on('collect', selectMenu => {
			selected = selectMenu.values;

			selectCollector.resetTimer({ idle: this.collectorTimeout });
			buttonCollector.resetTimer({ idle: this.collectorTimeout });

			let disabledSelection = false;
			for (const value of selectMenu.values) {
				const option = this.options.find(option => option.value === value);

				indexOfSelectMenu = this.options.indexOf(option);

				const disabled = option?.disabled ?? false;

				if (disabled) {
					disabledSelection = true;
					break;
				}
			}

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

			// Bring this up and remove i.deferUpdate();
		});

		let notEnded = true;
		while (notEnded) {
			if (selectCollector.ended) notEnded = false;

			await wait(1000);
		}

		return undefined;
	}
}

module.exports = SelectMenuConfirmation;

/**
 * @typedef SelectMenuConfirmationOptions
 * @property {?boolean} [default]
 * @property {?string} [description]
 * @property {?boolean} [disabled]
 * @property {?(import 'discord.js').EmojiIdentifierResolvable} [emoji]
 * @property {string} label
 * @property {string | (import 'discord.js').MessagePayload | (import 'discord.js').MessageEditOptions} message
 * @property {string} value
 */