
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Pure Diamond`,
		keyName: "pureDiamond",
		description: "A shiny pure diamond found from breaking rare enchanted diamond ore in the Deepmines. Used for making advanced diamond tools.",
		rarity: "Rare",
		emoji: {
			name: `<:Pure_Diamond:1021254563258454037>`,
			url: "https://cdn.discordapp.com/emojis/1021254563258454037.png?v=1",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 2560
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