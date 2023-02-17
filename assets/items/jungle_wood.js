
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: ["jungle wood", "junglewood"],
		group: "Item",
		name: `Jungle Wood`,
		keyName: "jungleWood",
		description: "A piece of Jungle Wood, found from chopping fully grown Jungle Trees in the Floating Islands. Can be used to make planks.",
		rarity: "Common",
		emoji: {
			name: `<:Jungle_Log:885390554240802817>`,
			url: "https://cdn.discordapp.com/emojis/885390554240802817.png",
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
				name: `Jungle`,
				emoji: `<:Jungle_Log:885390554240802817>`
			},
			precedence: {
				categoryPrecedence: 4,
				subcategoryPrecedence: 6,
				itemPrecedence: 1
			}
		},
		includeInParsing: true
	}
);