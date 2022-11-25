/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, ActionRowBuilder, EmbedBuilder, SelectMenuBuilder, ComponentType } = require('discord.js');
const { Functions, Functions: { commafy, toRomanNumeral, resolveArmorStats }, SkyblockMechanicUtil, SkybotDatabaseHandler } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`profile`)
		.setDescription(`Looks at your Skybot profile, or stalks someone else by looking at their Skybot profile.`)
		.addUserOption(option => option
			.setName(`user`)
			.setDescription(`The user to stalk. Leaving this blank will default to your profile.`)
			.setRequired(false)
		),
	group: `Player`,
	require: {
		start: true,
		update: `>=v7.1.0`
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const targetUser = interaction.options.getUser('user', false) ?? interaction.user;

		/**
		 * @type {(import 'discord.js').RawUserObj}
		 */
		const targetUserObj = await db.get(targetUser.id);

		if (!targetUserObj) return interaction.reply({ content: `❗ ${targetUser.username} has not registered their Skybot account yet!`, ephemeral: true });

		const { coins, bank, sword } = targetUserObj;
		const helmet = targetUserObj?.helmet ?? `<:Empty_Helmet:945148374091431976>`; 
		const chestplate = targetUserObj?.chestplate ?? `<:Empty_Chestplate:945148362074775633>`; 
		const leggings = targetUserObj?.leggings ?? `<:Empty_Leggings:945148335839391754>`; 
		const boots = targetUserObj?.boots ?? `<:Empty_Boots:945148317866795080>`; 

		// Dices Initializer
		const dicesMoneyWon = targetUserObj?.gambleStats?.dices?.moneyWon ?? 0,
			dicesMoneyLost = targetUserObj?.gambleStats?.dices?.moneyLost ?? 0,
			dicesTotalWins = targetUserObj?.gambleStats?.dices?.totalWins ?? 0,
			dicesTotalLoses = targetUserObj?.gambleStats?.dices?.totalLoses ?? 0,
			dicesNetGain = dicesMoneyWon - dicesMoneyLost,
			dicesTotalMatches = dicesTotalWins + dicesTotalLoses,
			dicesWR = Math.floor((dicesTotalWins / dicesTotalMatches) * 100) || 0;

		// Scratch Initializer
		const scratchMoneyWon = targetUserObj?.gambleStats?.scratchoff?.moneyWon ?? 0,
			scratchMoneyLost = targetUserObj?.gambleStats?.scratchoff?.moneyLost ?? 0,
			scratchTotalWins = targetUserObj?.gambleStats?.scratchoff?.totalWins ?? 0,
			scratchTotalLoses = targetUserObj?.gambleStats?.scratchoff?.totalLoses ?? 0,
			scratchNetGain = scratchMoneyWon - scratchMoneyLost,
			scratchTotalMatches = scratchTotalWins + scratchTotalLoses,
			scratchWR = Math.floor((scratchTotalWins / scratchTotalMatches) * 100) || 0;

		// Total Initializer
		const totalMoneyWon = dicesMoneyWon + scratchMoneyWon,
			totalMoneyLost = dicesMoneyLost + scratchMoneyLost,
			totalWins = dicesTotalWins + scratchTotalWins,
			totalLoses = dicesTotalLoses + scratchTotalLoses,
			totalNetGain = totalMoneyWon - totalMoneyLost,
			totalMatches = totalWins + totalLoses,
			totalWR = Math.floor((totalWins / totalMatches) * 100) || 0;

		const activeItemValues = targetUserObj.activeItems
			.filter(activeItems => activeItems.endTimestamp > Date.now())
			.map(activeItem => ({ data: interaction.client.assetMap.get(activeItem.keyName), endTimestamp: activeItem.endTimestamp }))
			.map(activeItem => `${activeItem.data.displayEmojiName()} Expires <t:${Math.floor(activeItem.endTimestamp / 1000)}:R>`);


		const totalSentBugReports = (targetUserObj?.bugReport?.resolved + targetUserObj?.bugReport?.ignored + targetUserObj?.bugReport?.rejected) || 0;

		const usedCommands = [];
		let totalCommandsUsed = 0;

		// eslint-disable-next-line guard-for-in
		for (const command in (targetUserObj?.commandUses ?? {})) {
			totalCommandsUsed += (targetUserObj?.commandUses?.[command] ?? 0);

			usedCommands.push(
				{
					name: command,
					times: targetUserObj?.commandUses?.[command] ?? 0
				}
			);
		}

		const helmetFile = resolveByEmoji(interaction.client.assetMap, helmet);
		const chestplateFile = resolveByEmoji(interaction.client.assetMap, chestplate);
		const leggingsFile = resolveByEmoji(interaction.client.assetMap, leggings);
		const bootsFile = resolveByEmoji(interaction.client.assetMap, boots);

		const { defense: helmet_def, health: helmet_hp, critChance: helmet_critCh, strength: helmet_str } = resolveArmorStats(helmetFile);
		const { defense: chestplate_def, health: chestplate_hp, critChance: chestplate_critCh, strength: chestplate_str } = resolveArmorStats(chestplateFile);
		const { defense: leggings_def, health: leggings_hp, critChance: leggings_critCh, strength: leggings_str } = resolveArmorStats(leggingsFile);
		const { defense: boots_def, health: boots_hp, critChance: boots_critCh, strength: boots_str } = resolveArmorStats(bootsFile);

		const addedDefense = helmet_def + chestplate_def + leggings_def + boots_def;
		const addedHealth = helmet_hp + chestplate_hp + leggings_hp + boots_hp;
		const addedStrength = helmet_str + chestplate_str + leggings_str + boots_str;
		const addedCritCh = helmet_critCh + chestplate_critCh + leggings_critCh + boots_critCh;

		const parentDb = interaction.client.user.id === `825984278621323303` && db instanceof SkybotDatabaseHandler
			? (await db.getParentDatabase(maid)).friendlyName
			: `Skybot Database`;

		

		const gambleStats = new EmbedBuilder()
			.setColor(`#2f3136`)
			.setAuthor({ name: `${targetUser.username}'s gamble stats` })
			.addFields(
				{ name: `Dices (${dicesTotalMatches})`, value: `Won: ${commafy(dicesMoneyWon)}\nLoss: ${commafy(dicesMoneyLost)}\nNet Gain: ${commafy(dicesNetGain)}\nWin Rate: **${dicesWR}%**`, inline: true },
				{ name: `Scratch-Off (${scratchTotalMatches})`, value: `Won: ${commafy(scratchMoneyWon)}\nLoss: ${commafy(scratchMoneyLost)}\nNet Gain: ${commafy(scratchNetGain)}\nWin Rate: **${scratchWR}%**`, inline: true },
				{ name: `Total (${totalMatches})`, value: `Won: ${commafy(totalMoneyWon)}\nLoss: ${commafy(totalMoneyLost)}\nNet Gain: ${commafy(totalNetGain)}\nWin Rate: **${totalWR}%**`, inline: true }
			)
			.setFooter({ text: `The number next to the name is how many matches are recorded. | Heavily inspired by Dank Memer.` });

		const userProfile = new EmbedBuilder()
			.setColor(`#2f3136`)
			.setAuthor({ name: `${targetUser.username}'s profile`, url: targetUser.displayAvatarURL() })
			.setDescription(`**Time:**\n${Functions.formatSkybotTime(Date.now(), { newLine: false })}`)
			.setThumbnail(targetUser.displayAvatarURL())
			.addFields(
				{ name: `Armor`, value: `${helmet}\n${chestplate}\n${leggings}\n${boots}`, inline: true },
				{ name: `Tools`, value: `${targetUserObj.pickaxe}\n${targetUserObj.axe}\n${targetUserObj.rod}\n${targetUserObj?.sword?.emoji ?? `None`}`, inline: true },
				{ name: `Balance:`, value: `Coins: <:Coins:885677584749318154> **${Functions.commafy(coins)}**\nBank: <:Coins:885677584749318154> **${Functions.commafy(bank)}**\nNet Worth: <:Coins:885677584749318154> **${Functions.commafy(targetUserObj?.netWorth)}**`, inline: true },
				{ name: `Skills`, value: `<:Mining:885390554198868020> ${toRomanNumeral(targetUserObj.mineLevel) || 0}\n<:Foraging:885390554291122206> ${toRomanNumeral(targetUserObj.chopLevel) || 0}\n<:Fishing:885390554450501632> ${toRomanNumeral(targetUserObj.fishLevel) || 0}\n<:Combat:946253940863942687> ${toRomanNumeral(targetUserObj.combatLevel) || 0}`, inline: true },
				{ name: `Stats`, value: `<:Health:944105139944452157> ${SkyblockMechanicUtil.getHealth(targetUserObj.fishLevel) + addedHealth}\n<:Defense:944105126233264158> ${SkyblockMechanicUtil.getDefense(targetUserObj.mineLevel) + addedDefense}\n<:Strength:944105109703512115> ${SkyblockMechanicUtil.getStrength(targetUserObj.chopLevel) + (sword?.strength ?? 0) + addedStrength}\n<:Crit_Chance:944105007584784395>  ${SkyblockMechanicUtil.getCritChance(targetUserObj?.combatLvl) + (sword?.critChance ?? 0) + addedCritCh}%`, inline: true },
				{ name: `Misc.`, value: `Using Skybot version: **v${targetUserObj.update}**\n\`${commafy(targetUserObj?.daily?.streak ?? 0)}\` daily streak.\n\`${totalCommandsUsed}\` commands used.\n\`${targetUserObj?.bugReport?.resolved ?? 0}\` sent bug-reports that got resolved\n\`${targetUserObj?.bugReport?.ignored ?? 0}\` sent bug-reports that got ignored\n\`${targetUserObj?.bugReport?.rejected ?? 0}\` sent bug-reports that got rejected!\n\`${totalSentBugReports}\` total bug-Reports sent\nDatabase: \`${parentDb}\`` },
				{ name: `Active Items`, value: activeItemValues.join('\n') || `None` }
			)
			.setFooter({ text: 'Heavily inspired by Dank Memer' });

		const commandUsages = new EmbedBuilder()
			.setColor(`#2f3136`)
			.setAuthor({ name: `${targetUser.username}'s command usages` })
			.setDescription(
				usedCommands
					.sort((a, b) => b.times - a.times)
					// This acts like Collection#first(), except using filter instead.
					.filter((_cmd, index) => index < 20)
					.map((cmd) => `/${cmd.name}: ${commafy(cmd.times)} times`)
					.join('\n') || `None`
			);

		const actionRow = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('profileMenu')
					.setPlaceholder('Other stats...')
					.addOptions([
						{
							label: 'Main Profile',
							value: `mainProfile`
						},
						{
							label: 'Gamble Stats',
							value: `gambleProfile`
						},
						{
							label: 'Command Usages',
							value: `commandUsages`
						}
					])
			);

		const sent = await interaction.reply({ embeds: [userProfile], components: [actionRow], fetchReply: true });

		const filter = i => {
			i.deferUpdate();
			return i.user.id === interaction.user.id;
		};

		const collector = sent.createMessageComponentCollector({ filter, componentType: ComponentType.SelectMenu, idle: 15000 });

		collector.on(`collect`, async button => {
			const [chosenProfile] = button.values;

			actionRow.components[0].data.placeholder = null;

			if (!(actionRow.components[0] instanceof SelectMenuBuilder)) return;
			
			const actionRowOptions = actionRow.components[0].options;

			const option = actionRowOptions.find(option => option.data.value === chosenProfile);
			const index = actionRowOptions.indexOf(option);

			
			// eslint-disable-next-line no-return-assign
			actionRowOptions.forEach(option => option.data.default = false);

			actionRowOptions[index].data.default = true;

			if (chosenProfile === `gambleProfile`) await sent.edit({ embeds: [gambleStats], components: [actionRow] });
			else if (chosenProfile === `mainProfile`) await sent.edit({ embeds: [userProfile], components: [actionRow] });
			else if (chosenProfile === `commandUsages`) await sent.edit({ embeds: [commandUsages], components: [actionRow] });
		});

		collector.on(`end`, async () => {
			actionRow.components[0].setDisabled(true);
			
			await sent.edit({ components: [actionRow] });
		});
	}
};

/**
 * @param {Collection<string, import ('discord.js').AssetMapValues>} assetMap 
 * @param {string} emoji 
 * @returns {import ('discord.js').AssetMapValues}
 */
function resolveByEmoji(assetMap, emoji) {
	return assetMap.find(asset => asset.displayEmojiName() === emoji);
}