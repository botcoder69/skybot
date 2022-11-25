
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Enchanted Dark Oak Wood`,
		keyName: `enchantedDarkOakWood`,
		description: ``,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Enchanted_Dark_Oak_Wood:900308904360157245>`,
			url: `https://cdn.discordapp.com/emojis/900308904360157245.png`,
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
			filterGroup: ``
		},
		crafting: {
			type: `oneItem`,
			materials: [[`dark oak wood`, `darkOakWood`, `<:Dark_Oak_Log:885390554362433587>`, 160]],
			outputs: 1
		},
		includeInParsing: true,
		levelReq: {
			emoji: `<:Foraging:885390554291122206>`,
			id: `chopLevel`,
			level: 8,
			skill: `Foraging`
		}
	}
);