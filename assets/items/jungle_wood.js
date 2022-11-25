
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: ["jungle wood", "junglewood"],
		group: "Item",
		name: `Jungle Wood`,
		keyName: "jungleWood",
		description: "A piece of jungle wood found from the Floating Islands. Used to make planks.",
		rarity: "Common",
		emoji: {
			name: `<:Jungle_Log:885390554240802817>`,
			url: "https://cdn.discordapp.com/emojis/885390554240802817.png",
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
			level: 20,
			skill: `Foraging`
		}
	}
);