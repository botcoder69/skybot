
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Enchanted Birch Wood`,
		keyName: `enchantedBirchWood`,
		description: ``,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Enchanted_Birch_Wood:900308905786224700>`,
			url: `https://cdn.discordapp.com/emojis/900308905786224700.png`,
		},
		NPC: {
			sell: {
				sellable: false,
				price: 0
			},
			buy: {
				buyable: false,
				price: 0
			}
		},
		sellall: {
			included: false,
			filterGroup: ""
		},
		crafting: {
			type: `oneItem`,
			materials: [[`birch wood`, `birchWood`, `<:Birch_Log:885390554400165938>`, 160]],
			outputs: 1
		},
		includeInParsing: true
	}
);