
const { MinionFuel } = require('../../SkyblockHelper/src/index.js');

module.exports = new MinionFuel(
	{
		search: [`hyper catalyst`, `hypercatalyst`],
		group: "Minion Fuel",
		name: `Hyper Catalyst`,
		keyName: "hyperCatalyst",
		description: "",
		rarity: "Epic",
		emoji: {
			name: `<:Enchanted_Nether_Star:894483281855262731>`,
			url: `https://cdn.discordapp.com/emojis/894483281855262731.png`
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
			included: false,
		},
		minionFuel: {
		// the duration this fuel will last in seconds
			duration: 21600,
			// the multiplier this fuel will give your minion (1 * multiplier)
			multiplier: 4,
			// the speed in percent this fuel will give your minion (timeBetweenActions = Math.floor(timeBetweenActions * (speed / 100)))
			speed: 0,
			// Will the fuel be takeable from the minion after it is placed? Equals to false when not specified
			reclaimable: false
		},
		includeInParsing: false
	}
);