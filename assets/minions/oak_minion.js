
const { Minion } = require('../../SkyblockHelper/src/index.js');

module.exports = new Minion(
	{
		search: [`oak minion`, `oakminion`],
		group: "Minion",
		name: `Oak Minion`,
		keyName: "invOakWoodMinion",
		produces: {
			keyName: "oakWood",
			displayName: "oak wood",
			emoji: "<:Oak_Log:885390554005897237>",
		},
		description: "Place this minion and it will start generating and chopping oak logs! Minions also work while you are offline!",
		emoji: {
			name: {
				placed: "<:Placed_Oak_Minion:887166927607316540>",
				inventory: "<:Inventory_Oak_Minion:887166926508404767>"
			},
			url: {
				placed: "https://cdn.discordapp.com/emojis/887166927607316540.png",
				inventory: "https://cdn.discordapp.com/emojis/887166926508404767.png"
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
			materials: [[`wooden axe`, `woodenAxe`, `<:Wooden_Axe:817217337261424650>`, 1], [`oak wood`, `oakWood`, `<:Oak_Log:885390554005897237>`, 80]],
			outputs: 1
		},
		tiers: {
			i: {
				timeBetweenActions: 48,
				maxStorage: 64,
				upgradeAmount: 160,
				itemKeyName: "oakWood"
			},
			ii: {
				timeBetweenActions: 48,
				maxStorage: 192,
				upgradeAmount: 320,
				itemKeyName: "oakWood"
			},
			iii: {
				timeBetweenActions: 45,
				maxStorage: 192,
				upgradeAmount: 512,
				itemKeyName: "oakWood"
			},
			iv: {
				timeBetweenActions: 45,
				maxStorage: 384,
				upgradeAmount: 8,
				itemKeyName: "enchantedOakWood"
			},
			v: {
				timeBetweenActions: 42,
				maxStorage: 384,
				upgradeAmount: 16,
				itemKeyName: "enchantedOakWood"
			},
			vi: {
				timeBetweenActions: 42,
				maxStorage: 576,
				upgradeAmount: 32,
				itemKeyName: "enchantedOakWood"
			},
			vii: {
				timeBetweenActions: 38,
				maxStorage: 576,
				upgradeAmount: 64,
				itemKeyName: "enchantedOakWood"
			},
			viii: {
				timeBetweenActions: 38,
				maxStorage: 768,
				upgradeAmount: 128,
				itemKeyName: "enchantedOakWood"
			},
			ix: {
				timeBetweenActions: 33,
				maxStorage: 768,
				upgradeAmount: 256,
				itemKeyName: "enchantedOakWood"
			},
			x: {
				timeBetweenActions: 33,
				maxStorage: 960
			}
		},
		includeInParsing: true
	}
);