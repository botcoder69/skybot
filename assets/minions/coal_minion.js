
const { Minion } = require('../../SkyblockHelper/src/index.js');

module.exports = new Minion(
	{
		search: [`coal minion`, `coalminion`],
		group: "Minion",
		name: `Coal Minion`,
		keyName: "invCoalMinion",
		produces: {
			keyName: "coal",
			displayName: "coal",
			emoji: "<:Coal:816982880802439178>",
		},
		description: "Place this minion and it will start generating and mining coal ore! Minions also work when you are offline!",
		emoji: {
			name: {
				placed: "<:Placed_Coal_Minion:887166926944628758>",
				inventory: "<:Inventory_Coal_Minion:887166923295588382>"
			},
			url: {
				placed: "https://cdn.discordapp.com/emojis/887166926944628758.png",
				inventory: "https://cdn.discordapp.com/emojis/887166923295588382.png?v=1"
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
			materials: [[`wooden pickaxe`, `woodenPickaxe`, `<:Wooden_Pickaxe:817217441394196572>`, 1], [`coal`, `coal`, `<:Coal:816982880802439178>`, 80]],
			outputs: 1
		},
		tiers: {
			i: {
				timeBetweenActions: 14,
				maxStorage: 64,
				upgradeAmount: 160,
				itemKeyName: "coal"
			},
			ii: {
				timeBetweenActions: 14,
				maxStorage: 192,
				upgradeAmount: 320,
				itemKeyName: "coal"
			},
			iii: {
				timeBetweenActions: 12,
				maxStorage: 192,
				upgradeAmount: 512,
				itemKeyName: "coal"
			},
			iv: {
				timeBetweenActions: 12,
				maxStorage: 384,
				upgradeAmount: 8,
				itemKeyName: "enchantedCoal"
			},
			v: {
				timeBetweenActions: 10,
				maxStorage: 384,
				upgradeAmount: 16,
				itemKeyName: "enchantedCoal"
			},
			vi: {
				timeBetweenActions: 10,
				maxStorage: 576,
				upgradeAmount: 32,
				itemKeyName: "enchantedCoal"
			},
			vii: {
				timeBetweenActions: 9,
				maxStorage: 576,
				upgradeAmount: 64,
				itemKeyName: "enchantedCoal"
			},
			viii: {
				timeBetweenActions: 9,
				maxStorage: 768,
				upgradeAmount: 128,
				itemKeyName: "enchantedCoal"
			},
			ix: {
				timeBetweenActions: 8,
				maxStorage: 768,
				upgradeAmount: 256,
				itemKeyName: "enchantedCoal"
			},
			x: {
				timeBetweenActions: 8,
				maxStorage: 960
			}
		},
		includeInParsing: true
	}
);