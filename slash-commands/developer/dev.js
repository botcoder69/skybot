
/* eslint-disable no-unused-vars, no-await-in-loop */
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, ChatInputCommandInteraction, ComponentType, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Confirmation, Functions, FuzzySearchUtil, SkyblockTypes } = require('../../SkyblockHelper/src/index');

const chalk = require('chalk');
const { Routes } = require('discord-api-types/v9');
const { betaToken, developerIDs } = require('../../config.json');
const qualifiedEmojiGuilds = [
	`816596125750132736`,
	`819836411217444895`,
	`852376327533363250`,
	`945553216978952242`,
	`942632865152237588`,
	`978503343217455174`,
	`1022697449623650434`
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`dev`)
		.setDescription(`Contains useful utilities for Developers`)
		.setDefaultPermission(false)
		.addSubcommand(subcommand => subcommand
			.setName(`ban`)
			.setDescription(`Bans a user from Skybot. L Bozo`)
			.addStringOption(option => option
				.setName(`user`)
				.setDescription(`The user ID to ban. This HAS to be a user id and not a user mention.`)
				.setRequired(true)
			)
			.addIntegerOption(option => option
				.setName(`duration`)
				.setDescription(`How long will this user be banned?`)
				.setRequired(true)
				.addChoices(
					{ name: '1 hr', value: 3_600_000 },
					{ name: '12 hrs', value: 43_200_000 },
					{ name: '1 day', value: 86_400_000 },
					{ name: '1 week', value: 604_800_000 },
					{ name: '30 days / 1 month', value: 2_592_000_000 },
					{ name: '6 months', value: 15_778_000_000 },
					{ name: '1 year', value: 31_557_600_000 },
					{ name: '1 decade', value: 315_576_000_000 }
				)
			)
			.addStringOption(option => option
				.setName(`reason`)
				.setDescription(`The reason why this user is getting banned.`)
				.setRequired(true)
			)
			.addIntegerOption(option => option
				.setName(`custom-duration`)
				.setDescription(`How long in milliseconds will this user be banned? The original duration will be ignored on use.`)
				.setRequired(false)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`botwipe`)
			.setDescription(`Wipes a user's Skybot profile. ...Say Goodbye - Rick Astley in Never Gonna Give You Up`)
			.addStringOption(option => option
				.setName(`user`)
				.setDescription(`The user id to wipe. This has to be a user id and not a user mention`)
				.setRequired(true)
			)
			.addStringOption(option => option
				.setName(`reason`)
				.setDescription(`The reason why this user is getting wiped`)
				.setRequired(true)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`build-gen`)
			.setDescription(`Creates a Skybot Build Number.`)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`give`)
			.setDescription(`Gives items to a user!`)
			.addUserOption(option => option
				.setName(`user`)
				.setDescription(`The user to give items to.`)
				.setRequired(true)
			)
			.addStringOption(option => option
				.setName(`item`)
				.setDescription(`The item to give to the user`)
				.setRequired(true)
			)
			.addIntegerOption(option => option
				.setName(`amount`)
				.setDescription(`The amount of the item to give to the user. Defaults to 1`)
				.setRequired(false)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`end-process`)
			.setDescription(`Ends the process of the bot. Useful for double instances of the bot.`)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`eval`)
			.setDescription(`Evaluates code.`)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`logs`)
			.setDescription(`Get the bot logs.`)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`embed-test`)
			.setDescription(`Tests an embed (reloaded everytime)`)
		)
		.addSubcommandGroup(subcommand => subcommand
			.setName(`emoji`)
			.setDescription(`A handy command for interacting with the emoji collection.`)
			.addSubcommand(subcommand => subcommand
				.setName(`--old`)
				.setDescription(`Uses the old emoji command`)
			)
			.addSubcommand(subcommand => subcommand
				.setName(`--list`)
				.setDescription(`Lists all emoji in qualified Guilds`)
			)
			.addSubcommand(subcommand => subcommand
				.setName(`--find`)
				.setDescription(`Finds an emoji using the given query`)	
				.addStringOption(option => option
					.setName(`emoji`)
					.setDescription(`A query which can be used to find an emoji.`)
					.setRequired(true)
				)
			)
			.addSubcommand(subcommand => subcommand
				.setName(`--format-file`)
				.setDescription(`Formats the emoji and the given name to a simple Skybot File.`)
				.addStringOption(option => option
					.setName(`emoji`)
					.setDescription(`A query which can be used to find an emoji.`)
					.setRequired(true)
				)
				.addStringOption(option => option
					.setName(`name`)
					.setDescription(`A name to use for this file.`)
					.setRequired(true)
				)
			)
		)
		.addSubcommandGroup(subcommandGroup => subcommandGroup
			.setName(`key`)
			.setDescription(`Contains various commands for manipulating keys`)
			.addSubcommand(subcommand => subcommand
				.setName(`get`)
				.setDescription(`Gets a key's value`)
				.addStringOption(option => option
					.setName(`key`)
					.setDescription(`The key to get`)
					.setRequired(true)
				)	
			)
			.addSubcommand(subcommand => subcommand
				.setName(`set`)
				.setDescription(`Sets a key's value`)
				.addStringOption(option => option
					.setName(`key`)
					.setDescription(`The key to set`)
					.setRequired(true)
				)
				.addStringOption(option => option
					.setName(`property`)
					.setDescription(`The property of the key to set`)
					.setRequired(true)
				)
				.addStringOption(option => option
					.setName(`value`)
					.setDescription(`The new value of the property of the key to set`)
					.setRequired(true)
				)
				.addStringOption(option => option
					.setName(`type`)
					.setDescription(`The type of the new value of the property of the key to set`)
					.setRequired(true)
					.addChoices(
						{ name: 'string', value: 'string' },
						{ name: 'number', value: 'number' },
						{ name: 'integer', value: 'integer' },
						{ name: 'boolean', value: 'boolean' }
					)
				)
			)
			.addSubcommand(subcommand => subcommand
				.setName(`delete`)
				.setDescription(`Deletes a key`)
				.addStringOption(option => option
					.setName(`key`)
					.setDescription(`The key to delete a property from`)
					.setRequired(true)
				)
				.addStringOption(option => option
					.setName(`property`)
					.setDescription(`The property of the key to delete a property from`)
					.setRequired(true)
				)
			)
			.addSubcommand(subcommand => subcommand
				.setName(`list`)
				.setDescription(`List's all the keys`)
			)
			.addSubcommand(subcommand => subcommand
				.setName(`url`)
				.setDescription(`Gets the Database URL`)	
			)
		)
		.addSubcommandGroup(subcommand => subcommand
			.setName(`load`)
			.setDescription(`Loads a slash command's into the codebase.`)
			.addSubcommand(subcommand => subcommand
				.setName(`client`)
				.setDescription(`Loads a global slash command`)
				.addStringOption(option => option
					.setName(`command`)
					.setDescription(`The slash command to load.`)
					.setRequired(true)
				)
			)
			.addSubcommand(subcommand => subcommand
				.setName(`guild`)
				.setDescription(`Loads a guild slash command`)	
				.addStringOption(option => option
					.setName(`command`)
					.setDescription(`The slash command to load.`)
					.setRequired(true)
				)
				.addStringOption(option => option
					.setName(`guild`)
					.setDescription(`The guild id of the guild of the slash command to load.`)
					.setRequired(false)
				)
			)
		)
		.addSubcommandGroup(subcommand => subcommand
			.setName(`reload`)
			.setDescription(`Reloads a slash command's codebase.`)
			.addSubcommand(subcommand => subcommand
				.setName(`client`)
				.setDescription(`Reloads a global slash command`)
				.addStringOption(option => option
					.setName(`command`)
					.setDescription(`The slash command to reload.`)
					.setRequired(true)
				)
				.addBooleanOption(option => option
					.setName(`param`)
					.setDescription(`If you just want to reload the code for your slash command, leave blank. Otherwise, set this to true`)
					.setRequired(false)
				)
			)
			.addSubcommand(subcommand => subcommand
				.setName(`guild`)
				.setDescription(`Reloads a guild slash command`)	
				.addStringOption(option => option
					.setName(`command`)
					.setDescription(`The slash command to reload.`)
					.setRequired(true)
				)
				.addStringOption(option => option
					.setName(`guild`)
					.setDescription(`The guild id of the guild of the slash command to reload.`)
					.setRequired(false)
				)
				.addBooleanOption(option => option
					.setName(`param`)
					.setDescription(`If you just want to reload the code for your slash command, leave blank. Otherwise, set this to true`)
					.setRequired(false)
				)
			)
			.addSubcommand(subcommand => subcommand
				.setName(`assets`)
				.setDescription(`Reloads all the assets`)
				.addBooleanOption(option => option
					.setName(`--force`)
					.setDescription(`Whether to empty the initial collection of assets.`)
				)
			)
		),
	group: `Developer`,
	developerOnly: true,
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const command = interaction.options.getSubcommand(false);
		const commandGroup = interaction.options.getSubcommandGroup(false);

		// If ever Discord makes a little "oopsie" with Slash Command permissions that they allow everyone to access developer commands, this block of code is another layer of security for the /dev command.
		if (!developerIDs.includes(interaction.user.id)) return interaction.reply({ content: `You cant use this command 🤔`, ephemeral: true });

		if (command === 'ban') {
			const id = interaction.options.getString('user', true);
			const duration = interaction.options.getInteger('custom-duration', false) ?? interaction.options.getInteger('duration', true);
			const reason = interaction.options.getString('reason', true);
	
			const user = interaction.client.users.cache.get(id) ?? null;
			const userObj = await db.get(id);
	
			userObj.banned = {
				timestamp: Date.now() + duration,
				reason: reason,
				performer: {
					display: `${interaction.user.username}#${interaction.user.discriminator}`,
					mention: interaction.user.toString()
				}
			};
	
			await db.set(id, userObj);

			await interaction.reply({ content: `Successfully banned \`${user?.username ?? id}\`!`, ephemeral: true });
		} else if (command === 'botwipe') {
			const userId = interaction.options.getString(`user`, true);
			const reason = interaction.options.getString(`reason`, true);
	
			const userToWipe = interaction.client.users.cache.get(userId);
	
			const userToWipeObj = await db.get(userToWipe.id);

			if (!userToWipeObj?.start) return interaction.reply({ content: `${userToWipe} has no Skybot profile!`, ephemeral: true });
	
			let totalSellableValue = 0;
	
			const itemMap = interaction.client.assetMap.filter(asset => `sellall` in asset && asset.sellall.included);
	
			for (const item of itemMap.values()) {
				try {
					// eslint-disable-next-line no-await-in-loop
					const userItems = userToWipeObj[item.keyName] ?? 0;
					const totalItemValue = (userItems * item.NPC.sell.price) ?? 0;
					
					totalSellableValue += totalItemValue;
				} catch (error) {
					console.error(error);
				}
			}
	
			const confirmationEmbed = new EmbedBuilder()
				.setColor(`Yellow`)
				.setTitle(`Pending Action`)
				.setDescription(`**${userToWipe.username}#${userToWipe.discriminator}** (${userToWipe}) has:\nCoins: <:Coins:885677584749318154> ${Functions.commafy(userToWipeObj.coins)}\nBank: <:Coins:885677584749318154> ${Functions.commafy(userToWipeObj.bank)}\nInventory: <:Coins:885677584749318154> ${Functions.commafy(totalSellableValue)}\n\nTotal: <:Coins:885677584749318154> ${Functions.commafy(userToWipeObj.coins + userToWipeObj.bank + totalSellableValue)}\n\nWipe?`)
				.setFooter({ text: `Inspired by Dank Memer.` });
	
			const confirmRow = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`cancelWipe`)
						.setLabel(`Cancel`)
						.setStyle(ButtonStyle.Danger),
					new ButtonBuilder()
						.setCustomId(`confirmWipe`)
						.setLabel(`Confirm`)
						.setStyle(ButtonStyle.Success)
				);
	
			const cancelWipeRow = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`cancelWipe`)
						.setLabel(`Cancel`)
						.setStyle(ButtonStyle.Danger)
						.setDisabled(true),
					new ButtonBuilder()
						.setCustomId(`confirmWipe`)
						.setLabel(`Confirm`)
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true)
				);
			
			const confirmWipeRow = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`cancelWipe`)
						.setLabel(`Cancel`)
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true),
					new ButtonBuilder()
						.setCustomId(`confirmWipe`)
						.setLabel(`Confirm`)
						.setStyle(ButtonStyle.Success)
						.setDisabled(true)
				);
	
			/** @type {(import 'discord.js').Message<true>} */
			const sent = await interaction.reply({ embeds: [confirmationEmbed], components: [confirmRow], fetchReply: true });
			
			const collector = sent.createMessageComponentCollector(
				{ 
					filter: i => i.user.id === interaction.user.id, 
					componentType: ComponentType.Button 
				}
			);
	
			collector.on(`collect`, async button => {
				if (button.customId === `cancelWipe`) {
					confirmationEmbed
						.setColor(`Red`)
						.setTitle('Action Cancelled');
					await button.update({ embeds: [confirmationEmbed], components: [cancelWipeRow] });
	
					await button.followUp({ content: `cancelled the wipe, boss`, ephemeral: true });
				} else if (button.customId === `confirmWipe`) {
					confirmationEmbed
						.setColor(`Green`)
						.setTitle('Action Confirmed');
					await button.update({ embeds: [confirmationEmbed], components: [confirmWipeRow] });
	
					const itemMap = interaction.client.assetMap;
	
					for (const item of itemMap.values()) {
						try {
							userToWipeObj[item.keyName] = 0;
						} catch (error) {
							console.error(error);
						}
					}
	
					// Other properties that need to be wiped. The system above can only wipe "sellable" items
					userToWipeObj.coins = 0;
					userToWipeObj.bank = 0;
					userToWipeObj.netWorth = 0;
	
					userToWipeObj.mineXp = 0;
					userToWipeObj.mineLevel = 0;
					userToWipeObj.fishXp = 0;
					userToWipeObj.fishLevel = 0;
					userToWipeObj.chopXp = 0;
					userToWipeObj.chopLevel = 0;
	
					userToWipeObj.pickaxe = '<:Wooden_Pickaxe:817217441394196572>';
					userToWipeObj.axe = '<:Wooden_Axe:817217337261424650>';
					userToWipeObj.rod = '<:Wooden_Rod:816598231509237810>';
	
					userToWipeObj.mine = SkyblockTypes.SkyblockMines.StarterMine;
					userToWipeObj.forest = SkyblockTypes.SkyblockForests.Forest;
	
					userToWipeObj.bankTier = 1;
					
					userToWipeObj.placedMinions = [
						[
							'cobblestone minion',
							'invCobblestoneMinion',
							'x',
							'<:Placed_Cobblestone_Minion:887166926948798484>',
							null,
							null,
							null,
							null,
							null,
							null,
							Date.now(),
							null,
							null,
							Date.now(),
							'cobblestone minion'
						]
					];
	
					// This is a message that will pop up when the user issues a Skybot command, instead of DMing them
					userToWipeObj.wiped = {
						reason: reason,
						performer: interaction.user
					};
	
					await button.followUp({ content: `wiped, boss`, ephemeral: true });
	
					await db.set(userToWipe.id, userToWipeObj);
				}
			});
		} else if (command === 'build-gen') {
			const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
			const result = [];
			const charactersLength = characters.length;
							
			for (let i = 0; i < 7; i++) {
				result.push(
					characters.charAt(
						Functions.getRandomNumber(0, charactersLength)
					)
				);
			}

			await interaction.reply({ content: `Build Generated: ${result.join('')}`, ephemeral: true });
		} else if (command === 'give') {
			const { assetMap } = interaction.client;
	
			const user = interaction.options.getUser(`user`, true);
			const item = interaction.options.getString(`item`, true);
			const amount = interaction.options.getInteger(`amount`, false) ?? 1;

			const asset = FuzzySearchUtil.searchAndReturn(
				assetMap,
				item
			);

			if (!asset) return interaction.reply({ content: `what are you doing that item doesnt exist`, ephemeral: true });

			const confirmation = new Confirmation(interaction, { content: `📦 ${interaction.user}, are you sure to give ${user} **${Functions.commafy(amount)}x** ${asset.displayEmojiName('inventory')} \`${asset.name}\`?` });
	
			confirmation.on('check', async (button, sent) => {
				const userObj = await db.get(user.id);
				
				if (typeof userObj[asset.keyName] !== "number") {
					userObj[asset.keyName] = amount;
				} else {
					userObj[asset.keyName] += amount;
				}
	
				await db.set(user.id, userObj);
	
				sent.edit(`<:check:885408207097462786> You gave ${user} **${Functions.commafy(amount)}x** ${asset.emoji.name} \`${asset.name}\`!`);
			});
	
			confirmation.on('cross', async (button, sent) => {
				await sent.edit(`<:cross:885408206959046678> Give cancelled!`);
			});
	
			confirmation.on('error', async (error, sent) => {
				await sent.edit(`<:cross:885408206959046678> Give cancelled!`);
			});
		} else if (command === 'end-process') {
			await interaction.reply({ content: `Ending process now!`, ephemeral: true });

			const owner = interaction.client.users.cache.get('518736428721635338');
			await owner.send({ content: `Bot process has been ended by ${interaction.user}!` });

			setTimeout(() => process.exit(), 5000);
		} else if (command === 'eval') {
			// if (interaction.client.user.id === '851616135592935425') return interaction.reply({ content: `The function \`/dev eval\` is unavailable on Guide Bot! Use Skybot for the evaluate function.`, ephemeral: true });

			const modal = new ModalBuilder()
				.setCustomId(`evalModal`)
				.setTitle(`Skybot Code Evaluator`)
				.addComponents(
					new ActionRowBuilder()
						.addComponents(
							new TextInputBuilder()
								.setCustomId(`code`)
								.setLabel(`Code to evaluate`)
								.setRequired(true)
								.setMaxLength(1000)
								.setStyle(TextInputStyle.Paragraph)
						)
				);
			
			await interaction.showModal(modal);

			try {
				console.log('hi');

				const collected = await interaction.awaitModalSubmit(
					{
						filter: i => i.customId === `evalModal` && developerIDs.includes(i.user.id),
						time: 3_600_000
					}
				);

				console.log(
					collected.deferred, 
					collected.replied, 
					collected.replied ? collected.fetchReply() : null
				)

				const i = await collected.deferReply({ ephemeral: true });

				const code = collected.fields.getTextInputValue('code');

				const evalEmbed = new EmbedBuilder()
					.addFields(
						{ name: `Input`, value: `\`\`\`js\n${code}\`\`\`` },
					);
	
				try {
					// eslint-disable-next-line no-eval
					const output = await eval(code);
	
					evalEmbed.addFields(
						{ name: `Output`, value: `\`\`\`js\n${output}\`\`\``}
					);
	
					await i.interaction.editReply({ embeds: [evalEmbed] });
				} catch (error) {
					evalEmbed.addFields(
						{ name: `Output`, value: `\`\`\`\n${error.stack}\`\`\``}
					);
	
					await i.interaction.editReply({ embeds: [evalEmbed] });
				}
			} catch (error) {
				console.error(error);
				// An error is expected if the modal fails or is cancelled.
			}
		} else if (command === 'logs') {
			const botLogs = Functions.splitMessage(interaction.client.console.join('\n\n'), { maxLength: 2000, char: '\n' });

			let index = 0;
			for (const botLog of botLogs) {
				if (index > 0) {
					await interaction.followUp({ content: botLog.join('\n\n'), ephemeral: true });
				} else {
					await interaction.reply({ content: botLog.join('\n\n'), ephemeral: true });
				}

				index += 1;
			}
		} else if (command === 'embed-test') {
			const embed = new EmbedBuilder()
				.setTitle(`test`)
				.setDescription(`insert rickroll`);

			interaction.reply({ embeds: [embed] });
		} else if (commandGroup === 'emoji') {
			const flag = interaction.options.getSubcommand(false);

			if (flag === '--old') {
				const emojiUnicodeEmbed1 = new EmbedBuilder()
					.setColor(`#2f3136`)
					.setTitle('v1.0 ALPHA')
					.setDescription(`<:Pearl:816833634148679700> \\<:Pearl:816833634148679700>
							<:Propeller:816833599801131009> \\<:Propeller:816833599801131009> 
							<:Wooden_Rod:816598231509237810> \\<:Wooden_Rod:816598231509237810> 
							<:Iron_Rod:816598233320390666> \\<:Iron_Rod:816598233320390666> 
							<:Platinum_Rod:816600647322566666> \\<:Platinum_Rod:816600647322566666> 
							<:Diamond_Rod:816600643867377704>\\<:Diamond_Rod:816600643867377704>
							<:Wood:816598225796202496> \\<:Wood:816598225796202496> 
							<:Oak_Planks:817261928212463616> \\<:Oak_Planks:817261928212463616> 
							<:Stick:817260386180792320> \\<:Stick:817260386180792320>`);
				const emojiUnicodeEmbed2 = new EmbedBuilder()
					.setColor(`#2f3136`)
					.setTitle('Mining Update (2.0)')
					.setDescription(`<:Mine:816908527670001686> \\<:Mine:816908527670001686>
							<:Cobblestone:816984558317600799> \\<:Cobblestone:816984558317600799>
							<:Coal:816982880802439178> \\<:Coal:816982880802439178>  
							<:Iron_Ore:816983943584022539> \\<:Iron_Ore:816983943584022539>
							<:Gold_Ore:816983943794524221> \\<:Gold_Ore:816983943794524221>
							<:Iron:816598224159899659> \\<:Iron:816598224159899659> 
							<:Gold:816598224365944883> \\<:Gold:816598224365944883>
							<:Lapis:816988928372375603> \\<:Lapis:816988928372375603>
							<:Diamond:902764556697341952> \\<:Diamond:902764556697341952>
							<:Enchanted_Diamond:902764556865142835> \\<:Enchanted_Diamond:902764556865142835>`);
				const emojiUnicodeEmbed3 = new EmbedBuilder()
					.setColor(`#2f3136`)
					.setTitle('Mining Update (2.0) [RODS]')
					.setDescription(`Rods (Blacksmith)
						
							<:Steel_Rod:816598224349298689> \\<:Steel_Rod:816598224349298689> 
							<:Platinum_Steel_Rod:816598224042721332> \\<:Platinum_Steel_Rod:816598224042721332>`);
				const emojiUnicodeEmbed4 = new EmbedBuilder()
					.setColor(`#2f3136`)
					.setTitle('Mining Update (2.0) [PICKAXES and TOOLS]')
					.setDescription(`Pickaxes (Blacksmith)
						
							<:Wooden_Pickaxe:817217441394196572> \\<:Wooden_Pickaxe:817217441394196572>  
							<:Stone_Pickaxe:817216446899028011> \\<:Stone_Pickaxe:817216446899028011>  
							<:Iron_Pickaxe:817216520828092436> \\<:Iron_Pickaxe:817216520828092436>
							<:Gold_Pickaxe:817216581859409971> \\<:Gold_Pickaxe:817216581859409971> 
							<:Diamond_Pickaxe:817216616084930602> \\<:Diamond_Pickaxe:817216616084930602>
							
							Double Tools (Basically tools that can be used for mining AND chopping)
						
							<:Diamond_Cross:817225151854149632> \\<:Diamond_Cross:817225151854149632> 
							<:Gilded_Diamond_Cross:817246283302436884> \\<:Gilded_Diamond_Cross:817246283302436884>`);
				const emojiUnicodeEmbed5 = new EmbedBuilder()
					.setColor(`#2f3136`)
					.setTitle('Forest Update (3.0) [AXES]')
					.setDescription(`<:Wooden_Axe:817217337261424650> \\<:Wooden_Axe:817217337261424650> 
							<:Stone_Axe:817216694837706793> \\<:Stone_Axe:817216694837706793> 
							<:Iron_Axe:817216753062510633> \\<:Iron_Axe:817216753062510633> 
							<:Gold_Axe:817216806845677568> \\<:Gold_Axe:817216806845677568> 
							<:Diamond_Axe:817216864626802771> \\<:Diamond_Axe:817216864626802771>
							<:Diamond_Battleaxe:817222368916144188> \\<:Diamond_Battleaxe:817222368916144188>`);
				const emojiUnicodeEmbed6 = new EmbedBuilder()
					.setColor(`#2f3136`)
					.setTitle('Nether Update (4.0)')
					.setDescription(`<:Ancient_Debris:834601141785591850> \\<:Ancient_Debris:834601141785591850>
							<:Netherite_Scrap:834601141752168458> \\<:Netherite_Scrap:834601141752168458>
							<:Netherite_Ingot:834601141861613638> \\<:Netherite_Ingot:834601141861613638>
							<:Netherite_Pickaxe:834598829902135331> \\<:Netherite_Pickaxe:834598829902135331>
							<:Netherite_Axe:834598829855997993> \\<:Netherite_Axe:834598829855997993>`);
				
				await interaction.reply({ embeds: [emojiUnicodeEmbed1, emojiUnicodeEmbed2, emojiUnicodeEmbed3, emojiUnicodeEmbed4, emojiUnicodeEmbed5, emojiUnicodeEmbed6], ephemeral: true });
			} else if (flag === '--list') {
				const emojiData = interaction.client.guilds.cache
					.filter(guild => qualifiedEmojiGuilds.includes(guild.id))
					.map(emojiGuild => emojiGuild.emojis.cache
						.map(emoji => `${emoji.name}\nEmoji: <:${emoji.name}:${emoji.id}>\nUnicode: \\<:${emoji.name}:${emoji.id}>\nURL: <${emoji.url}>`)	
					)
					.flat(1);

				const emojiEmbedArray = Functions.sliceIntoChunks(emojiData, 10)
					.map((emojiData, index, array) => new EmbedBuilder()
						.setTitle(`Emoji Unicode ${index + 1}/${array.length}`)
						.setDescription(emojiData.join('\n\n'))
					);
				
				const slicedEmbeds = Functions.sliceIntoChunks(emojiEmbedArray, 2);

				let index = 1;
				for (const embeds of slicedEmbeds) {
					if (index <= 1) {
						await interaction.reply({ embeds, ephemeral: true });
					} else {
						await interaction.followUp({ embeds, ephemeral: true });
					}

					index += 1;
				}
			} else if (flag === '--find') {
				const query = interaction.options.getString('emoji', true);
				/** @type { Collection<string, (import 'discord.js').GuildEmoji> } */
				const emojiMap = new Collection();
				
				interaction.client.guilds.cache
					.filter(guild => qualifiedEmojiGuilds.includes(guild.id))
					.map(guild => guild.emojis.cache)
					.forEach(collection => collection
						.forEach((emoji, key) => emojiMap.set(key, emoji))
					);

				const searchRes = FuzzySearchUtil.search(
					query,
					emojiMap.map(emoji => ({ id: emoji.id, name: emoji.name, image: emoji.url }))
				);
				const emoji = emojiMap.get(searchRes[0].item.id);

				const emojiEmbed = new EmbedBuilder()
					.setTitle(`Emoji info for "${emoji.name}"`)
					.setDescription(`Name: ${emoji.name}\nEmoji: ${emoji.toString()}\nUnicode: \\${emoji.toString()}\nURL: <${emoji.url}>\nGuild: ${emoji.guild}\nCreated at: <t:${Math.floor(emoji.createdTimestamp / 1000)}:F>`);

				await interaction.reply({ embeds: [emojiEmbed], ephemeral: true });
			} else if (flag === '--format-file') {
				const query = interaction.options.getString('emoji', true);
				const name = interaction.options.getString('name', true);
				/** @type { Collection<string, (import 'discord.js').GuildEmoji> } */
				const emojiMap = new Collection();
				
				interaction.client.guilds.cache
					.filter(guild => qualifiedEmojiGuilds.includes(guild.id))
					.map(guild => guild.emojis.cache)
					.forEach(collection => collection
						.forEach((emoji, key) => emojiMap.set(key, emoji))
					);


				const searchRes = FuzzySearchUtil.search(
					query,
					emojiMap.map(emoji => ({ id: emoji.id, name: emoji.name, image: emoji.url }))
				);
				const emoji = emojiMap.get(searchRes[0].item.id);

				const displayName = name;
				const keyName = name
					.split(/ +/)
					.map((word, index) => {
						if (index < 1) {
							return word.toLowerCase();
						} else {
							const res = word.split('');

							return res.map((char, index) => (index < 1 ? char.toUpperCase() : char)).join('');							
						}
					})
					.join('');

				const data = `\`\`\`js\n\n\nconst { Item } = require('../../SkyblockHelper/src/index.js');\n\nmodule.exports = new Item(\n\t{\n\t\tsearch: [],\n\t\tgroup: \`Item\`,\t\n\t\tname: \`${displayName}\`,\n\t\tkeyName: \`${keyName}\`,\n\t\tdescription: \`\`,\n\t\trarity: \`Common\`,\n\t\temoji: {\n\t\t\tname: \`${emoji.toString()}\`,\n\t\t\turl: \`${emoji.url}\`,\n\t\t},\n\t\tNPC: {\n\t\t\tsell: {\n\t\t\t\tsellable: false,\n\t\t\t\tprice: 0\n\t\t\t},\n\t\t\tbuy: {\n\t\t\t\tbuyable: false,\n\t\t\t\tprice: 0\n\t\t\t}\n\t\t},\n\t\tsellall: {\n\t\t\tincluded: false,\n\t\t\tfilterGroup: ""\n\t\t},\n\t\tincludeInParsing: true\n\t}\n);\n\`\`\``;

				await interaction.reply({ content: data, ephemeral: true });
			}
		} else if (commandGroup === 'load') {
			const command = interaction.options.getSubcommand(false);
			const commandName = interaction.options.getString('command', true);

			const slashCommandFolders = fs.readdirSync('./slash-commands');
			let isRealCommand = false;

			const rest = new REST({ version: 10 }).setToken(betaToken);
			const Route = command === 'client'
				? Routes.applicationCommands(interaction.client.user.id)
				: Routes.applicationGuildCommands(
					interaction.client.user.id,
					interaction.client.guilds.cache.get(interaction.options.getString('guild', false))?.id ?? interaction.guild.id
				);

			for (const folder of slashCommandFolders) {
				const files = fs.readdirSync(`./slash-commands/${folder}`)
					.filter(commandFile => commandFile.endsWith('.js'))
					.filter(commandFile => `${commandName}.js` === commandFile);

				// eslint-disable-next-line no-continue
				if (!files.length) continue;

				const slashCommand = require(`../../slash-commands/${folder}/${files[0]}`);

				try {
					interaction.client.slashCommands.set(slashCommand.data.name, slashCommand);
						
					await rest.post(
						Route,
						{ body: slashCommand.data.toJSON() }
					);

					await interaction.reply({ content: `Command \`${slashCommand.data.name}\` was loaded!`, ephemeral: true });
				} catch (error) {
					console.error(error);
							
					await interaction.reply({ content: `There was an error while loading command \`${slashCommand.data.name}\``, ephemeral: true });
				}

				isRealCommand = true;
			}
			
			if (!isRealCommand) return interaction.reply({ content: `There is no command file with the name \`${command}.js\`, ${interaction.user}!`, ephemeral: true });
		} else if (commandGroup === 'reload') {
			const command = interaction.options.getSubcommand(false);
			const requestToAPI = interaction.options.getBoolean(`param`, false) ?? false;

			if (command === 'client') {
				const commandName = interaction.options.getString('command', true);
				const commandFile = interaction.client.slashCommands.get(commandName);

				if (!commandFile) return interaction.reply({ content: `There is no slash command with the name \`${commandName}\`, ${interaction.user}!`, ephemeral: true });

				const commandFolders = fs.readdirSync('./slash-commands');
				const folderName = commandFolders.find(folder => fs.readdirSync(`./slash-commands/${folder}`).includes(`${commandFile.data.name}.js`));

				delete require.cache[require.resolve(`../${folderName}/${commandFile.data.name}.js`)];

				const rest = new REST({ version: '10' }).setToken(betaToken);
				const applicationCommand = await Functions.fetchApplicationCommand(interaction.client, commandFile.data.name);

				try {
					const newCommand = require(`../${folderName}/${commandFile.data.name}.js`);

					interaction.client.slashCommands.set(newCommand.data.name, newCommand);

					if (requestToAPI) {
						await rest.patch(
							Routes.applicationCommand(interaction.client.user.id, applicationCommand.id),
							{ body: newCommand.data.toJSON() }
						);
					}
	
					await interaction.reply({ content: `Command \`${newCommand.data.name}\` was reloaded!`, ephemeral: true });
				} catch (error) {
					console.error(error);
	
					await interaction.reply({ content: `I ran into an error while trying to reload \`${commandFile.data.name}\``, ephemeral: true });
				}
			} else if (command === 'guild') {
				const commandName = interaction.options.getString('command', true);
				const guild = interaction.client.guilds.cache.get(interaction.options.getString('guild', false)) ?? interaction.guild;
				const commandFile = interaction.client.slashCommands.get(commandName);

				if (!commandFile) return interaction.reply({ content: `There is no slash command with the name \`${commandName}\`, ${interaction.user}!`, ephemeral: true });

				const commandFolders = fs.readdirSync('./slash-commands');
				const folderName = commandFolders.find(folder => fs.readdirSync(`./slash-commands/${folder}`).includes(`${commandFile.data.name}.js`));

				delete require.cache[require.resolve(`../${folderName}/${commandFile.data.name}.js`)];

				const rest = new REST({ version: '10' }).setToken(betaToken);
				const applicationCommand = await Functions.fetchApplicationCommand(guild, commandFile.data.name);

				try {
					const newCommand = require(`../${folderName}/${commandFile.data.name}.js`);

					interaction.client.slashCommands.set(newCommand.data.name, newCommand);

					if (requestToAPI) {
						await rest.patch(
							Routes.applicationGuildCommand(interaction.client.user.id, guild.id, applicationCommand.id),
							{ body: newCommand.data.toJSON() }
						);
					}

					await interaction.reply({ content: `Command \`${newCommand.data.name}\` was reloaded!`, ephemeral: true });
				} catch (error) {
					console.error(error);
	
					await interaction.reply({ content: `I ran into an error while trying to reload \`${commandFile.data.name}\``, ephemeral: true });
				}
			} else if (command === 'assets') {
				const forceFlag = interaction.options.getBoolean('--force', false) ?? false;
			
				if (forceFlag) interaction.client.assetMap.clear();
	
				await interaction.reply({ content: `🔄 Reloading all assets now.`, ephemeral: true });
	
				const assetFolders = fs.readdirSync(`./assets`),
					assetStartMs = Date.now();
				let assetsLoadedSuccess = 0,
					assetsLoadedFailure = 0;
		
				for (const folder of assetFolders) {
					const assetFiles = fs.readdirSync(`./assets/${folder}`).filter(file => file.endsWith('.js'));
					for (const file of assetFiles) {
						delete require.cache[require.resolve(`../../assets/${folder}/${file}`)];
	
						const asset = require(`../../assets/${folder}/${file}`);
						
						try {
							if ('includeInParsing' in asset) {
								if (asset.includeInParsing) {
									interaction.client.assetMap.set(asset.keyName, asset);
									
									assetsLoadedSuccess += 1;
								} else {
									interaction.client.console.push(`${Functions.getUTCTime()} [Asset][Warning] | ${'name' in asset ? `"${asset.name}"` : `""`} | ./assets/${folder}/${file} | Your asset had the property "includeInParsing" set to false. This means that your asset will not be included in the assetMap. If this was not intentional, please set the "includeInParsing" property to true and restart the code or reuse the \`reload-items\` command.`);
									console.warn(`${Functions.getUTCTime()} [Asset]${chalk.yellowBright(`[Warning]`)} | ${'name' in asset ? `"${asset.name}"` : `""`} | ./assets/${folder}/${file} | Your asset had the property "includeInParsing" set to false. This means that your asset will not be included in the assetMap. If this was not intentional, please set the "includeInParsing" property to true and restart the code or reuse the \`reload-items\` command.`);
									
									assetsLoadedFailure += 1;
								}
							} else {
								interaction.client.console.push(`${Functions.getUTCTime()} [Asset][Warning] | ${'name' in asset ? `"${asset.name}"` : `""`} | ./assets/${folder}/${file} | Your asset didn't have the property "includeInParsing". It will be regarded as false and will not be included in the assetMap. If this was not intentional, please include the "includeInParsing" property and set it to true, then restart the code or reuse the \`reload-items\` command.`);
								console.warn(`${Functions.getUTCTime()} [Asset]${chalk.redBright(`[Warning]`)} | ${'name' in asset ? `"${asset.name}"` : `""`} | ./assets/${folder}/${file} | Your asset didn't have the property "includeInParsing". It will be regarded as false and will not be included in the assetMap. If this was not intentional, please include the "includeInParsing" property and set it to true, then restart the code or reuse the \`reload-items\` command.`);
								
								assetsLoadedFailure += 1;
							}
						} catch (error) {
							interaction.client.console.push(`${Functions.getUTCTime()} [Asset][Error] | ${'name' in asset ? `"${asset.name}"` : `""`} | ./assets/${folder}/${file} | ${error}`);
							console.error(`${Functions.getUTCTime()} [Asset]${chalk.redBright(`[Warning]`)} | ${'name' in asset ? `"${asset.name}"` : `""`} | ./assets/${folder}/${file} | ${error}`);
							
							assetsLoadedFailure += 1;
						}
					}
				}
				
				interaction.client.console.push(`${Functions.getUTCTime()} [Asset][Logging] | Successfully reloaded ${assetsLoadedSuccess} assets; failed to reload ${assetsLoadedFailure} assets. Total of ${assetsLoadedFailure + assetsLoadedSuccess} assets handled in ${Functions.msToHMSMs(Date.now() - assetStartMs)}`);
				// eslint-disable-next-line no-console
				console.log(`${Functions.getUTCTime()} [Asset]${chalk.greenBright(`[Logging]`)} | Successfully reloaded ${assetsLoadedSuccess} assets; failed to reload ${assetsLoadedFailure} assets. Total of ${assetsLoadedFailure + assetsLoadedSuccess} assets handled in ${Functions.msToHMSMs(Date.now() - assetStartMs)}`);
				
				await interaction.editReply(`<:check:885408207097462786> Successfully reloaded all items!`);
			}
		} else if (commandGroup === 'key') {
			const command = interaction.options.getSubcommand(false);

			if (command === `get`) {
				const key = interaction.options.getString('key', true);

				const obj = await db.get(key);
				const data = JSON.stringify(obj, null, `\t`);
	
				await interaction.deferReply({ ephemeral: true });

				fs.writeFile(`${key}_Object.json`, data, async () => {
					await interaction.editReply({ content: `Key info for ${key}\nDatatype: ${typeof (obj)}\nValue: `, files: [`./${key}_Object.json`] });
					
					fs.unlink(`${key}_Object.json`, () => {});
				});
			} else if (command === `set`) {
				const key = interaction.options.getString('key', true);
				const property = interaction.options.getString('property', true);
				const value = interaction.options.getString('value', true);
				const type = interaction.options.getString('type', true);

				const obj = await db.get(key);

				if (type === 'string') {
					obj[property] = value;
				} else if (type === 'number') {
					if (isNaN(value)) return interaction.reply({ content: `${value} cannot be parsed into a number!`, ephemeral: true });
					
					obj[property] = parseFloat(value);
				} else if (type === 'integer') {
					if (isNaN(value)) return interaction.reply({ content: `${value} cannot be parsed into an integer!`, ephemeral: true });
					
					obj[property] = parseInt(value);
				} else {
					if (value === 'true') obj[property] = true;
					else if (value === 'false') obj[property] = false;
					else return interaction.reply({ content: `${value} cannot be parsed into a boolean!`, ephemeral: true });
				}

				await interaction.reply({ content: `<:check:885408207097462786> Successfully set the \`${property}\` property in \`${key}\` to **${value}: ${type ?? `string`}**`, ephemeral: true }); 
				
				await db.set(key, obj);
			} else if (command === `delete`) {
				const key = interaction.options.getString('key', true);
				const property = interaction.options.getString('property', true);

				const obj = await db.get(key);

				Reflect.deleteProperty(obj, property);

				await interaction.reply({ content: `<:check:885408207097462786> Successfully deleted the \`${property}\` property in \`${key}\`!`, ephemeral: true });
				
				await db.set(obj);
			} else if (command === `list`) {
				const keys = await db.list();
				const msgs = Functions.splitMessage(keys.join('\n'), { maxLength: 2000 });
				
				let index = 1;
				for (const content of msgs) {
					if (index === 1) {
						await interaction.reply({ content, ephemeral: true });
					} else {
						await interaction.followUp({ content, ephemeral: true });
					}

					index += 1;
				}
			} else if (command === `url`) {
				const dmChannel = await interaction.user.createDM();

				if (db instanceof Map) {
					await interaction.reply({ content: `The current database you are using is a Map, therefore, it cannot have a Database URL.` });
				} else {
					await interaction.reply({ content: `The Database URL has been sent in your DM's!` });
					await dmChannel.send({ content: `<${process.env.REPLIT_DB_URL}>` });
				}
			}
		}
	}
};

function spaceMaker(amount) {
	const res = [];

	for (let i = 0; i < amount; i++) {
		res.push(`<:Blank:1021980332658020466>`);
	}

	return res.join('');
}