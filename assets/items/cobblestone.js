
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Cobblestone`,
		keyName: `cobblestone`,
		description: `A piece of stone found from mining stone in the Deepmines. Used for crafting stone tools`,
		rarity: `Common`,
		emoji: {
			name: `<:Cobblestone:816984558317600799>`,
			url: `https://cdn.discordapp.com/emojis/816984558317600799.png?v=1`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 1
			},
			buy: {
				buyable: true,
				price: 3
			}
		},
		sellall: {
			included: true,
			filterGroup: "minerals"
		},
		includeInParsing: true
	}
);