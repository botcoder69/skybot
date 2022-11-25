
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Superior Dragon Fragment`,
		keyName: `superiorDragonFragment`,
		description: `A rare fragment found from defeating the Superior Dragon! Used to craft Superior Dragon Armor.`,
		rarity: `Epic`,
		emoji: {
			name: `<:Superior_Dragon_Fragment:978509333673410560>`,
			url: `https://cdn.discordapp.com/emojis/978509333673410560.png`,
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