
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		name: `Enchanted Dark Oak Wood`,
		keyName: `enchantedDarkOakWood`,
		description: `A rare piece of Dark Oak Wood. Due to it's resillent endurance against some natural factors, it's usually used in making sturdier wooden huts and houses.`,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Enchanted_Dark_Oak_Wood:900308904360157245>`,
			url: `https://cdn.discordapp.com/emojis/900308904360157245.png`,
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
			filterGroup: ``
		},
		crafting: {
			type: `oneItem`,
			materials: [[`dark oak wood`, `darkOakWood`, `<:Dark_Oak_Log:885390554362433587>`, 160]],
			outputs: 1
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
				itemPrecedence: 2
			}
		},
		includeInParsing: true,
		levelReq: {
			emoji: `<:Foraging:885390554291122206>`,
			id: `chopLevel`,
			level: 8,
			skill: `Foraging`
		}
	}
);