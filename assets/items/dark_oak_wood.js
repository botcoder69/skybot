
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Dark Oak Wood`,
		keyName: `darkOakWood`,
		description: `A piece of dark oak wood found from the Floating Islands. Used to make planks.`,
		rarity: `Common`,
		emoji: {
			name: `<:Dark_Oak_Log:885390554362433587>`,
			url: `https://cdn.discordapp.com/emojis/885390554362433587.png`,
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
			level: 8,
			skill: `Foraging`
		}
	}
);