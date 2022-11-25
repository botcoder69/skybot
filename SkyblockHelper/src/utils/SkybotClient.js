/* eslint-disable no-unused-vars */

const { Collection, Message, ChatInputCommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Functions = require('./Functions');

/**
 * @typedef {Object} TextCommand
 * @property {string} name
 * @property {string} [group='']
 * @property {string[]} [aliases=[]]
 * @property {string} [description='No description provided']
 * @property {number} [cooldown=0]
 * @property {boolean} [args=false]
 * @property {number} [argsRequired=0]
 * @property {string} [usage='']
 * @property {boolean} [guildOnly=true]
 * @property {boolean} [confirmation=false]
 * @property {boolean} [developerOnly=false]
 * @property {TextCommandTutorial} [tutorial]
 * @property {TextCommandRequire} require
 * @property {(message: Message, args: string[], db: any, maid: string) => Promise<void>} execute
 */

/**
 * @typedef {Object} SlashCommand
 * @property {SlashCommandBuilder} data
 * @property {(interaction: ChatInputCommandInteraction, db: any, maid: string) => Promise<void>} execute
 */

/**
 * @typedef {Object} TextCommandRequire
 * @property {boolean} start
 * @property {string} update
 */

/**
 * @typedef {Object} TextCommandTutorial
 * @property {EmbedBuilder[]} embeds
 * @property {string} key
 */

/**
 * An extended `Client` instance, adding more utilities for Skybot.
 */
class SkybotClient extends Client {
	/**
	 * 
	 * @param {(import 'discord.js').ClientOptions} options 
	 */
	constructor(options) {
		super(options);

		/**
		 * @type {Collection<string, TextCommand>}
		 */
		this.textCommands = new Collection();

		/**
		 * @type {Collection<string, SlashCommand>}
		 */
		this.slashCommands = new Collection();

		/**
		 * @type {Collection<string, Collection<string, number>}
		 */
		this.cooldowns = new Collection();

		/**
		 * @type {Collection<string, boolean>}
		 */
		this.confirmations = new Collection();

		/**
		 * @type {Collection<string, any>}
		 */
		this.assetMap = new Collection();

		/**
		 * @type {Collection<string, (string | Error)[]>}
		 */
		this.bugMap = new Collection();

		/**
		 * @type {string[]}
		 */
		this.console = [`**Logs for ${Functions.calcTime('+8')}**`];

		/**
		 * @type {Collection<string, "🟩" | "🟨" | "🟥">}
		 */
		this.errorMap = new Collection();

		/**
		 * @type {Collection<number, number>}
		 */
		this.levelReq = new Collection();

		this.updateMap = new Map();
	}
}

module.exports = SkybotClient;