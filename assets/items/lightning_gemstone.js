
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: [],
		group: `Item`,
		name: `Lightning Gemstone`,
		keyName: `lightningGemstone`,
		description: `A gemstone full of condensed lightning energy. Due to the overwhelming energy inside it's shell, it usually repels lightning. These gemstones were once used to protect villages from lightning, but are now scattered across the island.`,
		rarity: `Epic`,
		emoji: {
			name: `<:Lightning_Gemstone:1021239352535294002>`,
			url: `https://cdn.discordapp.com/emojis/1021239352535294002.png`,
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
			filterGroup: ``
		},
		includeInParsing: true
	}
);