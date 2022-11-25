
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Raw Mutton`,
		keyName: `rawMutton`,
		description: `Raw mutton found from killing sheep in the barn! When used properly, this may *trigger* a certain someone...`,
		rarity: `Common`,
		emoji: {
			name: `<:Raw_Mutton:953484740571299970>`,
			url: `https://cdn.discordapp.com/emojis/953484740571299970.png`,
		},
		NPC: {
			sell: {
				sellable: false,
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