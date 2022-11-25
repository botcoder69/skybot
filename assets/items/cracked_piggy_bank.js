
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Cracked Piggy Bank`,
		keyName: `crackedPiggyBank`,
		description: `Saves 75% of your coins from death. Only when in player inventory.\nVery fragile!\n\nTriggers when losing 20k+ coins.`,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Cracked_Piggy_Bank:953469273546846278>`,
			url: `https://cdn.discordapp.com/emojis/953469273546846278.png`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 16_000
			},
			buy: {
				buyable: false,
				price: 0
			}
		},
		sellall: {
			included: false,
			filterGroup: ``
		},
		crafting: {
			type: `oneItem`,
			outputs: 1,
			repair: {
				materials: [[`cracked piggy bank`, `crackedPiggyBank`, `<:Cracked_Piggy_Bank:953469273546846278>`, 1], [`enchanted pork`, `enchantedPork`, `<:Enchanted_Pork:953470014986547281>`, 8]],
				outputs: [`piggy bank`, `piggyBank`, `<:Piggy_Bank:953469473480921098>`, 1]
			}
		},
		includeInParsing: true
	}
);