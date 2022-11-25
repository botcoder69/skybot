
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Enchanted Cobblestone`,
		keyName: `enchantedCobblestone`,
		description: ``,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Enchanted_Cobblestone:900308905635242026>`,
			url: `https://cdn.discordapp.com/emojis/900308905635242026.png`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 160
			},
			buy: {
				buyable: false,
				price: 0
			}
		},
		sellall: {
			included: true,
			filterGroup: "minerals"
		},
		crafting: {
			type: `oneItem`,
			materials: [[`cobblestone`, `cobblestone`, `<:Cobblestone:816984558317600799>`, 160]],
			outputs: 1
		},
		includeInParsing: true
	}
);