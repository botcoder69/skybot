/* eslint-disable no-unused-vars */

const EventEmitter = require('events');
const { Message, EmbedBuilder, GuildEmoji } = require('discord.js');
const discordjs_version = require('discord.js').version;

class ReactionConfirmation extends EventEmitter {
	/**
	 * Creates a reaction confirmation on a message!
	 * @param {Message} message The message of the user that instantiated this. 
	 * @param {string} version The version of `discord.js` to use. Defaults to `12` if you dont specify.
	 * @param {(string | EmbedBuilder | MessageOptions) | (string | MessagePayload | MessageOptions)} question The question you want to ask the user.
	 * @param {string | GuildEmoji} [checkEmoji='✅'] The reaction that will fire the check event. Defaults to ✅ if you dont specify. For custom emojis, use the `GuildEmoji` class and not the custom ID.
	 * @param {string | GuildEmoji} [crossEmoji='❌'] The reaction that will fire the cross event. Defaults to ❌ if you dont specify. For custom emojis, use the `GuildEmoji` class and not the custom ID.
	 * @param {number} [time=15000] The amount of time for awaiting a response. If the time ends, fire's the error event.
	 */
	constructor(message, version, question, checkEmoji='✅', crossEmoji='❌', time=15000) {
		super();

		if (!(message instanceof Message)) throw new TypeError('Expected variable message to be an instance of Message!');

		// if (typeof question !== "string") throw new TypeError(`Expected variable question to be a type of string, but recieved type ${typeof question}!`);

		if (!version) version = 'v12';

		(async (message, question, version, checkEmoji, crossEmoji, time) => {
			if (discordjs_version.startsWith('12') && version === "v12") {
				const sent = await message.channel.send(question);
	
				let filter;
				if ((checkEmoji instanceof GuildEmoji) && (crossEmoji instanceof GuildEmoji)) {
					filter = (reaction, user) => {
						return [checkEmoji.name, crossEmoji.name].includes(reaction.emoji.name) && user.id === message.author.id;
					};

					sent.react(checkEmoji.id);
					sent.react(crossEmoji.id);
				} else if (typeof checkEmoji === "string" && typeof crossEmoji === "string") {
					filter = (reaction, user) => {
						return [checkEmoji, checkEmoji].includes(reaction.emoji.name) && user.id === message.author.id;
					};

					sent.react(checkEmoji);
					sent.react(crossEmoji);
				}

				try {
					const collected = await sent.awaitReactions(filter, { max: 1, time, errors: ['time'] });
					const reaction = collected.first();

					const checkEmojiName = checkEmoji instanceof GuildEmoji ? checkEmoji.name : checkEmoji;
	
					if (reaction.emoji.name === checkEmojiName) {
						super.emit('check', reaction, sent);
					} else {
						super.emit('cross', reaction, sent);
					}
				} catch (error) {
					super.emit('error', error, sent);
				}
			} else if (discordjs_version.startsWith('13') && version === "v13") {
				const sent = await message.channel.send(question);
	
				let filter;
				if ((checkEmoji instanceof GuildEmoji) && (crossEmoji instanceof GuildEmoji)) {
					filter = (reaction, user) => {
						return [checkEmoji.name, crossEmoji.name].includes(reaction.emoji.name) && user.id === message.author.id;
					};

					sent.react(checkEmoji.id);
					sent.react(crossEmoji.id);
				} else if (typeof checkEmoji === "string" && typeof crossEmoji === "string") {
					filter = (reaction, user) => {
						return [checkEmoji, checkEmoji].includes(reaction.emoji.name) && user.id === message.author.id;
					};

					sent.react(checkEmoji);
					sent.react(crossEmoji);
				}

				try {
					const collected = await sent.awaitReactions({ filter, max: 1, time, errors: ['time'] });
					const reaction = collected.first();

					const checkEmojiName = checkEmoji instanceof GuildEmoji ? checkEmoji.name : checkEmoji;
	
					if (reaction.emoji.name === checkEmojiName) {
						super.emit('check', reaction, sent);
					} else {
						super.emit('cross', reaction, sent);
					}
				} catch (error) {
					super.emit('error', error, sent);
				}
			} else {
				if (!discordjs_version.startsWith('13') && !discordjs_version.startsWith('12')) { 
					throw new Error(`SkyblockHelper doesn't have a support for this version of discord.js!`);
				} else { 
					throw new Error(`You picked a wrong version of discord.js, since SkyblockHelper has support for discord.js v${discordjs_version}`);
				}
			}
		})(message, question, version, checkEmoji, crossEmoji, time);
	}
}

module.exports = ReactionConfirmation;