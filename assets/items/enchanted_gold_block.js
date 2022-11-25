
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Enchanted Gold Block`,
		keyName: `enchantedGoldBlock`,
		description: `A block of blessed gold made from refining a ton of blessed gold ingots. Used for upgrading your bank.`,
		rarity: `Rare`,
		emoji: {
			name: `<:Enchanted_Gold_Block:885715177713057802>`,
			url: `https://cdn.discordapp.com/emojis/885715177713057802.png?v=1`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 102400
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
			materials: [[`enchanted gold`, `enchantedGold`, `<:Enchanted_Gold:885715156615692298>`, 160]],
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