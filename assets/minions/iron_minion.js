
const { Minion } = require('../../SkyblockHelper/src/index.js');

module.exports = new Minion(
	{
		search: ["iron minion", "ironminion"],
		group: "Minion",
		name: `Iron Minion`,
		keyName: "invIronMinion",
		produces: {
			keyName: "ironOre",
			displayName: "iron ore",
			emoji: "<:Iron_Ore:816983943584022539>",
		},
		description: "Place this minion and it will start generating and mining iron ore! Minions also work when you are offline!",
		emoji: {
			name: {
				placed: "<:Placed_Iron_Minion:887166927779287152>",
				inventory: "<:Inventory_Iron_Minion:887166924117655553>"
			},
			url: {
				placed: "https://cdn.discordapp.com/emojis/887166927779287152.png?v=1",
				inventory: "https://cdn.discordapp.com/emojis/887166924117655553.png?v=1"
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
			materials: [[`wooden pickaxe`, `woodenPickaxe`, `<:Wooden_Pickaxe:817217441394196572>`, 1], [`iron`, `iron`, `<:Iron_Ingot:885715125305221120>`, 80]],
			outputs: 1
		},
		tiers: {
			i: {
				timeBetweenActions: 17,
				maxStorage: 64,
				upgradeAmount: 160,
				itemKeyName: "iron"
			},
			ii: {
				timeBetweenActions: 17,
				maxStorage: 192,
				upgradeAmount: 320,
				itemKeyName: "iron"
			},
			iii: {
				timeBetweenActions: 15,
				maxStorage: 192,
				upgradeAmount: 512,
				itemKeyName: "iron"
			},
			iv: {
				timeBetweenActions: 15,
				maxStorage: 384,
				upgradeAmount: 8,
				itemKeyName: "enchantedIron"
			},
			v: {
				timeBetweenActions: 14,
				maxStorage: 384,
				upgradeAmount: 16,
				itemKeyName: "enchantedIron"
			},
			vi: {
				timeBetweenActions: 14,
				maxStorage: 576,
				upgradeAmount: 32,
				itemKeyName: "enchantedIron"
			},
			vii: {
				timeBetweenActions: 12,
				maxStorage: 576,
				upgradeAmount: 64,
				itemKeyName: "enchantedIron"
			},
			viii: {
				timeBetweenActions: 12,
				maxStorage: 768,
				upgradeAmount: 128,
				itemKeyName: "enchantedIron"
			},
			ix: {
				timeBetweenActions: 10,
				maxStorage: 768,
				upgradeAmount: 256,
				itemKeyName: "enchantedIron"
			},
			x: {
				timeBetweenActions: 10,
				maxStorage: 960
			}
		},
		includeInParsing: true
	}
);