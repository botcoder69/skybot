
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: [],
		group: `Item`,    
		name: `Iron Box`,
		keyName: `ironBox`,
		description: `A box that will contain good rewards. Right now it does absolutely nothing, except being a collectable. Artstyle and idea inspired by Dank Memer.`,
		rarity: `Uncommon`,
		emoji: {
			name: `<a:Iron_Box:956735320852922408>`,
			url: `https://cdn.discordapp.com/emojis/956735320852922408.gif`,
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
		includeInParsing: false
	}
);