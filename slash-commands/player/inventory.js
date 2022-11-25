/* eslint-disable no-nested-ternary, no-unused-vars */

const { ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Functions: { commafy, getUTCTime, formatSkybotTime }, Paginator } = require('../../SkyblockHelper/src/index.js');
const chalk = require('chalk');
const { updates } = require('../../config.json');

const forwardEnabledRow = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId(`fastBackward`)
			.setEmoji(`⏪`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`backward`)
			.setEmoji(`◀`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`forward`)
			.setEmoji(`▶`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`fastForward`)
			.setEmoji(`⏩`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`endInteraction`)
			.setLabel(`End Interaction`)
			.setStyle(ButtonStyle.Secondary)
	]);

const backwardEnabledRow = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId(`fastBackward`)
			.setEmoji(`⏪`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`backward`)
			.setEmoji(`◀`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`forward`)
			.setEmoji(`▶`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`fastForward`)
			.setEmoji(`⏩`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`endInteraction`)
			.setLabel(`End Interaction`)
			.setStyle(ButtonStyle.Secondary)
	]);

const allEnabledRow = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId(`fastBackward`)
			.setEmoji(`⏪`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`backward`)
			.setEmoji(`◀`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`forward`)
			.setEmoji(`▶`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`fastForward`)
			.setEmoji(`⏩`)
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(`endInteraction`)
			.setLabel(`End Interaction`)
			.setStyle(ButtonStyle.Secondary)
	]);

const noEnabledRow = new ActionRowBuilder()
	.addComponents([
		new ButtonBuilder()
			.setCustomId(`fastBackward`)
			.setEmoji(`⏪`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`backward`)
			.setEmoji(`◀`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`forward`)
			.setEmoji(`▶`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`fastForward`)
			.setEmoji(`⏩`)
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId(`endInteraction`)
			.setLabel(`End Interaction`)
			.setStyle(ButtonStyle.Secondary)
			.setDisabled(true)
	]);

function showInInventory(item) {
	return item !== 0 && item !== null && item !== undefined 
		? true 
		: false;
}

function displayBankTier(bankTier) {
	switch (bankTier) {
	case 1:
		return `<:BankTier1:885677582647955477> Starter Account`;
	case 2:
		return `<:BankTier2:885677583394558002> Gold Account`;
	case 3:
		return `<:BankTier3:885677583335825478> Deluxe Account`;
	case 4:
		return `<:BankTier4:885677583411339305> Super Deluxe Account`;
	case 5:
		return `<:BankTier5:885677583528767570> Premier Account`;
	default:
		break;
	}
}

/** 
 * The use of this map is to add the updates that
 * happened, get the users and the required update
 * from the map, and see if the user's update value
 * is (less than | equal to | greater than) the 
 * required update
 */
const updateMap = new Map();
for (const [update, value] of updates) {
	updateMap.set(update, value);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inventory')
		.setDescription('Replies with your inventory, or someone elses!')
		.addUserOption(option => option
			.setName(`user`)
			.setDescription(`The user to get the inventory of`)
		),
	group: `Player`,
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const user = interaction.options.getUser('user', false),
			targetUser = user ?? interaction.user,
			targetUserObj = await db.get(targetUser.id);

		if (!targetUserObj) return interaction.reply({ content: `❗ ${targetUser.username} has not registered their Skybot account yet!`, ephemeral: true });
	
	
	
		// Inventory Items
		const pickaxe = targetUserObj?.pickaxe;
		const axe = targetUserObj?.axe;
		const rod = targetUserObj?.rod;
		const update = targetUserObj?.update;
		const coins = targetUserObj?.coins;
		const bank = targetUserObj?.bank;
		const bankTier = targetUserObj?.bankTier;
		const sword = targetUserObj?.sword;
		const updateVersion = update;
		const money = coins;
			
	
	
		// The arrays
		const oresAndMinerals = [];
		const fish = [];
		const woodworking = [];
		const minions = [];
		const minionFuel = [];
		const tools = [];
		const powerUps = [];
		const mobDrops = [];
		const armor = [];
		const lootboxes = [];
		const pageArray = [];
	
	
			
		// Other variables
		const userUpdate = updateMap.get(updateVersion),
			SkybotTime = formatSkybotTime(Date.now(), { newLine: false });
	
	
	
		const displayInventoryInfo = () => {
			let inventoryString = ``;
	
			inventoryString += `Skybot Time: ${SkybotTime}`;
			inventoryString += `\nTools: ${pickaxe} ${axe} ${rod}`;
			if (userUpdate >= 11) inventoryString += ` ${sword.emoji}`;
			inventoryString += `\nSkybot version: **v${updateVersion}**`;
			if (userUpdate >= 3) inventoryString += `\n<:Coins:885677584749318154> Coins: **${commafy(money)}**\n🏦 Bank Coins: **${commafy(bank)}**\nBank Tier: ${displayBankTier(bankTier)}`;
	
			return inventoryString;
		};
	
	
	

		if (userUpdate >= updateMap.get(`0.0.1`)) {
			const {
				cobblestone,
				coal,
				ironOre,
				iron,
				goldOre,
				gold,
				lapis,
				redstone,
				diamond,
				pureDiamond,
				enchantedCobblestone,
				enchantedCoal,
				enchantedIron,
				enchantedGold,
				enchantedGoldBlock,
				enchantedLapis,
				enchantedRedstone,
				enchantedRedstoneBlock,
				enchantedDiamond,
				lightningGemstone,
				enhancedLightningGemstone
			} = targetUserObj;



			if (showInInventory(cobblestone)) oresAndMinerals.push(`<:Cobblestone:816984558317600799> **${commafy(cobblestone)}x** \`cobblestone\``);

			if (showInInventory(enchantedCobblestone)) oresAndMinerals.push(`<:Enchanted_Cobblestone:900308905635242026> **${commafy(enchantedCobblestone)}x** \`enchanted cobblestone\``);

			if (showInInventory(coal)) oresAndMinerals.push(`<:Coal:816982880802439178> **${commafy(coal)}x** \`coal\``);

			if (showInInventory(ironOre)) oresAndMinerals.push(`<:Iron_Ore:816983943584022539> **${commafy(ironOre)}x** \`iron ore\``);
	
			if (showInInventory(iron)) oresAndMinerals.push(`<:Iron_Ingot:885715125305221120> **${commafy(iron)}x** \`iron\``);

			if (showInInventory(enchantedIron)) oresAndMinerals.push(`<:Enchanted_Iron:900308904196603965> **${commafy(enchantedIron)}x** \`enchanted iron\``);
	
			if (showInInventory(goldOre)) oresAndMinerals.push(`<:Gold_Ore:816983943794524221> **${commafy(goldOre)}x** \`gold ore\``);
	
			if (showInInventory(gold)) oresAndMinerals.push(`<:Gold_Ingot:885715142522855494>  **${commafy(gold)}x** \`gold\``);
	
			if (showInInventory(enchantedGold)) oresAndMinerals.push(`<:Enchanted_Gold:885715156615692298> **${commafy(enchantedGold)}x** \`enchanted gold\``);
	
			if (showInInventory(enchantedGoldBlock)) oresAndMinerals.push(`<:Enchanted_Gold_Block:885715177713057802> **${commafy(enchantedGoldBlock)}x** \`enchanted gold block\``);
	
			if (showInInventory(lapis)) oresAndMinerals.push(`<:Lapis:816988928372375603> **${commafy(lapis)}x** \`lapis\``);

			if (showInInventory(enchantedLapis)) oresAndMinerals.push(`<:Enchanted_Lapis_Lazuli:900308904074940436> **${commafy(enchantedLapis)}x** \`enchanted lapis\``);

			if (showInInventory(redstone)) oresAndMinerals.push(`<:Redstone_Dust:907504986840252417> **${commafy(redstone)}x** \`redstone\``);
				
			if (showInInventory(enchantedRedstone)) oresAndMinerals.push(`<:Enchanted_Redstone:907504986919936010> **${commafy(enchantedRedstone)}x** \`enchanted redstone\``);
				
			if (showInInventory(enchantedRedstoneBlock)) oresAndMinerals.push(`<:Enchanted_Redstone_Block:907504987322613800> **${commafy(enchantedRedstoneBlock)}x** \`enchanted redstone block\``);

			if (showInInventory(diamond)) oresAndMinerals.push(`<:Diamond:902764556697341952> **${commafy(diamond)}x** \`diamond\``);
	
			if (showInInventory(pureDiamond)) oresAndMinerals.push(`<:Pure_Diamond:1021254563258454037> **${commafy(pureDiamond)}x** \`pure diamond\``);
				
			if (showInInventory(enchantedDiamond)) oresAndMinerals.push(`<:Enchanted_Diamond:902764556865142835> **${commafy(enchantedDiamond)}x** \`enchanted diamond\``);

			if (showInInventory(lightningGemstone)) oresAndMinerals.push(`<:Lightning_Gemstone:1021239352535294002> **${commafy(lightningGemstone)}x** \`lightning gemstone\``);

			if (showInInventory(enhancedLightningGemstone)) oresAndMinerals.push(`<:Enhanced_Lightning_Gemstone:1021244024960593920> **${commafy(enhancedLightningGemstone)}x** \`enhanced lightning gemstone\``);

			if (oresAndMinerals.length === 0) {
				oresAndMinerals.push(`Looks like you don't have any ores or minerals! I wonder if you sold them all 🤔`);
			}

			const oresAndMineralsEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle(`${targetUser.username}'s Inventory`)
				.setDescription(`${displayInventoryInfo()}\n\n${oresAndMinerals.join('\n')}`)
				.setThumbnail(targetUser.displayAvatarURL())
				.setFooter({ text: `Ores and Minerals - Page:` });

			pageArray.push(oresAndMineralsEmbed);
		}

		if (userUpdate >= updateMap.get(`1.0.0`)) {
			const {
				commonFish,
				uncommonFish,
				rareFish,
				ultraRareFish,
				legendaryFish
			} = targetUserObj;			

			const {
				oakWood,	
				birchWood,
				spruceWood,
				jungleWood,
				acaciaWood,
				darkOakWood,
				planks,
				stick,
				enchantedOakWood,
				enchantedBirchWood,
				enchantedDarkOakWood,
				enchantedSpruceWood,
				enchantedAcaciaWood,
				enchantedJungleWood
			} = targetUserObj;

			const updateIsGreater = userUpdate >= updateMap.get('3.2.0');


			if (showInInventory(oakWood)) woodworking.push(`<:Oak_Log:885390554005897237>  **${commafy(oakWood)}x** \`oak wood\``);

			if (showInInventory(enchantedOakWood) && updateIsGreater) woodworking.push(`<:Enchanted_Oak_Wood:900308904913817600> **${commafy(enchantedOakWood)}** \`enchanted oak wood\``);

			if (showInInventory(birchWood)) woodworking.push(`<:Birch_Log:885390554400165938> **${commafy(birchWood)}x** \`birch wood\``);

			if (showInInventory(enchantedBirchWood) && updateIsGreater) woodworking.push(`<:Enchanted_Birch_Wood:900308905786224700> **${commafy(enchantedBirchWood)}** \`enchanted birch wood\``);
	
			if (showInInventory(darkOakWood)) woodworking.push(`<:Dark_Oak_Log:885390554362433587> **${commafy(darkOakWood)}x** \`dark oak wood\``);

			if (showInInventory(enchantedDarkOakWood) && updateIsGreater) woodworking.push(`<:Enchanted_Dark_Oak_Wood:900308904360157245> **${commafy(enchantedDarkOakWood)}** \`enchanted dark oak wood\``);
	
			if (showInInventory(spruceWood)) woodworking.push(`<:Spruce_Log:885390554404380693> **${commafy(spruceWood)}x** \`spruce wood\``);
	
			if (showInInventory(enchantedSpruceWood) && updateIsGreater) woodworking.push(`<:Enchanted_Spruce_Wood:900308905261948958> **${commafy(enchantedSpruceWood)}** \`enchanted spruce wood\``);

			if (showInInventory(acaciaWood)) woodworking.push(`<:Acacia_Log:885390554471485480> **${commafy(acaciaWood)}x** \`acacia wood\``);
	
			if (showInInventory(enchantedAcaciaWood) && updateIsGreater) woodworking.push(`<:Enchanted_Acacia_Wood:900308906167922688> **${commafy(enchantedAcaciaWood)}** \`enchanted acacia wood\``);

			if (showInInventory(jungleWood)) woodworking.push(`<:Jungle_Log:885390554240802817> **${commafy(jungleWood)}x** \`jungle wood\``);

			if (showInInventory(enchantedJungleWood) && updateIsGreater) woodworking.push(`<:Enchanted_Jungle_Wood:900308904230158336> **${commafy(enchantedJungleWood)}** \`enchanted jungle wood\``);
	
			if (showInInventory(planks)) woodworking.push(`<:Oak_Planks:817261928212463616> **${commafy(planks)}x** \`planks\``);
	
			if (showInInventory(stick)) woodworking.push(`<:Stick:817260386180792320> **${commafy(stick)}x** \`stick\``);



			// Fish
			if (showInInventory(commonFish)) fish.push(`⬜ **${commafy(commonFish)}x** \`common fish\``);

			if (showInInventory(uncommonFish)) fish.push(`🟩 **${commafy(uncommonFish)}x** \`uncommon fish\``);

			if (showInInventory(rareFish)) fish.push(`🟦 **${commafy(rareFish)}x** \`rare fish\``);

			if (showInInventory(ultraRareFish)) fish.push(`🟥 **${commafy(ultraRareFish)}x** \`ultra rare fish\``);

			if (showInInventory(legendaryFish)) fish.push(`🟨 **${commafy(legendaryFish)}x** \`legendary fish\``);

			if (fish.length === 0) {
				fish.push(`Looks like you don't have any fish! I wonder if they swam away 🤔`);
			}
						
			if (woodworking.length === 0) {
				woodworking.push(`Looks like you don't have any woodworking items! I wonder if you got any splinters trying to find for them 🤔`);
			}

			const fishEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle(`${targetUser.username}'s Inventory`)
				.setDescription(`${displayInventoryInfo()}\n\n${fish.join('\n')}`)
				.setThumbnail(targetUser.displayAvatarURL())
				.setFooter({ text: `Fish - Page:` });

			const woodworkingEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle(`${targetUser.username}'s Inventory`)
				.setDescription(`${displayInventoryInfo()}\n\n${woodworking.join('\n')}`)
				.setThumbnail(targetUser.displayAvatarURL())
				.setFooter({ text: `Woodworking - Page:` });

			pageArray.push(fishEmbed);
			pageArray.push(woodworkingEmbed);
		}

		if (userUpdate >= updateMap.get(`2.0.1`)) {
			const {
				invCobblestoneMinion,
				invCoalMinion,
				invIronMinion,
				invGoldMinion,
				invLapisMinion,
				invDiamondMinion,
				invOakWoodMinion,
				invBirchWoodMinion,
				invDarkOakWoodMinion,
				invSpruceWoodMinion,
				invAcaciaWoodMinion,
				invJungleWoodMinion
			} = targetUserObj;

			// Minions
			if (showInInventory(invCobblestoneMinion)) minions.push(`<:Inventory_Cobblestone_Minion:887166922913898527> **${commafy(invCobblestoneMinion)}x** \`cobblestone minion\``);

			if (showInInventory(invCoalMinion)) minions.push(`<:Inventory_Coal_Minion:887166923295588382> **${commafy(invCoalMinion)}x** \`coal minion\``);

			if (showInInventory(invIronMinion)) minions.push(`<:Inventory_Iron_Minion:887166924117655553> **${commafy(invIronMinion)}x** \`iron minion\``);

			if (showInInventory(invGoldMinion)) minions.push(`<:Inventory_Gold_Minion:887166924138635294> **${commafy(invGoldMinion)}x** \`gold minion\``);

			if (showInInventory(invLapisMinion)) minions.push(`<:Inventory_Lapis_Minion:887166926449676328> **${commafy(invLapisMinion)}x** \`lapis minion\``);

			if (showInInventory(invDiamondMinion)) minions.push(`<:Inventory_Diamond_Minion:887166924147007528> **${commafy(invDiamondMinion)}x** \`diamond minion\``);

			if (showInInventory(invOakWoodMinion)) minions.push(`<:Inventory_Oak_Minion:887166926508404767> **${commafy(invOakWoodMinion)}x** \`oak minion\``);

			if (showInInventory(invBirchWoodMinion)) minions.push(`<:Inventory_Birch_Minion:887166923312365618> **${commafy(invBirchWoodMinion)}x** \`birch minion\``);

			if (showInInventory(invDarkOakWoodMinion)) minions.push(`<:Inventory_Dark_Oak_Minion:887166923689828372> **${commafy(invDarkOakWoodMinion)}x** \`dark oak minion\``);

			if (showInInventory(invSpruceWoodMinion)) minions.push(`<:Inventory_Spruce_Minion:887166927049486416> **${commafy(invSpruceWoodMinion)}x** \`spruce minion\``);

			if (showInInventory(invAcaciaWoodMinion)) minions.push(`<:Inventory_Acacia_Minion:887166923245252669> **${commafy(invAcaciaWoodMinion)}x** \`acacia minion\``);

			if (showInInventory(invJungleWoodMinion)) minions.push(`<:Inventory_Jungle_Minion:887166924205735976> **${commafy(invJungleWoodMinion)}x** \`jungle minion\``);

			if (minions.length === 0) {
				minions.push(`Looks like you don't have any minions! I wonder where they ran off to this time 🤔`);
			}

			const minionsEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle(`${targetUser.username}'s Inventory`)
				.setDescription(`${displayInventoryInfo()}\n\n${minions.join('\n')}`)
				.setThumbnail(targetUser.displayAvatarURL())
				.setFooter({ text: `Minions - Page:` });

			pageArray.push(minionsEmbed);
		}

		if (userUpdate >= updateMap.get(`3.1.0`)) {
			const {	
				blockOfCoal,
				enchantedBread,
				enchantedCharcoal,
				enchantedCoal,
				enchantedLavaBucket
			} = targetUserObj;

			// Minion Fuel
			if (showInInventory(blockOfCoal)) minionFuel.push(`<:Block_Of_Coal:894483282304061450> **${commafy(blockOfCoal)}x** \`block of coal\``);

			if (showInInventory(enchantedBread)) minionFuel.push(`<:Enchanted_Bread:894483282220154890> **${commafy(enchantedBread)}x** \`enchanted bread\``);

			if (showInInventory(enchantedCharcoal)) minionFuel.push(`<:Enchanted_Charcoal:894483282174021662> **${commafy(enchantedCharcoal)}x** \`enchanted charcoal\``);

			if (showInInventory(enchantedCoal)) minionFuel.push(`<:Enchanted_Coal:894483282199199764> **${commafy(enchantedCoal)}x** \`enchanted coal\``);

			if (showInInventory(enchantedLavaBucket)) minionFuel.push(`<:Enchanted_Lava_Bucket:894483282253713429> **${commafy(enchantedLavaBucket)}x** \`enchanted lava bucket\``);

			if (minionFuel.length === 0) {
				minionFuel.push(`Looks like you don't have any minion fuel! I wonder if you used them already on your minions 🤔`);
			}

			const minionFuelEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle(`${targetUser.username}'s Inventory`)
				.setDescription(`${displayInventoryInfo()}\n\n${minionFuel.join('\n')}`)
				.setThumbnail(targetUser.displayAvatarURL())
				.setFooter({ text: `Minion Fuel - Page:` });

			pageArray.push(minionFuelEmbed);
		}

		if (userUpdate >= updateMap.get(`8.0.0`)) {
			const {
				woodenPickaxe,
				stonePickaxe,
				ironPickaxe,
				goldPickaxe,
				diamondPickaxe,
			} = targetUserObj;

			const {
				woodenAxe,
				stoneAxe,
				ironAxe,
				goldAxe,
				diamondAxe
			} = targetUserObj;

			const {
				woodenSword,
				stoneSword,
				ironSword,
				goldSword,
				diamondSword,
				spiritButterfly,
				aspectOfTheSpiritButterfly,
				hiltOfTheSeas,
				firstFragmentOfTheSeas,
				secondFragmentOfTheSeas,
				aspectOfTheSeas,
			} = targetUserObj;


			// Tools

			if (showInInventory(woodenPickaxe)) tools.push(`<:Wooden_Pickaxe:817217441394196572> **${commafy(woodenPickaxe)}x** \`wooden pickaxe\``);

			if (showInInventory(stonePickaxe)) tools.push(`<:Stone_Pickaxe:817216446899028011> **${commafy(stonePickaxe)}x** \`stone pickaxe\``);

			if (showInInventory(ironPickaxe)) tools.push(`<:Iron_Pickaxe:817216520828092436> **${commafy(ironPickaxe)}x** \`iron pickaxe\``);

			if (showInInventory(goldPickaxe)) tools.push(`<:Gold_Pickaxe:817216581859409971> **${commafy(goldPickaxe)}x** \`gold pickaxe\``);

			if (showInInventory(diamondPickaxe)) tools.push(`<:Diamond_Pickaxe:817216616084930602> **${commafy(diamondPickaxe)}x** \`diamond pickaxe\``);



			if (showInInventory(woodenAxe)) tools.push(`<:Wooden_Axe:817217337261424650> **${commafy(woodenAxe)}x** \`wooden axe\``);

			if (showInInventory(stoneAxe)) tools.push(`<:Stone_Axe:817216694837706793> **${commafy(stoneAxe)}x** \`stone axe\``);

			if (showInInventory(ironAxe)) tools.push(`<:Iron_Axe:817216753062510633> **${commafy(ironAxe)}x** \`iron axe\``);

			if (showInInventory(goldAxe)) tools.push(`<:Gold_Axe:817216806845677568> **${commafy(goldAxe)}x** \`gold axe\``);

			if (showInInventory(diamondAxe)) tools.push(`<:Diamond_Axe:817216864626802771> **${commafy(diamondAxe)}x** \`diamond axe\``);



			if (showInInventory(woodenSword)) tools.push(`<:Wooden_Sword:945957542280970300> **${commafy(woodenSword)}x** \`wooden sword\``);

			if (showInInventory(stoneSword)) tools.push(`<:Stone_Sword:945957556461916190> **${commafy(stoneSword)}x** \`stone sword\``);

			if (showInInventory(ironSword)) tools.push(`<:Iron_Sword:945957575487258634> **${commafy(ironSword)}x** \`iron sword\``);

			if (showInInventory(goldSword)) tools.push(`<:Golden_Sword:945957590951669800> **${commafy(goldSword)}x** \`golden sword\``);

			if (showInInventory(diamondSword)) tools.push(`<:Diamond_Sword:945957605577228339> **${commafy(diamondSword)}x** \`diamond sword\``);

			if (showInInventory(spiritButterfly)) tools.push(`<:Spirit_Butterfly:942633700485632071> **${commafy(spiritButterfly)}** \`spirit butterfly\``);

			if (showInInventory(aspectOfTheSpiritButterfly)) tools.push(`<:Aspect_Of_The_Spirit_Butterfly:945957788155273226> **${commafy(aspectOfTheSpiritButterfly)}x** \`aspect of the spirit butterfly\``);

			if (showInInventory(hiltOfTheSeas)) tools.push(`<:Hilt_of_the_Seas:965489391285973003> **${commafy(hiltOfTheSeas)}x** \`hilt of the seas\``);

			if (showInInventory(firstFragmentOfTheSeas)) tools.push(`<:First_Fragment_of_the_Seas:965489410302935110> **${commafy(firstFragmentOfTheSeas)}x** \`first fragment of the seas\``);

			if (showInInventory(secondFragmentOfTheSeas)) tools.push(`<:Second_Fragment_of_the_Seas:965489428137144403> **${commafy(secondFragmentOfTheSeas)}x** \`second fragment of the seas\``);

			if (showInInventory(aspectOfTheSeas)) tools.push(`<:Aspect_Of_The_Seas:963296785038704690> **${commafy(aspectOfTheSeas)}x** \`aspect of the seas\``);
			
			if (tools.length === 0) {
				tools.push(`Looks like you don't have any unused tools! I wonder if you are using them right now 🤔`);
			}

			const toolsEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle(`${targetUser.username}'s Inventory`)
				.setDescription(`${displayInventoryInfo()}\n\n${tools.join('\n')}`)
				.setThumbnail(targetUser.displayAvatarURL())
				.setFooter({ text: `Tools - Page:` });

			pageArray.push(toolsEmbed);
		}

		if (userUpdate >= updateMap.get('9.0.0')) {
			const {
				fourLeafClover,
				stopwatch,
				adventureTicket,
			} = targetUserObj;

			const {
				rawPorkchop,
				enchantedPork,
				enchantedGrilledPork,
				rawChicken,
				enchantedRawChicken,
				leather,
				rawBeef,
				enchantedRawBeef,
				rawMutton,
				enchantedMutton,
				enchantedCookedMutton,
				summoningEye,
				remnantOfTheEye
			} = targetUserObj;



			if (showInInventory(fourLeafClover)) powerUps.push(`<:Four_Leaf_Clover:948095805619859537> **${commafy(fourLeafClover)}x** \`four leaf clover\``);

			if (showInInventory(stopwatch)) powerUps.push(`<:Stopwatch:950327115558043679> **${commafy(stopwatch)}x** \`stopwatch\``); 

			if (showInInventory(adventureTicket)) powerUps.push(`<:Ticket:955745457181716480> **${commafy(adventureTicket)}x** \`adventure ticket\``);



			if (showInInventory(rawPorkchop)) mobDrops.push(`<:Raw_Porkchop:953469999509545000> **${commafy(rawPorkchop)}x** \`raw porkchop\``);

			if (showInInventory(enchantedPork)) mobDrops.push(`<:Enchanted_Pork:953470014986547281> **${commafy(enchantedPork)}x** \`enchanted pork\``);

			if (showInInventory(enchantedGrilledPork)) mobDrops.push(`<:Enchanted_Grilled_Pork:953470025879146526> **${commafy(enchantedGrilledPork)}x** \`enchanted grilled pork\``);

			if (showInInventory(rawChicken)) mobDrops.push(`<:Raw_Chicken:953470062302474250> **${commafy(rawChicken)}x** \`raw chicken\``);

			if (showInInventory(enchantedRawChicken)) mobDrops.push(`<:Enchanted_Raw_Chicken:953470212378861568> **${commafy(enchantedRawChicken)}x** \`enchanted raw chicken\``);

			if (showInInventory(leather)) mobDrops.push(`<:Leather:966938933156016158> **${commafy(leather)}x** \`leather\``);
			
			if (showInInventory(rawBeef)) mobDrops.push(`<:Raw_Beef:953470247292244038> **${commafy(rawBeef)}x** \`raw beef\``);

			if (showInInventory(enchantedRawBeef)) mobDrops.push(`<:Enchanted_Raw_Beef:953470260630134795> **${commafy(enchantedRawBeef)}x** \`enchanted raw beef\``);

			if (showInInventory(rawMutton)) mobDrops.push(`<:Raw_Mutton:953484740571299970> **${commafy(rawMutton)}x** \`raw mutton\``);

			if (showInInventory(enchantedMutton)) mobDrops.push(`<:Enchanted_Mutton:953484750805422111> **${commafy(enchantedMutton)}x** \`enchanted mutton\``);

			if (showInInventory(enchantedCookedMutton)) mobDrops.push(`<:Enchanted_Cooked_Mutton:953484757247860816> **${commafy(enchantedCookedMutton)}x** \`enchanted cooked mutton\``);

			if (showInInventory(summoningEye)) mobDrops.push(`<:Summoning_Eye:976317456463314994> **${commafy(summoningEye)}x** \`summoning eye\``);

			if (showInInventory(remnantOfTheEye)) mobDrops.push(`<:Remnant_of_the_Eye:978135927060824086> **${commafy(remnantOfTheEye)}x** \`remnant of the eye\``);

			

			if (powerUps.length === 0) {
				powerUps.push(`Looks like you don't have any unused power-ups! I wonder if you already used them 🤔`);
			}

			if (mobDrops.length === 0) {
				mobDrops.push(`Looks like you don't have any unused mob drops! I wonder if you already sold them 🤔`);
			}



			const powerUpsEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle(`${targetUser.username}'s Inventory`)
				.setDescription(`${displayInventoryInfo()}\n\n${powerUps.join('\n')}`)
				.setThumbnail(targetUser.displayAvatarURL())
				.setFooter({ text: `Power-ups - Page:` });

			const mobDropsEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle(`${targetUser.username}'s Inventory`)
				.setDescription(`${displayInventoryInfo()}\n\n${mobDrops.join('\n')}`)
				.setThumbnail(targetUser.displayAvatarURL())
				.setFooter({ text: `Mob Drops - Page:` });

			pageArray.push(powerUpsEmbed);
			pageArray.push(mobDropsEmbed);
		}

		if (userUpdate >= updateMap.get('10.0.0')) {
			const {
				leatherHelmet,
				leatherChestplate,
				leatherLeggings,
				leatherBoots,
				ironHelmet,
				ironChestplate,
				ironLeggings,
				ironBoots,
				goldHelmet,
				goldChestplate,
				goldLeggings,
				goldBoots,
				diamondHelmet,
				diamondChestplate,
				diamondLeggings,
				diamondBoots,
				oldDragonBoots,
				oldDragonChestplate,
				oldDragonHelmet,
				oldDragonLeggings,
				protectorDragonBoots,
				protectorDragonChestplate,
				protectorDragonHelmet,
				protectorDragonLeggings,
				strongDragonLeggings,
				strongDragonChestplate,
				strongDragonHelmet,
				strongDragonBoots,
				superiorDragonBoots,
				superiorDragonChestplate,
				superiorDragonHelmet,
				superiorDragonLeggings,
				unstableDragonBoots,
				unstableDragonChestplate,
				unstableDragonHelmet,
				unstableDragonLeggings,
				wiseDragonBoots,
				wiseDragonChestplate,
				wiseDragonHelmet,
				wiseDragonLeggings,
				youngDragonBoots,
				youngDragonChestplate,
				youngDragonHelmet,
				youngDragonLeggings
			} = targetUserObj;

			const {
				dailyBox,
				woodenBox,
				ironBox,
				goldBox,
				diamondBox,
				emeraldBox
			} = targetUserObj;



			if (showInInventory(leatherHelmet)) armor.push(`<:Leather_Helmet:966938208577396816> **${commafy(leatherHelmet)}x** \`leather helmet\``);
			
			if (showInInventory(leatherChestplate)) armor.push(`<:Leather_Chestplate:966938197005336607> **${commafy(leatherChestplate)}x** \`leather chestplate\``);
			
			if (showInInventory(leatherLeggings)) armor.push(`<:Leather_Leggings:966938177933807636> **${commafy(leatherLeggings)}x** \`leather leggings\``);
			
			if (showInInventory(leatherBoots)) armor.push(`<:Leather_Boots:966938165694828648> **${commafy(leatherBoots)}x** \`leather boots\``);
			

			if (showInInventory(ironHelmet)) armor.push(`<:Iron_Helmet:948133266014212127> **${commafy(ironHelmet)}x** \`iron helmet\``);
			
			if (showInInventory(ironChestplate)) armor.push(`<:Iron_Chestplate:948133251250257960> **${commafy(ironChestplate)}x** \`iron chestplate\``);
			
			if (showInInventory(ironLeggings)) armor.push(`<:Iron_Leggings:948133237400674336> **${commafy(ironLeggings)}x** \`iron leggings\``);
			
			if (showInInventory(ironBoots)) armor.push(`<:Iron_Boots:948133185957527592> **${commafy(ironBoots)}x** \`iron boots\``);
			
			
			if (showInInventory(goldHelmet)) armor.push(`<:Golden_Helmet:948133366052565022> **${commafy(goldHelmet)}x** \`gold helmet\``);
			
			if (showInInventory(goldChestplate)) armor.push(`<:Golden_Chestplate:948133358033068043> **${commafy(goldChestplate)}x** \`gold chestplate\``);
			
			if (showInInventory(goldLeggings)) armor.push(`<:Golden_Leggings:948133348939808789> **${commafy(goldLeggings)}x** \`gold leggings\``);
			
			if (showInInventory(goldBoots)) armor.push(`<:Golden_Boots:948133338080768031> **${commafy(goldBoots)}x** \`gold boots\``);
			
			
			if (showInInventory(diamondHelmet)) armor.push(`<:Diamond_Helmet:948133456439820298> **${commafy(diamondHelmet)}x** \`diamond helmet\``);
			
			if (showInInventory(diamondChestplate)) armor.push(`<:Diamond_Chestplate:948133448395161661> **${commafy(diamondChestplate)}x** \`diamond chestplate\``);
			
			if (showInInventory(diamondLeggings)) armor.push(`<:Diamond_Leggings:948133440790872064> **${commafy(diamondLeggings)}x** \`diamond leggings\``);
			
			if (showInInventory(diamondBoots)) armor.push(`<:Diamond_Boots:948133429629812747> **${commafy(diamondBoots)}x** \`diamond boots\``);


			if (showInInventory(protectorDragonHelmet)) armor.push(`<:Protector_Dragon_Helmet:978508708986363934> **${commafy(protectorDragonHelmet)}x** \`protector dragon helmet\``);

			if (showInInventory(protectorDragonChestplate)) armor.push(`<:Protector_Dragon_Chestplate:978508707170234408> **${commafy(protectorDragonChestplate)}x** \`protector dragon chestplate\``);
			
			if (showInInventory(protectorDragonLeggings)) armor.push(`<:Protector_Dragon_Leggings:978508705307975780> **${commafy(protectorDragonLeggings)}x** \`protector dragon leggings\``);
			
			if (showInInventory(protectorDragonBoots)) armor.push(`<:Protector_Dragon_Boots:978508703483453460> **${commafy(protectorDragonBoots)}x** \`protector dragon boots\``);
			

			if (showInInventory(oldDragonHelmet)) armor.push(`<:Old_Dragon_Helmet:978508701512138752> **${commafy(oldDragonHelmet)}x** \`old dragon helmet\``);
			
			if (showInInventory(oldDragonChestplate)) armor.push(`<:Old_Dragon_Chestplate:978508699419176990> **${commafy(oldDragonChestplate)}x** \`old dragon chestplate\``);
			
			if (showInInventory(oldDragonLeggings)) armor.push(`<:Old_Dragon_Leggings:978508697619804182> **${commafy(oldDragonLeggings)}x** \`old dragon leggings\``);
			
			if (showInInventory(oldDragonBoots)) armor.push(`<:Old_Dragon_Boots:978508695715610664> **${commafy(oldDragonBoots)}x** \`old dragon boots\``);
			

			if (showInInventory(wiseDragonHelmet)) armor.push(`<:Wise_Dragon_Helmet:978508739218907217> **${commafy(wiseDragonHelmet)}x** \`wise dragon helmet\``);
			
			if (showInInventory(wiseDragonChestplate)) armor.push(`<:Wise_Dragon_Chestplate:978508736933015614> **${commafy(wiseDragonChestplate)}x** \`wise dragon chestplate\``);
			
			if (showInInventory(wiseDragonLeggings)) armor.push(`<:Wise_Dragon_Leggings:978508734391259186> **${commafy(wiseDragonLeggings)}x** \`wise dragon leggings\``);
			
			if (showInInventory(wiseDragonBoots)) armor.push(`<:Wise_Dragon_Boots:978508732633862184> **${commafy(wiseDragonBoots)}x** \`wise dragon boots\``);
			

			if (showInInventory(unstableDragonHelmet)) armor.push(`<:Unstable_Dragon_Helmet:978508730725437450> **${commafy(unstableDragonHelmet)}x** \`unstable dragon helmet\``);
			
			if (showInInventory(unstableDragonChestplate)) armor.push(`<:Unstable_Dragon_Chestplate:978508728951259186> **${commafy(unstableDragonChestplate)}x** \`unstable dragon chestplate\``);
			
			if (showInInventory(unstableDragonLeggings)) armor.push(`<:Unstable_Dragon_Leggings:978508727118340097> **${commafy(unstableDragonLeggings)}x** \`unstable dragon leggings\``);
			
			if (showInInventory(unstableDragonBoots)) armor.push(`<:Unstable_Dragon_Boots:978508725465784330> **${commafy(unstableDragonBoots)}x** \`unstable dragon boots\``);
			

			if (showInInventory(youngDragonHelmet)) armor.push(`<:Young_Dragon_Helmet:978508746173071421> **${commafy(youngDragonHelmet)}x** \`young dragon helmet\``);
			
			if (showInInventory(youngDragonChestplate)) armor.push(`<:Young_Dragon_Chestplate:978508744545681458> **${commafy(youngDragonChestplate)}x** \`young dragon chestplate\``);
			
			if (showInInventory(youngDragonLeggings)) armor.push(`<:Young_Dragon_Leggings:978508743044120637> **${commafy(youngDragonLeggings)}x** \`young dragon leggings\``);
			
			if (showInInventory(youngDragonBoots)) armor.push(`<:Young_Dragon_Boots:978508741169258506> **${commafy(youngDragonBoots)}x** \`young dragon boots\``);
			
			
			if (showInInventory(strongDragonHelmet)) armor.push(`<:Strong_Dragon_Helmet:978508716297052230> **${commafy(strongDragonHelmet)}x** \`strong dragon helmet\``);
			
			if (showInInventory(strongDragonChestplate)) armor.push(`<:Strong_Dragon_Chestplate:978508714170548266> **${commafy(strongDragonChestplate)}x** \`strong dragon chestplate\``);
			
			if (showInInventory(strongDragonLeggings)) armor.push(`<:Strong_Dragon_Leggings:978508712614461460> **${commafy(strongDragonLeggings)}x** \`strong dragon leggings\``);
			
			if (showInInventory(strongDragonBoots)) armor.push(`<:Strong_Dragon_Boots:978508710974455868> **${commafy(strongDragonBoots)}x** \`strong dragon boots\``);
			
			
			if (showInInventory(superiorDragonHelmet)) armor.push(`<:Superior_Dragon_Helmet:978508723695779921> **${commafy(superiorDragonHelmet)}x** \`superior dragon helmet\``);
			
			if (showInInventory(superiorDragonChestplate)) armor.push(`<:Superior_Dragon_Chestplate:978508721841901639> **${commafy(superiorDragonChestplate)}x** \`superior dragon chestplate\``);
			
			if (showInInventory(superiorDragonLeggings)) armor.push(`<:Superior_Dragon_Leggings:978508719862190120> **${commafy(superiorDragonLeggings)}x** \`superior dragon leggings\``);
			
			if (showInInventory(superiorDragonBoots)) armor.push(`<:Superior_Dragon_Boots:978508717928636416> **${commafy(superiorDragonBoots)}x** \`superior dragon boots\``);





			if (showInInventory(dailyBox)) lootboxes.push(`<a:Daily_Box:956735467414519899> **${commafy(dailyBox)}x** \`daily box\``);

			if (showInInventory(woodenBox)) lootboxes.push(`<a:Wooden_Box:956735312162349096> **${commafy(woodenBox)}x** \`wooden box\``);

			if (showInInventory(ironBox)) lootboxes.push(`<a:Iron_Box:956735320852922408> **${commafy(ironBox)}x** \`iron box\``);

			if (showInInventory(goldBox)) lootboxes.push(`<a:Golden_Box:956735326800478258> **${commafy(goldBox)}x** \`gold box\``);

			if (showInInventory(diamondBox)) lootboxes.push(`<a:Diamond_Box:956735439480422430> **${commafy(diamondBox)}x** \`diamond box\``);

			if (showInInventory(emeraldBox)) lootboxes.push(`<a:Emerald_Box:956735451622940693> **${commafy(emeraldBox)}x** \`emerald box\``);



			if (armor.length === 0) {
				armor.push(`Looks like you don't have any unused armor pieces! I wonder if you are using them right now 🤔`);
			}

			if (lootboxes.length === 0) {
				lootboxes.push(`Looks like you don't have any unused loot boxes! I wonder if you are used them and got something good 🤔`);
			}



			const armorEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle(`${targetUser.username}'s Inventory`)
				.setDescription(`${displayInventoryInfo()}\n\n${armor.join('\n')}`)
				.setThumbnail(targetUser.displayAvatarURL())
				.setFooter({ text: `Armor - Page:` });

			const lootboxesEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle(`${targetUser.username}'s Inventory`)
				.setDescription(`${displayInventoryInfo()}\n\n${lootboxes.join('\n')}`)
				.setThumbnail(targetUser.displayAvatarURL())
				.setFooter({ text: `Loot Boxes - Page:` });

			pageArray.push(armorEmbed);
			pageArray.push(lootboxesEmbed);
		}

		pageArray
			.forEach((embed, index, array) => {
				embed.data.footer.text += ` ${index + 1}/${array.length}`;

				return;
			});

		await Paginator(interaction, pageArray);

		if (targetUserObj.tutorial === 3) {
			console.log(`[TutorialHandler]${chalk.greenBright(`[Logging]`)} | Completed tutorial step: inventory`);

			targetUserObj.tutorial = 4;
			await db.set(targetUser.id, targetUserObj);
		}
	},
};