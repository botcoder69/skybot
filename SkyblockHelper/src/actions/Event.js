/* eslint-disable no-unused-vars */
const { ButtonBuilder, ButtonStyle, ActionRowBuilder, Message, EmbedBuilder, ChatInputCommandInteraction, ComponentType } = require('discord.js');
const EventEmitter = require('events');

/**
 * @typedef {EmbedBuilder | EmbedBuilder[]} MessageEmbedResolvable
 */

const setMessageActionRow = new ActionRowBuilder()
	.setComponents(
		new ButtonBuilder()
			.setCustomId('join')
			.setLabel(`Click to join the event!`)
			.setStyle(ButtonStyle.Success)
	);

class Event extends EventEmitter {
	/**
	 * Creates an event users can join!
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {MessageEmbedResolvable} eventEmbed
	 * @param {ActionRowBuilder} [eventRow=ButtonBuilder, ButtonStyle]
	 * @param {number} [maxTime=10000]
	 */
	constructor(interaction, eventEmbed, eventRow=setMessageActionRow, maxTime=10000) {
		super();
		(async (interaction, eventEmbed, eventRow, maxTime) => {

			const embedsToSend = [];
			if (Array.isArray(eventEmbed)) {
				for (const embed of eventEmbed) {
					embedsToSend.push(embed);
				}
			} else {
				embedsToSend.push(eventEmbed);
			}

			const sent = await interaction.channel.send({ embeds: embedsToSend, components: [eventRow] });

			const collector = sent.createMessageComponentCollector({ time: maxTime, componentType: ComponentType.Button });

			collector.on(`collect`, button => {
				super.emit('userJoined', button, sent);
			});

			collector.on(`end`, (collected, reason) => {
				super.emit(`eventEnded`, collected, reason, sent);
			});

		})(interaction, eventEmbed, eventRow, maxTime);
	}
}

module.exports = Event;