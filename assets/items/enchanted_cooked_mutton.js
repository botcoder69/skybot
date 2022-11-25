
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Enchanted Cooked Mutton`,
		keyName: `enchantedCookedMutton`,
		description: ``,
		rarity: `Rare`,
		emoji: {
			name: `<:Enchanted_Cooked_Mutton:953484757247860816>`,
			url: `https://cdn.discordapp.com/emojis/953484757247860816.png`,
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
			materials: [[`enchanted cooked mutton`, `enchantedCookedMutton`, `<:Enchanted_Mutton:953484750805422111>`, 160]],
			outputs: 1
		},
		includeInParsing: true
	}
);