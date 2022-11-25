
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: ["lapis", "lapis lazuli", "lapislazuli"],
		group: "Item",
		name: `Lapis`,
		keyName: "lapis",
		description: "A piece of lapis found from mining lapis lazuli ore in the Deepmines. Has no use except selling.",
		rarity: "Common",
		emoji: {
			name: `<:Lapis:816988928372375603>`,
			url: "https://cdn.discordapp.com/emojis/816988928372375603.png?v=1",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 1
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
		includeInParsing: true,
		levelReq: {
			emoji: `<:Mining:885390554198868020>`,
			id: `mineLevel`,
			level: 10,
			skill: `Mining`
		}
	}
);