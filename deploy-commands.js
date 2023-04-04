
/* eslint-disable no-unused-vars, no-console */
const { Snowflake } = require('discord.js');
const { Functions: { getUTCTime } } = require('./SkyblockHelper/src/index');
const chalk = require('chalk');

/**
 *
 * @param {Snowflake} clientId
 * @param {Snowflake} guildId
 */
function deployCommands(clientId, guildId, token) {
	const { REST } = require('@discordjs/rest');
	const { Routes } = require('discord-api-types/v9');
	const fs = require('fs');

	const commands = [];
	const slashCommandFolders = fs.readdirSync(`./slash-commands`);

	for (const folder of slashCommandFolders) {
		const slashCommandFiles = fs.readdirSync(`./slash-commands/${folder}`).filter(file => file.endsWith('.js'));

		for (const file of slashCommandFiles) {
			const command = require(`./slash-commands/${folder}/${file}`);
			commands.push(command.data.toJSON());
		}
	}

	const rest = new REST({ version: '10' }).setToken(token);

	(async () => {
		try {
			console.log(`${getUTCTime()} [SlashCommand]${chalk.greenBright(`[Logging]`)} | Started refreshing application (/) commands.`);

			const Route = !token
				? Routes.applicationCommands(clientId)
				: Routes.applicationGuildCommands(clientId, guildId);


			await rest.put(
				Route,
				{ body: commands }
			);


			console.log(`${getUTCTime()} [SlashCommand]${chalk.greenBright(`[Logging]`)} Successfully reloaded application (-) commands.`);
		} catch (error) {
			console.error(error);
		}
	})();
}

module.exports = deployCommands;