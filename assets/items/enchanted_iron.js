
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Enchanted Iron`,
		keyName: "enchantedIron",
		description: "",
		rarity: "Uncommon",
		emoji: {
			name: `<:Enchanted_Iron:900308904196603965>`,
			url: "https://cdn.discordapp.com/emojis/900308904196603965.png",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 480
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
			materials: [[`iron`, `iron`, `<:Iron_Ingot:885715125305221120>`, 160]],
			outputs: 1
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