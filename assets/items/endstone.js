
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: [],
		group: `Item`,
		name: `Endstone`,
		keyName: `endstone`,
		description: `A block of endstone found from mining in The End.`,
		rarity: `Common`,
		emoji: {
			name: `<:End_Stone:976283013958754394>`,
			url: `https://cdn.discordapp.com/emojis/976283013958754394.png`,
		},
		NPC: {
			sell: {
				sellable: false,
				price: 2
			},
			buy: {
				buyable: false,
				price: 10
			}
		},
		sellall: {
			included: false,
			filterGroup: ``
		},
		includeInParsing: true
	}
);