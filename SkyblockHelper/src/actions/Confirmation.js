/* eslint-disable no-unused-vars */

// Require the necessary classes.
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, Collection, MessagePayload } = require('discord.js');
const EventEmitter = require('events');

// Make predefined action rows. You can edit this yourself if you want.
const confirmEnabledRow = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId('check')
			.setEmoji(`<:check:885408207097462786>`)
			.setStyle(ButtonStyle.Success),
		new ButtonBuilder()
			.setCustomId('cross')
			.setEmoji('<:cross:885408206959046678>')
			.setStyle(ButtonStyle.Danger)
	]);

const confirmDisabledRow = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId('check')
			.setEmoji(`<:check:885408207097462786>`)
			.setStyle(ButtonStyle.Success)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId('cross')
			.setEmoji('<:cross:885408206959046678>')
			.setStyle(ButtonStyle.Danger)
			.setDisabled(true)
	]);

/**
 * @type {Collection<string, CurrentConfirmationData>}
 */
const currentConfirmations = new Collection();

class Confirmation extends EventEmitter {
	/**
	 * Creates button confirmations on a message! This class has 3 events: `check`, `cross` and `error`. You can hook up anything you want to do when it happens.
	 * @param {ChatInputCommandInteraction} interaction The interaction that instantiated this. 
	 * @param {string | MessagePayload | import('discord.js').InteractionReplyOptions} question The question you want to ask the user.
	 * @param {Function} onStart A function to execute before executing the message component collector.
	 * @param {boolean} [removeButtons=true] Whether to remove buttons when the events have been emitted. If set to `true` or `undefined`, it will remove buttons when the event has been emitted, and if `false`, it will disable buttons when the event has been emitted.
	 */
	constructor(interaction, question, onStart, removeButtons=true) {
		super();

		this.removeButtons = removeButtons;

		// This is a function to remove the buttons, if the `boolean` value is true (meaning removeButtons is true), then we remove buttons from the message. Otherwise, we just disable them.
		async function removeButton(sent, boolean) {
			if (boolean) { 
				await interaction.editReply({ components: [] });
			} else { 
				await interaction.editReply({ components: [confirmDisabledRow] });
			}
		}

		if (typeof question === 'string') {
			question = { content: question };
		}

		// To avoid any ReferenceErrors, I declared the params of the constructor above to this function.
		(async (interaction, question, onStart, removeButtons) => {
			interaction.client.confirmations.set(interaction.user.id, true);
			
			// Since the question variable should be a `MessagePayload` or a `MessageOptions` object, we just edit the components to the `confirmEnabledRow`, which allows the user to pick components. (We don't want any users adding custom components the collector can't collect!)
			question.components = [confirmEnabledRow];
			question.fetchReply = true;

			if (currentConfirmations.has(interaction.user.id)) {
				const oldConfirmation = currentConfirmations.get(interaction.user.id);


				
				oldConfirmation.confirmation.emit('error', 'Error: New Confirmation class has been started for the same user.', oldConfirmation.interactionResponse);

				if (oldConfirmation.confirmation.removeButtons) {
					await oldConfirmation.interaction.editReply({ components: [] });
				} else { 
					await oldConfirmation.interaction.editReply({ components: [confirmDisabledRow] });
				}
				
				currentConfirmations.delete(interaction.user.id);
			}

			// We send the question, since its a `MessagePayload` or a `MessageOptions` object.
			const sent = await interaction.reply(question);

			currentConfirmations.set(interaction.user.id, { confirmation: this, interactionResponse: sent, interaction: interaction });

			// Since this isn't using `implicit return`, we have to append return to the value we want to return from the function. We also used `deferUpdate()` to avoid that annoying `This interaction failed` message.
			const filter = i => {
				i.deferUpdate();
				return i.user.id === interaction.user.id;
			};
	
			// Since we are using a promise, we need to use a try...catch block to catch the rejection, if the promise will reject. 
			try {
				// The `onStart` variable is a function, where you can run a function before the collector starts. You can just use `null` if you dont need this.
				if (typeof onStart === 'function') await onStart?.(interaction, interaction.client);

				// Now we await a response from the user.
				const button = await sent.awaitMessageComponent({ filter, time: 15000 });

				// Since we have predefined buttons, we can check for those instead.
				if (button.customId === "check") {
					/**
					 * Emits the check event, with listeners for the button that was pressed, and the sent message 
					 * @example
					 * confirmation.on('check', (button, sent) => { // ... })
					 */
					super.emit('check', button, sent);

					// Now we run that function we declared before, passing the removeButtons param as the boolean.
					await removeButton(interaction, removeButtons);

					currentConfirmations.delete(interaction.user.id);
					interaction.client.confirmations.set(interaction.user.id, false);
				} else {
					/**
					 * Emits the cross event, with listeners for the button that was pressed, and the sent message 
					 * @example
					 * confirmation.on('cross', (button, sent) => { // ... })
					 */
					super.emit('cross', button, sent);

					// Same as the top one, we run the function.
					await removeButton(interaction, removeButtons);

					currentConfirmations.delete(interaction.user.id);
					interaction.client.confirmations.set(interaction.user.id, false);
				}
			} catch (error) {
				/**
				 * Emits the check event, with listeners for the button that was pressed, and the sent message 
				 * @example
				 * confirmation.on('check', (button, sent) => { // ... })
				 */
				super.emit('error', error, sent);
				
				// This is same too.
				await removeButton(interaction, removeButtons);

				currentConfirmations.delete(interaction.user.id);
				interaction.client.confirmations.set(interaction.user.id, false);
			}
			await removeButton(interaction, removeButtons);
			
			interaction.client.confirmations.set(interaction.user.id, false);
			// This line runs the function with our parameters from the constructor declaration.
		})(interaction, question, onStart, removeButtons);
	}
}

// This exports the class, so that it can be used everywhere.
module.exports = Confirmation;

/** 
 * @typedef CurrentConfirmationData 
 * 
 * @property {ChatInputCommandInteraction} interaction
 * @property {import ('discord.js').InteractionResponse} interactionResponse
 * @property {Confirmation} confirmation
 */