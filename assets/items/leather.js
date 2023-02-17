
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: [],
		group: `Item`,    
		name: `Leather`,
		keyName: `leather`,
		description: `A drop from killing cows! When used properly, this may *trigger* a certain someone...`,
		rarity: `Common`,
		emoji: {
			name: `<:Leather:966938933156016158>`,
			url: `https://cdn.discordapp.com/emojis/966938933156016158.png`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 3
			},
			buy: {
				buyable: false,
				price: 0
			}
		},
		sellall: {
			included: false
		},
		includeInParsing: true
	}
);