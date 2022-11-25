
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Spirit Butterfly`,
		keyName: "spiritButterfly",
		description: "A butterfly found from mining diamonds. They say this butterfly can be combined to make something very powerful...",
		rarity: "Uncommon",
		emoji: {
			name: `<:Spirit_Butterfly:942633700485632071>`,
			url: "https://cdn.discordapp.com/emojis/942633700485632071.png",
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
		},
		includeInParsing: true,
	}
);