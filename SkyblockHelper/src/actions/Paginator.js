/* eslint-disable no-unused-vars */
const { Message, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChatInputCommandInteraction, ComponentType } = require('discord.js');

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

/**
 * A function for making pages. Great for long text split into smaller text
 * @param {Message | ChatInputCommandInteraction} message
 * @param {EmbedBuilder[] | string[]} pagesArray 
 * @returns {Promise<void>}
 */
async function Paginator(message, pagesArray) {
	if (typeof pagesArray === 'string') process.emitWarning(
		`This constructor is deprecated, use Paginator(message, pagesArray) instead.`,
		'DeprecationWarning'
	);

	const data = pagesArray[0] instanceof EmbedBuilder
		? { embeds: [pagesArray[0]], components: [noEnabledRow], fetchReply: true }
		: { content: [pagesArray[0]], components: [noEnabledRow], fetchReply: true };

	const filter = message instanceof Message
		? i => i.user.id === message.author.id
		: i => i.user.id === message.user.id;

	if (pagesArray.length === 1) {
		return message instanceof ChatInputCommandInteraction && message.replied
			? message.editReply(data)
			: message.reply(data); 
	}

	data.components = [forwardEnabledRow];

	/** @type {Message<boolean>} */
	const sent = await (message instanceof ChatInputCommandInteraction && message.replied
		? message.editReply(data)
		: message.reply(data)); 

	const collector = sent.createMessageComponentCollector(
		{
			filter,
			componentType: ComponentType.Button,
			idle: 10_000
		}
	);

	let index = 0;
	collector.on('collect', async button => {
		let components;

		if (button.customId === 'fastBackward') {
			
			components = forwardEnabledRow;

		} else if (button.customId === 'backward') {

			index -= 1;

			if (index > 0) components = allEnabledRow;
			else components = forwardEnabledRow;

		} else if (button.customId === 'forward') {

			index += 1;

			if (index < (pagesArray.length - 1)) components = allEnabledRow;
			else components = backwardEnabledRow;

		} else if (button.customId === 'fastForward') {

			index = (pagesArray.length - 1);
			components = backwardEnabledRow;

		} else {

			components = noEnabledRow;
			
		}

		await button.update({ embeds: [pagesArray[index]], components: [components] });
	});
			
	collector.on('end', async () => {
		await sent.edit({ components: [noEnabledRow] });
	});
}

module.exports = Paginator;