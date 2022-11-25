
const { MinionFuel } = require('../../SkyblockHelper/src/index.js');

module.exports = new MinionFuel(
	{
		search: [`enchanted bread`, `enchantedbread`],
		group: "Minion Fuel",
		name: `Enchanted Bread`,
		fuelName: "Enchanted Bread",
		keyName: "enchantedBread",
		description: "",
		rarity: "Common",
		emoji: {
			name: `<:Enchanted_Bread:894483282220154890>`,
			url: `https://cdn.discordapp.com/emojis/894483282220154890.png`
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
			duration: 43200,
			// the multiplier this fuel will give your minion (1 * multiplier)
			multiplier: 1,
			// the speed in percent this fuel will give your minion (timeBetweenActions = Math.floor(timeBetweenActions * (speed / 100)))
			speed: 5,
			// Will the fuel be takeable from the minion after it is placed? Equals to false when not specified
			reclaimable: false
		},
		includeInParsing: true
	}
);