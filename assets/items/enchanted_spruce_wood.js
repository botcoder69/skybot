
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		name: `Enchanted Spruce Wood`,
		keyName: `enchantedSpruceWood`,
		description: `A rare piece of Spruce Wood. Due to it's resillent endurance against some natural factors, it's usually used in making sturdier wooden huts and houses.`,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Enchanted_Spruce_Wood:900308905261948958>`,
			url: `https://cdn.discordapp.com/emojis/900308905261948958.png`,
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
				name: `Spruce`,
				emoji: `<:Spruce_Log:885390554404380693>`
			},
			precedence: {
				categoryPrecedence: 4,
				subcategoryPrecedence: 2,
				itemPrecedence: 2
			}
		},
		crafting: {
			type: `oneItem`,
			materials: [[`spruce wood`, `spruceWood`, `<:Spruce_Log:885390554404380693>`, 160]],
			outputs: 1
		},
		includeInParsing: true,
		levelReq: {
			emoji: `<:Foraging:885390554291122206>`,
			id: `chopLevel`,
			level: 12,
			skill: `Foraging`
		}
	}
);