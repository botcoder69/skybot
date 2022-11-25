
const { Minion } = require('../../SkyblockHelper/src/index.js');

module.exports = new Minion(
	{
		search: [`jungle minion`, `jungleminion`],
		group: "Minion",
		name: `Jungle Minion`,
		keyName: "invJungleWoodMinion",
		produces: {
			keyName: "jungleWood",
			displayName: "jungle wood",
			emoji: "<:Jungle_Log:885390554240802817>",
		},
		description: "Place this minion and it will start generating and chopping jungle logs! Minions also work while you are offline!",
		emoji: {
			name: {
				placed: "<:Placed_Jungle_Minion:887166927754108948>",
				inventory: "<:Inventory_Jungle_Minion:887166924205735976>"
			},
			url: {
				placed: "https://cdn.discordapp.com/emojis/887166927754108948.png",
				inventory: "https://cdn.discordapp.com/emojis/887166924205735976.png"
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
			materials: [[`wooden axe`, `woodenAxe`, `<:Wooden_Axe:817217337261424650>`, 1], [`jungle wood`, `jungleWood`, `<:Jungle_Log:885390554240802817>`, 80]],
			outputs: 1
		},
		tiers: {
			i: {
				timeBetweenActions: 48,
				maxStorage: 64,
				upgradeAmount: 160,
				itemKeyName: "jungleWood"
			},
			ii: {
				timeBetweenActions: 48,
				maxStorage: 192,
				upgradeAmount: 320,
				itemKeyName: "jungleWood"
			},
			iii: {
				timeBetweenActions: 45,
				maxStorage: 192,
				upgradeAmount: 512,
				itemKeyName: "jungleWood"
			},
			iv: {
				timeBetweenActions: 45,
				maxStorage: 384,
				upgradeAmount: 8,
				itemKeyName: "enchantedJungleWood"
			},
			v: {
				timeBetweenActions: 42,
				maxStorage: 384,
				upgradeAmount: 16,
				itemKeyName: "enchantedJungleWood"
			},
			vi: {
				timeBetweenActions: 42,
				maxStorage: 576,
				upgradeAmount: 32,
				itemKeyName: "enchantedJungleWood"
			},
			vii: {
				timeBetweenActions: 38,
				maxStorage: 576,
				upgradeAmount: 64,
				itemKeyName: "enchantedJungleWood"
			},
			viii: {
				timeBetweenActions: 38,
				maxStorage: 768,
				upgradeAmount: 128,
				itemKeyName: "enchantedJungleWood"
			},
			ix: {
				timeBetweenActions: 33,
				maxStorage: 768,
				upgradeAmount: 256,
				itemKeyName: "enchantedJungleWood"
			},
			x: {
				timeBetweenActions: 33,
				maxStorage: 960,
			}
		},	
		includeInParsing: true
	}
);