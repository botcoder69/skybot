/**
 * @typedef {object} CodeBlockOptions
 * @property {string} content
 * @property {string} [language]
 */

/**
 * Contains various Discord-specific functions for formatting messages.
 */
class Formatters {
	constructor() {
		throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
	}

	/**
     * Formats the content into a block quote. This needs to be at the start of the line for Discord to format it.
     * @method blockQuote
     * @memberof Formatters
     * @param {string} content The content to wrap.
     * @returns {string}
     */
	static blockQuote(content) {
		return `>>> ${content}`;
	}

	/**
     * Formats the content into bold text.
     * @method bold
     * @memberof Formatters
     * @param {string} content The content to wrap.
     * @returns {string}
     */
	static bold(content) {
		return `**${content}**`;
	}

	/**
     * Formats a channel id into a channel mention.
     * @method channelMention
     * @memberof Formatters
     * @param {string} channelId The channel id to format.
     * @returns {string}
     */
	static channelMention(channelId) {
		return `<#${channelId}>`;
	}

	/**
     * Wraps the content inside a code block with an optional language.
     * @method codeBlock
     * @memberof Formatters
     * @param {CodeBlockOptions} options Options for formatting this code block.
     * @returns {string}
     */
	static codeBlock(options) {
		return typeof options.language === 'undefined' ? `\`\`\`\n${options.content}\`\`\`` : `\`\`\`${options.language}\n${options.content}\`\`\``;
	}

	/**
     * Formats an emoji id into a fully qualified emoji identifier
     * @method formatEmoji
     * @memberof Formatters
     * @param {string} emojiId The emoji id to format.
     * @param {boolean} [animated=false] Whether the emoji is animated or not. Defaults to `false`
     * @returns {string}
     */
	static formatEmoji(emojiId, animated = false) {
		return `<${animated ? 'a' : ''}:_:${emojiId}>`;
	}

	/**
     * Wraps the URL into `<>`, which stops it from embedding.
     * @method hideLinkEmbed
     * @memberof Formatters
     * @param {string} content The content to wrap.
     * @returns {string}
     */
	static hideLinkEmbed(content) {
		return `<${content}>`;
	}

	/**
     * Formats the content and the URL into a masked URL with an optional title.
     * @method hyperlink
     * @memberof Formatters
     * @param {string} content The content to display.
     * @param {string} url The URL the content links to.
     * @param {string} [title=''] The title shown when hovering on the masked link.
     * @returns {string}
     */
	static hyperlink(content, url, title = '') {
		return title ? `[${content}](${url} "${title}")` : `[${content}](${url})`;
	}

	
	/**
     * Wraps the content inside \`backticks\`, which formats it as inline code.
     * @method inlineCode
     * @memberof Formatters
     * @param {string} content The content to wrap.
     * @returns {string}
     */
	static inlineCode(content) {
		return `\`${content}\``;
	}

	
	/**
     * Formats the content into italic text.
     * @method italic
     * @memberof Formatters
     * @param {string} content The content to wrap.
     * @returns {string}
     */
	static italic(content) {
		return `*${content}*`;
	}

	
	/**
     * Formats a user id into a member-nickname mention.
     * @method memberNicknameMention
     * @memberof Formatters
     * @param {string} memberId The user id to format.
     * @returns {string}
     */
	static memberNicknameMention(memberId) {
		return `<@!${memberId}>`;
	}

	
	/**
     * Formats the content into a quote. This needs to be at the start of the line for Discord to format it.
     * @method quote
     * @memberof Formatters
     * @param {string} content The content to wrap.
     * @returns {string}
     */
	static quote(content) {
		return `> ${content}`;
	}

	/**
     * Formats a role id into a role mention.
     * @method roleMention
     * @memberof Formatters
     * @param {string} roleId The role id to format.
     * @returns {string}
     */
	static roleMention(roleId) {
		return `<@&${roleId}>`;
	}

	
	/**
     * Formats the content into spoiler text.
     * @method spoiler
     * @memberof Formatters
     * @param {string} content The content to spoiler.
     * @returns {string}
     */
	static spoiler(content) {
		return `||${content}||`;
	}

	
	/**
     * Formats the content into strike-through text.
     * @method strikethrough
     * @memberof Formatters
     * @param {string} content The content to wrap.
     * @returns {string}
     */
	static strikethrough(content) {
		return `~~${content}~~`;
	}

	
	/**
     * Formats a date into a short date-time string.
     * @method time
     * @memberof Formatters
     * @param {number|Date} [date] The date to format.
     * @param {TimestampStyles} [style] The style to use.
     * @returns {string}
     */
	static time(date, style) {
		// eslint-disable-next-line no-underscore-dangle
		let _a;
		if (typeof date !== 'number') {
			// eslint-disable-next-line no-void
			date = Math.floor(((_a = date === null || date === void 0 ? void 0 : date.getTime()) !== null && _a !== void 0 ? _a : Date.now()) / 1000);
		}
		return typeof style === 'string' ? `<t:${date}:${style}>` : `<t:${date}>`;
	}

	
	/**
     * Formats the content into underscored text.
     * @method underscore
     * @memberof Formatters
     * @param {string} content The content to wrap.
     * @returns {string}
     */
	static underscore(content) {
		return `__${content}__`;
	}

	
	/**
     * Formats a user id into a user mention.
     * @method userMention
     * @memberof Formatters
     * @param {string} userId The user id to format.
     * @returns {string}
     */
	static userMention(userId) {
		return `<@${userId}>`;
	}
}
/**
 * The message formatting timestamp
 * [styles](https://discord.com/developers/docs/reference#message-formatting-timestamp-styles) supported by Discord.
 * @memberof Formatters
 * @type {Object<string, TimestampStylesString>}
 */
Formatters.TimestampStyles = {
	/**
     * Short time format, consisting of hours and minutes, e.g. 16:20.
     */
	ShortTime: 't',
	/**
     * Long time format, consisting of hours, minutes, and seconds, e.g. 16:20:30.
     */
	LongTime: 'T',
	/**
     * Short date format, consisting of day, month, and year, e.g. 20/04/2021.
     */
	ShortDate: 'd',
	/**
     * Long date format, consisting of day, month, and year, e.g. 20 April 2021.
     */
	LongDate: 'D',
	/**
     * Short date-time format, consisting of short date and short time formats, e.g. 20 April 2021 16:20.
     */
	ShortDateTime: 'f',
	/**
     * Long date-time format, consisting of long date and short time formats, e.g. Tuesday, 20 April 2021 16:20.
     */
	LongDateTime: 'F',
	/**
     * Relative time format, consisting of a relative duration format, e.g. 2 months ago.
     */
	RelativeTime: 'R',
};

module.exports = Formatters;

Formatters.time(1000, "");