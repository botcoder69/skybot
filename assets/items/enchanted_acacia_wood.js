
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Enchanted Acacia Wood`,
		keyName: `enchantedAcaciaWood`,
		description: ``,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Enchanted_Acacia_Wood:900308906167922688>`,
			url: `https://cdn.discordapp.com/emojis/900308906167922688.png`,
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
			filterGroup: ""
		},
		crafting: {
			type: `oneItem`,
			materials: [[`acacia wood`, `acaciaWood`, `<:Acacia_Log:885390554471485480>`, 160]],
			outputs: 1
		},
		includeInParsing: true,
		levelReq: {
			emoji: `<:Foraging:885390554291122206>`,
			id: `chopLevel`,
			level: 16,
			skill: `Foraging`
		}
	}
);