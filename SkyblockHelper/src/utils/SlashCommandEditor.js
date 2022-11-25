/* eslint-disable class-methods-use-this, no-unused-vars */

const { ApplicationCommandManager } = require('discord.js');

/**
 * @typedef SlashCommandEditorOptions
 * @property {string} ownerId
 * @property {string} [guildId]
 * @property {ApplicationCommandManager} manager
 */

class SlashCommandEditor {
	/**
	 * @param {SlashCommandEditorOptions} options
	 */
	constructor(options) {
		this.ownerId = options.ownerId;

		this.guildId = options.guildId;

		/**
		 * @type {ApplicationCommandManager}
		 */
		this.ApplicationCommandManager = options.manager;
	}

	/**
	 * @param {string} commandName 
	 */
	async setClientDeveloperCommand(commandName) {
		await this.ApplicationCommandManager.fetch();
		
		const clientCommand = this.ApplicationCommandManager.cache.find(command => command.name === commandName);

		if (!clientCommand) throw new Error('The command you are trying to set to developer only does not exist!');

		const permissions = [
			{
				id: this.ownerId,
				type: 'USER',
				permission: true
			}
		];

		clientCommand.permissions.add({ permissions });
	}

	async setGuildDeveloperCommand(commandName) {
		this.ApplicationCommandManager.fetch();
		
		const clientCommand = await client.guilds.cache.get('123456789012345678')?.commands.fetch('876543210987654321');

		if (!clientCommand) throw new Error('The command you are trying to set to developer only does not exist!');

		const permissions = [
			{
				id: this.ownerId,
				type: 'USER',
				permission: true
			}
		];

		clientCommand.permissions.add({ permissions });
	}
}