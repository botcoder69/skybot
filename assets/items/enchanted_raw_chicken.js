
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Enchanted Raw Chicken`,
		keyName: `enchantedRawChicken`,
		description: ``,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Enchanted_Raw_Chicken:953470212378861568>`,
			url: `https://cdn.discordapp.com/emojis/953470212378861568.png`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 640
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
			materials: [[`raw chicken`, `rawChicken`, `<:Raw_Chicken:953470062302474250>`, 160]],
			outputs: 1
		},
		includeInParsing: true
	}
);
