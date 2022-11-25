
const { Minion } = require('../../SkyblockHelper/src/index.js');

module.exports = new Minion(
	{
		search: ["gold minion", "goldminion"],
		group: "Minion",
		name: `Gold Minion`,
		keyName: "invGoldMinion",
		produces: {
			keyName: "goldOre",
			displayName: "gold ore",
			emoji: "<:Gold_Ore:816983943794524221>",
		},
		description: "Place this minion and it will start generating and mining gold ore! Minions also work when you are offline!",
		emoji: {
			name: {
				placed: "<:Placed_Gold_Minion:887166927540211782>",
				inventory: "<:Inventory_Gold_Minion:887166924138635294>"
			},
			url: {
				placed: "https://cdn.discordapp.com/emojis/887166927540211782.png?v=1",
				inventory: "https://cdn.discordapp.com/emojis/887166924138635294.png?v=1"
			}
		},
		NPC: {
			sell: {
				sellable: false,
				price: 0
			},
			buy: {
				buyable: false,
				price: 0
			}
		},
		sellall: {
			included: false
		},
		crafting: {
			type: `oneItem`,
			materials: [[`wooden pickaxe`, `woodenPickaxe`, `<:Wooden_Pickaxe:817217441394196572>`, 1], [`gold`, `gold`, `<:Gold_Ingot:885715142522855494>`, 80]],
			outputs: 1
		},
		tiers: {
			i: {
				timeBetweenActions: 22,
				maxStorage: 64,
				upgradeAmount: 160,
				itemKeyName: "gold"
			},
			ii: {
				timeBetweenActions: 22,
				maxStorage: 192,
				upgradeAmount: 320,
				itemKeyName: "gold"
			},
			iii: {
				timeBetweenActions: 20,
				maxStorage: 192,
				upgradeAmount: 512,
				itemKeyName: "gold"
			},
			iv: {
				timeBetweenActions: 20,
				maxStorage: 384,
				upgradeAmount: 8,
				itemKeyName: "enchantedGold"
			},
			v: {
				timeBetweenActions: 18,
				maxStorage: 384,
				upgradeAmount: 16,
				itemKeyName: "enchantedGold"
			},
			vi: {
				timeBetweenActions: 18,
				maxStorage: 576,
				upgradeAmount: 32,
				itemKeyName: "enchantedGold"
			},
			vii: {
				timeBetweenActions: 16,
				maxStorage: 576,
				upgradeAmount: 64,
				itemKeyName: "enchantedGold"
			},
			viii: {
				timeBetweenActions: 16,
				maxStorage: 768,
				upgradeAmount: 128,
				itemKeyName: "enchantedGold"
			},
			ix: {
				timeBetweenActions: 14,
				maxStorage: 768,
				upgradeAmount: 256,
				itemKeyName: "enchantedGold"
			},
			x: {
				timeBetweenActions: 14,
				maxStorage: 960
			}
		},
		includeInParsing: true
	}
);