
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: [],
		group: `Item`,    
		name: `Wooden Box`,
		keyName: `woodenBox`,
		description: `The most common out of all boxes. A box that will contain decent rewards. Right now it does absolutely nothing, except being a collectable. Artstyle and idea inspired by Dank Memer.`,
		rarity: `Common`,
		emoji: {
			name: `<a:Wooden_Box:956735312162349096>`,
			url: `https://cdn.discordapp.com/emojis/956735312162349096.gif`,
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
			included: false
		},
		includeInParsing: false
	}
);