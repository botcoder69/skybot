/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Functions: { sliceIntoChunks }, Paginator } = require('../../SkyblockHelper/src/index');
const { developerIDs } = require('../../config.json');

const informations = {
	incognito: {
		friendlyName: `Incognito Mode`,
		description: `Toggles whether or not others can see your balance and net worth.`
	},
	fightNerd: {
		friendlyName: `Better Fight Summary`,
		description: `Toggles whether or not the bot should send a more in-depth fight summary.`
	},
	voteReady: {
		friendlyName: `Vote Notification`,
		description: `Toggles whether or not the bot should send you a notification when your vote is ready. Note that the bot can only send you a message **IF** you issue a command.`
	},
	blockTradeIns: {
		friendlyName: `Block Incoming Trades`,
		description: `Toggles whether or not other people can send you trade offers.`
	},
	avoidRestart: {
		friendlyName: `Avoid Restart`,
		description: `Toggles whether or not you can reuse \`/start\`.`
	},
	developerOverride_Cooldown: {
		friendlyName: `Developer Override: Cooldown`,
		description: `Toggles whether or not Skybot cooldowns will include you.`
	},
	developerOverride_Safeguard: {
		friendlyName: `Developer Override: Safeguard`,
		description: `Toggles whether or not you will lose coins upon death.`
	},
	developerOverride_Advantage: {
		friendlyName: `Developer Override: Advantage`,
		description: `Toggles whether or not the bot should send you tips in minigames.`
	}
};

const predefinedSettings = [
	{ setting: `incognito`, value: false },
	{ setting: `fightNerd`, value: false },
	{ setting: `voteReady`, value: false },
	{ setting: `blockTradeIns`, value: false },
	{ setting: `avoidRestart`, value: false }
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`settings`)
		.setDescription(`Change various Skybot settings.`)
		.addStringOption(option => option
			.setName(`setting`)
			.setDescription(`The setting you want to change`)
			.setRequired(false)
		)
		.addBooleanOption(option => option
			.setName(`value`)
			.setDescription(`The value for the setting you want to change`)
			.setRequired(false)
		),
	group: `Player`,
	require: {
		start: true,
		update: `>=v10.0.0`
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		/**
		 * @type {import('discord.js').RawUserObj}
		 */
		const maidObj = await db.get(maid);
		const setting = interaction.options.getString('setting', false);
		const newValue = interaction.options.getBoolean('value', false);

		if (developerIDs.includes(interaction.user.id)) {
			predefinedSettings.push({ setting: `developerOverride_Cooldown`, value: false });
			predefinedSettings.push({ setting: `developerOverride_Safeguard`, value: false });
			predefinedSettings.push({ setting: `developerOverride_Advantage`, value: false });
		}

		fillMissingSettings(maidObj.settings);

		if (!setting) {
			const descriptions = maidObj.settings
				.map(setting => {
					const value = setting.value 
						? `<:Check:958598024802738187> \`Enabled\`` 
						: `<:Cross:958598024974729256> \`Disabled\``;
					const info = informations[setting.setting];

					return `**${info.friendlyName}** - \`${setting.setting}\` - ${value}\n${info.description}`;
				});

			const settings = sliceIntoChunks(descriptions, 5)
				.map(stringArray => stringArray.join('\n\n'))
				.map(joinedString => new EmbedBuilder()
					.setTitle(`Skybot settings for ${interaction.user.username}`)
					.setDescription(`You can use this command to change the value of a specific setting: for example, \`/settings setting:fightNerd value:True\`\nProviding no value will toggle to the other option.\n\n` + joinedString)
					.setFooter({ text: `Inspired by Dank Memer` })
				);

			await Paginator(interaction, settings);
		} else {
			const settingInfo = informations[setting];
			const validSettings = maidObj.settings
				.map(setting => setting.setting);

			if (!validSettings.includes(setting)) return interaction.reply({ content: `that's not a valid setting you dumb`, ephemeral: true });

			const settingObj = maidObj.settings.find(settingData => settingData.setting === setting);

			if (!newValue) {
				settingObj.value = !settingObj.value;

				const value = settingObj.value 
					? `<:Check:958598024802738187> \`Enabled\`` 
					: `<:Cross:958598024974729256> \`Disabled\``;

				await interaction.reply({ content: `**${settingInfo.friendlyName}** successfully changed to ${value}` });
			} else {
				settingObj.value = newValue;

				const value = settingObj.value 
					? `<:Check:958598024802738187> \`Enabled\`` 
					: `<:Cross:958598024974729256> \`Disabled\``;

				await interaction.reply({ content: `**${settingInfo.friendlyName}** successfully changed to ${value}` });
			}

			await db.set(maid, maidObj);
		}
	}
};

/**
 * 
 * @param {{ setting: string, value: boolean }[]} settingObj 
 */
function fillMissingSettings(settingObj) {
	for (const predefinedSetting of predefinedSettings) {
		if (!settingObj.find(setting => setting.setting === predefinedSetting.setting)) {
			settingObj.push(predefinedSetting);
		}
	}
}