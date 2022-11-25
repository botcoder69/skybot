
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: ["gold", "gold ingot", "goldingot"],
		group: "Item",
		name: `Gold`,
		keyName: "gold",
		description: "A piece of pure gold found from smelting gold ore found in the Deepmines. Used for crafting gold tools.",
		rarity: "Common",
		emoji: {
			name: `<:Gold_Ingot:885715142522855494>`,
			url: "https://cdn.discordapp.com/emojis/885715142522855494.png?v=1",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 4
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
			level: 6,
			skill: `Mining`
		}
	}
);