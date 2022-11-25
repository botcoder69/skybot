
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Enchanted Mutton`,
		keyName: `enchantedMutton`,
		description: ``,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Enchanted_Mutton:953484750805422111>`,
			url: `https://cdn.discordapp.com/emojis/953484750805422111.png`,
		},
		NPC: {
			sell: {
				sellable: false,
				price: 800
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
			materials: [[`raw mutton`, `rawMutton`, `<:Raw_Mutton:953484740571299970>`, 160]],
			outputs: 1
		},
		includeInParsing: true
	}
);