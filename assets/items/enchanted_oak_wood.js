
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		name: `Enchanted Oak Wood`,
		keyName: `enchantedOakWood`,
		description: `A rare piece of Oak Wood. Due to it's resillent endurance against some natural factors, it's usually used in making sturdier wooden huts and houses.`,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Enchanted_Oak_Wood:900308904913817600>`,
			url: `https://cdn.discordapp.com/emojis/900308904913817600.png`,
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
				itemPrecedence: 2
			}
		},
		crafting: {
			type: `oneItem`,
			materials: [[`oak wood`, `oakWood`, `<:Oak_Log:885390554005897237>`, 160]],
			outputs: 1
		},
		includeInParsing: true
	}
);