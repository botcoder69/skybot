
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: [],
		group: `Item`,    
		name: `Old Dragon Fragment`,
		keyName: `oldDragonFragment`,
		description: `A rare fragment found from defeating the Old Dragon! Used to craft Old Dragon Armor.`,
		rarity: `Epic`,
		emoji: {
			name: `<:Old_Dragon_Fragment:978509327830773820>`,
			url: `https://cdn.discordapp.com/emojis/978509327830773820.png`,
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