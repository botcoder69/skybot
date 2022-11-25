
const { MinionFuel } = require('../../SkyblockHelper/src/index.js');

module.exports = new MinionFuel(
	{
		search: [`enchanted charcoal`, `enchantedcharcoal`],
		group: "Minion Fuel",
		name: `Enchanted Charcoal`,
		fuelName: "Enchanted Charcoal",
		keyName: "enchantedCharcoal",
		description: "",
		rarity: "Uncommon",
		emoji: {
			name: `<:Enchanted_Charcoal:894483282174021662>`,
			url: `https://cdn.discordapp.com/emojis/894483282174021662.png`
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
			duration: 129600,
			// the multiplier this fuel will give your minion (1 * multiplier)
			multiplier: 1,
			// the speed in percent this fuel will give your minion (timeBetweenActions = Math.floor(timeBetweenActions * (speed / 100)))
			speed: 20,
			// Will the fuel be takeable from the minion after it is placed? Equals to false when not specified
			reclaimable: false
		},
		includeInParsing: true
	}
);