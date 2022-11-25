
const { Minion } = require('../../SkyblockHelper/src/index.js');

module.exports = new Minion(
	{
		search: ['redstone minion', 'redstoneMinion'],
		group: "Minion",
		name: `Redstone Minion`,
		keyName: "invRedstoneMinion",
		produces: {
			keyName: "redstone",
			displayName: "redstone",
			emoji: "<:Redstone_Dust:907504986840252417>"
		},
		description: "Place this minion and it will start generating and mining redstone! Minions also work while you are offline!",
		emoji: {
			name: {
				placed: "<:Placed_Redstone_Minion:907506896636895263>",
				inventory: "<:Inventory_Redstone_Minion:907506896955645992>"
			},
			url: {
				placed: "https://cdn.discordapp.com/emojis/907506896636895263.png",
				inventory: "https://cdn.discordapp.com/emojis/907506896955645992.png"
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
			materials: [[`wooden pickaxe`, `woodenPickaxe`, `<:Wooden_Pickaxe:817217441394196572>`, 1], [`redstone`, `redstone`, `<:Redstone_Dust:907504986840252417>`, 80]],
			outputs: 1
		},
		tiers: {
			i: {
				timeBetweenActions: 14,
				maxStorage: 64,
				upgradeAmount: 160,
				itemKeyName: "redstone"
			},
			ii: {
				timeBetweenActions: 14,
				maxStorage: 192,
				upgradeAmount: 320,
				itemKeyName: "redstone"
			},
			iii: {
				timeBetweenActions: 12,
				maxStorage: 192,
				upgradeAmount: 512,
				itemKeyName: "redstone"
			},
			iv: {
				timeBetweenActions: 12,
				maxStorage: 384,
				upgradeAmount: 8,
				itemKeyName: "enchantedRedstone"
			},
			v: {
				timeBetweenActions: 10,
				maxStorage: 384,
				upgradeAmount: 16,
				itemKeyName: "enchantedRedstone"
			},
			vi: {
				timeBetweenActions: 10,
				maxStorage: 576,
				upgradeAmount: 32,
				itemKeyName: "enchantedRedstone"
			},
			vii: {
				timeBetweenActions: 9,
				maxStorage: 576,
				upgradeAmount: 64,
				itemKeyName: "enchantedRedstone"
			},
			viii: {
				timeBetweenActions: 9,
				maxStorage: 768,
				upgradeAmount: 128,
				itemKeyName: "enchantedRedstone"
			},
			ix: {
				timeBetweenActions: 8,
				maxStorage: 768,
				upgradeAmount: 256,
				itemKeyName: "enchantedRedstone"
			},
			x: {
				timeBetweenActions: 8,
				maxStorage: 960
			}
		},
		includeInParsing: true
	}
);