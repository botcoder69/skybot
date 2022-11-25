/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Paginator } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`level`)
		.setDescription(`Check your level on certain Skybot Skills.`),
	group: `Islands`,
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
		const { update, mineXp, mineLevel, fishXp, fishLevel, chopXp, chopLevel } = maidObj;

		const pagesEmbed = [];

		const miningLevelEmbed = new EmbedBuilder()
			.setColor(`#2f3136`)
			.setTitle(`${interaction.user.username}'s Mining Skill <:Mining:885390554198868020>`)
			.setDescription(`Your Level: **${mineLevel}**.\n<:ExperienceOrb:900572424381272064> ${mineLevel === 50 ? `**You have reached the maximum level for this collection!**` : `**${interaction.client.levelReq.get(mineLevel) - mineXp} xp** required before reaching the next level.`}\n\n${mineLevel >= 4 ? `<:check:885408207097462786>` : `<:cross:885408206959046678>`} **Level 4:**\n<:Mine:816908527670001686> Iron Mine\n<:Iron_Ore:816983943584022539> Iron Ore\n<:Iron_Ingot:885715125305221120> Iron\n<:Iron_Pickaxe:817216520828092436> Iron Pickaxe\n<:Iron_Axe:817216753062510633> Iron Axe\n<:Steel_Rod:816598224349298689> Steel Rod\n<:Inventory_Iron_Minion:887166924117655553> Iron Minion\n\n${mineLevel >= 6 ? `<:check:885408207097462786>` : `<:cross:885408206959046678>`} **Level 6:**\n<:Mine:816908527670001686> Gold Mine\n<:Gold_Ore:816983943794524221> Gold Ore\n<:Gold_Ingot:885715142522855494> Gold\n<:Gold_Pickaxe:817216581859409971> Gold Pickaxe\n<:Gold_Axe:817216806845677568> Gold Axe\n<:Inventory_Gold_Minion:887166924138635294> Gold Minion\n\n${mineLevel >= 8 ? `<:check:885408207097462786>` : `<:cross:885408206959046678>`} **Level 8:** \n<:Mine:816908527670001686> Lapis Reserve\n<:Lapis:816988928372375603> Lapis\n<:Inventory_Lapis_Minion:887166926449676328> Lapis Minion\n\n${interaction.client.updateMap.get(maidObj.update) >= 8 ? `${mineLevel >= 10 ? `<:check:885408207097462786>` : `<:cross:885408206959046678>`} **Level 10:**\n<:Mine:816908527670001686> Redstone Mines\n<:Redstone_Dust:907504986840252417> Redstone Dust\n<:Inventory_Redstone_Minion:907506896955645992> Redstone Minion` : ``}\n\n${mineLevel >= 15 ? `<:check:885408207097462786>` : `<:cross:885408206959046678>`} **Level 15:**\n<:Mine:816908527670001686> Diamond Sanctuary\n<:Diamond:902764556697341952> Diamond\n<:Enchanted_Diamond:902764556865142835> Enchanted Diamond\n<:Diamond_Pickaxe:817216616084930602> Diamond Pickaxe\n<:Diamond_Axe:817216864626802771> Diamond Axe\n<:Inventory_Diamond_Minion:887166924147007528> Diamond Minion`);

		pagesEmbed.push(miningLevelEmbed);

		if (interaction.client.updateMap.get(update) > interaction.client.updateMap.get('0.0.1')) {
			const fishingLevelEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle(`${interaction.user.username}'s Fishing Skill <:Fishing:885390554450501632>`)
				.setDescription(`Your Level: **${fishLevel}**.\n<:ExperienceOrb:900572424381272064> ${fishLevel === 50 ? `**You have reached the maximum level for this collection!**` : `**${interaction.client.levelReq.get(fishLevel) - fishXp} xp** required before reaching the next level.`}\n\nNone`);

			pagesEmbed.push(fishingLevelEmbed);

			const foragingLevelEmbed = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setTitle(`${interaction.user.username}'s Foraging Skill <:Foraging:885390554291122206>`)
				.setDescription(`Your Level: **${chopLevel}**.\n<:ExperienceOrb:900572424381272064> ${chopLevel === 50 ? `**You have reached the maximum level for this collection!**` : `**${interaction.client.levelReq.get(chopLevel) - chopXp} xp** required before reaching the next level.`}\n\n${chopLevel >= 8 ? "<:check:885408207097462786>" : "<:cross:885408206959046678>"} **Level 8:**\n<:Tree:945601922537226281> Roofed Forest\n<:Dark_Oak_Log:885390554362433587> Dark Oak Wood\n<:Inventory_Dark_Oak_Minion:887166923689828372> Dark Oak Minion\n\n${chopLevel >= 12 ? "<:check:885408207097462786>" : "<:cross:885408206959046678>"} **Level 12:**\n<:Tree:945601922537226281> Snowy Taiga\n<:Spruce_Log:885390554404380693> Spruce Wood\n<:Inventory_Spruce_Minion:887166927049486416> Spruce Minion\n\n${chopLevel >= 16 ? "<:check:885408207097462786>" : "<:cross:885408206959046678>"} **Level 16:**\n<:Tree:945601922537226281> Savanna Woodlands\n<:Acacia_Log:885390554471485480> Acacia Wood\n<:Inventory_Acacia_Minion:887166923245252669> Acacia Minion\n\n${chopLevel >= 20 ? "<:check:885408207097462786>" : "<:cross:885408206959046678>"} **Level 20:**\n<:Tree:945601922537226281> Bamboo Jungle\n<:Jungle_Log:885390554240802817> Jungle Wood\n<:Inventory_Jungle_Minion:887166924205735976> Jungle Minion`);
			
			pagesEmbed.push(foragingLevelEmbed);
		}

		await Paginator(interaction, pagesEmbed);
	}
};