
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: [],
		group: `Item`,    
		name: `Protector Dragon Fragment`,
		keyName: `protectorDragonFragment`,
		description: `A rare fragment found from defeating the Protector Dragon! Used to craft Protector Dragon Armor.`,
		rarity: `Epic`,
		emoji: {
			name: `<:Protector_Dragon_Fragment:978509330146033674>`,
			url: `https://cdn.discordapp.com/emojis/978509330146033674.png`,
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
		},
		bazaar: {
			category: {
				name: `Combat`,
			},
			subcategory: { 
				name: `Dragon Fragments` 
			},
			precedence: {
				categoryPrecedence: 5,
				subcategoryPrecedence: 5,
				itemPrecedence: 1
			}
		},
		includeInParsing: true
	}
);