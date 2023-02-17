
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: ["spruce wood" ,"sprucewood"],
		group: "Item",
		name: `Spruce Wood`,
		keyName: "spruceWood",
		description: "A piece of Spruce Wood, found from chopping fully grown Spruce Trees in the Floating Islands. Can be used to make planks.",
		rarity: "Common",
		emoji: {
			name: `<:Spruce_Log:885390554404380693>`,
			url: "https://cdn.discordapp.com/emojis/885390554404380693.png",
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
				name: `Spruce`,
				emoji: `<:Spruce_Log:885390554404380693>`
			},
			precedence: {
				categoryPrecedence: 4,
				subcategoryPrecedence: 2,
				itemPrecedence: 1
			}
		},
		includeInParsing: true,
	}
);