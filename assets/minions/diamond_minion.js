
const { Minion } = require('../../SkyblockHelper/src/index.js');

module.exports = new Minion(
	{
		search: ["diamond minion", "diamondminion"],
		group: "Minion",
		name: `Diamond Minion`,
		keyName: "invDiamondMinion",
		produces: {
			keyName: "diamond",
			displayName: "diamond",
			emoji: "<:Diamond:902764556697341952>"
		},
		description: "Place this minion and it will start generating and mining diamond ore! Minions also work when you are offline!",
		emoji: {
			name: {
				placed: "<:Placed_Diamond_Minion:887166927552778270>",
				inventory: "<:Inventory_Diamond_Minion:887166924147007528>"
			},
			url: {
				placed: "https://cdn.discordapp.com/emojis/887166927552778270.png?v=1",
				inventory: "https://cdn.discordapp.com/emojis/887166924147007528.png?v=1"
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
			materials: [[`wooden pickaxe`, `woodenPickaxe`, `<:Wooden_Pickaxe:817217441394196572>`, 1], [`diamond`, `diamond`, `<:Diamond:902764556697341952>`, 80]],
			outputs: 1
		},
		tiers: {
			i: {
				timeBetweenActions: 29,
				maxStorage: 64,
				upgradeAmount: 160,
				itemKeyName: "diamond"
			},
			ii: {
				timeBetweenActions: 29,
				maxStorage: 192,
				upgradeAmount: 320,
				itemKeyName: "diamond"
			},
			iii: {
				timeBetweenActions: 27,
				maxStorage: 192,
				upgradeAmount: 512,
				itemKeyName: "diamond"
			},
			iv: {
				timeBetweenActions: 27,
				maxStorage: 384,
				upgradeAmount: 8,
				itemKeyName: "enchantedDiamond"
			},
			v: {
				timeBetweenActions: 25,
				maxStorage: 384,
				upgradeAmount: 16,
				itemKeyName: "enchantedDiamond"
			},
			vi: {
				timeBetweenActions: 25,
				maxStorage: 576,
				upgradeAmount: 32,
				itemKeyName: "enchantedDiamond"
			},
			vii: {
				timeBetweenActions: 22,
				maxStorage: 576,
				upgradeAmount: 64,
				itemKeyName: "enchantedDiamond"
			},
			viii: {
				timeBetweenActions: 22,
				maxStorage: 768,
				upgradeAmount: 128,
				itemKeyName: "enchantedDiamond"
			},
			ix: {
				timeBetweenActions: 19,
				maxStorage: 768,
				upgradeAmount: 256,
				itemKeyName: "enchantedDiamond"
			},
			x: {
				timeBetweenActions: 19,
				maxStorage: 960
			}
		},
		includeInParsing: true
	}
);