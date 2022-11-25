
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Raw Chicken`,
		keyName: `rawChicken`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Raw_Chicken:953470062302474250>`,
			url: `https://cdn.discordapp.com/emojis/953470062302474250.png`,
		},
		NPC: {
			sell: {
				sellable: false,
				price: 4
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