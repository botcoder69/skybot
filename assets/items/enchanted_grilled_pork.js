
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: [],
		group: `Item`,    
		name: `Enchanted Grilled Pork`,
		keyName: `enchantedGrilledPork`,
		description: `This can be found from crafting tons of enchanted porkchop into this single enchanted grilled pork. This tastes WAY better than enchanted pork, and it's already cooked! You can dig in now!`,
		rarity: `Rare`,
		emoji: {
			name: `<:Enchanted_Grilled_Pork:953470025879146526>`,
			url: `https://cdn.discordapp.com/emojis/953470025879146526.png`,
		},
		NPC: {
			sell: {
				sellable: false,
				price: 128_000
			},
			buy: {
				buyable: false,
				price: 0
			}
		},
		sellall: {
			included: true,
			filterGroup: `meat`
		},
		crafting: {
			type: `oneItem`,
			materials: [[`enchanted pork`, `enchantedPork`, `<:Enchanted_Pork:953470014986547281>`, 160]],
			outputs: 1
		},
		includeInParsing: true
	}
);