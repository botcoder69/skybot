
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Wise Dragon Fragment`,
		keyName: `wiseDragonFragment`,
		description: `A rare fragment found from defeating the Wise Dragon! Used to craft Wise Dragon Armor.`,
		rarity: `Epic`,
		emoji: {
			name: `<:Wise_Dragon_Fragment:978509337288904794>`,
			url: `https://cdn.discordapp.com/emojis/978509337288904794.png`,
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