
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		name: `Birch Wood`,
		keyName: `birchWood`,
		description: `A piece of Birch Wood, found from chopping fully grown Birch Trees in the Floating Islands. Can be used to make planks.`,
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
			filterGroup: `woodworking`
		},
		bazaar: {
			category: {
				name: `Woods and Fishes`,
				emoji: `<:Fishing:885390554450501632>`
			},
			subcategory: { 
				name: `Birch`,
				emoji: `<:Birch_Log:885390554400165938>`
			},
			precedence: {
				categoryPrecedence: 4,
				subcategoryPrecedence: 3,
				itemPrecedence: 1
			}
		},
		includeInParsing: true
	}
);