
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		name: `Acacia Wood`,
		keyName: `acaciaWood`,
		description: `A piece of Acacia Wood, found from chopping fully grown Acacia Trees in the Floating Islands. Can be used to make planks.`,
		rarity: `Common`,
		emoji: {
			name: `<:Acacia_Log:885390554471485480>`,
			url: `https://cdn.discordapp.com/emojis/885390554471485480.png`,
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
				name: `Acacia`,
				emoji: `<:Acacia_Log:885390554471485480>` 
			},
			precedence: {
				categoryPrecedence: 4,
				subcategoryPrecedence: 5,
				itemPrecedence: 1
			}
		},
		includeInParsing: true
	}
);