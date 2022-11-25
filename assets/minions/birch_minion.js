
const { Minion } = require('../../SkyblockHelper/src/index.js');

module.exports = new Minion(
	{
		search: [`birch minion`, `birchminion`],
		group: "Minion",
		name: `Birch Minion`,
		keyName: `invBirchWoodMinion`,
		produces: {
			keyName: "birchWood",
			displayName: "birch wood",
			emoji: "<:Birch_Log:885390554400165938>",
		},
		description: "Place this minion and it will start generating and chopping birch logs! Minions also work while you are offline!",
		emoji: {
			name: {
				placed: "<:Placed_Birch_Minion:887166927657652224>",
				inventory: "<:Inventory_Birch_Minion:887166923312365618>"
			},
			url: {
				placed: "https://cdn.discordapp.com/emojis/887166923312365618.png",
				inventory: "https://cdn.discordapp.com/emojis/887166923312365618.png"
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
			materials: [[`wooden axe`, `woodenAxe`, `<:Wooden_Axe:817217337261424650>`, 1], [`birch wood`, `birchWood`, `<:Birch_Log:885390554400165938>`, 80]],
			outputs: 1
		},
		tiers: {
			i: {
				timeBetweenActions: 48,
				maxStorage: 64,
				upgradeAmount: 160,
				itemKeyName: "birchWood"
			},
			ii: {
				timeBetweenActions: 48,
				maxStorage: 192,
				upgradeAmount: 320,
				itemKeyName: "birchWood"
			},
			iii: {
				timeBetweenActions: 45,
				maxStorage: 192,
				upgradeAmount: 512,
				itemKeyName: "birchWood"
			},
			iv: {
				timeBetweenActions: 45,
				maxStorage: 384,
				upgradeAmount: 8,
				itemKeyName: "enchantedBirchWood"
			},
			v: {
				timeBetweenActions: 42,
				maxStorage: 384,
				upgradeAmount: 16,
				itemKeyName: "enchantedBirchWood"
			},
			vi: {
				timeBetweenActions: 42,
				maxStorage: 576,
				upgradeAmount: 32,
				itemKeyName: "enchantedBirchWood"
			},
			vii: {
				timeBetweenActions: 38,
				maxStorage: 576,
				upgradeAmount: 64,
				itemKeyName: "enchantedBirchWood"
			},
			viii: {
				timeBetweenActions: 38,
				maxStorage: 768,
				upgradeAmount: 128,
				itemKeyName: "enchantedBirchWood"
			},
			ix: {
				timeBetweenActions: 33,
				maxStorage: 768,
				upgradeAmount: 256,
				itemKeyName: "enchantedBirchWood"
			},
			x: {
				timeBetweenActions: 33,
				maxStorage: 960
			}
		},
		includeInParsing: true
	}
);