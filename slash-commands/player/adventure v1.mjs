/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType, SelectMenuBuilder } = require('discord.js');
const { AdventureEvent, AdventureOutcome, AdventureOutcomeGroup, Functions, SelectMenuConfirmation, SkybotAdventure, SkyblockTypes } = require('../../SkyblockHelper/src/index');
// const { userHasItem } = Functions;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('adventure')
		.setDescription('Go on a Skybot Adventure!'),
	group: `Player`,
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);

		const { mineLevel, fishLevel } = maidObj;

		const itemButtons = [
			new ButtonBuilder()
				.setCustomId(`fourLeafClover`)
				.setEmoji(`<:Four_Leaf_Clover:948095805619859537>`)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(!userHasItem(maidObj, 'fourLeafClover')),
			new ButtonBuilder()
				.setCustomId(`stopwatch`)
				.setEmoji(`<:Stopwatch:950327115558043679>`)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(!userHasItem(maidObj, 'stopwatch')),
			new ButtonBuilder()
				.setCustomId(`piggyBank`)
				.setEmoji(`<:Piggy_Bank:953469473480921098>`)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(!userHasItem(maidObj, 'piggyBank')),
			new ButtonBuilder()
				.setCustomId(`crackedPiggyBank`)
				.setEmoji(`<:Cracked_Piggy_Bank:953469273546846278>`)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(!userHasItem(maidObj, 'crackedPiggyBank')),
			new ButtonBuilder()
				.setCustomId(`brokenPiggyBank`)
				.setEmoji(`<:Broken_Piggy_Bank:953468878602772561>`)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(!userHasItem(maidObj, 'brokenPiggyBank')),
			new ButtonBuilder()
				.setCustomId(`spiritButterfly`)
				.setEmoji(`<:Spirit_Butterfly:942633700485632071>`)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(!userHasItem(maidObj, 'spiritButterfly')),
			new ButtonBuilder()
				.setCustomId(`diamond`)
				.setEmoji(`<:Diamond:902764556697341952>`)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(!userHasItem(maidObj, 'diamond')),
			new ButtonBuilder()
				.setCustomId(`enchantedCoal`)
				.setEmoji(`<:Enchanted_Coal:894483282199199764>`)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(!userHasItem(maidObj, 'enchantedCoal')),
			new ButtonBuilder()
				.setCustomId(`legendaryFish`)
				.setEmoji(`🟨`)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(!userHasItem(maidObj, 'legendaryFish')),
		];

		if (!maidObj.adventure?.exists) {
			const adventures = [
				{
					label: `Hub Exploration`,
					description: `No requirement`,
					value: `HubExploration`,
					default: true,
					message: {
						embeds: [
							new EmbedBuilder()
								.setTitle(`Skybot Adventure Selection`)
								.addFields(
									{ name: `Name`, value: `Hub Exploration`, inline: true },
									{ name: `Description`, value: `Go explore the main hub of Skybot, with the many islands that surrounds it!`, inline: true },
									{ name: `Allowed Items`, value: `<:Four_Leaf_Clover:948095805619859537> <:Stopwatch:950327115558043679> <:Piggy_Bank:953469473480921098> <:Cracked_Piggy_Bank:953469273546846278> <:Broken_Piggy_Bank:953468878602772561>\n<:Spirit_Butterfly:942633700485632071> <:Diamond:902764556697341952> <:Enchanted_Coal:894483282199199764> 🟨`, inline: true }
								)
								.setFooter({ text: `Inspired by Dank Memer.` })
						]
					}
				},
				{
					label: `Deeper into the Deep Mines`,
					description: `Requires: Mining Level 10`,
					value: `DeeperIntoTheDeepMines`,
					default: false,
					disabled: !(mineLevel >= 10),
					message: {
						embeds: [
							new EmbedBuilder()
								.setTitle(`Skybot Adventure Selection`)
								.addFields(
									{ name: `Name`, value: `Deeper into the Deep Mines`, inline: true },
									{ name: `Description`, value: ` Many miners have reported shaking in the Deepmines recently, so you try to find out what's going on.`, inline: true },
									{ name: `Allowed Items`, value: `<:Four_Leaf_Clover:948095805619859537> <:Stopwatch:950327115558043679> <:Piggy_Bank:953469473480921098> <:Cracked_Piggy_Bank:953469273546846278> <:Broken_Piggy_Bank:953468878602772561>\n<:Spirit_Butterfly:942633700485632071> <:Diamond:902764556697341952> <:Enchanted_Coal:894483282199199764> 🟨`, inline: true }
								)
								.setFooter({ text: `Inspired by Dank Memer.` })
						]
					}
				},
				{
					label: `Perilous Adventure`,
					description: `Prerequisite Adventure "Deeper into the Deep Mines", Mining Level 20`,
					value: `PerilousAdventure`,
					default: false,
					disabled: !(mineLevel >= 20) || !maidObj.subareaUnlocks.includes("forsaken_tunnel"),
					message: {
						embeds: [
							new EmbedBuilder()
								.setTitle(`Skybot Adventure Selection`)
								.addFields(
									{ name: `Name`, value: `Perilous Adventure`, inline: true },
									{ name: `Description`, value: `The shaking of the Deepmines has been tracked down to this sealed mining area, so you figure out how to stop the shaking.`, inline: true },
									{ name: `Allowed Items`, value: `<:Four_Leaf_Clover:948095805619859537> <:Stopwatch:950327115558043679> <:Piggy_Bank:953469473480921098> <:Cracked_Piggy_Bank:953469273546846278> <:Broken_Piggy_Bank:953468878602772561>\n<:Spirit_Butterfly:942633700485632071> <:Diamond:902764556697341952> <:Enchanted_Coal:894483282199199764> 🟨`, inline: true }
								)
								.setFooter({ text: `Inspired by Dank Memer.` })
						]
					}
				},
				{
					label: `The Sea's Cruel Waters`,
					description: `Prerequisite Adventure "Perilous Adventure", Fishing Level 10`,
					value: `TheSeasCruelWaters`,
					default: false,
					disabled: !(fishLevel >= 10) || !maidObj.subareaUnlocks.includes("crystal_hollows"),
					message: {
						embeds: [
							new EmbedBuilder()
								.setTitle(`Skybot Adventure Selection`)
								.addFields(
									{ name: `Name`, value: `The Sea's Cruel Waters`, inline: true },
									{ name: `Description`, value: `After your Deepmines Adventure, the thunderstorm at sea has been getting closer, so you figure out what's causing it.`, inline: true },
									{ name: `Allowed Items`, value: `<:Four_Leaf_Clover:948095805619859537> <:Stopwatch:950327115558043679> <:Piggy_Bank:953469473480921098> <:Cracked_Piggy_Bank:953469273546846278> <:Broken_Piggy_Bank:953468878602772561>\n<:Spirit_Butterfly:942633700485632071> <:Diamond:902764556697341952> <:Enchanted_Coal:894483282199199764> 🟨`, inline: true }
								)
								.setFooter({ text: `Inspired by Dank Memer.` })
						]
					}
				},
				{
					label: `The Island of Endless Thunder`,
					description: `Prerequisite Adventure "The Sea's Cruel Waters", Fishing Level 20, Mining Level 30`,
					value: `TheIslandOfEndlessThunder`,
					default: false,
					disabled: !(fishLevel >= 20) || !(mineLevel >= 30) && !maidObj.subareaUnlocks.includes("the_stormy_seas"),
					message: {
						embeds: [
							new EmbedBuilder()
								.setTitle(`Skybot Adventure Selection`)
								.addFields(
									{ name: `Name`, value: `The Island of Endless Thunder`, inline: true },
									{ name: `Description`, value: `After the arduous journey at The Stormy Seas, you find an island engulfed by endless thunder, so you try to explore it.`, inline: true },
									{ name: `Allowed Items`, value: `<:Four_Leaf_Clover:948095805619859537> <:Stopwatch:950327115558043679> <:Piggy_Bank:953469473480921098> <:Cracked_Piggy_Bank:953469273546846278> <:Broken_Piggy_Bank:953468878602772561>\n<:Spirit_Butterfly:942633700485632071> <:Diamond:902764556697341952> <:Enchanted_Coal:894483282199199764> 🟨`, inline: true }
								)
								.setFooter({ text: `Inspired by Dank Memer.` })
						]
					}
				},
				{
					label: `Mysterious Stone Tunnel`,
					description: `Prerequisite Adventure "The Island of Endless Thunder", Mining Level 30`,
					value: `MysteriousStoneTunnel`,
					default: false,
					disabled: !(mineLevel >= 30) || !maidObj.subareaUnlocks.includes("thunder_island"),
					message: {
						embeds: [
							new EmbedBuilder()
								.setTitle(`Skybot Adventure Selection`)
								.addFields(
									{ name: `Name`, value: `Mysterious Stone Tunnel`, inline: true },
									{ name: `Description`, value: `After your journey at The Island of Endless Thunder, you see a tunnel that you think leads back to the hub, so you decide to explore it.`, inline: true },
									{ name: `Allowed Items`, value: `<:Four_Leaf_Clover:948095805619859537> <:Stopwatch:950327115558043679> <:Piggy_Bank:953469473480921098> <:Cracked_Piggy_Bank:953469273546846278> <:Broken_Piggy_Bank:953468878602772561>\n<:Spirit_Butterfly:942633700485632071> <:Diamond:902764556697341952> <:Enchanted_Coal:894483282199199764> 🟨`, inline: true }
								)
								.setFooter({ text: `Inspired by Dank Memer.` })
						]
					}
				}
			];
	
			console.log(adventures.map(value => value.disabled));
	
			const selectConfirmation = new SelectMenuConfirmation()
				.setCollectorTimeout(10_000)
				.setMenuMessage(adventures[0].message)
				.setMenuOptions(adventures)
				.setInteractionInstance(interaction);
	
			selectConfirmation.on('confirmed', async (sent, selected) => {
				const [adventureId] = selected;

				const adventure = selectConfirmation.options.find(option => option.value === adventureId);

				const buttons = Functions.sliceIntoChunks(itemButtons, 5);

				const row1 = new ActionRowBuilder()
					.addComponents(buttons[0]);
				const row2 = new ActionRowBuilder()
					.addComponents(buttons[1]);
				const row3 = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('start')
							.setStyle(ButtonStyle.Success)
							.setLabel('Start')
							.setEmoji('<:Ticket:955745457181716480>'),
						new ButtonBuilder()
							.setCustomId(`equipAll`)
							.setStyle(ButtonStyle.Secondary)
							.setLabel(`Equip All`),
						new ButtonBuilder()
							.setCustomId(`end`)
							.setStyle(ButtonStyle.Secondary)
							.setLabel(`End Interaction`)
					);

				const confirmedButtons = [];

				const selectEmbed = new EmbedBuilder()
					.setAuthor({ name: `Choose items you want to take with you` })
					.setDescription(`They can turn out very useful! Be careful though, you might lose them....`)
					.setFooter({ text: `Inspired by Dank Memer` });

				await sent.edit({ embeds: [selectEmbed], components: [row1, row2, row3] });

				const collector = sent.createMessageComponentCollector(
					{
						filter: i => i.user.id === interaction.user.id,
						componentType: ComponentType.Button,
						idle: 20_000
					}
				);

				collector.on('collect', async button => {
					const itemButton = itemButtons.find(itemButton => itemButton.customId === button.customId);
					const itemButtonIndex = itemButtons.indexOf(itemButton);

					if (itemButton) {
						const style = confirmedButtons.includes(itemButton.customId)
							? ButtonStyle.Secondary
							: ButtonStyle.Primary;

						itemButtons[itemButtonIndex].setStyle(style);

						const newButtons = Functions.sliceIntoChunks(itemButtons, 5);

						const newRow1 = new ActionRowBuilder()
							.addComponents(newButtons[0]);
						const newRow2 = new ActionRowBuilder()
							.addComponents(newButtons[1]);

						await button.update({ components: [newRow1, newRow2, row3] });

						if (style === ButtonStyle.Primary) {
							confirmedButtons.push(itemButton.data.customId);
						} else {
							Functions.removeArrayElement(confirmedButtons, itemButton.data.customId);							
						}
					} else if (button.customId === 'start') {
						if (userHasItem(maidObj, 'adventureTicket')) {
							await button.deferUpdate();
							
							collector.stop('User confirmed selection');
						} else {
							await button.reply({ content: `You need at least **1x** <:Ticket:955745457181716480> \`Adventure Ticket\` to start an adventure, nice try buddy.`, ephemeral: true });
							
							collector.stop('User has no ticket');
						}
					} else if (button.customId === 'equipAll') {
						itemButtons
							.filter(button => !button.data.disabled)
							.forEach(button => {
								confirmedButtons.push(button.customId);

								button.setStyle(ButtonStyle.Primary);
							});

						const newButtons = Functions.sliceIntoChunks(itemButtons, 5);

						const newRow1 = new ActionRowBuilder()
							.addComponents(newButtons[0]);
						const newRow2 = new ActionRowBuilder()
							.addComponents(newButtons[1]);

						await button.update({ components: [newRow1, newRow2, row3] });
					} else {
						await button.deferUpdate();

						collector.stop('User End Interaction');
					}
				});
				
				collector.on('end', async (_collected, reason) => {
					const newButtons = Functions.sliceIntoChunks(
						itemButtons.map(button => button.setDisabled(true)), 
						5
					);

					const newRow1 = new ActionRowBuilder()
						.addComponents(newButtons[0]);
					const newRow2 = new ActionRowBuilder()
						.addComponents(newButtons[1]);
					const newRow3 = new ActionRowBuilder()
						.addComponents(
							new ButtonBuilder()
								.setCustomId('start')
								.setStyle(ButtonStyle.Success)
								.setLabel('Start')
								.setEmoji('<:Ticket:955745457181716480>')
								.setDisabled(true),
							new ButtonBuilder()
								.setCustomId(`equipAll`)
								.setStyle(ButtonStyle.Secondary)
								.setLabel(`Equip All`)
								.setDisabled(true),
							new ButtonBuilder()
								.setCustomId(`end`)
								.setStyle(ButtonStyle.Secondary)
								.setLabel(`End Interaction`)
								.setDisabled(true)
						);

					await sent.edit({ components: [newRow1, newRow2, newRow3] });

					if (reason !== 'User confirmed selection') return;

					const itemDatas = confirmedButtons
						.map(id => interaction.client.assetMap.get(id) || interaction.client.assetMap.find(asset => asset.keyName === id))
						.map(asset => {
							maidObj[asset.keyName] -= 1;

							return {
								name: asset.name,
								keyName: asset.keyName,
								emoji: asset.displayEmojiName()
							};
						});

					maidObj.adventure = {
						name: adventure.label,
						coins: 0,
						items: itemDatas,
						exists: true,
						rewards: [],
						description: adventure.description ?? `No description provided`,
						interactions: 0,
						expInteractions: 0,
						nextInteraction: 0
					};
	
					await db.set(maid, maidObj);

					const slashCommand = interaction.client.slashCommands.get(this.data.name);
					await slashCommand.execute(interaction, db, maid);
				});
			});

			/*
			selectConfirmation.on('expired', async sent => {
				await sent.delete();
			});*/

			await selectConfirmation.runConfirmationMenu();
		} else {
			/*
			if (maidObj.adventure.nextInteraction > Date.now()) {
				const waitEmbed = new EmbedBuilder()
					.setDescription(`You can interact with the adventure again <t:${Math.floor(maidObj.adventure.nextInteraction / 1000)}:R>`)
					.setFooter({ text: `Inspired by Dank Memer.` });

				return interaction.reply({ embeds: [waitEmbed], ephemeral: true });
			}
			*/

			if (maidObj.adventure.name === `Hub Exploration`) {
				if (maidObj.adventure.expInteractions > 8) {
					const outcome = new AdventureOutcome()
						.setType('FATAL_DEATH')
						.setMessage('You let too many interactions expire so you died lol');

					const events = [
						`\` - \` You lost all items in your backpack, all your rewards, and your adventure has ended`
					];
				
					const outcomeEmbed = new EmbedBuilder()
						.setColor(`Random`)
						.setDescription(`${outcome.message}\n\n${events.join('\n')}`)
						.setFooter({ text: `Inspired by Dank Memer.` });
				
					await interaction.reply({ embeds: [outcomeEmbed] });
				
					const adventureSummaryEmbed = new EmbedBuilder()
						.setTitle(`Adventure Summary`)
						.addFields(
							{ name: `Name`, value: maidObj.adventure.name, inline: true },
							{ name: `Description`, value: maidObj.adventure.description, inline: true },
							{ name: `Backpack`, value: maidObj.adventure.items.length > 0 ? maidObj.adventure.items.map(item => item.emoji).join('') : `-`, inline: true },
							{ name: `Items Found`, value: ' - ', inline: true },
							{ name: `Coins Found`, value: ' - ', inline: true },
							{ name: `Interactions`, value: `${maidObj.adventure.interactions}`, inline: true }
						);						
						
					await interaction.followUp({ embeds: [adventureSummaryEmbed] });
				
					// eslint-disable-next-line require-atomic-updates
					maidObj.adventure = {};
				
					await db.set(interaction.user.id, maidObj);

					return;
				}

				if (maidObj.adventure.interactions < 19) {
					interaction.client.confirmations.set(maid, true);
					const rng = Functions.getRandomNumber(1, 100);

					const skybotAdventure = new SkybotAdventure()
						.setDatabaseInstance(db)
						.setInteractionInstance(interaction)
						.setGlobalDebugMode(false, false)
						.addAdventureEvents(
							new AdventureEvent()
								.setContent('You come across a tryhard in the village area, what do you do?')
								.setType('NORMAL')
								.setEventWeight(5)
								.addOutcomeGroups(
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId('hubAdv1_Beg')
												.setLabel(`Beg`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType('ITEM_LOSS')
												.setMessage(`The tryhard hated beggars, so he got mad at you.`)
												.setItemTakenMessage(`The tryhard hated beggars, so he got mad at you and yoinked your \${itemToTake.name}`)
												.setWeight(50),
											new AdventureOutcome()
												.setType('REWARD')
												.setMessage(`Turns out this tryhard was giving away free stuff, so you didn't need to beg!`)
												.setWeight(25)
												.setReward(
													{
														name: `Enchanted Diamond`,
														keyName: `enchantedDiamond`,
														emoji: `<:Enchanted_Diamond:902764556865142835>`,
														amount: 1
													}
												),
											new AdventureOutcome()
												.setType('REWARD')
												.setMessage(`This tryhard turned out to be really nice to beggars and gave you 100,000 coins!`)
												.setWeight(25)
												.setReward(
													{
														name: 'Coins',
														keyName: `coins`,
														emoji: `<:Coins:885677584749318154>`,
														amount: 100_000
													}
												)
										),
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId('hubAdv1_Talk')
												.setLabel(`Talk`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType('NOTHING')
												.setMessage(`You talked to the tryhard`)
												.setWeight(100)
										),
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId('hubAdv1_Ignore')
												.setLabel(`Ignore`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType('NOTHING')
												.setMessage(`The tryhard turned out to be giving free stuff, shame you just ignored him LMAO.`)
												.setWeight(50),
											new AdventureOutcome()
												.setType('NOTHING')
												.setMessage(`The tryhard really hated beggars, thank GOD you ignored him.`)
												.setWeight(50)
										)
								),
							new AdventureEvent()
								.setContent('You saw a noob with no armor mining iron, and a zombie comes close. What do you do?')
								.setType('NORMAL')
								.setEventWeight(5)
								.addOutcomeGroups(
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId('hubAdv2_Save')
												.setLabel(`Save`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType('REWARD')
												.setMessage(`You saved him, turns out he was a pro pretending to be a noob. He gave you an Emerald Box for saving him!`)
												.setWeight(2)
												.setReward(
													{
														name: 'Emerald Box',
														keyName: `emeraldBox`,
														emoji: `<a:Emerald_Box:956735451622940693>`,
														amount: 1
													}
												),
											new AdventureOutcome()
												.setType('FATAL_DEATH')
												.setMessage(`You died while trying to save him, guess your efforts were in vain.`)
												.setWeight(98)
										),
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv2_Ignore`)
												.setLabel(`Ignore`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType(`NOTHING`)
												.setMessage(`The noob you ignored died to the zombie, that poor noob...`)
												.setWeight(100)
										)
								),
							new AdventureEvent()
								.setContent('You saw a player drop cool-looking armor, what do you do?')
								.setType('NORMAL')
								.setEventWeight(5)

								.addOutcomeGroups(
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv3_Return`)
												.setLabel(`Return`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType(`NOTHING`)
												.setMessage(`You returned the armor, and he thanked you for your honesty`)
												.setWeight(97),
											new AdventureOutcome()
												.setType(`REWARD`)
												.setMessage(`You returned the armor. He was actually testing you, and gave you a Diamond Box for your honesty!`)
												.setWeight(3)
												.setReward(
													{
														name: 'Diamond Box',
														keyName: `diamondBox`,
														emoji: `<a:Diamond_Box:956735439480422430>`,
														amount: 1
													}
												)
										),
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv3_Steal`)
												.setLabel(`Steal`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType(`NOTHING`)
												.setMessage(`It was actually a test! You didn't realize the armor had a tracker on it, and he came to slap you for stealing his armor.`) 
												.setWeight(80),
											new AdventureOutcome()
												.setType(`NOTHING`)
												.setMessage(`You got away with the armor, turns out it has trash stats.`)
												.setWeight(20)
										)
								),
							new AdventureEvent()
								.setContent(`You see someone dropping free enchanted diamonds! What do you do?`)
								.setType('NORMAL')
								.setEventWeight(5)

								.addOutcomeGroups(
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv4_Snag`)
												.setLabel(`Snag`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType(`REWARD`)
												.setMessage(`Turns out this whole free enchanted diamond thing was real! You managed to snag one!`)
												.setWeight(65)
												.setReward(
													{
														name: `Enchanted Diamond`,
														keyName: `enchantedDiamond`,
														emoji: `<:Enchanted_Diamond:902764556865142835>`,
														amount: 1
													}
												),
											new AdventureOutcome()
												.setType(`NOTHING`)
												.setMessage(`Turns out the free enchanted diamonds were GHOST ITEMS, you just got tricked so hard LOL`)
												.setWeight(35)
										),
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv4_Ignore`)
												.setLabel(`Ignore`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType(`NOTHING`)
												.setMessage(`Turns out it wasn't cap, you missed a chance for a FREE ENCHANTED DIAMOND LMAO`)
												.setWeight(65),
											new AdventureOutcome()
												.setType(`NOTHING`)
												.setMessage(`Turns out the free enchanted diamonds were ghost items, you picked the right decision!`)
												.setWeight(35)
										),
								),
							new AdventureEvent()
								.setContent(`While exploring the hub, you came across a person in a catgirl skin who really needs help. What do you do?`)
								.setType('NORMAL')
								.setEventWeight(5)

								.addOutcomeGroups(
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv5_Give`)
												.setLabel(`Give`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType('NOTHING')
												.setMessage(`You gave her some good tools, she looks very happy!`)
												.setWeight(55),
											new AdventureOutcome()
												.setType('ITEM_LOSS')
												.setMessage(`You weirded her out, so she ran away!`)
												.setItemTakenMessage(`You weirded her out, so she took your \${itemToTake.name} and ran away!`)
												.setWeight(44),
											new AdventureOutcome()
												.setType('NOTHING')
												.setMessage(`"I'm actually a boy bro. Did you simp for me?"`)
												.setWeight(1)
										),
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv5_Teach`)
												.setLabel(`Teach`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType('NOTHING')
												.setMessage(`You teached her how to play, now she can actually experience Skybot!`)
												.setWeight(55),
											new AdventureOutcome()
												.setType('ITEM_LOSS')
												.setMessage(`You weirded her out, so she ran away!`)
												.setItemTakenMessage(`You weirded her out, so she took your \${itemToTake.name} and ran away!`)
												.setWeight(44),
											new AdventureOutcome()
												.setType('NOTHING')
												.setMessage(`"I'm actually a boy bro. Did you simp for me?"`)
												.setWeight(1)
										),
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv5_Ignore`)
												.setLabel(`Ignore`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType('NOTHING')
												.setMessage(`You ignored her, at least you won't be called a simp!`)
												.setWeight(100)
										)
								),
							new AdventureEvent()
								.setContent(`Someone is botting! What do you do?`)
								.setType('NORMAL')
								.setEventWeight(5)

								.addOutcomeGroups(
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv6_Report`)
												.setLabel(`Report`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType(`REWARD`)
												.setMessage(`You reported him to the developer and got 100,000 as a reward!`)
												.setWeight(85)
												.setReward(
													{
														name: 'Coins',
														keyName: `coins`,
														emoji: `<:Coins:885677584749318154>`,
														amount: 100_000
													}
												),
											new AdventureOutcome()
												.setType(`REWARD`)
												.setMessage(`You reported him to the developer. Turns out he had a 2,069,420 bounty on him, now you got free money!`)
												.setWeight(15)
												.setReward(
													{
														name: 'Coins',
														keyName: `coins`,
														emoji: `<:Coins:885677584749318154>`,
														amount: 2_069_420
													}
												)
										),
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv6_Ignore`)
												.setLabel(`Ignore`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType('NOTHING')
												.setMessage(`You ignored the botter. BORING.`)
												.setWeight(100)
										),
								),
							new AdventureEvent()
								.setContent(`You come across someone who died and lost 50 million! What do you do?`)
								.setType('NORMAL')
								.setEventWeight(5)

								.addOutcomeGroups(
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv7_LBozo`)
												.setLabel(`L Bozo`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType(`FATAL_DEATH`)
												.setMessage(`You didn't realize ITEMS DIDNT get lost, so he killed you with his **Aspect of the Spirit Butterfly**. "Haha, L Bozo!"`)
												.setWeight(95),
											new AdventureOutcome()
												.setType(`REWARD`)
												.setMessage(`He didnt like you spamming L Bozo in chat over and over again, so he paid you 2,500,000 to stop. "BRO PLS JUST STOP".`)
												.setWeight(5)
												.setReward(
													{
														name: 'Coins',
														keyName: `coins`,
														emoji: `<:Coins:885677584749318154>`,
														amount: 2_500_000
													}
												)
										),
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv7_Comfort`)
												.setLabel(`Comfort`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType(`NOTHING`)
												.setMessage(`Your method of comfort didn't really help him with his problem, so you go on with your day.`)
												.setWeight(98),
											new AdventureOutcome()
												.setType(`REWARD`)
												.setMessage(`Your method of comfort helped him cope with his problem, so he gave you a Diamond Box!`)
												.setWeight(2)
												.setReward(
													{
														name: 'Diamond Box',
														keyName: `diamondBox`,
														emoji: `<a:Diamond_Box:956735439480422430>`,
														amount: 1
													}
												),
										),
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv7_Ignore`)
												.setLabel(`Ignore`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType('NOTHING')
												.setMessage(`You ignored him and didn't care. "Not your problem!"`)
												.setWeight(100)
										)
								),
							new AdventureEvent()
								.setContent(`You come across someone sorting their items, boring...`)
								.setType('NORMAL')
								.setEventWeight(5)

								.addOutcomeGroups(
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv8_Help`)
												.setLabel(`Help`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType(`REWARD`)
												.setMessage(`He thanked you for your help and gave you 69,420 coins! Very sussy, indeed!`)
												.setWeight(99)
												.setReward(
													{
														name: 'Coins',
														keyName: `coins`,
														emoji: `<:Coins:885677584749318154>`,
														amount: 69_420
													}
												),
											new AdventureOutcome()
												.setType(`REWARD`)
												.setMessage(`He thanked you for your help and gave you a Spirit Butterfly as a token of his gratitude.`)
												.setWeight(1)
												.setReward(
													{
														name: 'Spirit Butterfly',
														keyName: `spiritButterfly`,
														emoji: `<:Spirit_Butterfly:942633700485632071>`,
														amount: 1
													}
												)
										),
									new AdventureOutcomeGroup()
										.setButton(
											new ButtonBuilder()
												.setCustomId(`hubAdv7_Wreck`)
												.setLabel(`Wreck`)
												.setStyle(ButtonStyle.Primary)
										)
										.setOutcomes(
											new AdventureOutcome()
												.setType(`FATAL_DEATH`)
												.setMessage(`He didn't like that... He slapped you and killed you with his WOODEN SWORD LMAO.`)
												.setWeight(91),
											new AdventureOutcome()
												.setType(`ITEM_LOSS`)
												.setMessage(`He didn't like that... Now he tied you up and is not letting you go unless you sort all of the items.`)
												.setItemTakenMessage(`He didn't like that... Now he tied you up, took your \${itemToTake.name}, and is not letting you go unless you resort all of the items.`)
												.setWeight(9)
										),
								),
							new AdventureEvent()
								.setContent(`You see people talking about starting a potato war, do they even know potatoes don't exist in Skybot???`)
								.setType('NOTHING')
								.setEventWeight(5),
							new AdventureEvent()
								.setContent(`You passed by someone who is lagging around like crazy, they probably have trash internet.`)
								.setType('NOTHING')
								.setEventWeight(5),
							new AdventureEvent()
								.setContent(`Everyone in the hub is hyped for something, You don't really know what it is though...`)
								.setType('NOTHING')
								.setEventWeight(5),
							new AdventureEvent()
								.setContent(`You passed by someone who looked like the developer, weird.`)
								.setType('NOTHING')
								.setEventWeight(5),
							new AdventureEvent()
								.setContent(`Someone is trying to find the Auction House, even though it doesn't exist.`)
								.setType('NOTHING')
								.setEventWeight(5),
							new AdventureEvent()
								.setContent(`You passed by someone who is grinding kills for their **Aspect of the Spirit Butterfly**, lucky.`)
								.setType('NOTHING')
								.setEventWeight(5),
							new AdventureEvent()
								.setContent(`You see someone flying, is that a hacker?!`)
								.setType('NOTHING')
								.setEventWeight(5),
							new AdventureEvent()
								.setContent(`You see someone mining diamonds, time to leave now.`)
								.setType('NOTHING')
								.setEventWeight(5),
							new AdventureEvent()
								.setContent(`A noob just got a spirit butterfly from mining diamonds! Lucky them...`)
								.setType('NOTHING')
								.setEventWeight(5),
							new AdventureEvent()
								.setContent(`Someone just bought SO MANY STOPWATCHES, why the heck did they buy so much???`)
								.setType('NOTHING')
								.setEventWeight(5),
							new AdventureEvent()
								.setContent(`Looks like some idiot is annoying people in the barn for "killing animals", welp, not your problem.`)
								.setType('NOTHING')
								.setEventWeight(5),
							new AdventureEvent()
								.setContent(`Oh great, you got lost... Thankfully you had a map with you before you left!`)
								.setType('NOTHING')
								.setEventWeight(5)
						);

					await skybotAdventure.runSkybotAdventure();

					const newMaidObj = await db.get(maid);
					newMaidObj.adventure.nextInteraction = Date.now() + 300_000;
					
					await db.set(maid, newMaidObj);

					interaction.client.confirmations.set(maid, false);
				} else {
					const endEmbed = new EmbedBuilder()
						.setDescription('You reached the end of your adventure! Congrats')
						.setFooter({ text: `Inspired by Dank Memer` });
	
					await interaction.reply({ embeds: [endEmbed] });
	
					const foundItems = maidObj.adventure.rewards
						.filter(item => item.keyName !== `coins`)
						.map(item => {
							const data = [];
							for (let i = 0; i < item.amount; i += 1) data.push(item.emoji);
								
							return data;
						})
						.flat(Infinity)
						.join('') || `-`;
	
					const foundCoins = maidObj.adventure.coins > 0
						? `<:Coins:885677584749318154> ${Functions.commafy(maidObj.adventure.coins)}`
						: `-`;

					
	
					const adventureSummaryEmbed = new EmbedBuilder()
						.setTitle(`Adventure Summary`)
						.addFields(
							{ name: `Name`, value: maidObj.adventure.name, inline: true },
							{ name: `Description`, value: maidObj.adventure.description, inline: true },
							{ name: `Backpack`, value: maidObj.adventure.items.length > 0 ? maidObj.adventure.items.map(item => item.emoji).join('') : `-`, inline: true },
							{ name: `Items Found`, value: foundItems, inline: true },
							{ name: `Coins Found`, value: foundCoins, inline: true },
							{ name: `Interactions`, value: `${maidObj.adventure.interactions}`, inline: true }
						);						
						
					await interaction.followUp({ embeds: [adventureSummaryEmbed] });
	
					for (const item of maidObj.adventure.items) {
						maidObj[item.keyName] += item.amount;
					}

					for (const item of maidObj.adventure.rewards) {
						maidObj[item.keyName] += item.amount;
					}
	
					maidObj.adventure = {};
	
					await db.set(maid, maidObj);
				}
			}
		}
	},
};

/**
 * Check if a user has 1 or more of a specific item.
 * @param {(import 'discord.js').RawUserObj} maidObj
 * @param {string} keyName 
 */
function userHasItem(maidObj, keyName) {
	return (maidObj?.[keyName] || 0) > 0;
}