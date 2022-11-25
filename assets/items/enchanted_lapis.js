
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Enchanted Lapis`,
		keyName: "enchantedLapis",
		description: "",
		rarity: "Uncommon",
		emoji: {
			name: `<:Enchanted_Lapis_Lazuli:900308904074940436>`,
			url: "https://cdn.discordapp.com/emojis/900308904074940436.png",
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
			included: true,
			filterGroup: "minerals"
		},
		crafting: {
			type: `oneItem`,
			materials: [[`lapis`, `lapis`, `<:Lapis:816988928372375603>`, 160]],
			outputs: 1
		},
		includeInParsing: true,
		levelReq: {
			emoji: `<:Mining:885390554198868020>`,
			id: `mineLevel`,
			level: 8,
			skill: `Mining`
		}
	}
);