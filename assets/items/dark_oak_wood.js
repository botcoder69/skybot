
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		name: `Dark Oak Wood`,
		keyName: `darkOakWood`,
		description: `A piece of Dark Oak Wood, found from chopping fully grown Dark Oak Trees in the Floating Islands. Can be used to make planks.`,
		rarity: `Common`,
		emoji: {
			name: `<:Dark_Oak_Log:885390554362433587>`,
			url: `https://cdn.discordapp.com/emojis/885390554362433587.png`,
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
			filterGroup: `woodworking`
		},
		bazaar: {
			category: {
				name: `Woods and Fishes`,
				emoji: `<:Fishing:885390554450501632>`
			},
			subcategory: { 
				name: `Dark Oak`,
				emoji: `<:Birch_Log:885390554400165938>`
			},
			precedence: {
				categoryPrecedence: 4,
				subcategoryPrecedence: 4,
				itemPrecedence: 1
			}
		},
		includeInParsing: true
	}
);