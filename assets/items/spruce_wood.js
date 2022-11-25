
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: ["spruce wood" ,"sprucewood"],
		group: "Item",
		name: `Spruce Wood`,
		keyName: "spruceWood",
		description: "A piece of spruce wood found from the Floating Islands. Used to make planks.",
		rarity: "Common",
		emoji: {
			name: `<:Spruce_Log:885390554404380693>`,
			url: "https://cdn.discordapp.com/emojis/885390554404380693.png",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 2
			},
			buy: {
				buyable: true,
				price: 5
			}
		},
		sellall: {
			included: true,
			filterGroup: "woodworking"
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