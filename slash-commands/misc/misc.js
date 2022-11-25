/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder, Message } = require('discord.js');
const { Functions, SelectMenuConfirmation, Paginator } = require('../../SkyblockHelper/src/index');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`misc`)
		.setDescription(`Miscellaneous commands for Skybot.`)
		.addSubcommand(subcommand => subcommand
			.setName(`check-perms`)
			.setDescription(`Checks if the bot has the permissions to run smoothly.`)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`credits`)
			.setDescription(`Skybot's credits.`)
		)
		.addSubcommandGroup(subcommand => subcommand
			.setName(`fix`)
			.setDescription(`Fixes broken Skybot mechanics that depend on the Client.`)
			.addSubcommand(subcommand => subcommand
				.setName(`profile`)
				.setDescription(`Moves your Skybot profile from the legacy key system to the object key system.`)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`rates`)
			.setDescription(`Check the chances for certain items to drop.`)
		),
	group: `Misc`,
	require: {
		start: true,
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const command = interaction.options.getSubcommand(false);
		const commandGroup = interaction.options.getSubcommandGroup(false);

		if (command === `check-perms`) {
			const permissionArray = [`**Legend:**\n\n🟩 The permission can be used by the bot.\n🟨 The permission cannot be used by the bot, but it doesn't cause any major damage.\n🟥 The permission cannot be used by the bot, and it causes major damage like tons of errors on some commands and just makes it somewhat unplayable.`],
				botPermissions = interaction.guild.members.me.permissions,
				allBotPermissions = botPermissions.has(["EmbedLinks", "UseExternalEmojis"]);

			if (botPermissions.has("EmbedLinks")) {
				permissionArray.push(`🟩 \`Embed Links\`\nThis allows the bot to freely post embeds, as posting embeds require the \`Embed Links\` permission.`);
			} else {
				permissionArray.push(`🟥 \`Embed Links\`\nThis removes the bot to freely post embeds, as posting embeds require the \`Embed Links\` permission.`);
			}

			if (botPermissions.has("UseExternalEmojis")) {
				permissionArray.push(`🟩 \`Use External Emojis\`\nThis allows the bot to freely use external emojis, as using external emojis require the \`Use External Emojis\` permission. (Bots can use external emojis too!)`);
			} else {
				permissionArray.push(`🟨 \`Use External Emojis\`\nThis removes the bot to freely use external emojis, as using external emojis require the \`Use External Emojis\` permission. Even though this doesn't cause any major damage, you will see *poorly* formatted emojis like :Coal:, which just ruins the experience. (Bots can use external emojis too!)`);
			}

			if (botPermissions.has("EmbedLinks")) {
				const permissionEmbed = new EmbedBuilder()
					.setTitle(`Bot Permissions`)
					.setDescription(permissionArray.join('\n\n'));
	
				if (!allBotPermissions) permissionEmbed.data.description = permissionEmbed.data.description + "\n\nPlease enable the permissions with a 🟥 beside it to avoid getting hit with a lot of errors.";
	
				await interaction.reply({ embeds: [permissionEmbed] });
			} else {
				const PermissionMessage = allBotPermissions 
					? permissionArray.join('\n\n') + `\n\nPlease enable the permissions with a 🟥 beside it to avoid getting hit with a lot of errors.` 
					: permissionArray.join('\n\n');
	
				await interaction.reply({ content: PermissionMessage });
			}
		} else if (command === `credits`) {
			const creditsEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle(`Skybot Credits`)
				.setDescription(`Skybot was inspired by the following games\n• [Hypixel Skyblock](https://hypixel-skyblock.fandom.com/wiki/)\n• [Roblox Islands](https://www.roblox.com/games/4872321990)\n• [Minecraft](https://www.minecraft.com)\n• [Dank Memer](https://discord.com/login?redirect_to=%2Foauth2%2Fauthorize%3Fclient_id%3D270904126974590976%26scope%3Dbot%2520applications.commands%26permissions%3D105227086912%26redirect_uri%3Dhttps%253A%252F%252Fdankmemer.lol%252Flanding%26response_type%3Dcode)\n\nEmojis and Pictures:\nIdleCorp [link](https://discordapp.com/api/oauth2/authorize?client_id=601241235474350122&permissions=354368&scope=bot)\nHypixel Skyblock Wiki: [link](https://hypixel-skyblock.fandom.com/wiki/Hypixel_SkyBlock_Wiki)\nMinecraft Wiki: [link](https://minecraft.fandom.com/wiki/Minecraft_Wiki)\nRoblox Islands Wiki: [link](https://robloxislands.fandom.com/wiki/Islands_Wikia:Home)\n\nDeveloper: <@518736428721635338>`);

			// await Paginator(interaction);

			await interaction.reply({ embeds: [creditsEmbed] });
		} else if (command === `rates`) {
			const ratesEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle('Rates: Place Selection')
				.setDescription('Please select a place to check rates using the menu, and then hit the `Confirm` button below.');
		
			const confirmation = new SelectMenuConfirmation()
				.setCollectorTimeout(10_000)
				.setInteractionInstance(interaction)
				.setMenuPlaceholder(`Choose a Skybot Place to examine...`)
				.setMenuMessage({ embeds: [ratesEmbed] })
				.setMenuOptions(
					{
						label: `The Fishery`,
						description: `The hub of fishermen, a place where fish is plenty.`,
						value: `fishery`,
						emoji: `<:Fishing:885390554450501632>`,
						message: { embeds: [ratesEmbed] }
					},
					{
						label: `Deep Mines`,
						description: `Caves full of bountiful ores and minerals.`,
						value: `deepmines`,
						emoji: `<:Mining:885390554198868020>`,
						message: { embeds: [ratesEmbed] }
					},
					{
						label: `Floating Islands`,
						description: `Lush islands full of vegetation and trees.`,
						value: `floatingislands`,
						emoji: `<:Foraging:885390554291122206>`,
						message: { embeds: [ratesEmbed] }
					}
				);

			confirmation.on('confirmed', async (sent, selected) => {
				await wait(2000);

				if (selected[0] === 'fishery') {
					const fisheryChanceEmbed = new EmbedBuilder()
						.setTitle(`🍀 Fishery Chances`)
						.setDescription(`:white_large_square: \`common fish\` **50%**\n:green_square: \`uncommon fish\` **25%**\n:blue_square: \`rare fish\` **15%**\n:red_square: \`ultra rare fish\` **9%**\n:yellow_square: \`legendary fish\` **0.9%**\n<a:Wooden_Box:956735312162349096> \`any loot box\` **0.1**`);

					await sent.edit({ embeds: [fisheryChanceEmbed], components: [] });
				} else if (selected[0] === 'deepmines') {
					const deepminesChanceEmbeds = [
						new EmbedBuilder()
							.setTitle(`🍀 Starter Mine Chances`)
							.setDescription(`<:Cobblestone:816984558317600799> \`cobblestone\` **75%**\n<:Coal:816982880802439178> \`coal\` **25%**`)
							.setFooter({ text: `Page 1/6` }),
						new EmbedBuilder()
							.setTitle(`🍀 Iron Mine Chances`)
							.setDescription(`<:Cobblestone:816984558317600799> \`cobblestone\` **60%**\n<:Coal:816982880802439178> \`coal\` **30%**\n<:Iron_Ore:816983943584022539> \`iron ore\` **10%**`)
							.setFooter({ text: `Page 2/6` }),
						new EmbedBuilder()
							.setTitle(`🍀 Gold Mine Chances`)
							.setDescription(`<:Cobblestone:816984558317600799> \`cobblestone\` **60%**\n<:Coal:816982880802439178> \`coal\` **30%**\n<:Gold_Ore:816983943794524221> \`gold ore\` **10%**`)
							.setFooter({ text: `Page 3/6` }),
						new EmbedBuilder()
							.setTitle(`🍀 Lapis Quarry Chances`)
							.setDescription(`<:Cobblestone:816984558317600799> \`cobblestone\` **80%**\n<:Lapis:816988928372375603> \`lapis\` **20%**`)
							.setFooter({ text: `Page 4/6` }),
						new EmbedBuilder()
							.setTitle(`🍀 Redstone Mine Chances`)
							.setDescription(`<:Cobblestone:816984558317600799> \`cobblestone\` **80%**\n<:Redstone_Dust:907504986840252417> \`redstone\` **20%**`)
							.setFooter({ text: `Page 5/6` }),
						new EmbedBuilder()
							.setTitle(`🍀 Diamond Sanctuary Chances`)
							.setDescription(`<:Cobblestone:816984558317600799> \`cobblestone\` **80%**\n<:Diamond:902764556697341952> \`diamond\` **10%**\n<:Diamond_Block:846993012277379072> \`diamond block\` **9%**\n<:Enchanted_Diamond:902764556865142835> \`enchanted diamond\` **1%**\n<:Spirit_Butterfly:942633700485632071> \`spirit butterfly\` **0.01%**`)
							.setFooter({ text: `Page 6/6` })
					];

					await Paginator(interaction, deepminesChanceEmbeds);
				} else if (selected[0] === 'floatingislands') {
					const floatingislandsChanceEmbeds = [
						new EmbedBuilder()
							.setTitle(`🍀 Forest Plains Chances`)
							.setDescription(`<:Oak_Log:885390554005897237> \`oak wood\` **50%**\n<:Birch_Log:885390554400165938> \`birch wood\` **50%**`)
							.setFooter({ text: `Page: 1/5` }),
						new EmbedBuilder()
							.setTitle(`🍀 Roofed Forest Chances`)
							.setDescription(`<:Dark_Oak_Log:885390554362433587> \`dark oak wood\` **100%**`)
							.setFooter({ text: `Page: 2/5` }),
						new EmbedBuilder()
							.setTitle(`🍀 Snowy Taiga Chances`)
							.setDescription(`<:Spruce_Log:885390554404380693> \`spurce wood\` **100%**`)
							.setFooter({ text: `Page: 3/5` }),
						new EmbedBuilder()
							.setTitle(`🍀 Savanna Woodlands Chances`)
							.setDescription(`<:Acacia_Log:885390554471485480> \`acacia wood\` **100%**`)
							.setFooter({ text: `Page: 4/5` }),
						new EmbedBuilder()
							.setTitle(`🍀 Bamboo Jungle Chances`)
							.setDescription(`<:Jungle_Log:885390554240802817> \`jungle wood\` **100%**`)
							.setFooter({ text: `Page: 5/5` }) 
					];

					await Paginator(interaction, floatingislandsChanceEmbeds);
				}
			});

			confirmation.on('expired', (sent) => {
				sent.edit({ content: `You didn't respond in time!` });
			});

			await confirmation.runConfirmationMenu();
		} else if (commandGroup === `fix`) {
			if (command === `database`) {
				interaction.client.confirmations.set(maid, true);

				if (maidObj?.start) await interaction.reply({ content: `Your database keys are already in the object key version! Cancelling key update.` });
				
				await interaction.reply({ content: `🔄 Updating your database keys now! This will take 2 to 7 minutes depending on database latency...` });
				
				const maidObj = await Functions.keysToObj(db, maid, true);

				if (maidObj instanceof Map) {
					await interaction.editReply({ content: `<:cross:885408206959046678> An error occured while trying to update your database keys!` });
				} else {
					await db.set(maid, maidObj);
				
					await interaction.editReply({ content: `<:check:885408207097462786> Successfully updated your database keys to the latest version!` });
				}

				interaction.client.confirmations.set(maid, true);
			}
		}
	}
};