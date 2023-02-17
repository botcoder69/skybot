
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Strong Dragon Fragment`,
		keyName: `strongDragonFragment`,
		description: `A rare fragment found from defeating the Strong Dragon! Used to craft Strong Dragon Armor.`,
		rarity: `Epic`,
		emoji: {
			name: `<:Strong_Dragon_Fragment:978509331794395137>`,
			url: `https://cdn.discordapp.com/emojis/978509331794395137.png`,
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
				itemPrecedence: 4
			}
		},
		includeInParsing: true
	}
);