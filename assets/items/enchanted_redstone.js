
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Enchanted Redstone`,
		keyName: "enchantedRedstone",
		description: "An even more conductive material found from fusing 80 redstone together. Used for crafting more bits and pieces.",
		rarity: "Uncommon",
		emoji: {
			name: `<:Enchanted_Redstone:907504986919936010>`,
			url: "https://cdn.discordapp.com/emojis/907504986919936010.png"
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
			included: false
		},
		crafting: {
			type: `oneItem`,
			materials: [[`redstone`, `redstone`, `<:Redstone_Dust:907504986840252417>`, 160]]
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