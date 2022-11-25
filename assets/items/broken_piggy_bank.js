
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Power-up`,
		name: `Broken Piggy Bank`,
		keyName: `brokenPiggyBank`,
		description: `It broke!`,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Broken_Piggy_Bank:953468878602772561>`,
			url: `https://cdn.discordapp.com/emojis/953468878602772561.png`,
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
				materials: [[`broken piggy bank`, `brokenPiggyBank`, `<:Broken_Piggy_Bank:953468878602772561>`, 1], [`enchanted pork`, `enchantedPork`, `<:Enchanted_Pork:953470014986547281>`, 8]],
				outputs: [`piggy bank`, `piggyBank`, `<:Piggy_Bank:953469473480921098>`, 1]
			}
		},
		includeInParsing: true
	}
);