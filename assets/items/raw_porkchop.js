
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Raw Porkchop`,
		keyName: `rawPorkchop`,
		description: `Raw porkchop found from killing pigs in the barn. Better cook it before eating it!`,
		rarity: `Common`,
		emoji: {
			name: `<:Raw_Porkchop:953469999509545000>`,
			url: `https://cdn.discordapp.com/emojis/953469999509545000.png`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 5
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
		includeInParsing: true
	}
);