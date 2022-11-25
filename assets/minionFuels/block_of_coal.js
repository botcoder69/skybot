
const { MinionFuel } = require('../../SkyblockHelper/src/index.js');

module.exports = new MinionFuel(
	{
		search: [`coalblock`, `blockofcoal`],
		group: "Minion Fuel",
		name: `Block Of Coal`,
		fuelName: "Block Of Coal",
		keyName: "blockOfCoal",
		description: "",
		rarity: "Common",
		emoji: {
			name: `<:Block_Of_Coal:894483282304061450>`,
			url: `https://cdn.discordapp.com/emojis/894483282304061450.png`
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
			duration: 18000,
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