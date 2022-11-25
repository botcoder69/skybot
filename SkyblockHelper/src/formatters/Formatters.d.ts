/**
 * Contains various Discord-specific functions for formatting messages.
 */
declare class Formatters {
    /**
     * Formats the content into a block quote. This needs to be at the start of the line for Discord to format it.
     * @param {string} content The content to wrap.
     * @returns {string}
     */
    static blockQuote(content: string): string;
    /**
     * Formats the content into bold text.
     * @param {string} content The content to wrap.
     * @returns {string}
     */
    static bold(content: string): string;
    /**
     * Formats a channel id into a channel mention.
     * @param {string} channelId The channel id to format.
     * @returns {string}
     */
    static channelMention(channelId: string): string;
    /**
     * Wraps the content inside a code block with an optional language.
     * @param {CodeBlockOptions} options The language to use, content if a second parameter isn't provided.
     * @returns {string}
     */
    static codeBlock(options: CodeBlockOptions): string;
    /**
     * Formats an emoji id into a fully qualified emoji identifier
     * @param {string} emojiId The emoji id to format.
     * @param {boolean} [animated=false] Whether the emoji is animated or not. Defaults to `false`
     * @returns {string}
     */
    static formatEmoji(emojiId: string, animated?: boolean): string;
    /**
     * Wraps the URL into `<>`, which stops it from embedding.
     * @param {string} content The content to wrap.
     * @returns {string}
     */
    static hideLinkEmbed(content: string): string;
    /**
     * Formats the content and the URL into a masked URL with an optional title.
     * @param {string} content The content to display.
     * @param {string} url The URL the content links to.
     * @param {string} [title=''] The title shown when hovering on the masked link.
     * @returns {string}
     */
    static hyperlink(content: string, url: string, title?: string): string;
    /**
     * Wraps the content inside \`backticks\`, which formats it as inline code.
     * @param {string} content The content to wrap.
     * @returns {string}
     */
    static inlineCode(content: string): string;
    /**
     * Formats the content into italic text.
     * @param {string} content The content to wrap.
     * @returns {string}
     */
    static italic(content: string): string;
    /**
     * Formats a user id into a member-nickname mention.
     * @param {string} memberId The user id to format.
     * @returns {string}
     */
    static memberNicknameMention(memberId: string): string;
    /**
     * Formats the content into a quote. This needs to be at the start of the line for Discord to format it.
     * @param {string} content The content to wrap.
     * @returns {string}
     */
    static quote(content: string): string;
    /**
     * Formats a role id into a role mention.
     * @param {string} roleId The role id to format.
     * @returns {string}
     */
    static roleMention(roleId: string): string;
    /**
     * Formats the content into spoiler text.
     * @param {string} content The content to spoiler.
     * @returns {string}
     */
    static spoiler(content: string): string;
    /**
     * Formats the content into strike-through text.
     * @param {string} content The content to wrap.
     * @returns {string}
     */
    static strikethrough(content: string): string;
    /**
     * Formats a date into a short date-time string.
     * @param {number|Date} [date] The date to format.
     * @param {TimestampStyles} [style] The style to use.
     * @returns {string}
     */
    static time<K extends keyof TimestampStyles>(date?: number | Date, style?: TimestampStyles[K]): string;
    /**
     * Formats the content into underscored text.
     * @param {string} content The content to wrap.
     * @returns {string}
     */
    static underscore(content: string): string;
    /**
     * Formats a user id into a user mention.
     * @param {string} userId The user id to format.
     * @returns {string}
     */
    static userMention(userId: string): string;
}

declare type CodeBlockOptions = {
	content: string
	language?: string
}

declare interface TimestampStyles {
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
}

export = Formatters;