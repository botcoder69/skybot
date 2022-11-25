
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Birch Wood`,
		keyName: `birchWood`,
		description: `A piece of birch wood found from the Floating Islands. Used to make planks.`,
		rarity: `Common`,
		emoji: {
			name: `<:Birch_Log:885390554400165938>`,
			url: `https://cdn.discordapp.com/emojis/885390554400165938.png`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 2
			},
			buy: {
				buyable: true,
				price: 5
			}
		},
		sellall: {
			included: true,
			filterGroup: "woodworking"
		},
		includeInParsing: true
	}
);