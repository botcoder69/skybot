
/* eslint-disable no-unused-vars */
const SkyblockHelperError = require('../errors/SkyblockHelperError');

class CategoryPaginatorGroup {
	constructor() {
		/**
		 * The messages this group will use
		 * @type {(string | (import 'discord.js').MessagePayload) | (import 'discord.js').MessageOptions))[]}
		 */
		this.messages = [];

		/**
		 * If this group will be the default group
		 * @type {?boolean}
		 */
		this.default = false;

		/**
		 * The description of this group
		 * @type {?string}
		 */
		this.description = null;

		/**
		 * The emoji this group will use
		 * @type {?string}
		 */
		this.emoji = null;

		/**
		 * The name this group will use
		 * @type {string}
		 */
		this.label = null;
	}

	/**
	 * @private
	 */
	normalizeMessages() {
		const newMessageData = [];
		let index = 0;
		for (const message of this.messages) {
			if (typeof message === `string`) {
				newMessageData.push(
					{
						content: message
					}
				);
			} else if (typeof message === `object`) {
				newMessageData.push(message);
			} else {
				throw new SkyblockHelperError(`The message at CategoryPaginatorGroup.messages[${index}] cannot be parsed!`);
			}
			index += 1;
		}

		this.messages = newMessageData;
	}

	/**
	 * 
	 * @param  {...(string | (import 'discord.js').MessagePayload | (import 'discord.js').MessageOptions)} messages 
	 */
	addMessages(...messages) {
		this.messages.push(messages);
		this.messages = this.messages.flat(Infinity);
		this.normalizeMessages();
		return this;
	}

	/**
	 * 
	 * @param  {...(string | (import 'discord.js').MessagePayload | (import 'discord.js').MessageOptions)} messages 
	 */
	setMessages(...messages) {
		this.messages = messages;
		this.messages = this.messages.flat(Infinity);
		this.normalizeMessages();
		return this;
	}

	/**
	 * 
	 * @param {boolean} boolean
	 */
	setDefault(boolean) {
		this.default = boolean;
		return this;
	}

	/**
	 * 
	 * @param {string} label
	 */
	setLabel(label) {
		this.label = label;
		return this;
	}

	/**
	 * 
	 * @param {string} description
	 */
	setDescription(description) {
		this.description = description;
		return this;
	}

	/**
	 * 
	 * @param {(import 'discord.js').EmojiIdentifierResolvable} emoji 
	 * @returns 
	 */
	setEmoji(emoji) {
		this.emoji = emoji;
		return this;
	}
}

module.exports = CategoryPaginatorGroup;