
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: ["planks"],
		group: "Item",
		name: `Planks`,
		keyName: "planks",
		description: "A wooden plank made out of wood. Used for crafting wooden tools or sticks.",
		rarity: "Common",
		emoji: {
			name: `<:Oak_Planks:849233931961499698>`,
			url: "https://cdn.discordapp.com/emojis/849233931961499698.png?v=1",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 1
			},
			buy: {
				buyable: false,
				price: 0
			}
		},
		sellall: {
			included: true,
			filterGroup: "woodworking"
		},
		includeInParsing: true
	}
);