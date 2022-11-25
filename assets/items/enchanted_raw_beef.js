
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Enchanted Raw Beef`,
		keyName: `enchantedRawBeef`,
		description: ``,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Enchanted_Raw_Beef:953470260630134795>`,
			url: `https://cdn.discordapp.com/emojis/953470260630134795.png`,
		},
		NPC: {
			sell: {
				sellable: false,
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
			materials: [[`raw beef`, `rawBeef`, `<:Raw_Beef:953470247292244038>`, 160]],
			outputs: 1
		},
		includeInParsing: true
	}
);