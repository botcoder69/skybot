
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Enchanted Gold`,
		keyName: `enchantedGold`,
		description: `An ingot of blessed gold made from refining a ton of pure gold ingots`,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Enchanted_Gold:885715156615692298>`,
			url: `https://cdn.discordapp.com/emojis/885715156615692298.png?v=1`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 640
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
			materials: [[`gold`, `gold`, `<:Gold_Ingot:885715142522855494>`, 160]],
			outputs: 1
		},
		includeInParsing: true,
		levelReq: {
			emoji: `<:Mining:885390554198868020>`,
			id: `mineLevel`,
			level: 6,
			skill: `Mining`
		}
	}
);