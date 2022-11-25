
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Enchanted Pork`,
		keyName: `enchantedPork`,
		description: `This can be found from crafting tons of raw porkchop into this single enchanted pork. This tastes better than raw porkchop, but be sure to cook it before eating it!`,
		rarity: `Common`,
		emoji: {
			name: `<:Enchanted_Pork:953470014986547281>`,
			url: `https://cdn.discordapp.com/emojis/953470014986547281.png`,
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
			materials: [[`raw porkchop`, `rawPorkchop`, `<:Raw_Porkchop:953469999509545000>`, 160]],
			outputs: 1
		},
		includeInParsing: true
	}
);