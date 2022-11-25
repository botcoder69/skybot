
const { Minion } = require('../../SkyblockHelper/src/index.js');

module.exports = new Minion(
	{
		search: [`acacia minion`, `acaciaminion`],
		group: "Minion",
		name: `Acacia Minion`,
		keyName: "invAcaciaWoodMinion",
		produces: {
			keyName: "acaciaWood",
			displayName: "acacia wood",
			emoji: "<:Acacia_Log:885390554471485480>",
		},
		description: "Place this minion and it will start generating and chopping acacia logs! Minions also work while you are offline!",
		emoji: {
			name: {
				placed: "<:Placed_Acacia_Minion:887166927548608622>",
				inventory: "<:Inventory_Acacia_Minion:887166923245252669>"
			},
			url: {
				placed: "https://cdn.discordapp.com/emojis/887166927548608622.png",
				inventory: "https://cdn.discordapp.com/emojis/887166923245252669.png"
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
			materials: [[`wooden axe`, `woodenAxe`, `<:Wooden_Axe:817217337261424650>`, 1], [`acacia wood`, `acaciaWood`, `<:Acacia_Log:885390554471485480>`, 80]],
			outputs: 1
		},
		tiers: {
			i: {
				timeBetweenActions: 48,
				maxStorage: 64,
				upgradeAmount: 160,
				itemKeyName: "acaciaWood"
			},
			ii: {
				timeBetweenActions: 48,
				maxStorage: 192,
				upgradeAmount: 320,
				itemKeyName: "acaciaWood"
			},
			iii: {
				timeBetweenActions: 45,
				maxStorage: 192,
				upgradeAmount: 512,
				itemKeyName: "acaciaWood"
			},
			iv: {
				timeBetweenActions: 45,
				maxStorage: 384,
				upgradeAmount: 8,
				itemKeyName: "enchantedAcaciaWood"
			},
			v: {
				timeBetweenActions: 42,
				maxStorage: 384,
				upgradeAmount: 16,
				itemKeyName: "enchantedAcaciaWood"
			},
			vi: {
				timeBetweenActions: 42,
				maxStorage: 576,
				upgradeAmount: 32,
				itemKeyName: "enchantedAcaciaWood"
			},
			vii: {
				timeBetweenActions: 38,
				maxStorage: 576,
				upgradeAmount: 64,
				itemKeyName: "enchantedAcaciaWood"
			},
			viii: {
				timeBetweenActions: 38,
				maxStorage: 768,
				upgradeAmount: 128,
				itemKeyName: "enchantedAcaciaWood"
			},
			ix: {
				timeBetweenActions: 33,
				maxStorage: 768,
				upgradeAmount: 256,
				itemKeyName: "enchantedAcaciaWood"
			},
			x: {
				timeBetweenActions: 33,
				maxStorage: 960,
			}
		},
		includeInParsing: true
	}
);