
const { Minion } = require('../../SkyblockHelper/src/index.js');

module.exports = new Minion(
	{
		search: ["lapis minion", "lapisminion"],
		group: "Minion",
		name: `Lapis Minion`,
		keyName: "invLapisMinion",
		produces: {
			keyName: "lapis",
			displayName: "lapis",
			emoji: "<:Lapis:816988928372375603>",
		},
		description: "Place this minion and it will start generating and mining lapis ore! Minions also work when you are offline!",
		emoji: {
			name: {
				placed: "<:Placed_Lapis_Minion:887166927636684901>",
				inventory: "<:Inventory_Lapis_Minion:887166926449676328>"
			},
			url: {
				placed: "https://cdn.discordapp.com/emojis/887166927636684901.png",
				inventory: "https://cdn.discordapp.com/emojis/887166926449676328.png"
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
			materials: [[`wooden pickaxe`, `woodenPickaxe`, `<:Wooden_Pickaxe:817217441394196572>`, 1], [`lapis`, `lapis`, `<:Lapis:816988928372375603>`, 80]],
			outputs: 1
		},
		tiers: {
			i: {
				timeBetweenActions: 29,
				maxStorage: 64,
				upgradeAmount: 160,
				itemKeyName: "lapis"
			},
			ii: {
				timeBetweenActions: 29,
				maxStorage: 192,
				upgradeAmount: 320,
				itemKeyName: "lapis"
			},
			iii: {
				timeBetweenActions: 27,
				maxStorage: 192,
				upgradeAmount: 512,
				itemKeyName: "lapis"
			},
			iv: {
				timeBetweenActions: 27,
				maxStorage: 384,
				upgradeAmount: 8,
				itemKeyName: "enchantedLapis"
			},
			v: {
				timeBetweenActions: 25,
				maxStorage: 384,
				upgradeAmount: 16,
				itemKeyName: "enchantedLapis"
			},
			vi: {
				timeBetweenActions: 25,
				maxStorage: 576,
				upgradeAmount: 32,
				itemKeyName: "enchantedLapis"
			},
			vii: {
				timeBetweenActions: 23,
				maxStorage: 576,
				upgradeAmount: 64,
				itemKeyName: "enchantedLapis"
			},
			viii: {
				timeBetweenActions: 23,
				maxStorage: 768,
				upgradeAmount: 128,
				itemKeyName: "enchantedLapis"
			},
			ix: {
				timeBetweenActions: 21,
				maxStorage: 768,
				upgradeAmount: 256,
				itemKeyName: "enchantedLapis"
			},
			x: {
				timeBetweenActions: 21,
				maxStorage: 960
			}
		},
		includeInParsing: true
	}
);