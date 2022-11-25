
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Enchanted Spruce Wood`,
		keyName: "enchantedSpruceWood",
		description: "",
		rarity: "Uncommon",
		emoji: {
			name: `<:Enchanted_Spruce_Wood:900308905261948958>`,
			url: "https://cdn.discordapp.com/emojis/900308905261948958.png",
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
			materials: [[`spruce wood`, `spruceWood`, `<:Spruce_Log:885390554404380693>`, 160]],
			outputs: 1
		},
		includeInParsing: true,
		levelReq: {
			emoji: `<:Foraging:885390554291122206>`,
			id: `chopLevel`,
			level: 12,
			skill: `Foraging`
		}
	}
);