
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Enchanted Jungle Wood`,
		keyName: "enchantedJungleWood",
		description: "",
		rarity: "Uncommon",
		emoji: {
			name: `<:Enchanted_Jungle_Wood:900308904230158336>`,
			url: "https://cdn.discordapp.com/emojis/900308904230158336.png",
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
			materials: [[`jungle wood`, `jungleWood`, `<:Jungle_Log:885390554240802817>`, 160]],
			outputs: 1
		},
		includeInParsing: true,
		levelReq: {
			emoji: `<:Foraging:885390554291122206>`,
			id: `chopLevel`,
			level: 20,
			skill: `Foraging`
		}
	}
);