/* eslint-disable no-unused-vars */

const { Client, Collection } = require('discord.js');
const Functions = require('./Functions');

/**
 * An extended `Client` instance, adding more utilities for Skybot.
 */
class SkybotClient extends Client {
	/**
	 * @param {import ('discord.js').ClientOptions} options
	 */
	constructor(options) {
		super(options);

		this.achievements = new Collection(options.achievements);

		this.assetMap = new Collection();

		this.auctionHouse = new Collection();

		this.bugMap = new Collection();

		this.confirmations = new Collection();

		this.cooldowns = new Collection();

		this.console = [`**Logs for ${Functions.calcTime('+8')}**`];

		this.dragonFights = new Collection();

		this.leaderboard = new Collection();

		this.levelReq = new Collection(options.levelRequirements);

		this.slashCommands = new Collection();

		this.updateMap = new Collection(options.updateValues);
	}
}

module.exports = SkybotClient;