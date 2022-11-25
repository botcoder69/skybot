
const { Minion } = require('../../SkyblockHelper/src/index.js');

module.exports = new Minion(
	{
		search: [`spruce minion`, `spruceminion`],
		group: "Minion",
		name: `Spruce Minion`,
		keyName: "invSpruceWoodMinion",
		produces: {
			keyName: "spruceWood",
			displayName: "spruce wood",
			emoji: "<:Spruce_Log:885390554404380693>",
		},
		description: "Place this minion and it will start generating and chopping spruce logs! Minions also work while you are offline!",
		emoji: {
			name: {
				placed: "<:Placed_Spruce_Minion:887166927594725407>",
				inventory: "<:Inventory_Spruce_Minion:887166927049486416>"
			},
			url: {
				placed: "https://cdn.discordapp.com/emojis/887166927594725407.png",
				inventory: "https://cdn.discordapp.com/emojis/887166927049486416.png"
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
			materials: [[`wooden axe`, `woodenAxe`, `<:Wooden_Axe:817217337261424650>`, 1], [`spruce wood`, `spruceWood`, `<:Spruce_Log:885390554404380693>`, 80]],
			outputs: 1
		},
		tiers: {
			i: {
				timeBetweenActions: 48,
				maxStorage: 64,
				upgradeAmount: 160,
				itemKeyName: "spruceWood"
			},
			ii: {
				timeBetweenActions: 48,
				maxStorage: 192,
				upgradeAmount: 320,
				itemKeyName: "spruceWood"
			},
			iii: {
				timeBetweenActions: 45,
				maxStorage: 192,
				upgradeAmount: 512,
				itemKeyName: "spruceWood"
			},
			iv: {
				timeBetweenActions: 45,
				maxStorage: 384,
				upgradeAmount: 8,
				itemKeyName: "enchantedSpruceWood"
			},
			v: {
				timeBetweenActions: 42,
				maxStorage: 384,
				upgradeAmount: 16,
				itemKeyName: "enchantedSpruceWood"
			},
			vi: {
				timeBetweenActions: 42,
				maxStorage: 576,
				upgradeAmount: 32,
				itemKeyName: "enchantedSpruceWood"
			},
			vii: {
				timeBetweenActions: 38,
				maxStorage: 576,
				upgradeAmount: 64,
				itemKeyName: "enchantedSpruceWood"
			},
			viii: {
				timeBetweenActions: 38,
				maxStorage: 768,
				upgradeAmount: 128,
				itemKeyName: "enchantedSpruceWood"
			},
			ix: {
				timeBetweenActions: 33,
				maxStorage: 768,
				upgradeAmount: 256,
				itemKeyName: "enchantedSpruceWood"
			},
			x: {
				timeBetweenActions: 33,
				maxStorage: 960
			}
		},
		includeInParsing: true
	}
);