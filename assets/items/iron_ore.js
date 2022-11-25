
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: ["iron ore", "ironore"],
		group: "Item",
		name: `Iron Ore`,
		keyName: "ironOre",
		description: "A piece of stone with pure iron inside found from breaking iron ore in the Deepmines. Used for smelting into iron.",
		rarity: "Common",
		emoji: {
			name: `<:Iron_Ore:816983943584022539>`,
			url: "https://cdn.discordapp.com/emojis/816983943584022539.png?v=1",
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
			output: require('./iron'),
			amount: 1
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