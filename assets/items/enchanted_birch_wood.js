
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		name: `Enchanted Birch Wood`,
		keyName: `enchantedBirchWood`,
		description: `A rare piece of Birch Wood. Due to it's resillent endurance against some natural factors, it's usually used in making sturdier wooden huts and houses.`,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Enchanted_Birch_Wood:900308905786224700>`,
			url: `https://cdn.discordapp.com/emojis/900308905786224700.png`,
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
				name: `Birch`,
				emoji: `<:Birch_Log:885390554400165938>`
			},
			precedence: {
				categoryPrecedence: 4,
				subcategoryPrecedence: 3,
				itemPrecedence: 2
			}
		},
		crafting: {
			type: `oneItem`,
			materials: [[`birch wood`, `birchWood`, `<:Birch_Log:885390554400165938>`, 160]],
			outputs: 1
		},
		includeInParsing: true
	}
);