
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: [],
		group: `Item`,    
		name: `Obsidian`,
		keyName: `obsidian`,
		description: `A block of obsidian found from spending hours mining one obsidian block in The End.`,
		rarity: `Common`,
		emoji: {
			name: `<:Obsidian:976283024566132778>`,
			url: `https://cdn.discordapp.com/emojis/976283024566132778.png`,
		},
		NPC: {
			sell: {
				sellable: false,
				price: 7
			},
			buy: {
				buyable: false,
				price: 50
			}
		},
		sellall: {
			included: false
		},
		includeInParsing: true
	}
);