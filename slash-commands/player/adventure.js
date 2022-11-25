/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { AdventureEvent, AdventureOutcome, AdventureOutcomeGroup, Functions, SkyblockTypes, SkybotAdventure, SkybotAdventureData, SkybotAdventureSelection, SkybotAdventureHandler } = require('../../SkyblockHelper/src/index');

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

		if (!maidObj.adventure?.exists) {
			const adventureSelection = new SkybotAdventureSelection()
				.setDatabaseInstance(db)
				.setInteractionInstance(interaction)
				.setSkybotAdventures(
					new SkybotAdventureData()
						.setDefault(true)
						.setDescription(`No requirement`)
						.setInfo({
							allowedItems: [`fourLeafClover`, `stopwatch`, `piggyBank`, `crackedPiggyBank`, `brokenPiggyBank`, `spiritButterfly`, `diamond`, `enchantedCoal`, `legendaryFish`],
							description: `Go explore the main hub of Skybot, with the many islands that surrounds it!`,
							name: `Hub Exploration`
						})
						.setLabel(`Hub Exploration`)
						.setUnlockRequirements(true)
						.setValue(`HubExploration`),
					new SkybotAdventureData()
						.setDefault(false)
						.setDescription(`Requires: Mining Level 10`)
						.setInfo({
							allowedItems: [`fourLeafClover`, `stopwatch`, `piggyBank`, `crackedPiggyBank`, `brokenPiggyBank`, `spiritButterfly`, `diamond`, `enchantedCoal`, `legendaryFish`],
							description: !maidObj.subareaUnlocks?.includes('forsaken_tunnel') 
								? `Many miners have reported shaking in the Deepmines recently, so you try to find out what's going on.` 
								: `Now that this forsaken tunnel is charted into the map of the deepmines, many miners have come in and out with no harm. Still, the memory of exploring the tunnel as you found it from breaking a rock to defeat a horde of mobs remains fresh in your mind. Relive this adventure and you may yet learn something new...`,
							name: `Deeper into the Deep Mines`
						})
						.setLabel(`Deeper into the Deep Mines`)
						.setUnlockRequirements(mineLevel >= 10)
						.setValue(`DeeperIntoTheDeepMines`),
					new SkybotAdventureData()
						.setDefault(false)
						.setDescription(`Prerequisite Adventure "Deeper into the Deep Mines", Mining Level 20`)
						.setInfo({
							allowedItems: [`fourLeafClover`, `stopwatch`, `piggyBank`, `crackedPiggyBank`, `brokenPiggyBank`, `spiritButterfly`, `diamond`, `enchantedCoal`, `legendaryFish`],
							description: `The shaking of the Deepmines has been tracked down to this sealed mining area, so you figure out how to stop the shaking.`,
							name: `Perilous Adventure`
						})
						.setLabel(`Perilous Adventure`)
						.setUnlockRequirements(mineLevel >= 20 && maidObj.subareaUnlocks.includes("forsaken_tunnel"),)
						.setValue(`PerilousAdventure`),
					new SkybotAdventureData()
						.setDefault(false)
						.setDescription(`Prerequisite Adventure "Perilous Adventure", Fishing Level 10`)
						.setInfo({
							allowedItems: [`fourLeafClover`, `stopwatch`, `piggyBank`, `crackedPiggyBank`, `brokenPiggyBank`, `spiritButterfly`, `diamond`, `enchantedCoal`, `legendaryFish`],
							description: `After your Deepmines Adventure, the thunderstorm at sea has been getting closer, so you figure out what's causing it.`,
							name: `The Sea's Cruel Waters`
						})
						.setLabel(`The Sea's Cruel Waters`)
						.setUnlockRequirements(fishLevel >= 10 && maidObj.subareaUnlocks.includes("crystal_hollows"))
						.setValue(`TheSeasCruelWaters`),
					new SkybotAdventureData()
						.setDefault(false)
						.setDescription(`Prerequisite Adventure "The Sea's Cruel Waters", Fishing Level 20, Mining Level 30`)
						.setInfo({
							allowedItems: [`fourLeafClover`, `stopwatch`, `piggyBank`, `crackedPiggyBank`, `brokenPiggyBank`, `spiritButterfly`, `diamond`, `enchantedCoal`, `legendaryFish`],
							description: `After the arduous journey at The Stormy Seas, you find an island engulfed by endless thunder, so you try to explore it.`,
							name: `The Island of Endless Thunder`
						})
						.setLabel(`The Island of Endless Thunder`)
						.setUnlockRequirements(fishLevel >= 20 && mineLevel >= 30 && maidObj.subareaUnlocks.includes("the_stormy_seas"))
						.setValue(`TheIslandOfEndlessThunder`),
					new SkybotAdventureData()
						.setDefault(false)
						.setDescription(`Prerequisite Adventure "The Island of Endless Thunder", Mining Level 30`)
						.setInfo({
							allowedItems: [`fourLeafClover`, `stopwatch`, `piggyBank`, `crackedPiggyBank`, `brokenPiggyBank`, `spiritButterfly`, `diamond`, `enchantedCoal`, `legendaryFish`],
							description: `After your journey at The Island of Endless Thunder, you see a tunnel that you think leads back to the hub, so you decide to explore it.`,
							name: `Mysterious Stone Tunnel`
						})
						.setLabel(`Mysterious Stone Tunnel`)
						.setUnlockRequirements(mineLevel >= 30 && maidObj.subareaUnlocks.includes("thunder_island"))
						.setValue(`MysteriousStoneTunnel`)
				);

			// console.log(adventureSelection.adventureSelections);
	
			await adventureSelection.runSkybotAdventureSelection();
		} else {
			if (maidObj.adventure.nextInteraction > Date.now() && !Functions.getSettingValue(maidObj, 'developerOverride_cooldown')) {
				const waitEmbed = new EmbedBuilder()
					.setDescription(`You can interact with the adventure again <t:${Math.floor(maidObj.adventure.nextInteraction / 1000)}:R>`)
					.setFooter({ text: `Inspired by Dank Memer.` });

				return interaction.reply({ embeds: [waitEmbed], ephemeral: true });
			}

			if (maidObj.adventure.name === `Hub Exploration`) {
				const adventureHandler = new SkybotAdventureHandler()
					.setDatabaseInstance(db)
					.setInteractionInstance(interaction)
					.setSkybotAdventure(
						new SkybotAdventure()
							.setGlobalDebugMode(false, false)
							.addAdventureEvents(
								new AdventureEvent()
									.setContent('You come across a tryhard in the village area, what do you do?')
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.ItemLoss)
													.setMessage(`The tryhard hated beggars, so he got mad at you.`)
													.setItemTakenMessage(`The tryhard hated beggars, so he got mad at you and yoinked your \${itemToTake.name}`)
													.setWeight(50),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Reward)
													.setMessage(`Turns out this tryhard was giving away free stuff, so you didn't need to beg!`)
													.setWeight(25)
													.setReward({
														name: `Enchanted Diamond`,
														keyName: `enchantedDiamond`,
														emoji: `<:Enchanted_Diamond:902764556865142835>`,
														amount: 1
													}),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Reward)
													.setMessage(`This tryhard turned out to be really nice to beggars and gave you 100,000 coins!`)
													.setWeight(25)
													.setReward({
														name: 'Coins',
														keyName: `coins`,
														emoji: `<:Coins:885677584749318154>`,
														amount: 100_000
													})
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`The tryhard turned out to be giving free stuff, shame you just ignored him LMAO.`)
													.setWeight(50),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`The tryhard really hated beggars, thank GOD you ignored him.`)
													.setWeight(50)
											)
									),
								new AdventureEvent()
									.setContent('You saw a noob with no armor mining iron, and a zombie comes close. What do you do?')
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Reward)
													.setMessage(`You saved him, turns out he was a pro pretending to be a noob. He gave you an Emerald Box for saving him!`)
													.setWeight(2)
													.setReward({
														name: 'Emerald Box',
														keyName: `emeraldBox`,
														emoji: `<a:Emerald_Box:956735451622940693>`,
														amount: 1
													}),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.FatalDeath)
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`The noob you ignored died to the zombie, that poor noob...`)
													.setWeight(100)
											)
									),
								new AdventureEvent()
									.setContent('You saw a player drop cool-looking armor, what do you do?')
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You returned the armor, and he thanked you for your honesty`)
													.setWeight(97),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Reward)
													.setMessage(`You returned the armor. He was actually testing you, and gave you a Diamond Box for your honesty!`)
													.setWeight(3)
													.setReward({
														name: 'Diamond Box',
														keyName: `diamondBox`,
														emoji: `<a:Diamond_Box:956735439480422430>`,
														amount: 1
													})
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`It was actually a test! You didn't realize the armor had a tracker on it, and he came to slap you for stealing his armor.`) 
													.setWeight(80),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You got away with the armor, turns out it has trash stats.`)
													.setWeight(20)
											)
									),
								new AdventureEvent()
									.setContent(`You see someone dropping free enchanted diamonds! What do you do?`)
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Reward)
													.setMessage(`Turns out this whole free enchanted diamond thing was real! You managed to snag one!`)
													.setWeight(65)
													.setReward({
														name: `Enchanted Diamond`,
														keyName: `enchantedDiamond`,
														emoji: `<:Enchanted_Diamond:902764556865142835>`,
														amount: 1
													}),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`Turns out it wasn't cap, you missed a chance for a FREE ENCHANTED DIAMOND LMAO`)
													.setWeight(65),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`Turns out the free enchanted diamonds were ghost items, you picked the right decision!`)
													.setWeight(35)
											),
									),
								new AdventureEvent()
									.setContent(`While exploring the hub, you came across a person in a catgirl skin who really needs help. What do you do?`)
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You gave her some good tools, she looks very happy!`)
													.setWeight(55),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.ItemLoss)
													.setMessage(`You weirded her out, so she ran away!`)
													.setItemTakenMessage(`You weirded her out, so she took your \${itemToTake.name} and ran away!`)
													.setWeight(44),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You teached her how to play, now she can actually experience Skybot!`)
													.setWeight(55),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.ItemLoss)
													.setMessage(`You weirded her out, so she ran away!`)
													.setItemTakenMessage(`You weirded her out, so she took your \${itemToTake.name} and ran away!`)
													.setWeight(44),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You ignored her, at least you won't be called a simp!`)
													.setWeight(100)
											)
									),
								new AdventureEvent()
									.setContent(`Someone is botting! What do you do?`)
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Reward)
													.setMessage(`You reported him to the developer and got 100,000 as a reward!`)
													.setWeight(85)
													.setReward({
														name: 'Coins',
														keyName: `coins`,
														emoji: `<:Coins:885677584749318154>`,
														amount: 100_000
													}),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Reward)
													.setMessage(`You reported him to the developer. Turns out he had a 2,069,420 bounty on him, now you got free money!`)
													.setWeight(15)
													.setReward({
														name: 'Coins',
														keyName: `coins`,
														emoji: `<:Coins:885677584749318154>`,
														amount: 2_069_420
													})
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You ignored the botter. BORING.`)
													.setWeight(100)
											),
									),
								new AdventureEvent()
									.setContent(`You come across someone who died and lost 50 million! What do you do?`)
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Reward)
													.setMessage(`He didnt like you spamming L Bozo in chat over and over again, so he paid you 2,500,000 to stop. "BRO PLS JUST STOP".`)
													.setWeight(5)
													.setReward({
														name: 'Coins',
														keyName: `coins`,
														emoji: `<:Coins:885677584749318154>`,
														amount: 2_500_000
													})
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`Your method of comfort didn't really help him with his problem, so you go on with your day.`)
													.setWeight(98),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Reward)
													.setMessage(`Your method of comfort helped him cope with his problem, so he gave you a Diamond Box!`)
													.setWeight(2)
													.setReward({
														name: 'Diamond Box',
														keyName: `diamondBox`,
														emoji: `<a:Diamond_Box:956735439480422430>`,
														amount: 1
													}),
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You ignored him and didn't care. "Not your problem!"`)
													.setWeight(100)
											)
									),
								new AdventureEvent()
									.setContent(`You come across someone sorting their items, boring...`)
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
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
													.setType(SkyblockTypes.AdventureOutcomeTypes.Reward)
													.setMessage(`He thanked you for your help and gave you 69,420 coins! Very sussy, indeed!`)
													.setWeight(99)
													.setReward({
														name: 'Coins',
														keyName: `coins`,
														emoji: `<:Coins:885677584749318154>`,
														amount: 69_420
													}),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Reward)
													.setMessage(`He thanked you for your help and gave you a Spirit Butterfly as a token of his gratitude.`)
													.setWeight(1)
													.setReward({
														name: 'Spirit Butterfly',
														keyName: `spiritButterfly`,
														emoji: `<:Spirit_Butterfly:942633700485632071>`,
														amount: 1
													})
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
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setEventWeight(5),
								new AdventureEvent()
									.setContent(`You passed by someone who is lagging around like crazy, they probably have trash internet.`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setEventWeight(5),
								new AdventureEvent()
									.setContent(`Everyone in the hub is hyped for something, You don't really know what it is though...`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setEventWeight(5),
								new AdventureEvent()
									.setContent(`You passed by someone who looked like the developer, weird.`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setEventWeight(5),
								new AdventureEvent()
									.setContent(`Someone is trying to find the Auction House, even though it doesn't exist.`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setEventWeight(5),
								new AdventureEvent()
									.setContent(`You passed by someone who is grinding kills for their **Aspect of the Spirit Butterfly**, lucky.`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setEventWeight(5),
								new AdventureEvent()
									.setContent(`You see someone flying, is that a hacker?!`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setEventWeight(5),
								new AdventureEvent()
									.setContent(`You see someone mining diamonds, time to leave now.`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setEventWeight(5),
								new AdventureEvent()
									.setContent(`A noob just got a spirit butterfly from mining diamonds! Lucky them...`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setEventWeight(5),
								new AdventureEvent()
									.setContent(`Someone just bought SO MANY STOPWATCHES, why the heck did they buy so much???`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setEventWeight(5),
								new AdventureEvent()
									.setContent(`Looks like some idiot is annoying people in the barn for "killing animals", welp, not your problem.`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setEventWeight(5),
								new AdventureEvent()
									.setContent(`Oh great, you got lost... Thankfully you had a map with you before you left!`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setEventWeight(5)
							)
					);

				await adventureHandler.runSkybotAdventureHandler();
			} else if (maidObj.adventure.name === `Deeper into the Deep Mines`) {
				const adventureHandler = new SkybotAdventureHandler()
					.setDatabaseInstance(db)
					.setInteractionInstance(interaction)
					.setOnCompleteFunction(async (interaction, maidObj) => {
						const unlockEmbed = new EmbedBuilder()
							.setTitle(`Adventure Completed: Deeper into the Deep Mines`)
							.setColor(`#2f3136`)
							.setFields(
								{ name: `Unlocked:`, value: `Adventure - Perilous Adventure\nDeepmines Subarea - Forsaken Tunnel` }
							);

						await interaction.followUp({ embeds: [unlockEmbed] });

						if (!('subareaUnlocks' in maidObj)) {
							maidObj.subareaUnlocks = [`forsaken_tunnel`];
						} else {
							maidObj.subareaUnlocks.push(`forsaken_tunnel`);
						}
					})
					.setSkybotAdventure(
						new SkybotAdventure()
							.setGlobalDebugMode(true, false)
							.addAdventureEvents(
								new AdventureEvent()
									.setContent(`After recieving countless reports about the Deep Mines shaking, the population decided that someone has to go in there to explore the uncharted parts of the Deep Mines. You volunteered, being the adventurer you are, and will be compensated if you come back alive.`)
									.setImage(`https://cdn.discordapp.com/attachments/1024549183077748787/1024557449698627615/DeeperIntoTheDeepMinesStart.png`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setIndexTrigger(0)
									.setIndexTriggerOnly(true),
								new AdventureEvent()
									.setContent(`While venturing below the safe point of the deepmines, you were being chased by a horde of mobs, but you see a fragile-looking rock! Do you?`)
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
									.setIndexTrigger(1)
									.setIndexTriggerOnly(true)
									.addOutcomeGroups(
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMinesAdv2_BreakTheRock`)
													.setLabel(`Break the rock`)
													.setStyle(ButtonStyle.Success)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`Once you broke the rock, it triggered a BIG chain reaction and affected all the rocks above you! All the rocks fell down, killing the horde of mobs. It also revealed a secret tunnel, so you decide to explore it!`)
													.setWeight(100)
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMinesAdv2_FightTheHorde`)
													.setLabel(`Fight the horde`)
													.setStyle(ButtonStyle.Danger)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.FatalDeath)
													.setMessage(`You died while trying to fight off the horde of mobs. They were just too powerful...`)
													.setWeight(100)
											)
									),
								new AdventureEvent()
									.setContent(`While exploring the tunnel, you come across a hole! Do you?`)
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
									.setEventWeight(5)
									.addOutcomeGroups(
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMinesAdv2_PlungeIntoHole`)
													.setLabel(`Plunge into the hole`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Reward)
													.setMessage(`You plunge right into the hole and hit a horde of mobs, but the power of that plunge attack was so high that you killed them all in one shot! One of them even dropped a shiny box!`)
													.setWeight(20)
													.setReward({
														name: 'Diamond Box',
														keyName: `diamondBox`,
														emoji: `<a:Diamond_Box:956735439480422430>`,
														amount: 1
													}),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Death)
													.setMessage(`You plunge right into the hole and hit a horde of mobs! Sadly, the power of that plunge attack wasn't so high. You were ganged up on and now you died.`)
													.setWeight(80)
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMinesAdv2_FallIntoHole`)
													.setLabel(`Fall into the hole`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Death)
													.setMessage(`You died of fall damage lol. What were you thinking?`)
													.setWeight(100)
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMinesAdv2_IgnoreHole`)
													.setLabel(`Ignore the hole`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You ignored the hole and continued to explore the tunnel.`)
													.setWeight(100)
											)
									),
								new AdventureEvent()
									.setContent(`You meet a miner here! What do you say?`)
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
									.setEventWeight(5)
									.addOutcomeGroups(
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMinesAdv3_Hello`)
													.setLabel(`Hello!`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`The miner said hello back. He says "What lies ahead is the most dangerous part of the Deepmines. There are no maps of it, no idea of it, no clue of it. Be careful venturing far beyond this point."`)
													.setWeight(100),
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMinesAdv3_Amogus`)
													.setLabel(`SUS AMOGUS`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.ItemLoss)
													.setMessage(`You annoyed the miner, so he slapped you in the face.`)
													.setItemTakenMessage(`You annoyed the miner, so he took your \${itemToTake.name}.`)
													.setWeight(100),
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMinesAdv3_Rickroll`)
													.setLabel(`NEVER GONNA GIVE YOU UP`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`The miner remembers his days when he was a kid, listening to this song. He can't believe how long it has been since those days...`)
													.setWeight(96),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Reward)
													.setMessage(`The miner says he finally found someone who shares the memories with him, so he gave you this shiny box!`)
													.setWeight(4)
													.setReward({
														amount: 1,
														emoji: `<a:Emerald_Box:956735451622940693>`,
														keyName: `emeraldBox`,
														name: `Emerald Box`
													}),
											),
									),
								new AdventureEvent()
									.setContent(`Looks like the way ahead splits into 3 paths. To the right, inside a hole, to the left. You?`)
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
									.setEventWeight(5)
									.addOutcomeGroups(
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMinesAdv3_Left`)
													.setLabel(`Take the left`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`There were a group of skeletons inside! This time, the skeletons hit EACH OTHER while trying to hit you, which caused a chain reaction between them. You were able to sit and watch them kill each other.`)
													.setWeight(50),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You observe your surroundings with a flashlight. Looks like this tunnel is safe. I wonder about the contents of the other tunnels.`)
													.setWeight(50),
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMinesAdv3_Plunge`)
													.setLabel(`Plunge into the hole`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You plunge in the hole and observe your surroundings with a flashlight. Looks like there's nothing dangerous at the moment. You continue your venture inside the hole.`)
													.setWeight(90),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.FatalDeath)
													.setMessage(`You plunge in and disturb a mob meeting! Looks like they weren't all that friendly either. They killed you and took all your items.`)
													.setWeight(10),
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMinesAdv3_Right`)
													.setLabel(`Take the Right`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Death)
													.setMessage(`There were a group of creepers inside! You made one explode and it triggered a chain reaction, which ended up killing you.`)
													.setWeight(50),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You observe your surroundings with a flashlight. Looks like this tunnel is safe. I wonder about the contents of the other tunnels.`)
													.setWeight(50),
											),
									),




								new AdventureEvent()
									.setContent(`After searching high and low, you finally find the key to the first lock, but it looks like the mobs surrounding it look much more powerful than normal. You?`)
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
									.setIndexTrigger(7)
									.setIndexTriggerOnly(true)
									.addOutcomeGroups(
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMines7_Charge`)
													.setLabel(`Charge, take it, and run`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Death)
													.setMessage(`You tried to charge in but the horde caught you eventually. You say to yourself: "This part of the Deepmines really is more dangerous! All the mobs' power has been increased by like 5 times!"`)
													.setWeight(75),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Death)
													.setMessage(`You successfully charged in! You take the key but then an alarm goes off! Another horde of powerful mobs camping in the shadown sees you trying to escape and caught up to you. "Where the hell did they come from?", you ask...`)
													.setWeight(21),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You successfully charged in and got the key before the horde can realize what happened! You ask yourself: "How in the hell did I survive that??"`)
													.setWeight(4),
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMines7_Observe`)
													.setLabel(`Observe your surroundings`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You see TNT above the horde of mobs! You use your enchanted bow to light up the TNT and it annihilated all the mobs guarding the key! You safely take the key and laugh.`)
													.setWeight(70),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You see a jump pad you can use to evade attacks! You stay on the jump pad to lure the mobs to you and jump up and plunge down to deal damage to them and evade their attacks! You do this a couple more times and defeat the whole horde, so you take the key and safely go back into the tunnel.`)
													.setWeight(30),
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMines7_Sneak`)
													.setLabel(`Sneak in to take it`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.FatalDeath)
													.setMessage(`Yeah, you really think that you can sneak past them. Their intelligence factor has also been increased, so they were able to see you and kill you`)
													.setWeight(100),
											),
									),
								new AdventureEvent()
									.setContent(`After getting the key to the first lock, you use it. 2 locks left to get the keys for! The first lock had a clue to the key for the second lock!`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setIndexTrigger(8)
									.setIndexTriggerOnly(true),





								new AdventureEvent()
									.setContent(`After following the clues, you finally find the key to the second lock, but it looks like you need to say a the correct phrase from the list, otherwise you die. You say?`)
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
									.setIndexTrigger(11)
									.setIndexTriggerOnly(true)
									.addOutcomeGroups(
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMines11_Ehe`)
													.setLabel(`Ehe~`)
													.setEmoji(`<:Venti:1022702099508760686>`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Death)
													.setMessage(`You just activated a gust of wind that pushed you to a nearby lava pool lol. "wHeRe dId tHiS rAnDoM gUsT oF wInD cOmE fRoM? wHy iS tHeRe a gUsT oF wInD iN tHe dEePmInEs" 🤓`)
													.setWeight(100),
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMines11_Order`)
													.setLabel(`I will have order`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You activated a contraption that threw a sphere-like stone structure, which crushed the chains on the key and released it.`)
													.setWeight(100),
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMines11_Cook`)
													.setLabel(`Witness the final calamity`)
													.setEmoji(`<:Ei:1022702671259508856>`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Death)
													.setMessage(`You just activated an underground thunderstorm that struck you lol. "wHy iS tHeRe a tHuNdErStOrM hErE? tHeRe aRe nO sToRm cLoUdS hErE??" 🤓`)
													.setWeight(100),
											),
									),
								new AdventureEvent()
									.setContent(`After getting the key to the second lock, you use it. 1 lock left to get the key for! The second lock also had a clue to the key for the next lock!`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setIndexTrigger(12)
									.setIndexTriggerOnly(true),




								
								new AdventureEvent()
									.setContent(`After following the clues, you finally find the key to the third lock, but it looks like you need to move the puzzle once and get it correct, otherwise you die. You also notice something peculiar about the *Right Block*. You?`)
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
									.setIndexTrigger(15)
									.setIndexTriggerOnly(true)
									.addOutcomeGroups(
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMines15_RBRL`)
													.setLabel(`Right Block, Rotate Left`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`Since the Left Block was rotated to the right, this answer is correct! You live and get the third lock.`)
													.setWeight(100)
											),	
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMines15_RBRR`)
													.setLabel(`Right Block, Rotate Right`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Death)
													.setMessage(`Since the Left Block was rotated to the right, this answer is incorrect! You die and rage (maybe IRL too).`)
													.setWeight(100)
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMines15_LBRL`)
													.setLabel(`Left Block, Rotate Left`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Death)
													.setMessage(`Since the Left Block was previously rotated to the right, this answer is incorrect! You die and rage (maybe IRL too).`)
													.setWeight(100)
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMines15_LBRR`)
													.setLabel(`Left Block, Rotate Right`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Death)
													.setMessage(`Since the Left Block was previously rotated to the right, this answer is incorrect! You die and rage (maybe IRL too).`)
													.setWeight(100)
											),								
									),
								new AdventureEvent()
									.setContent(`After getting the key to the third lock, you use it. All the chains tied to the rock has been unsealed, so you start finding ways breaking the rock.`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setIndexTrigger(16)
									.setIndexTriggerOnly(true),
								new AdventureEvent()
									.setContent(`Any ways you can think of on how to break the rock formation?`)
									.setType(SkyblockTypes.AdventureEventTypes.Normal)
									.setIndexTrigger(17)
									.setIndexTriggerOnly(true)
									.addOutcomeGroups(
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMines18_Observe`)
													.setLabel(`Observe your surroundings`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.FatalDeath)
													.setMessage(`While trying to observe your surroundings, a mob horde crept up on you! You didn't notice it until it was too late. You died`)
													.setWeight(50),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`While trying to observe your surroundings, you see a bunch of unignited TNT on the roof of the stone wall! You use your bow to explode them and the wall blowed up into smithereens`)
													.setWeight(50),
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMines18_Quote`)
													.setLabel(`Try to use a quote`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You try to use "I will have order" again and the sphere-like rock made the wall blow up into smithereens`)
													.setWeight(50),
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.Nothing)
													.setMessage(`You try to use "Witness the final calamity" this time and the big hand with the sword made the wall blow up into smithereens`)
													.setWeight(50),
											),
										new AdventureOutcomeGroup()
											.setButton(
												new ButtonBuilder()
													.setCustomId(`deepIntoMines18_MiningAway`)
													.setLabel(`MINING AWAY!`)
													.setStyle(ButtonStyle.Primary)
											)
											.setOutcomes(
												new AdventureOutcome()
													.setType(SkyblockTypes.AdventureOutcomeTypes.FatalDeath)
													.setMessage(`You seriously think that you can mine all of this? You died of fatigue lol.`)
													.setWeight(100),
											),
									),
								new AdventureEvent()
									.setContent(`After the strange rock formation has settled, you have been greeted with a seal. "What's on the other side?", you ask.\n\n<:Blank:1021980332658020466><:Blank:1021980332658020466><:Blank:1021980332658020466><:Blank:1021980332658020466><:Blank:1021980332658020466>__**To Be Continued: Perilous Adventure**__`)
									.setType(SkyblockTypes.AdventureEventTypes.Nothing)
									.setImage(`https://cdn.discordapp.com/attachments/1024549183077748787/1024557449283375134/DeeperIntoTheDeepMinesEnd.png`)
									.setIndexTrigger(18)
									.setIndexTriggerOnly(true)
							)
					);
				
				await adventureHandler.runSkybotAdventureHandler();
			}
		}
	},
};

