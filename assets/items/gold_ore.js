
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: ["gold ore", "goldore"],
		group: "Item",
		name: `Gold Ore`,
		keyName: "goldOre",
		description: "A piece of stone with pure gold inside found from breaking gold ore in the Deepmines. Used for smelting into gold.",
		rarity: "Common",
		emoji: {
			name: `<:Gold_Ore:816983943794524221>`,
			url: "https://cdn.discordapp.com/emojis/816983943794524221.png?v=1",
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
			filterGroup: "minerals"
		},
		smeltable: {
			output: require('./gold'),
			amount: 1
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