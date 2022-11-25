
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Enchanted Oak Wood`,
		keyName: "enchantedOakWood",
		description: "",
		rarity: "Uncommon",
		emoji: {
			name: `<:Enchanted_Oak_Wood:900308904913817600>`,
			url: "https://cdn.discordapp.com/emojis/900308904913817600.png",
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
			materials: [[`oak wood`, `oakWood`, `<:Oak_Log:885390554005897237>`, 160]],
			outputs: 1
		},
		includeInParsing: true
	}
);