
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Unstable Dragon Fragment`,
		keyName: `unstableDragonFragment`,
		description: `A rare fragment found from defeating the Unstable Dragon! Used to craft Unstable Dragon Armor.`,
		rarity: `Epic`,
		emoji: {
			name: `<:Unstable_Dragon_Fragment:978509335518928896>`,
			url: `https://cdn.discordapp.com/emojis/978509335518928896.png`,
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
				name: `Combat`,
			},
			subcategory: { 
				name: `Dragon Fragments` 
			},
			precedence: {
				categoryPrecedence: 5,
				subcategoryPrecedence: 5,
				itemPrecedence: 3
			}
		},
		includeInParsing: true
	}
);
