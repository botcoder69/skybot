
const { Minion } = require('../../SkyblockHelper/src/index.js');

module.exports = new Minion(
	{
		search: ["cobblestone minion", "cobblestoneminion"],
		group: "Minion",
		name: `Cobblestone Minion`,
		keyName: "invCobblestoneMinion",
		produces: {
			keyName: "cobblestone",
			displayName: "cobblestone",
			emoji: "<:Cobblestone:816984558317600799>"
		},
		description: "Place this minion and it will start generating and mining cobblestone! Minions also work when you are offline!",
		emoji: {
			name: {
				placed: "<:Placed_Cobblestone_Minion:887166926948798484>",
				inventory: "<:Inventory_Cobblestone_Minion:887166922913898527>"
			},
			url: {
				placed: "https://cdn.discordapp.com/emojis/887166926948798484.png?v=1",
				inventory: "https://cdn.discordapp.com/emojis/887166922913898527.png?v=1"
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
			materials: [[`wooden pickaxe`, `woodenPickaxe`, `<:Wooden_Pickaxe:817217441394196572>`, 1], [`cobblestone`, `cobblestone`, `<:Cobblestone:816984558317600799>`, 80]],
			outputs: 1
		},
		tiers: {
			i: {
				timeBetweenActions: 14,
				maxStorage: 64,
				upgradeAmount: 160,
				itemKeyName: "cobblestone"
			},
			ii: {
				timeBetweenActions: 14,
				maxStorage: 192,
				upgradeAmount: 320,
				itemKeyName: "cobblestone"
			},
			iii: {
				timeBetweenActions: 12,
				maxStorage: 192,
				upgradeAmount: 512,
				itemKeyName: "cobblestone"
			},
			iv: {
				timeBetweenActions: 12,
				maxStorage: 384,
				upgradeAmount: 8,
				itemKeyName: "enchantedCobblestone"
			},
			v: {
				timeBetweenActions: 10,
				maxStorage: 384,
				upgradeAmount: 16,
				itemKeyName: "enchantedCobblestone"
			},
			vi: {
				timeBetweenActions: 10,
				maxStorage: 576,
				upgradeAmount: 32,
				itemKeyName: "enchantedCobblestone"
			},
			vii: {
				timeBetweenActions: 9,
				maxStorage: 576,
				upgradeAmount: 64,
				itemKeyName: "enchantedCobblestone"
			},
			viii: {
				timeBetweenActions: 9,
				maxStorage: 768,
				upgradeAmount: 128,
				itemKeyName: "enchantedCobblestone"
			},
			ix: {
				timeBetweenActions: 8,
				maxStorage: 768,
				upgradeAmount: 256,
				itemKeyName: "enchantedCobblestone"
			},
			x: {
				timeBetweenActions: 8,
				maxStorage: 960
			}
		},
		includeInParsing: true
	}
);