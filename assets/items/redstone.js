
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Redstone`,
		keyName: "redstone",
		description: "A very conductive material found from mining redstone ore in the Deepmines. Used for crafting bits and pieces.",
		rarity: "Common",
		emoji: {
			name: `<:Redstone_Dust:907504986840252417>`,
			url: "https://cdn.discordapp.com/emojis/907504986840252417.png",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 1
			},
			buy: {
				buyable: true,
				price: 4
			}
		},
		sellall: {
			included: false,
			filterGroup: "minerals"
		},
		includeInParsing: true,
		levelReq: {
			emoji: `<:Mining:885390554198868020>`,
			id: `mineLevel`,
			level: 10,
			skill: `Mining`
		}
	}
);