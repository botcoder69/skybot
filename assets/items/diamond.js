
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Diamond`,
		keyName: `diamond`,
		description: `A shiny diamond found from mining diamond ore in the Deepmines. Used for crafting diamond tools.`,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Diamond:902764556697341952>`,
			url: `https://cdn.discordapp.com/emojis/816599953563844619.png?v=1`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 8
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
			level: 15,
			skill: `Mining`
		}
	}
);