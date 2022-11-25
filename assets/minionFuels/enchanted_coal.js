
const { MinionFuel } = require('../../SkyblockHelper/src/index.js');

module.exports = new MinionFuel(
	{
		search: [`enchanted coal`, `enchantedcoal`, `ench coal`, `enchcoal`],
		group: "Minion Fuel",
		name: `Enchanted Coal`,
		fuelName: "Enchanted Coal",
		keyName: "enchantedCoal",
		description: "",
		rarity: "Uncommon",
		emoji: {
			name: `<:Enchanted_Coal:894483282199199764>`,
			url: `https://cdn.discordapp.com/emojis/894483282199199764.png`
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
			duration: 86400,
			// the multiplier this fuel will give your minion (1 * multiplier)
			multiplier: 1,
			// the speed in percent this fuel will give your minion (timeBetweenActions = Math.floor(timeBetweenActions * (speed / 100)))
			speed: 10,
			// Will the fuel be takeable from the minion after it is placed? Equals to false when not specified
			reclaimable: false
		},
	
		includeInParsing: true
	}
);