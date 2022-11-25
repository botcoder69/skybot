
const { Minion } = require('../../SkyblockHelper/src/index.js');

module.exports = new Minion(
	{
		search: [`dark oak minion`, `darkoakminion`],
		group: "Minion",
		name: `Dark Oak Minion`,
		keyName: "invDarkOakWoodMinion",
		produces: {
			keyName: "darkOakWood",
			displayName: "dark oak wood",
			emoji: "<:Dark_Oak_Log:885390554362433587>",
		},
		description: "Place this minion and it will start generating and chopping dark oak logs! Minions also work while you are offline!",
		emoji: {
			name: {
				placed: "<:Placed_Dark_Oak_Minion:887166927523434556>",
				inventory: "<:Inventory_Dark_Oak_Minion:887166923689828372>"
			},
			url: {
				placed: "https://cdn.discordapp.com/emojis/887166927523434556.png",
				inventory: "https://cdn.discordapp.com/emojis/887166923689828372.png"
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
			materials: [[`wooden axe`, `woodenAxe`, `<:Wooden_Axe:817217337261424650>`, 1], [`dark oak wood`, `darkOakWood`, `<:Dark_Oak_Log:885390554362433587>`, 80]],
			outputs: 1
		},
		tiers: {
			i: {
				timeBetweenActions: 48,
				maxStorage: 64,
				upgradeAmount: 160,
				itemKeyName: "darkOakWood"
			},
			ii: {
				timeBetweenActions: 48,
				maxStorage: 192,
				upgradeAmount: 320,
				itemKeyName: "darkOakWood"
			},
			iii: {
				timeBetweenActions: 45,
				maxStorage: 192,
				upgradeAmount: 512,
				itemKeyName: "darkOakWood"
			},
			iv: {
				timeBetweenActions: 45,
				maxStorage: 384,
				upgradeAmount: 8,
				itemKeyName: "enchantedDarkOakWood"
			},
			v: {
				timeBetweenActions: 42,
				maxStorage: 384,
				upgradeAmount: 16,
				itemKeyName: "enchantedDarkOakWood"
			},
			vi: {
				timeBetweenActions: 42,
				maxStorage: 576,
				upgradeAmount: 32,
				itemKeyName: "enchantedDarkOakWood"
			},
			vii: {
				timeBetweenActions: 38,
				maxStorage: 576,
				upgradeAmount: 64,
				itemKeyName: "enchantedDarkOakWood"
			},
			viii: {
				timeBetweenActions: 38,
				maxStorage: 768,
				upgradeAmount: 128,
				itemKeyName: "enchantedDarkOakWood"
			},
			ix: {
				timeBetweenActions: 33,
				maxStorage: 768,
				upgradeAmount: 256,
				itemKeyName: "enchantedDarkOakWood"
			},
			x: {
				timeBetweenActions: 33,
				maxStorage: 960
			}
		},
		includeInParsing: true
	}
);