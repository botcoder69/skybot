
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Enchanted Diamond`,
		keyName: `enchantedDiamond`,
		description: `A shiny enchanted diamond found from breaking rare enchanted diamond ore in the Deepmines. Used for making advanced diamond tools.`,
		rarity: `Rare`,
		emoji: {
			name: `<:Enchanted_Diamond:902764556865142835>`,
			url: `https://cdn.discordapp.com/emojis/902764556865142835.png`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 1280
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
			materials: [[`diamond`, `diamond`, `<:Diamond:902764556697341952>`, 160]],
			outputs: 1
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