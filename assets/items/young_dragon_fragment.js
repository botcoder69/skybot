
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Young Dragon Fragment`,
		keyName: `youngDragonFragment`,
		description: `A rare fragment found from defeating the Young Dragon! Used to craft Young Dragon Armor.`,
		rarity: `Epic`,
		emoji: {
			name: `<:Young_Dragon_Fragment:978509338844995634>`,
			url: `https://cdn.discordapp.com/emojis/978509338844995634.png`,
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
			filterGroup: ""
		},
		includeInParsing: true
	}
);