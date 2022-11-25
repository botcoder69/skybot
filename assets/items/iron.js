
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: ["iron", "iron ingot","ironingot"],
		group: "Item",
		name: `Iron`,
		keyName: "iron",
		description: "A piece of pure iron found from smelting iron ore found in the Deepmines. Used for crafting iron tools.",
		rarity: "Common",
		emoji: {
			name: `<:Iron_Ingot:885715125305221120>`,
			url: "https://cdn.discordapp.com/emojis/885715125305221120.png?v=1",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 3
			},
			buy: {
				buyable: true,
				price: 5
			}
		},
		sellall: {
			included: true,
			filterGroup: "minerals"
		},
		includeInParsing: true,
		levelReq: {
			emoji: `<:Mining:885390554198868020>`,
			id: `mineLevel`,
			level: 4,
			skill: `Mining`
		}
	}
);