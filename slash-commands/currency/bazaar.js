
/* eslint-disable no-unused-vars */
const { CommandInteraction, SlashCommandBuilder } = require('discord.js');
const { SkybotDatabaseHandler, MultiSelectMenuConfirmation, MultiSelectMenuConfirmationOption } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`bazaar`)
		.setDescription(`[BETA IMPLEMENTATION] Interact with the Skybot bazaar`),
	/*
		.addStringOption(option => option
			.setName(`item`)
			.setDescription(``)
			.setRequired(true)
		)
		*/
	group: `Currency`,
	require: {
		start: true,
	},
	/**
	 * @param {CommandInteraction} interaction 
	 * @param {SkybotDatabaseHandler} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);

		const multiSelectMenuConfirmation = new MultiSelectMenuConfirmation()
			.setConfirmEnable('max')
			.setInteractionInstance(interaction)
			.setMenuMessage({ content: `test` })
			.setBaseOptions(
				new MultiSelectMenuConfirmationOption()
					.setLabel(`Farming`)
					.setValue(`Category_Farming`)
					.setDefault(true)
					.addChildOptions(
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Wheat and Seeds`)
							.setValue(`Farming_WheatAndSeeds`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Wheat`)
									.setValue(`Item_Wheat`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Bread`)
									.setValue(`Item_EnchantedBread`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Hay Bale`)
									.setValue(`Item_HayBale`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Hay Bale`)
									.setValue(`Item_EnchantedHayBale`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Tightly-tied Hay Bale`)
									.setValue(`Item_Tightly-tiedHayBale`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Seeds`)
									.setValue(`Item_Seeds`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Seeds`)
									.setValue(`Item_EnchantedSeeds`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Carrot`)
							.setValue(`Farming_Carrot`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Carrot`)
									.setValue(`Item_Carrot`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Carrot`)
									.setValue(`Item_EnchantedCarrot`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Carrot on a Stick`)
									.setValue(`Item_EnchantedCarrotonaStick`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Golden Carrot`)
									.setValue(`Item_EnchantedGoldenCarrot`)
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Potato`)
							.setValue(`Farming_Potato`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Potato`)
									.setValue(`Item_Potato`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Potato`)
									.setValue(`Item_EnchantedPotato`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Baked Potato`)
									.setValue(`Item_EnchantedBakedPotato`)
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Pumpkin`)
							.setValue(`Farming_Pumpkin`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Pumpkin`)
									.setValue(`Item_Pumpkin`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Pumpkin`)
									.setValue(`Item_EnchantedPumpkin`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Polished Pumpkin`)
									.setValue(`Item_PolishedPumpkin`)
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Melon`)
							.setValue(`Farming_Melon`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Melon`)
									.setValue(`Item_Melon`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Melon`)
									.setValue(`Item_EnchantedMelon`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Glistering Melon`)
									.setValue(`Item_EnchantedGlisteringMelon`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Melon Block`)
									.setValue(`Item_MelonBlock`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Melon Block`)
									.setValue(`Item_EnchantedMelonBlock`)
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Mushrooms`)
							.setValue(`Farming_Mushrooms`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Red Mushroom`)
									.setValue(`Item_RedMushroom`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Red Mushroom`)
									.setValue(`Item_EnchantedRedMushroom`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Red Mushroom Block`)
									.setValue(`Item_RedMushroomBlock`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Red Mushroom Block`)
									.setValue(`Item_EnchantedRedMushroomBlock`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Brown Mushroom`)
									.setValue(`Item_BrownMushroom`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Brown Mushroom`)
									.setValue(`Item_EnchantedBrownMushroom`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Brown Mushroom Block`)
									.setValue(`Item_BrownMushroomBlock`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Brown Mushroom Block`)
									.setValue(`Item_EnchantedBrownMushroomBlock`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Cocoa Beans`)
							.setValue(`Farming_CocoaBeans`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Cocoa Beans`)
									.setValue(`Item_CocoaBeans`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Cocoa Bean`)
									.setValue(`Item_EnchantedCocoaBean`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Cookie`)
									.setValue(`Item_EnchantedCookie`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Cactus`)
							.setValue(`Farming_Cactus`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Cactus`)
									.setValue(`Item_Cactus`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Cactus Green`)
									.setValue(`Item_EnchantedCactusGreen`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Cactus`)
									.setValue(`Item_EnchantedCactus`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Sugar Cane`)
							.setValue(`Farming_SugarCane`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Sugar Cane`)
									.setValue(`Item_SugarCane`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Sugar`)
									.setValue(`Item_EnchantedSugar`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Paper`)
									.setValue(`Item_EnchantedPaper`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Sugar Cane`)
									.setValue(`Item_EnchantedSugarCane`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Leather & Beef`)
							.setValue(`Farming_Leather&Beef`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Leather`)
									.setValue(`Item_Leather`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Leather`)
									.setValue(`Item_EnchantedLeather`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Raw Beef`)
									.setValue(`Item_RawBeef`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Raw Beef`)
									.setValue(`Item_EnchantedRawBeef`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Pork`)
							.setValue(`Farming_Pork`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Raw Porkchop`)
									.setValue(`Item_RawPorkchop`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Pork`)
									.setValue(`Item_EnchantedPork`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Grilled Pork`)
									.setValue(`Item_EnchantedGrilledPork`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Chicken & Feather`)
							.setValue(`Farming_Chicken&Feather`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Raw Chicken`)
									.setValue(`Item_RawChicken`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Raw Chicken`)
									.setValue(`Item_EnchantedRawChicken`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Cake`)
									.setValue(`Item_EnchantedCake`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Feather`)
									.setValue(`Item_Feather`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Feather`)
									.setValue(`Item_EnchantedFeather`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Egg`)
									.setValue(`Item_EnchantedEgg`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Super Enchanted Egg`)
									.setValue(`Item_SuperEnchantedEgg`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Omega Enchanted Egg`)
									.setValue(`Item_OmegaEnchantedEgg`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Mutton`)
							.setValue(`Farming_Mutton`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Mutton`)
									.setValue(`Item_Mutton`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Mutton`)
									.setValue(`Item_EnchantedMutton`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Cooked Mutton`)
									.setValue(`Item_EnchantedCookedMutton`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Rabbit`)
							.setValue(`Farming_Rabbit`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Raw Rabbit`)
									.setValue(`Item_RawRabbit`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Raw Rabbit`)
									.setValue(`Item_EnchantedRawRabbit`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rabbit's Foot`)
									.setValue(`Item_RabbitsFoot`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rabbit Hide`)
									.setValue(`Item_RabbitHide`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Rabbit Foot`)
									.setValue(`Item_EnchantedRabbitFoot`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Rabbit Hide`)
									.setValue(`Item_EnchantedRabbitHide`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Nether Warts`)
							.setValue(`Farming_NetherWarts`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Nether Wart`)
									.setValue(`Item_NetherWart`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Nether Wart`)
									.setValue(`Item_EnchantedNetherWart`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Mutant Nether Wart`)
									.setValue(`Item_MutantNetherWart`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Mycelium`)
							.setValue(`Farming_Mycelium`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Mycelium`)
									.setValue(`Item_Mycelium`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Mycelium`)
									.setValue(`Item_EnchantedMycelium`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Mycelium Cube`)
									.setValue(`Item_EnchantedMyceliumCube`),
							),
					),
				new MultiSelectMenuConfirmationOption()
					.setLabel(`Mining`)
					.setValue(`Category_Mining`)
					.addChildOptions(
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Cobblestone`)
							.setValue(`Mining_Cobblestone`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Cobblestone`)
									.setValue(`Item_Cobblestone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Cobblestone`)
									.setValue(`Item_EnchantedCobblestone`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Coal`)
							.setValue(`Mining_Coal`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Coal`)
									.setValue(`Item_EnchantedCoal`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Charcoal`)
									.setValue(`Item_EnchantedCharcoal`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Block of Coal`)
									.setValue(`Item_EnchantedBlockofCoal`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Iron`)
							.setValue(`Mining_Iron`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Iron Ingot`)
									.setValue(`Item_IronIngot`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Iron`)
									.setValue(`Item_EnchantedIron`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Iron Block`)
									.setValue(`Item_EnchantedIronBlock`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Gold`)
							.setValue(`Mining_Gold`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Gold Ingot`)
									.setValue(`Item_GoldIngot`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Gold`)
									.setValue(`Item_EnchantedGold`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Gold Block`)
									.setValue(`Item_EnchantedGoldBlock`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Diamond`)
							.setValue(`Mining_Diamond`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Diamond`)
									.setValue(`Item_Diamond`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Diamond`)
									.setValue(`Item_EnchantedDiamond`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Diamond Block`)
									.setValue(`Item_EnchantedDiamondBlock`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Refined Diamond`)
									.setValue(`Item_RefinedDiamond`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Lapis`)
							.setValue(`Mining_Lapis`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Lapis Lazuli`)
									.setValue(`Item_LapisLazuli`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Lapis Lazuli`)
									.setValue(`Item_EnchantedLapisLazuli`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Lapis Block`)
									.setValue(`Item_EnchantedLapisBlock`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Jade Gemstone`)
							.setValue(`Mining_JadeGemstone`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rough Jade Gemstone`)
									.setValue(`Item_RoughJadeGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawed Jade Gemstone`)
									.setValue(`Item_FlawedJadeGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Fine Jade Gemstone`)
									.setValue(`Item_FineJadeGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawless Jade Gemstone`)
									.setValue(`Item_FlawlessJadeGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Perfect Jade Gemstone`)
									.setValue(`Item_PerfectJadeGemstone`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Amber Gemstone`)
							.setValue(`Mining_AmberGemstone`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rough Amber Gemstone`)
									.setValue(`Item_RoughAmberGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawed Amber Gemstone`)
									.setValue(`Item_FlawedAmberGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Fine Amber Gemstone`)
									.setValue(`Item_FineAmberGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawless Amber Gemstone`)
									.setValue(`Item_FlawlessAmberGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Perfect Amber Gemstone`)
									.setValue(`Item_PerfectAmberGemstone`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Topaz Gemstone`)
							.setValue(`Mining_TopazGemstone`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rough Topaz Gemstone`)
									.setValue(`Item_RoughTopazGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawed Topaz Gemstone`)
									.setValue(`Item_FlawedTopazGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Fine Topaz Gemstone`)
									.setValue(`Item_FineTopazGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawless Topaz Gemstone`)
									.setValue(`Item_FlawlessTopazGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Perfect Topaz Gemstone`)
									.setValue(`Item_PerfectTopazGemstone`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Sapphire Gemstone`)
							.setValue(`Mining_SapphireGemstone`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rough Sapphire Gemstone`)
									.setValue(`Item_RoughSapphireGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawed Sapphire Gemstone`)
									.setValue(`Item_FlawedSapphireGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Fine Sapphire Gemstone`)
									.setValue(`Item_FineSapphireGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawless Sapphire Gemstone`)
									.setValue(`Item_FlawlessSapphireGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Perfect Sapphire Gemstone`)
									.setValue(`Item_PerfectSapphireGemstone`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Amethyst Gemstone`)
							.setValue(`Mining_AmethystGemstone`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rough Amethyst Gemstone`)
									.setValue(`Item_RoughAmethystGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawed Amethyst Gemstone`)
									.setValue(`Item_FlawedAmethystGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Fine Amethyst Gemstone`)
									.setValue(`Item_FineAmethystGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawless Amethyst Gemstone`)
									.setValue(`Item_FlawlessAmethystGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Perfect Amethyst Gemstone`)
									.setValue(`Item_PerfectAmethystGemstone`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Jasper Gemstone`)
							.setValue(`Mining_JasperGemstone`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rough Jasper Gemstone`)
									.setValue(`Item_RoughJasperGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawed Jasper Gemstone`)
									.setValue(`Item_FlawedJasperGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Fine Jasper Gemstone`)
									.setValue(`Item_FineJasperGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawless Jasper Gemstone`)
									.setValue(`Item_FlawlessJasperGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Perfect Jasper Gemstone`)
									.setValue(`Item_PerfectJasperGemstone`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Ruby Gemstone`)
							.setValue(`Mining_RubyGemstone`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rough Ruby Gemstone`)
									.setValue(`Item_RoughRubyGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawed Ruby Gemstone`)
									.setValue(`Item_FlawedRubyGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Fine Ruby Gemstone`)
									.setValue(`Item_FineRubyGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawless Ruby Gemstone`)
									.setValue(`Item_FlawlessRubyGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Perfect Ruby Gemstone`)
									.setValue(`Item_PerfectRubyGemstone`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Opal Gemstone`)
							.setValue(`Mining_OpalGemstone`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rough Opal Gemstone`)
									.setValue(`Item_RoughOpalGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawed Opal Gemstone`)
									.setValue(`Item_FlawedOpalGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Fine Opal Gemstone`)
									.setValue(`Item_FineOpalGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flawless Opal Gemstone`)
									.setValue(`Item_FlawlessOpalGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Perfect Opal Gemstone`)
									.setValue(`Item_PerfectOpalGemstone`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Emerald`)
							.setValue(`Mining_Emerald`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Emerald`)
									.setValue(`Item_Emerald`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Emerald`)
									.setValue(`Item_EnchantedEmerald`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Emerald Block`)
									.setValue(`Item_EnchantedEmeraldBlock`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Redstone`)
							.setValue(`Mining_Redstone`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Redstone`)
									.setValue(`Item_Redstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Redstone`)
									.setValue(`Item_EnchantedRedstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Redstone Block`)
									.setValue(`Item_EnchantedRedstoneBlock`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Quartz`)
							.setValue(`Mining_Quartz`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Nether Quartz`)
									.setValue(`Item_NetherQuartz`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Quartz`)
									.setValue(`Item_EnchantedQuartz`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Quartz Block`)
									.setValue(`Item_EnchantedQuartzBlock`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Obsidian`)
							.setValue(`Mining_Obsidian`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Obsidian`)
									.setValue(`Item_Obsidian`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Obsidian`)
									.setValue(`Item_EnchantedObsidian`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Glowstone`)
							.setValue(`Mining_Glowstone`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Glowstone Dust`)
									.setValue(`Item_GlowstoneDust`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Glowstone Dust`)
									.setValue(`Item_EnchantedGlowstoneDust`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Glowstone`)
									.setValue(`Item_EnchantedGlowstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Redstone Lamp`)
									.setValue(`Item_EnchantedRedstoneLamp`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Flint & Gravel`)
							.setValue(`Mining_Flint&Gravel`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Flint`)
									.setValue(`Item_Flint`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Flint`)
									.setValue(`Item_EnchantedFlint`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Gravel`)
									.setValue(`Item_Gravel`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Hard Stone`)
							.setValue(`Mining_HardStone`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Hard Stone`)
									.setValue(`Item_HardStone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Hard Stone`)
									.setValue(`Item_EnchantedHardStone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Concentrated Stone`)
									.setValue(`Item_ConcentratedStone`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Ice`)
							.setValue(`Mining_Ice`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Ice`)
									.setValue(`Item_Ice`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Packed Ice`)
									.setValue(`Item_PackedIce`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Ice`)
									.setValue(`Item_EnchantedIce`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Packed Ice`)
									.setValue(`Item_EnchantedPackedIce`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Glacial Fragment`)
									.setValue(`Item_GlacialFragment`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Netherrack`)
							.setValue(`Mining_Netherrack`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Netherrack`)
									.setValue(`Item_Netherrack`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Netherrack`)
									.setValue(`Item_EnchantedNetherrack`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Sand`)
							.setValue(`Mining_Sand`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Sand`)
									.setValue(`Item_Sand`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Sand`)
									.setValue(`Item_EnchantedSand`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Red Sand`)
									.setValue(`Item_RedSand`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Red Sand`)
									.setValue(`Item_EnchantedRedSand`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Red Sand Cube`)
									.setValue(`Item_EnchantedRedSandCube`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`End Stone`)
							.setValue(`Mining_EndStone`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`End Stone`)
									.setValue(`Item_EndStone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted End Stone`)
									.setValue(`Item_EnchantedEndStone`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Snow`)
							.setValue(`Mining_Snow`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Snowball`)
									.setValue(`Item_Snowball`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Snow Block`)
									.setValue(`Item_SnowBlock`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Snow Block`)
									.setValue(`Item_EnchantedSnowBlock`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Dwarven Materials`)
							.setValue(`Mining_DwarvenMaterials`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Mithril`)
									.setValue(`Item_Mithril`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Mithril`)
									.setValue(`Item_EnchantedMithril`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Refined Mithril`)
									.setValue(`Item_RefinedMithril`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Starfall`)
									.setValue(`Item_Starfall`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Titanium`)
									.setValue(`Item_Titanium`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Titanium`)
									.setValue(`Item_EnchantedTitanium`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Refined Titanium`)
									.setValue(`Item_RefinedTitanium`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Treasurite`)
									.setValue(`Item_Treasurite`),
							),
					),
				new MultiSelectMenuConfirmationOption()
					.setLabel(`Combat`)
					.setValue(`Category_Combat`)
					.addChildOptions(
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Rotten Flesh`)
							.setValue(`Mining_RottenFlesh`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rotten Flesh`)
									.setValue(`Item_RottenFlesh`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Rotten Flesh`)
									.setValue(`Item_EnchantedRottenFlesh`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Bone`)
									.setValue(`Item_Bone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Bone`)
									.setValue(`Item_Bone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Bone`)
									.setValue(`Item_EnchantedBone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Bone Block`)
									.setValue(`Item_EnchantedBoneBlock`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Arachnids`)
							.setValue(`Mining_Arachnids`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`String`)
									.setValue(`Item_String`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted String`)
									.setValue(`Item_EnchantedString`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Spider Eye`)
									.setValue(`Item_SpiderEye`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Spider Eye`)
									.setValue(`Item_EnchantedSpiderEye`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Fermented Spider Eye`)
									.setValue(`Item_EnchantedFermentedSpiderEye`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Soul String`)
									.setValue(`Item_SoulString`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Arachne's Calling`)
									.setValue(`Item_ArachnesCalling`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Gunpowder`)
							.setValue(`Mining_Gunpowder`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Gunpowder`)
									.setValue(`Item_Gunpowder`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Gunpowder`)
									.setValue(`Item_EnchantedGunpowder`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Firework Rocket`)
									.setValue(`Item_EnchantedFireworkRocket`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Ender Pearl`)
							.setValue(`Mining_EnderPearl`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Ender Pearl`)
									.setValue(`Item_EnderPearl`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Ender Pearl`)
									.setValue(`Item_EnchantedEnderPearl`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Eye of Ender`)
									.setValue(`Item_EnchantedEyeofEnder`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Absolute Ender Pearl`)
									.setValue(`Item_AbsoluteEnderPearl`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Ghast Tear`)
							.setValue(`Mining_GhastTear`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Ghast Tear`)
									.setValue(`Item_GhastTear`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Ghast Tear`)
									.setValue(`Item_EnchantedGhastTear`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Slime Drops`)
							.setValue(`Mining_SlimeDrops`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Slimeball`)
									.setValue(`Item_Slimeball`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Slimeball`)
									.setValue(`Item_EnchantedSlimeball`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Slime Block`)
									.setValue(`Item_EnchantedSlimeBlock`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Magma Cream`)
									.setValue(`Item_MagmaCream`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Magma Cream`)
									.setValue(`Item_EnchantedMagmaCream`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Sludge Juice`)
									.setValue(`Item_SludgeJuice`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Yoggie`)
									.setValue(`Item_Yoggie`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Blaze Rod`)
							.setValue(`Mining_BlazeRod`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Blaze Rod`)
									.setValue(`Item_BlazeRod`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Blaze Powder`)
									.setValue(`Item_EnchantedBlazePowder`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Blaze Rod`)
									.setValue(`Item_EnchantedBlazeRod`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Mythological`)
							.setValue(`Mining_Mythological`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Griffin Feather`)
									.setValue(`Item_GriffinFeather`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Daedalus Stick`)
									.setValue(`Item_DaedalusStick`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Ancient Claw`)
									.setValue(`Item_AncientClaw`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Ancient Claw`)
									.setValue(`Item_EnchantedAncientClaw`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Revenant Horror`)
							.setValue(`Mining_RevenantHorror`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Revenant Flesh`)
									.setValue(`Item_RevenantFlesh`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Revenant Viscera`)
									.setValue(`Item_RevenantViscera`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Tarantula Broodfather`)
							.setValue(`Mining_TarantulaBroodfather`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Tarantula Web`)
									.setValue(`Item_TarantulaWeb`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Tarantula Silk`)
									.setValue(`Item_TarantulaSilk`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Sven Packmaster`)
							.setValue(`Mining_SvenPackmaster`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Wolf Tooth`)
									.setValue(`Item_WolfTooth`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Golden Tooth`)
									.setValue(`Item_GoldenTooth`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Voidgloom Seraph`)
							.setValue(`Mining_VoidgloomSeraph`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Null Sphere`)
									.setValue(`Item_NullSphere`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Null Ovoid`)
									.setValue(`Item_NullOvoid`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Null Atom`)
									.setValue(`Item_NullAtom`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Raw Soulflow`)
									.setValue(`Item_RawSoulflow`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Soulflow`)
									.setValue(`Item_Soulflow`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Inferno Demonlord`)
							.setValue(`Mining_InfernoDemonlord`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Derelict Ashe`)
									.setValue(`Item_DerelictAshe`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Amalgamated Crimsonite`)
									.setValue(`Item_AmalgamatedCrimsonite`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Molten Powder`)
									.setValue(`Item_MoltenPowder`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Blaze Rod Distillate`)
									.setValue(`Item_BlazeRodDistillate`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Gabagool Distillate`)
									.setValue(`Item_GabagoolDistillate`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Glowstone Distillate`)
									.setValue(`Item_GlowstoneDistillate`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Magma Cream Distillate`)
									.setValue(`Item_MagmaCreamDistillate`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Nether Wart Distillate`)
									.setValue(`Item_NetherWartDistillate`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Crude Gabagool`)
									.setValue(`Item_CrudeGabagool`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Fuel Gabagool`)
									.setValue(`Item_FuelGabagool`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Heavy Gabagool`)
									.setValue(`Item_HeavyGabagool`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Hypergolic Gabagool`)
									.setValue(`Item_HypergolicGabagool`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Chili Pepper`)
									.setValue(`Item_ChiliPepper`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Inferno Vertex`)
									.setValue(`Item_InfernoVertex`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Inferno Apex`)
									.setValue(`Item_InfernoApex`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Reaper Pepper`)
									.setValue(`Item_ReaperPepper`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Eggs`)
							.setValue(`Mining_Eggs`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Goblin Egg`)
									.setValue(`Item_GoblinEgg`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Red Goblin Egg`)
									.setValue(`Item_RedGoblinEgg`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Blue Goblin Egg`)
									.setValue(`Item_BlueGoblinEgg`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Yellow Goblin Egg`)
									.setValue(`Item_YellowGoblinEgg`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Green Goblin Egg`)
									.setValue(`Item_GreenGoblinEgg`),
							),
					),
				new MultiSelectMenuConfirmationOption()
					.setLabel(`Woods and Fishes`)
					.setValue(`Category_WoodsandFishes`)
					.addChildOptions(
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Oak`)
							.setValue(`Mining_Oak`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Oak Wood`)
									.setValue(`Item_OakWood`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Oak Wood`)
									.setValue(`Item_EnchantedOakWood`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Spruce`)
							.setValue(`Mining_Spruce`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Spruce Wood`)
									.setValue(`Item_SpruceWood`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Spruce Wood`)
									.setValue(`Item_EnchantedSpruceWood`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Birch `)
							.setValue(`Mining_Birch`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Birch Wood`)
									.setValue(`Item_BirchWood`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Birch Wood`)
									.setValue(`Item_EnchantedBirchWood`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Dark Oak`)
							.setValue(`Mining_DarkOak`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Dark Oak Wood`)
									.setValue(`Item_DarkOakWood`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Dark Oak Wood`)
									.setValue(`Item_EnchantedDarkOakWood`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Acac`)
							.setValue(`Mining_Acac`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Acacia Wood`)
									.setValue(`Item_AcaciaWood`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Acacia Wood`)
									.setValue(`Item_EnchantedAcaciaWood`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Jungle`)
							.setValue(`Mining_Jungle`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Jungle Wood`)
									.setValue(`Item_JungleWood`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Jungle Wood`)
									.setValue(`Item_EnchantedJungleWood`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Raw Fish`)
							.setValue(`Mining_RawFish`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Raw Fish`)
									.setValue(`Item_RawFish`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Raw Fish`)
									.setValue(`Item_EnchantedRawFish`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Cooked Fish`)
									.setValue(`Item_EnchantedCookedFish`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Salmon`)
							.setValue(`Mining_Salmon`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Raw Salmon`)
									.setValue(`Item_RawSalmon`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Raw Salmon`)
									.setValue(`Item_EnchantedRawSalmon`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Cooked Salmon`)
									.setValue(`Item_EnchantedCookedSalmon`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Clownfish`)
							.setValue(`Mining_Clownfish`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Clownfish`)
									.setValue(`Item_Clownfish`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Clownfish`)
									.setValue(`Item_EnchantedClownfish`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Pufferfish`)
							.setValue(`Mining_Pufferfish`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Pufferfish`)
									.setValue(`Item_Pufferfish`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Pufferfish`)
									.setValue(`Item_EnchantedPufferfish`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Prismarine`)
							.setValue(`Mining_Prismarine`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Prismarine Shard`)
									.setValue(`Item_PrismarineShard`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Prismarine Shard`)
									.setValue(`Item_EnchantedPrismarineShard`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Prismarine Crystals`)
									.setValue(`Item_PrismarineCrystals`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Prismarine Crystals`)
									.setValue(`Item_EnchantedPrismarineCrystals`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Clay`)
							.setValue(`Mining_Clay`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Clay`)
									.setValue(`Item_Clay`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Clay`)
									.setValue(`Item_EnchantedClay`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Sponge`)
							.setValue(`Mining_Sponge`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Sponge`)
									.setValue(`Item_Sponge`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Sponge`)
									.setValue(`Item_EnchantedSponge`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Wet Sponge`)
									.setValue(`Item_EnchantedWetSponge`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Baits`)
							.setValue(`Mining_Baits`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Carrot Bait`)
									.setValue(`Item_CarrotBait`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Minnow Bait`)
									.setValue(`Item_MinnowBait`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Fish Bait`)
									.setValue(`Item_FishBait`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Light Bait`)
									.setValue(`Item_LightBait`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Dark Bait`)
									.setValue(`Item_DarkBait`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Spooky Bait`)
									.setValue(`Item_SpookyBait`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Spiked Bait`)
									.setValue(`Item_SpikedBait`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Blessed Bait`)
									.setValue(`Item_BlessedBait`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Ice Bait`)
									.setValue(`Item_IceBait`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Whale Bait`)
									.setValue(`Item_WhaleBait`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Shark Bait`)
									.setValue(`Item_SharkBait`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Corrupted Bait`)
									.setValue(`Item_CorruptedBait`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Hot Bait`)
									.setValue(`Item_HotBait`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Fishing Festival Items`)
							.setValue(`Mining_FishingFestivalItems`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Nurse Shark Tooth`)
									.setValue(`Item_NurseSharkTooth`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Blue Shark Tooth`)
									.setValue(`Item_BlueSharkTooth`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Tiger Shark Tooth`)
									.setValue(`Item_TigerSharkTooth`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Great White Shark Tooth`)
									.setValue(`Item_GreatWhiteSharkTooth`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Shark Fin`)
									.setValue(`Item_SharkFin`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Shark Fin`)
									.setValue(`Item_EnchantedSharkFin`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Mob Dro`)
							.setValue(`Mining_MobDro`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Lily Pad`)
									.setValue(`Item_LilyPad`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Lily Pad`)
									.setValue(`Item_EnchantedLilyPad`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Worm Membrane`)
									.setValue(`Item_WormMembrane`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Ink Sac`)
									.setValue(`Item_InkSac`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Ink Sac`)
									.setValue(`Item_EnchantedInkSac`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Magmafish`)
							.setValue(`Mining_Magmafish`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Magmafish`)
									.setValue(`Item_Magmafish`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Silver Magmafish`)
									.setValue(`Item_SilverMagmafish`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Gold Magmafish`)
									.setValue(`Item_GoldMagmafish`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Diamond Magmafish`)
									.setValue(`Item_DiamondMagmafish`),
							),
					),
				new MultiSelectMenuConfirmationOption()
					.setLabel(`Oddities`)
					.setValue(`Category_Oddities`)
					.addChildOptions(
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Booster Cookie`)
							.setValue(`Mining_BoosterCookie`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Booster Cookie`)
									.setValue(`Item_BoosterCookie`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Book Modifiers`)
							.setValue(`Mining_BookModifiers`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Hot Potato Book`)
									.setValue(`Item_HotPotatoBook`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Fuming Potato Book`)
									.setValue(`Item_FumingPotatoBook`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Book of Stats`)
									.setValue(`Item_BookofStats`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`The Art of War`)
									.setValue(`Item_TheArtofWar`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Farming for Dummies`)
									.setValue(`Item_FarmingforDummies`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Compactor`)
							.setValue(`Mining_Compactor`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Compactor`)
									.setValue(`Item_Compactor`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Dwarven Super Compactor`)
									.setValue(`Item_DwarvenSuperCompactor`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Super Compactor 3000`)
									.setValue(`Item_SuperCompactor3000`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Draconic Sacrifice`)
							.setValue(`Mining_DraconicSacrifice`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Ritual Residue`)
									.setValue(`Item_RitualResidue`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Mite Gel`)
									.setValue(`Item_MiteGel`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Summoning Eye`)
									.setValue(`Item_SummoningEye`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Dragon Fragments`)
							.setValue(`Mining_DragonFragments`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Protector Dragon Fragment`)
									.setValue(`Item_ProtectorDragonFragment`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Old Dragon Fragment`)
									.setValue(`Item_OldDragonFragment`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Unstable Dragon Fragment`)
									.setValue(`Item_UnstableDragonFragment`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Strong Dragon Fragment`)
									.setValue(`Item_StrongDragonFragment`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Young Dragon Fragment`)
									.setValue(`Item_YoungDragonFragment`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Wise Dragon Fragment`)
									.setValue(`Item_WiseDragonFragment`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Superior Dragon Fragment`)
									.setValue(`Item_SuperiorDragonFragment`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Holy Dragon Fragment`)
									.setValue(`Item_HolyDragonFragment`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Fuels`)
							.setValue(`Mining_Fuels`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Lava Bucket`)
									.setValue(`Item_EnchantedLavaBucket`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Magma Bucket`)
									.setValue(`Item_MagmaBucket`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Plasma Bucket`)
									.setValue(`Item_PlasmaBucket`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Hamster Wheel`)
									.setValue(`Item_HamsterWheel`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Foul Flesh`)
									.setValue(`Item_FoulFlesh`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Tasty Cheese`)
									.setValue(`Item_TastyCheese`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Catalyst`)
									.setValue(`Item_Catalyst`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Hyper Catalyst`)
									.setValue(`Item_HyperCatalyst`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Power Crystal`)
									.setValue(`Item_PowerCrystal`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Spooky`)
							.setValue(`Mining_Spooky`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Green Candy`)
									.setValue(`Item_GreenCandy`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Purple Candy`)
									.setValue(`Item_PurpleCandy`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Ectoplasm`)
									.setValue(`Item_Ectoplasm`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Pumpkin Guts`)
									.setValue(`Item_PumpkinGuts`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Spooky Shard`)
									.setValue(`Item_SpookyShard`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Werewolf Skin`)
									.setValue(`Item_WerewolfSkin`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Soul Fragment`)
									.setValue(`Item_SoulFragment`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Gifts`)
							.setValue(`Mining_Gifts`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`White Gift`)
									.setValue(`Item_WhiteGift`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Green Gift`)
									.setValue(`Item_GreenGift`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Red Gift`)
									.setValue(`Item_RedGift`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Jerry Boxes`)
							.setValue(`Oddities_JerryBoxes`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Green Jerry Box`)
									.setValue(`Item_GreenJerryBox`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Blue Jerry Box`)
									.setValue(`Item_BlueJerryBox`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Purple Jerry Box`)
									.setValue(`Item_PurpleJerryBox`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Golden Jerry Box`)
									.setValue(`Item_GoldenJerryBox`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Refined Mineral`)
							.setValue(`Mining_RefinedMineral`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Refined Mineral`)
									.setValue(`Item_RefinedMineral`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Recombobulator`)
							.setValue(`Mining_Recombobulator`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Recombobulator 3000`)
									.setValue(`Item_Recombobulator3000`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Jacob's Ticket`)
							.setValue(`Mining_JacobsTicket`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Jacob's Ticket`)
									.setValue(`Item_JacobsTicket`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`EXP Bottles`)
							.setValue(`Mining_EXPBottles`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Experience Bottle`)
									.setValue(`Item_ExperienceBottle`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Grand Experience Bottle`)
									.setValue(`Item_GrandExperienceBottle`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Titanic Experience Bottle`)
									.setValue(`Item_TitanicExperienceBottle`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Colossal Experience Bottle`)
									.setValue(`Item_ColossalExperienceBottle`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Low Reforge Stones I (A-O)`)
							.setValue(`Mining_LowReforgeStonesI(A-O)`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Blaze Wax`)
									.setValue(`Item_BlazeWax`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Candy Corn`)
									.setValue(`Item_CandyCorn`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Diamond Atom`)
									.setValue(`Item_DiamondAtom`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Diamonite`)
									.setValue(`Item_Diamonite`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Dragon Claw`)
									.setValue(`Item_DragonClaw`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Dragon Scale`)
									.setValue(`Item_DragonScale`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`End Stone Geode`)
									.setValue(`Item_EndStoneGeode`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Hardened Wood`)
									.setValue(`Item_HardenedWood`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Jaderald`)
									.setValue(`Item_Jaderald`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Jerry Stone`)
									.setValue(`Item_JerryStone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Lapis Crystal`)
									.setValue(`Item_LapisCrystal`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Meteor Shard`)
									.setValue(`Item_MeteorShard`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Midas Jewel`)
									.setValue(`Item_MidasJewel`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Molten Cube`)
									.setValue(`Item_MoltenCube`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Necromancer's Brooch`)
									.setValue(`Item_NecromancersBrooch`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Low Reforge Stones II (O-Z)`)
							.setValue(`Mining_LowReforgeStonesII(O-Z)`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Onyx`)
									.setValue(`Item_Onyx`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Optical Lens`)
									.setValue(`Item_OpticalLens`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Premium Flesh`)
									.setValue(`Item_PremiumFlesh`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Pure Mithril`)
									.setValue(`Item_PureMithril`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rare Diamond`)
									.setValue(`Item_RareDiamond`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Red Nose`)
									.setValue(`Item_RedNose`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Red Scarf`)
									.setValue(`Item_RedScarf`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rock Gemstone`)
									.setValue(`Item_RockGemstone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rusty Anchor`)
									.setValue(`Item_RustyAnchor`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Salmon Opal`)
									.setValue(`Item_SalmonOpal`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Salt Cube`)
									.setValue(`Item_SaltCube`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Searing Stone`)
									.setValue(`Item_SearingStone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Shiny Prism`)
									.setValue(`Item_ShinyPrism`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Spirit Stone`)
									.setValue(`Item_SpiritStone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Suspicious Vial`)
									.setValue(`Item_SuspiciousVial`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Warped Stone`)
									.setValue(`Item_WarpedStone`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`High Reforge Stones`)
							.setValue(`Mining_HighReforgeStones`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Amber Material`)
									.setValue(`Item_AmberMaterial`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Precursor Gear`)
									.setValue(`Item_PrecursorGear`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Wither Blood`)
									.setValue(`Item_WitherBlood`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Deep Sea Orb`)
									.setValue(`Item_DeepSeaOrb`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Bulky Stone`)
									.setValue(`Item_BulkyStone`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Kuudra Mandible`)
									.setValue(`Item_KuudraMandible`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Sadan's Brooch`)
									.setValue(`Item_SadansBrooch`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Blessed Fruit`)
									.setValue(`Item_BlessedFruit`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Petrified Starfall`)
									.setValue(`Item_PetrifiedStarfall`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Giant Tooth`)
									.setValue(`Item_GiantTooth`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Dragon Horn`)
									.setValue(`Item_DragonHorn`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Refined Amber`)
									.setValue(`Item_RefinedAmber`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Lucky Dice`)
									.setValue(`Item_LuckyDice`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Golden Ball`)
									.setValue(`Item_GoldenBall`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Hot Stuff`)
									.setValue(`Item_HotStuff`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Power Stones`)
							.setValue(`Mining_PowerStones`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Luxurious Spool`)
									.setValue(`Item_LuxuriousSpool`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Rock Candy`)
									.setValue(`Item_RockCandy`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`End Stone Shulker`)
									.setValue(`Item_EndStoneShulker`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Obsidian Tablet`)
									.setValue(`Item_ObsidianTablet`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Dark Orb`)
									.setValue(`Item_DarkOrb`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Furball`)
									.setValue(`Item_Furball`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Ender Monocle`)
									.setValue(`Item_EnderMonocle`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Acacia Birdhouse`)
									.setValue(`Item_AcaciaBirdhouse`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Beating Heart`)
									.setValue(`Item_BeatingHeart`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Mandraa`)
									.setValue(`Item_Mandraa`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Magma Urchin`)
									.setValue(`Item_MagmaUrchin`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Horns of Torment`)
									.setValue(`Item_HornsofTorment`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Precious Pearl`)
									.setValue(`Item_PreciousPearl`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Eccentric Painting`)
									.setValue(`Item_EccentricPainting`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Hazmat Enderman`)
									.setValue(`Item_HazmatEnderman`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Vitamin Death`)
									.setValue(`Item_VitaminDeath`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Scorched Books`)
									.setValue(`Item_ScorchedBooks`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Stock of Stonks`)
							.setValue(`Mining_StockofStonks`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Stock of Stonks`)
									.setValue(`Item_StockofStonks`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Enchantments I (A-F)`)
							.setValue(`Mining_EnchantmentsI(A-F)`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Angler VI)`)
									.setValue(`Item_EnchantedBook(AnglerVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Bane of Arthropods VI-VII)`)
									.setValue(`Item_EnchantedBook(BaneofArthropodsVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Big Brain III-V)`)
									.setValue(`Item_EnchantedBook(BigBrainIII-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Blast Protection VI-VII)`)
									.setValue(`Item_EnchantedBook(BlastProtectionVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Blessing VI)`)
									.setValue(`Item_EnchantedBook(BlessingVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Caster VI)`)
									.setValue(`Item_EnchantedBook(CasterVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Cayenne I-V)`)
									.setValue(`Item_EnchantedBook(CayenneI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Champion I-X)`)
									.setValue(`Item_EnchantedBook(ChampionI-X)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Chance IV-V)`)
									.setValue(`Item_EnchantedBook(ChanceIV-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Charm I-V)`)
									.setValue(`Item_EnchantedBook(CharmI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Cleave VI)`)
									.setValue(`Item_EnchantedBook(CleaveVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Compact I)`)
									.setValue(`Item_EnchantedBook(CompactI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Corruption I-V)`)
									.setValue(`Item_EnchantedBook(CorruptionI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Counter-Strike III-V)`)
									.setValue(`Item_EnchantedBook(Counter-StrikeIII-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Critical VI-VII)`)
									.setValue(`Item_EnchantedBook(CriticalVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Cubism VI)`)
									.setValue(`Item_EnchantedBook(CubismVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Cultivating I)`)
									.setValue(`Item_EnchantedBook(CultivatingI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Delicate V)`)
									.setValue(`Item_EnchantedBook(DelicateV)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Dragon Hunter I-V)`)
									.setValue(`Item_EnchantedBook(DragonHunterI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Ender Slayer VI-VII)`)
									.setValue(`Item_EnchantedBook(EnderSlayerVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Execute VI)`)
									.setValue(`Item_EnchantedBook(ExecuteVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Experience IV-V)`)
									.setValue(`Item_EnchantedBook(ExperienceIV-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Expertise I)`)
									.setValue(`Item_EnchantedBook(ExpertiseI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Feather Falling VI-X)`)
									.setValue(`Item_EnchantedBook(FeatherFallingVI-X)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Ferocious Mana I-X)`)
									.setValue(`Item_EnchantedBook(FerociousManaI-X)`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Enchantments II (F-P)`)
							.setValue(`Mining_EnchantmentsII(F-P)`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Fire Aspect III)`)
									.setValue(`Item_EnchantedBook(FireAspectIII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Fire Protection VI-VII)`)
									.setValue(`Item_EnchantedBook(FireProtectionVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (First Strike V)`)
									.setValue(`Item_EnchantedBook(FirstStrikeV)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Fortune IV)`)
									.setValue(`Item_EnchantedBook(FortuneIV)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Frail VI)`)
									.setValue(`Item_EnchantedBook(FrailVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Giant Killer VI-VII)`)
									.setValue(`Item_EnchantedBook(GiantKillerVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Growth VI-VII)`)
									.setValue(`Item_EnchantedBook(GrowthVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Hardened Mana I-X)`)
									.setValue(`Item_EnchantedBook(HardenedManaI-X)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Harvesting VI)`)
									.setValue(`Item_EnchantedBook(HarvestingVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Hecatomb I-X)`)
									.setValue(`Item_EnchantedBook(HecatombI-X)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Infinite Quiver VI-X)`)
									.setValue(`Item_EnchantedBook(InfiniteQuiverVI-X)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Lethality VI)`)
									.setValue(`Item_EnchantedBook(LethalityVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Life Steal IV-V)`)
									.setValue(`Item_EnchantedBook(LifeStealIV-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Looting IV-V)`)
									.setValue(`Item_EnchantedBook(LootingIV-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Luck VI-VII)`)
									.setValue(`Item_EnchantedBook(LuckVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Luck of the Sea VI)`)
									.setValue(`Item_EnchantedBook(LuckoftheSeaVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Lure VI)`)
									.setValue(`Item_EnchantedBook(LureVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Magnet VI)`)
									.setValue(`Item_EnchantedBook(MagnetVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Mana Steal I-III)`)
									.setValue(`Item_EnchantedBook(ManaStealI-III)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Mana Vampire I-X)`)
									.setValue(`Item_EnchantedBook(ManaVampireI-X)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Overload I-V)`)
									.setValue(`Item_EnchantedBook(OverloadI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Power VI-VII)`)
									.setValue(`Item_EnchantedBook(PowerVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Pristine I-V)`)
									.setValue(`Item_EnchantedBook(PristineI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Projectile Protection VI-VII)`)
									.setValue(`Item_EnchantedBook(ProjectileProtectionVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Prosecute VI)`)
									.setValue(`Item_EnchantedBook(ProsecuteVI)`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Enchantments III (P-T)`)
							.setValue(`Mining_EnchantmentsIII(P-T)`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Prosperity I-V)`)
									.setValue(`Item_EnchantedBook(ProsperityI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Protection VI-VII)`)
									.setValue(`Item_EnchantedBook(ProtectionVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Rejuvenate I-V)`)
									.setValue(`Item_EnchantedBook(RejuvenateI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Replenish I)`)
									.setValue(`Item_EnchantedBook(ReplenishI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Respite I-V)`)
									.setValue(`Item_EnchantedBook(RespiteI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Scavenger IV-V)`)
									.setValue(`Item_EnchantedBook(ScavengerIV-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Sharpness VI-VII)`)
									.setValue(`Item_EnchantedBook(SharpnessVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Smarty Pants I-V)`)
									.setValue(`Item_EnchantedBook(SmartyPantsI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Smite VI-VII)`)
									.setValue(`Item_EnchantedBook(SmiteVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Smoldering I-V)`)
									.setValue(`Item_EnchantedBook(SmolderingI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Snipe IV)`)
									.setValue(`Item_EnchantedBook(SnipeIV)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Spiked Hook VI)`)
									.setValue(`Item_EnchantedBook(SpikedHookVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Strong Mana I-X)`)
									.setValue(`Item_EnchantedBook(StrongManaI-X)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Sugar Rush I-III)`)
									.setValue(`Item_EnchantedBook(SugarRushI-III)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Syphon IV-V)`)
									.setValue(`Item_EnchantedBook(SyphonIV-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Tabasco I-III)`)
									.setValue(`Item_EnchantedBook(TabascoI-III)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Thunderbolt VI)`)
									.setValue(`Item_EnchantedBook(ThunderboltVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Thunderlord VI-VII)`)
									.setValue(`Item_EnchantedBook(ThunderlordVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Titan Killer VI-VII)`)
									.setValue(`Item_EnchantedBook(TitanKillerVI-VII)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Triple-Strike V)`)
									.setValue(`Item_EnchantedBook(Triple-StrikeV)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (True Protection I)`)
									.setValue(`Item_EnchantedBook(TrueProtectionI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Turbo-Cacti I-V)`)
									.setValue(`Item_EnchantedBook(Turbo-CactiI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Turbo-Cane I-V)`)
									.setValue(`Item_EnchantedBook(Turbo-CaneI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Turbo-Carrot I-V)`)
									.setValue(`Item_EnchantedBook(Turbo-CarrotI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Turbo-Cocoa I-V)`)
									.setValue(`Item_EnchantedBook(Turbo-CocoaI-V)`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Enchantments IV (T-V)`)
							.setValue(`Mining_EnchantmentsIV(T-V)`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Turbo-Melon I-V)`)
									.setValue(`Item_EnchantedBook(Turbo-MelonI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Turbo-Mushrooms I-V)`)
									.setValue(`Item_EnchantedBook(Turbo-MushroomsI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Turbo-Potato I-V)`)
									.setValue(`Item_EnchantedBook(Turbo-PotatoI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Turbo-Pumpkin I-V)`)
									.setValue(`Item_EnchantedBook(Turbo-PumpkinI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Turbo-Warts I-V)`)
									.setValue(`Item_EnchantedBook(Turbo-WartsI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Turbo-Wheat I-V)`)
									.setValue(`Item_EnchantedBook(Turbo-WheatI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Vampirism VI)`)
									.setValue(`Item_EnchantedBook(VampirismVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Venomous VI)`)
									.setValue(`Item_EnchantedBook(VenomousVI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Vicious III-V)`)
									.setValue(`Item_EnchantedBook(ViciousIII-V)`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Ultimate Enchantments`)
							.setValue(`Mining_UltimateEnchantments`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Bank I-V)`)
									.setValue(`Item_EnchantedBook(BankI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Chimera I-V)`)
									.setValue(`Item_EnchantedBook(ChimeraI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Combo I-V)`)
									.setValue(`Item_EnchantedBook(ComboI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Duplex I-V)`)
									.setValue(`Item_EnchantedBook(DuplexI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Fatal Tempo I-V)`)
									.setValue(`Item_EnchantedBook(FatalTempoI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Flash I-V)`)
									.setValue(`Item_EnchantedBook(FlashI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Habanero Tactics IV-V)`)
									.setValue(`Item_EnchantedBook(HabaneroTacticsIV-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Inferno I-V)`)
									.setValue(`Item_EnchantedBook(InfernoI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Ultimate Jerry I-V)`)
									.setValue(`Item_EnchantedBook(UltimateJerryI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Last Stand I-V)`)
									.setValue(`Item_EnchantedBook(LastStandI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Legion I-V)`)
									.setValue(`Item_EnchantedBook(LegionI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (No Pain No Gain I-V)`)
									.setValue(`Item_EnchantedBook(NoPainNoGainI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (One For All I)`)
									.setValue(`Item_EnchantedBook(OneForAllI)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Rend I-V)`)
									.setValue(`Item_EnchantedBook(RendI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Soul Eater I-V)`)
									.setValue(`Item_EnchantedBook(SoulEaterI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Swarm I-V)`)
									.setValue(`Item_EnchantedBook(SwarmI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Wisdom I-V)`)
									.setValue(`Item_EnchantedBook(WisdomI-V)`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Enchanted Book (Ultimate Wise I-V)`)
									.setValue(`Item_EnchantedBook(UltimateWiseI-V)`),
							),
						new MultiSelectMenuConfirmationOption()
							.setLabel(`Essence`)
							.setValue(`Mining_Essence`)
							.addChildOptions(
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Wither Essence`)
									.setValue(`Item_WitherEssence`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Spider Essence`)
									.setValue(`Item_SpiderEssence`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Undead Essence`)
									.setValue(`Item_UndeadEssence`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Dragon Essence`)
									.setValue(`Item_DragonEssence`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Gold Essence`)
									.setValue(`Item_GoldEssence`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Diamond Essence`)
									.setValue(`Item_DiamondEssence`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Ice Essence`)
									.setValue(`Item_IceEssence`),
								new MultiSelectMenuConfirmationOption()
									.setLabel(`Crimson Essence`)
									.setValue(`Item_CrimsonEssence`),
							),
					)
			);

		// console.log(multiSelectMenuConfirmation.baseOptions);

		await multiSelectMenuConfirmation.runConfirmationMenu();
	}
};