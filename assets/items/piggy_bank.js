
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: [],
		group: `Power-up`,
		name: `Piggy Bank`,
		keyName: `piggyBank`,
		description: `Saves all your coins from death. Only when in player inventory.\nFragile!\n\nTriggers when losing 20k+ coins.`,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Piggy_Bank:953469473480921098>`,
			url: `https://cdn.discordapp.com/emojis/953469473480921098.png`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 16_000
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
			materials: [[`planks`, `planks`, `<:Oak_Planks:885390616194875412>`, 8], [`enchanted pork`, `enchantedPork`, `<:Enchanted_Pork:953470014986547281>`, 40]],
			outputs: 1
		},
		includeInParsing: true
	}
);