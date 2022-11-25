
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Raw Beef`,
		keyName: `rawBeef`,
		description: `Raw beef found from killing cows in the barn! When used properly, this may *trigger* a certain someone...`,
		rarity: `Common`,
		emoji: {
			name: `<:Raw_Beef:953470247292244038>`,
			url: `https://cdn.discordapp.com/emojis/953470247292244038.png`,
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