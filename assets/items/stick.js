
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Stick`,
		keyName: `stick`,
		description: "A stick made out of wood planks. Used for crafting tools.",
		rarity: "Common",
		emoji: {
			name: `<:Stick:817260386180792320>`,
			url: "https://cdn.discordapp.com/emojis/817260386180792320.png?v=1",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 0
			},
			buy: {
				buyable: false,
				price: 0
			}
		},
		sellall: {
			included: false,
			filterGroup: "woodworking"
		},
		crafting: {
			type: `oneItem`,
			materials: [[`planks`, `planks`, `<:Oak_Planks:817261928212463616>`, 2]],
			outputs: 4
		},
		includeInParsing: true
	}
);