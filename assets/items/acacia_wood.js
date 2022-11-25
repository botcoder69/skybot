
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,	
		name: `Acacia Wood`,
		keyName: `acaciaWood`,
		description: `A piece of jungle wood found from the Floating Islands. Used to make planks.`,
		rarity: `Common`,
		emoji: {
			name: `<:Acacia_Log:885390554471485480>`,
			url: `https://cdn.discordapp.com/emojis/885390554471485480.png`,
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
			filterGroup: `woodworking`
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