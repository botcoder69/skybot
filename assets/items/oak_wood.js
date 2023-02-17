
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: ["oak wood", "oakwood"],
		group: "Item",
		name: `Oak Wood`,
		keyName: "oakWood",
		description: "A piece of Oak wood, found from chopping fully grown Oak Trees in the Floating Islands. Can be used to make planks.",
		rarity: "Common",
		emoji: {
			name: `<:Oak_Log:885390554005897237>`,
			url: "https://cdn.discordapp.com/emojis/885390554005897237.png",
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
				name: `Oak`,
				emoji: `<:Oak_Log:885390554005897237>`
			},
			precedence: {
				categoryPrecedence: 4,
				subcategoryPrecedence: 1,
				itemPrecedence: 1
			}
		},
		includeInParsing: true
	}
);