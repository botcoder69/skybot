/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Confirmation, SkyblockTypes } = require('../../SkyblockHelper/src/index');
const wait = require('util').promisify(setTimeout);

const tutorialEmbed = new EmbedBuilder()
	.setTitle(`Update command`)
	.setDescription(`This is a very handy command for you. This updates your Skybot version to the maximum level. Since a way to update everyone's Skybot level has not been made yet, /update has too suffice for now. All you have to do is do /update, and press the "check" emoji.`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`update`)
		.setDescription(`Updates your Skybot profile to the latest version`),
	group: `Player`,
	tutorial: {
		embeds: [tutorialEmbed],
		key: `update`
	},
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
		const { update } = maidObj;
		const updateEnum = interaction.client.updateMap.get(update);



		let rotateVal = 0;
		// eslint-disable-next-line no-inner-declarations
		function rotate() {
			const rotateArr = [`-`, `\\`, `|`, `/`];

			if (rotateVal >= 3) rotateVal = 0;
		
			const res = rotateArr[rotateVal];
			rotateVal += 1;
		
			return res;
		}

		if (update === `11.0.0`) {
			return interaction.reply({ content: `You are on the latest Skybot version! **v11.0.0**`, ephemeral: true });
		} else {
			const confirmation = new Confirmation(
				interaction,
				{ content: `🔄 ${interaction.user}, are you sure you want to update to the most recent version of Skybot (**v11.0.0**)? This process will immediately put you to version **v11.0.0**, but will take a long time if you are in a lower update.` },
			);

			confirmation.on('check', async (_button, sent) => {
				sent.edit(`🔄 Updating to Skybot **v11.0.0** now.`);
					
				if (updateEnum < 2) {
					// XP System
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

					maidObj.commonFish = 0;
					maidObj.uncommonFish = 0;
					maidObj.rareFish = 0;
					maidObj.ultraRareFish = 0;
					maidObj.legendaryFish = 0;
				}

				if (updateEnum < 3) {
					maidObj.coins = 0;
					maidObj.bank = 0;
					maidObj.netWorth = 0;
				}

				if (updateEnum < 4) {
					maidObj.invOakWoodMinion = 0;
					maidObj.invBirchWoodMinion = 0;
					maidObj.invDarkOakWoodMinion = 0;
					maidObj.invSpruceWoodMinion = 0;
					maidObj.invAcaciaWoodMinion = 0;
					maidObj.invJungleWoodMinion = 0;
	
					maidObj.invCobblestoneMinion = 0;
					maidObj.invCoalMinion = 0;
					maidObj.invIronMinion = 0;
					maidObj.invGoldMinion = 0;
					maidObj.invDiamondMinion = 0;
					maidObj.invLapisMinion = 0;
	
					maidObj.placedMinions = [
						[
							'cobblestone minion',
							'invCobblestoneMinion',
							'i',
							'<:Placed_Cobblestone_Minion:887166926948798484>',
							null,
							null,
							null,
							null,
							null,
							null,
							null,
							null,
							null,
							Date.now(),
							'cobblestone minion'
						],
					];
				}

				if (updateEnum < 5) {
					maidObj.bankTier = 1;
					maidObj.enchantedGold = 0;
					maidObj.enchantedGoldBlock = 0;
				}

				if (updateEnum < 6) {
					maidObj.blockOfCoal = 0;
					maidObj.enchantedBread = 0;
					maidObj.enchantedCharcoal = 0;
					maidObj.enchantedCoal = 0;
					maidObj.enchantedLavaBucket = 0;
				}

				if (updateEnum < 7) {
					maidObj.pureDiamond = 0;

					maidObj.enchantedCobblestone = 0;
					maidObj.enchantedIron = 0;
					maidObj.enchantedLapis = 0;
					maidObj.enchantedDiamond = 0;

					maidObj.enchantedOakWood = 0;
					maidObj.enchantedBirchWood = 0;
					maidObj.enchantedDarkOakWood = 0;
					maidObj.enchantedSpruceWood = 0;
					maidObj.enchantedAcaciaWood = 0;
					maidObj.enchantedJungleWood = 0;
				}

				if (updateEnum < 8) {
					maidObj.redstone = 0;
					maidObj.enchantedRedstone = 0;
					maidObj.enchantedRedstoneBlock = 0;
					maidObj.compactor = 0;
					maidObj.superCompactor = 0;
					maidObj.invRedstoneMinion = 0;
				}

				if (updateEnum < 9) {
					maidObj.tutorials = {
						minion: false,
						dices: false,
						highlow: false,
						scratchoff: false
					};
				}

				if (updateEnum < 10) {
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
				}

				if (updateEnum < 11) {
					maidObj.sword = {
						name: "Wooden sword", 
						keyName: "woodenSword",
						emoji: "<:Wooden_Sword:945957542280970300>",
						baseDamage: 20,
						enchantments: []
					};
	
					maidObj.woodenSword = 0;
					maidObj.stoneSword = 0;
					maidObj.ironSword = 0;
					maidObj.goldSword = 0;
					maidObj.diamondSword = 0;

					maidObj.aspectOfTheSpiritButterfly = 0;	
					maidObj.spiritButterfly = 0;
	
					maidObj.woodenPickaxe = 0;
					maidObj.stonePickaxe = 0;
					maidObj.ironPickaxe = 0;
					maidObj.goldPickaxe = 0;
					maidObj.diamondPickaxe = 0;

					maidObj.woodenAxe = 0;
					maidObj.stoneAxe = 0;
					maidObj.ironAxe = 0;
					maidObj.goldAxe = 0;
					maidObj.diamondAxe = 0;

					maidObj.combatLevel = 0;
					maidObj.combatXp = 0;
				}

				if (updateEnum < 12) {
					maidObj.activeItems = [];
					maidObj.fourLeafClover = 0;
					maidObj.stopwatch = 0;

					maidObj.commandUses = {};

					maidObj.adventure = {};
					maidObj.settings = [
						{
							setting: `hideFromLb`,
							value: false
						}
					];
					maidObj.daily = {
						lastClaimed: 0,
						streak: 0
					};

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

					maidObj.woodenBox = 0;
					maidObj.ironBox = 0;
					maidObj.goldenBox = 0;
					maidObj.diamondBox = 0;
					maidObj.emeraldBox = 0;
				}

				if (updateEnum < 13) {
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

					maidObj.settings = [
						{
							setting: `hideFromLb`,
							value: false
						},
						{
							setting: `fightNerd`,
							value: false
						},
						{
							setting: `voteReady`,
							value: false
						}
					];

					maidObj.adventureTicket = 0;
					maidObj.hiltOfTheSeas = 0;
					maidObj.firstFragmentOfTheSeas = 0;
					maidObj.secondFragmentOfTheSeas = 0;
					maidObj.aspectOfTheSeas = 0;
					maidObj.dummy = 0;
				}

				if (updateEnum < 14) {
					maidObj.helmet = null;
					maidObj.chestplate = null;
					maidObj.leggings = null;
					maidObj.boots = null;

					maidObj.leatherHelmet = 0;
					maidObj.leatherChestplate = 0;
					maidObj.leatherLeggings = 0;
					maidObj.leatherBoots = 0;

					maidObj.ironHelmet = 0;
					maidObj.ironChestplate = 0;
					maidObj.ironLeggings = 0;
					maidObj.ironBoots = 0;

					maidObj.goldHelmet = 0;
					maidObj.goldChestplate = 0;
					maidObj.goldLeggings = 0;
					maidObj.goldBoots = 0;

					maidObj.diamondHelmet = 0;
					maidObj.diamondChestplate = 0;
					maidObj.diamondLeggings = 0;
					maidObj.diamondBoots = 0;
				}

				if (updateEnum < 15) {
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
				}

				maidObj.update = '11.0.0';

				await sent.edit(`<:cross:885408206959046678> Skybot version Update cancelled!`);

				interaction.client.confirmations.set(interaction.user.id, false);
			});

			confirmation.on('cross', async (_button, sent) => {
				await sent.edit(`<:cross:885408206959046678> Skybot version Update cancelled!`);
	
				interaction.client.confirmations.set(interaction.user.id, false);
			});
					
			confirmation.on('error', async (_error, sent) => {
				await sent.edit(`<:cross:885408206959046678> Version Update cancelled!`);
						
				interaction.client.confirmations.set(interaction.user.id, false);
			});
		}
	}
};