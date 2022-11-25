/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder, MessageManager } = require('discord.js');
const { Confirmation, Functions, SkyblockTypes, SkybotDatabaseHandler } = require('../../SkyblockHelper/src/index');
const chalk = require('chalk');

const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`start`)
		.setDescription(`Starts up your adventure on Skybot (or restarts it).`),
	group: `Player`,
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const start = maidObj?.start;
		
		if (start) {
			if (Functions.getSettingValue(maidObj, 'avoidRestart')) {
				const youBlockedThisFeatureEmbed = new EmbedBuilder()
					.setColor(`#2f3136`)
					.setDescription(`You have the \`avoidRestart\` feature enabled! Disable it first before trying to restart your Skybot progress.`);

				return interaction.reply({ embeds: [youBlockedThisFeatureEmbed] });
			}

			const confirmation = new Confirmation(
				interaction, 
				{ content: `🔄 ${interaction.user}, you already have a Skybot profile, If you want to reset your Skybot profile, hit <:check:885408207097462786>, and if you dont want to reset your profile, hit <:cross:885408206959046678>.` }
			);

			// eslint-disable-next-line no-unused-vars
			confirmation.on('check', async (_button, sent) => {
				/* Tools */
				maidObj.axe = '<:Wooden_Axe:817217337261424650>';
				maidObj.pickaxe = '<:Wooden_Pickaxe:817217441394196572>';
				maidObj.rod = '<:Wooden_Rod:816598231509237810>';



				// Mining:Normal_Ores
				maidObj.cobblestone = 0;
				maidObj.coal = 0;
				maidObj.ironOre = 0;
				maidObj.iron = 0;
				maidObj.goldOre = 0;
				maidObj.gold = 0;
				maidObj.lapis = 0;
				maidObj.diamond = 0;
				maidObj.pureDiamond = 0;

				// Mining:Mines
				maidObj.mine = SkyblockTypes.SkyblockMines.StarterMine;


			
				/* XP System */
				maidObj.mineLevel = 0;
				maidObj.mineXp = 0;
				maidObj.fishLevel = 0;
				maidObj.fishXp = 0;
				maidObj.chopLevel = 0;
				maidObj.chopXp = 0;



				// Foraging:Wood
				maidObj.oakWood = 0;
				maidObj.birchWood = 0;
				maidObj.darkOakWood = 0;
				maidObj.spruceWood = 0;
				maidObj.acaciaWood = 0;
				maidObj.jungleWood = 0;
				maidObj.planks = 0;
				maidObj.stick = 0;

				// Foraging:Islands
				maidObj.forest = SkyblockTypes.SkyblockForests.Forest;


				/* Fishing */
				maidObj.commonFish = 0;
				maidObj.uncommonFish = 0;
				maidObj.rareFish = 0;
				maidObj.ultraRareFish = 0;
				maidObj.legendaryFish = 0;



				/* Coin System */
				maidObj.coins = 0;
				maidObj.bank = 0;
				maidObj.netWorth = 0;



				// Minions:Foraging_Minions
				maidObj.invOakWoodMinion = 0;
				maidObj.invBirchWoodMinion = 0;
				maidObj.invDarkOakWoodMinion = 0;
				maidObj.invSpruceWoodMinion = 0;
				maidObj.invAcaciaWoodMinion = 0;
				maidObj.invJungleWoodMinion = 0;

				// Minions:Mining_Minions
				maidObj.invCobblestoneMinion = 0;
				maidObj.invCoalMinion = 0;
				maidObj.invIronMinion = 0;
				maidObj.invGoldMinion = 0;
				maidObj.invDiamondMinion = 0;
				maidObj.invLapisMinion = 0;

				// Minions:Placed_Minions_Array
				maidObj.placedMinions = [
					[
						'invCobblestoneMinion',
						'i',
						null,
						null,
						null,
						null,
						null,
						Date.now(),
					],
				];



				/* Bank Upgrade Feature */
				maidObj.bankTier = 1;
				maidObj.enchantedGold = 0;
				maidObj.enchantedGoldBlock = 0;



				/* Minion Fuel Feature */
				maidObj.blockOfCoal = 0;
				maidObj.enchantedBread = 0;
				maidObj.enchantedCharcoal = 0;
				maidObj.enchantedCoal = 0;
				maidObj.enchantedLavaBucket = 0;



				// Enchanted_Items:Ores
				maidObj.enchantedCobblestone = 0;
				maidObj.enchantedIron = 0;
				maidObj.enchantedLapis = 0;
				maidObj.enchantedDiamond = 0;

				// Enchanted_Items:Wood
				maidObj.enchantedOakWood = 0;
				maidObj.enchantedBirchWood = 0;
				maidObj.enchantedDarkOakWood = 0;
				maidObj.enchantedSpruceWood = 0;
				maidObj.enchantedAcaciaWood = 0;
				maidObj.enchantedJungleWood = 0;



				/* Redstone (for Minions)*/
				maidObj.redstone = 0;
				maidObj.enchantedRedstone = 0;
				maidObj.compactor = 0;
				maidObj.superCompactor = 0;
				maidObj.invRedstoneMinion = 0;



				// Player_Status:Tutorial
				maidObj.tutorials = {
					minion: false,
					dices: false,
					highlow: false,
					scratchoff: false
				};

				// Player_Status:Gamble_Stats
				maidObj.gambleStats = {
					dices: {
						moneyWon: 0,
						moneyLost: 0,
						totalWins: 0,
						totalLoses: 0
					},
					scratchoff: {
						moneyWon: 0,
						moneyLost: 0,
						totalWins: 0,
						totalLoses: 0
					}
				};



				// Combat_and_Tools:Initial_Sword
				maidObj.sword = {
					name: "Wooden sword", 
					keyName: "woodenSword",
					emoji: "<:Wooden_Sword:945957542280970300>",
					baseDamage: 20,
					enchantments: []
				};

				// Combat_and_Tools:Swords
				maidObj.woodenSword = 0;
				maidObj.stoneSword = 0;
				maidObj.ironSword = 0;
				maidObj.goldSword = 0;
				maidObj.diamondSword = 0;

				maidObj.aspectOfTheSpiritButterfly = 0;	
				maidObj.spiritButterfly = 0;

				// Combat_and_Tools:Pickaxes
				maidObj.woodenPickaxe = 0;
				maidObj.stonePickaxe = 0;
				maidObj.ironPickaxe = 0;
				maidObj.goldPickaxe = 0;
				maidObj.diamondPickaxe = 0;

				// Combat_and_Tools:Axes
				maidObj.woodenAxe = 0;
				maidObj.stoneAxe = 0;
				maidObj.ironAxe = 0;
				maidObj.goldAxe = 0;
				maidObj.diamondAxe = 0;

				// Combat_and_Tools:XP_System
				maidObj.combatLevel = 0;
				maidObj.combatXp = 0;				

				

				// Power-up_&_Statistics: Power-ups
				maidObj.activeItems = [];
				maidObj.fourLeafClover = 0;
				maidObj.stopwatch = 0;

				// Power-up_&_Statistics: Statistics
				maidObj.commandUses = {};
				maidObj.achievements = [
					{
						id: `use1kCmds`,
						done: false
					},
					{
						id: `use10kCmds`,
						done: false
					},
					{
						id: `use50kCmds`,
						done: false
					},
					{
						id: `use100kCmds`,
						done: false
					}
				];

				// Power-up_&_Statistics: The Barn
				// This is a new and better way of checking where the User is, instead of a true, false, false, false algorithm.
				maidObj.enclosure = 'cow'; 

				maidObj.piggyBank = 0;
				maidObj.crackedPiggyBank = 0;
				maidObj.brokenPiggyBank = 0;

				maidObj.rawPorkchop = 0;
				maidObj.enchantedPork = 0;
				maidObj.enchantedGrilledPork = 0;

				maidObj.rawChicken = 0;
				maidObj.enchantedRawChicken = 0;

				maidObj.rawBeef = 0;
				maidObj.enchantedRawBeef = 0;

				maidObj.rawMutton = 0;
				maidObj.enchantedMutton = 0;
				maidObj.enchantedCookedMutton = 0;

				// Power-up_&_Statistics: Others
				maidObj.adventure = {};

				// v11 update
				maidObj.protectorDragonHelmet = 0;
				maidObj.protectorDragonChestplate = 0;
				maidObj.protectorDragonLeggings = 0;
				maidObj.protectorDragonBoots = 0;
				maidObj.protectorDragonFragment = 0;
			
				maidObj.oldDragonHelmet = 0;
				maidObj.oldDragonChestplate = 0;
				maidObj.oldDragonLeggings = 0;
				maidObj.oldDragonBoots = 0;
				maidObj.oldDragonFragment = 0;
				
				maidObj.wiseDragonHelmet = 0;
				maidObj.wiseDragonChestplate = 0;
				maidObj.wiseDragonLeggings = 0;
				maidObj.wiseDragonBoots = 0;
				maidObj.wiseDragonFragment = 0;
			
				maidObj.unstableDragonHelmet = 0;
				maidObj.unstableDragonChestplate = 0;
				maidObj.unstableDragonLeggings = 0;
				maidObj.unstableDragonBoots = 0;
				maidObj.unstableDragonFragment = 0;
			
				maidObj.youngDragonHelmet = 0;
				maidObj.youngDragonChestplatt = 0;
				maidObj.youngDragonLeggingt = 0;
				maidObj.youngDragonBoots = 0;
				maidObj.youngDragonFragment = 0;
			
				maidObj.strongDragonHelmet = 0;
				maidObj.strongDragonChestplate = 0;
				maidObj.strongDragonLeggings = 0;
				maidObj.strongDragonBoots = 0;
				maidObj.strongDragonFragment = 0;
			
				maidObj.superiorDragonHelmet = 0;
				maidObj.superiorDragonChestplate = 0;
				maidObj.superiorDragonLeggings = 0;
				maidObj.superiorDragonBoots = 0;
				maidObj.superiorDragonFragment = 0;
				
				maidObj.summoningEye = 0;
				maidObj.remnantOfTheEye = 0;
					
				/* User's update + Start is now to the max. */
				maidObj.start = true;
				maidObj.update = '11.0.0';
				await db.set(maid, maidObj);
	
				await sent.edit(`Welcome to Skybot!`);

				await wait(3000);
					
				sent.edit(`Welcome to Skybot... again?!`);
			});

			confirmation.on('cross', (_button, sent) => {
				sent.reactions.removeAll();
				sent.edit(`Alright, lets pretend that never happened.`);
			});

			confirmation.on('error', (error, sent) => {
				console.error(error);
				sent.reactions.removeAll();
				sent.edit(`Alright, lets pretend that never happened.`);
			});
		} else {
			await interaction.deferReply({ ephemeral: true });

			if (interaction.client.user.id === `825984278621323303` && db instanceof SkybotDatabaseHandler) {
				// Get the key treshold from keyTreshold and the amount of databases from databases.length 
				const { keyTreshold, databases: { length: databaseCount } } = db;

				// Get the amount of keys in all the databases;
				const totalKeys = (await db.list()).length;

				// keyTreshold * databaseCount is the maximum total of keys. If totalKeys is equal or greater than that amount, say it's full.
				if ((keyTreshold * databaseCount) <= totalKeys) {
					const skybotDatabaseFullEmbed = new EmbedBuilder()
						.setTitle('Skybot is Full!')
						.setDescription(`Due to Database restrictions, Skybot's Database(s) are currently full at the moment.\n\nA new database can take about 7-14 days to be added, depending on how long will it take for the bot owner to get notified about the database(s) being full. An announcement will be made in <#885383984845054012> on Skybot's official Discord server. You can join using this [link](https://discord.gg/f2Wf339b92)\n\nSorry for the inconvience this may give you, but it's Skybot's current workaround for the database restrictions.`);

					return interaction.editReply({ embeds: [skybotDatabaseFullEmbed] });
				}
			}
			
			const maidObj = await db.get(maid) ?? {};

			/* Tools */
			maidObj.axe = '<:Wooden_Axe:817217337261424650>';
			maidObj.pickaxe = '<:Wooden_Pickaxe:817217441394196572>';
			maidObj.rod = '<:Wooden_Rod:816598231509237810>';



			// Mining:Normal_Ores
			maidObj.cobblestone = 0;
			maidObj.coal = 0;
			maidObj.ironOre = 0;
			maidObj.iron = 0;
			maidObj.goldOre = 0;
			maidObj.gold = 0;
			maidObj.lapis = 0;
			maidObj.diamond = 0;
			maidObj.pureDiamond = 0;

			// Mining:Mines
			maidObj.mine = SkyblockTypes.SkyblockMines.StarterMine;


		
			/* XP System */
			maidObj.mineLevel = 0;
			maidObj.mineXp = 0;
			maidObj.fishLevel = 0;
			maidObj.fishXp = 0;
			maidObj.chopLevel = 0;
			maidObj.chopXp = 0;



			// Foraging:Wood
			maidObj.oakWood = 0;
			maidObj.birchWood = 0;
			maidObj.darkOakWood = 0;
			maidObj.spruceWood = 0;
			maidObj.acaciaWood = 0;
			maidObj.jungleWood = 0;
			maidObj.planks = 0;
			maidObj.stick = 0;

			// Foraging:Islands
			maidObj.forest = SkyblockTypes.SkyblockForests.Forest;


			/* Fishing */
			maidObj.commonFish = 0;
			maidObj.uncommonFish = 0;
			maidObj.rareFish = 0;
			maidObj.ultraRareFish = 0;
			maidObj.legendaryFish = 0;



			/* Coin System */
			maidObj.coins = 0;
			maidObj.bank = 0;
			maidObj.netWorth = 0;



			// Minions:Foraging_Minions
			maidObj.invOakWoodMinion = 0;
			maidObj.invBirchWoodMinion = 0;
			maidObj.invDarkOakWoodMinion = 0;
			maidObj.invSpruceWoodMinion = 0;
			maidObj.invAcaciaWoodMinion = 0;
			maidObj.invJungleWoodMinion = 0;

			// Minions:Mining_Minions
			maidObj.invCobblestoneMinion = 0;
			maidObj.invCoalMinion = 0;
			maidObj.invIronMinion = 0;
			maidObj.invGoldMinion = 0;
			maidObj.invDiamondMinion = 0;
			maidObj.invLapisMinion = 0;

			// Minions:Placed_Minions_Array
			maidObj.placedMinions = [
				[
					'invCobblestoneMinion',
					'i',
					null,
					null,
					null,
					null,
					null,
					Date.now(),
				],
			];



			/* Bank Upgrade Feature */
			maidObj.bankTier = 1;
			maidObj.enchantedGold = 0;
			maidObj.enchantedGoldBlock = 0;



			/* Minion Fuel Feature */
			maidObj.blockOfCoal = 0;
			maidObj.enchantedBread = 0;
			maidObj.enchantedCharcoal = 0;
			maidObj.enchantedCoal = 0;
			maidObj.enchantedLavaBucket = 0;



			// Enchanted_Items:Ores
			maidObj.enchantedCobblestone = 0;
			maidObj.enchantedIron = 0;
			maidObj.enchantedLapis = 0;
			maidObj.enchantedDiamond = 0;

			// Enchanted_Items:Wood
			maidObj.enchantedOakWood = 0;
			maidObj.enchantedBirchWood = 0;
			maidObj.enchantedDarkOakWood = 0;
			maidObj.enchantedSpruceWood = 0;
			maidObj.enchantedAcaciaWood = 0;
			maidObj.enchantedJungleWood = 0;



			/* Redstone (for Minions)*/
			maidObj.redstone = 0;
			maidObj.enchantedRedstone = 0;
			maidObj.compactor = 0;
			maidObj.superCompactor = 0;
			maidObj.invRedstoneMinion = 0;



			// Player_Status:Tutorial
			maidObj.tutorials = {
				minion: false,
				dices: false,
				highlow: false,
				scratchoff: false
			};

			// Player_Status:Gamble_Stats
			maidObj.gambleStats = {
				dices: {
					moneyWon: 0,
					moneyLost: 0,
					totalWins: 0,
					totalLoses: 0
				},
				scratchoff: {
					moneyWon: 0,
					moneyLost: 0,
					totalWins: 0,
					totalLoses: 0
				}
			};



			// Combat_and_Tools:Initial_Sword
			maidObj.sword = {
				name: "Wooden sword", 
				keyName: "woodenSword",
				emoji: "<:Wooden_Sword:945957542280970300>",
				baseDamage: 20,
				enchantments: []
			};

			// Combat_and_Tools:Swords
			maidObj.woodenSword = 0;
			maidObj.stoneSword = 0;
			maidObj.ironSword = 0;
			maidObj.goldSword = 0;
			maidObj.diamondSword = 0;

			maidObj.aspectOfTheSpiritButterfly = 0;	
			maidObj.spiritButterfly = 0;

			// Combat_and_Tools:Pickaxes
			maidObj.woodenPickaxe = 0;
			maidObj.stonePickaxe = 0;
			maidObj.ironPickaxe = 0;
			maidObj.goldPickaxe = 0;
			maidObj.diamondPickaxe = 0;

			// Combat_and_Tools:Axes
			maidObj.woodenAxe = 0;
			maidObj.stoneAxe = 0;
			maidObj.ironAxe = 0;
			maidObj.goldAxe = 0;
			maidObj.diamondAxe = 0;

			// Combat_and_Tools:XP_System
			maidObj.combatLevel = 0;
			maidObj.combatXp = 0;				

			

			// Power-up_&_Statistics: Power-ups
			maidObj.activeItems = [];
			maidObj.fourLeafClover = 0;
			maidObj.stopwatch = 0;

			// Power-up_&_Statistics: Statistics
			maidObj.commandUses = {};
			maidObj.achievements = [
				{
					id: `use1kCmds`,
					done: false
				},
				{
					id: `use10kCmds`,
					done: false
				},
				{
					id: `use50kCmds`,
					done: false
				},
				{
					id: `use100kCmds`,
					done: false
				}
			];

			// Power-up_&_Statistics: The Barn
			// This is a new and better way of checking where the User is, instead of a true, false, false, false algorithm.
			maidObj.enclosure = 'cow'; 

			maidObj.piggyBank = 0;
			maidObj.crackedPiggyBank = 0;
			maidObj.brokenPiggyBank = 0;

			maidObj.rawPorkchop = 0;
			maidObj.enchantedPork = 0;
			maidObj.enchantedGrilledPork = 0;

			maidObj.rawChicken = 0;
			maidObj.enchantedRawChicken = 0;

			maidObj.rawBeef = 0;
			maidObj.enchantedRawBeef = 0;

			maidObj.rawMutton = 0;
			maidObj.enchantedMutton = 0;
			maidObj.enchantedCookedMutton = 0;

			// Power-up_&_Statistics: Others
			maidObj.adventure = {};

			// The End Update
			maidObj.protectorDragonHelmet = 0;
			maidObj.protectorDragonChestplate = 0;
			maidObj.protectorDragonLeggings = 0;
			maidObj.protectorDragonBoots = 0;
			maidObj.protectorDragonFragment = 0;
		
			maidObj.oldDragonHelmet = 0;
			maidObj.oldDragonChestplate = 0;
			maidObj.oldDragonLeggings = 0;
			maidObj.oldDragonBoots = 0;
			maidObj.oldDragonFragment = 0;
			
			maidObj.wiseDragonHelmet = 0;
			maidObj.wiseDragonChestplate = 0;
			maidObj.wiseDragonLeggings = 0;
			maidObj.wiseDragonBoots = 0;
			maidObj.wiseDragonFragment = 0;
		
			maidObj.unstableDragonHelmet = 0;
			maidObj.unstableDragonChestplate = 0;
			maidObj.unstableDragonLeggings = 0;
			maidObj.unstableDragonBoots = 0;
			maidObj.unstableDragonFragment = 0;
		
			maidObj.youngDragonHelmet = 0;
			maidObj.youngDragonChestplatt = 0;
			maidObj.youngDragonLeggingt = 0;
			maidObj.youngDragonBoots = 0;
			maidObj.youngDragonFragment = 0;
		
			maidObj.strongDragonHelmet = 0;
			maidObj.strongDragonChestplate = 0;
			maidObj.strongDragonLeggings = 0;
			maidObj.strongDragonBoots = 0;
			maidObj.strongDragonFragment = 0;
		
			maidObj.superiorDragonHelmet = 0;
			maidObj.superiorDragonChestplate = 0;
			maidObj.superiorDragonLeggings = 0;
			maidObj.superiorDragonBoots = 0;
			maidObj.superiorDragonFragment = 0;
			
			maidObj.summoningEye = 0;
			maidObj.remnantOfTheEye = 0;

			/* User's update + Start is now to the max. */
			maidObj.start = true;
			maidObj.update = '11.0.0';

			if (maidObj.tutorial === 1) {
				console.log(`[TutorialHandler]${chalk.greenBright(`[Logging]`)} | Completed tutorial step: start`);

				maidObj.tutorial = 2;
			}

			await db.set(maid, maidObj);

			await interaction.editReply({ content: `Welcome to Skybot! (${(await db.list()).length}/5000)` });
		}
	}
};